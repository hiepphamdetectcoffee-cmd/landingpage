"""Generate a soft, royalty-free background track for the intro video -> video/music.wav.

Pure synthesis (numpy): warm pad chords + a gentle plucked arpeggio, I–V–vi–IV in C major at 96 BPM.
Run: python3 video/music.py
"""
import wave
from pathlib import Path

import numpy as np

SR = 44100
DUR = 46.5
BPM = 96
BEAT = 60 / BPM
BAR = BEAT * 4

def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)

# C, G, Am, F  (root-position triads + octave)
CHORDS = [[48, 55, 60, 64, 67], [43, 55, 59, 62, 67], [45, 57, 60, 64, 69], [41, 53, 57, 60, 65]]

t = np.arange(int(SR * DUR)) / SR
out = np.zeros_like(t)

def pad(freq, start, length, amp):
    n0, n1 = int(start * SR), min(int((start + length) * SR), len(t))
    if n0 >= len(t):
        return
    tt = t[n0:n1] - start
    env = np.minimum(1, tt / 0.8) * np.minimum(1, (length - tt) / 0.9)
    sig = sum(np.sin(2 * np.pi * freq * d * tt) for d in (0.997, 1.0, 1.003)) / 3
    sig += 0.25 * np.sin(2 * np.pi * freq * 2 * tt)
    out[n0:n1] += amp * env.clip(0) * sig

def pluck(freq, start, amp):
    length = 1.2
    n0, n1 = int(start * SR), min(int((start + length) * SR), len(t))
    if n0 >= len(t):
        return
    tt = t[n0:n1] - start
    env = np.exp(-tt * 5.5) * np.minimum(1, tt / 0.005)
    sig = np.sin(2 * np.pi * freq * tt) + 0.35 * np.sin(2 * np.pi * freq * 2 * tt) + 0.12 * np.sin(2 * np.pi * freq * 3 * tt)
    out[n0:n1] += amp * env * sig

bar = 0
start = 0.0
while start < DUR:
    chord = CHORDS[bar % 4]
    for n in chord[:4]:
        pad(midi(n), start, BAR + 0.4, 0.05)
    # arpeggio in 8th notes, enters after the logo
    if start >= BAR * 1:
        pattern = [chord[2], chord[3], chord[4], chord[3] + 12, chord[4], chord[3], chord[2] + 12, chord[3]]
        for i, n in enumerate(pattern):
            pluck(midi(n + 12), start + i * BEAT / 2, 0.06 if i % 2 == 0 else 0.04)
    # soft bass on beats 1 and 3
    for b in (0, 2):
        pluck(midi(chord[0] - 12), start + b * BEAT, 0.12)
    bar += 1
    start += BAR

# simple stereo delay for space
delay = int(SR * BEAT * 0.75)
left = out.copy()
right = out.copy()
right[delay:] += 0.35 * out[:-delay]
left[delay * 2:] += 0.2 * out[:-delay * 2]

fade_in, fade_out = int(SR * 1.0), int(SR * 2.5)
for ch in (left, right):
    ch[:fade_in] *= np.linspace(0, 1, fade_in)
    ch[-fade_out:] *= np.linspace(1, 0, fade_out)

stereo = np.stack([left, right], axis=1)
stereo /= np.abs(stereo).max() / 0.6
pcm = (stereo * 32767).astype(np.int16)

path = Path(__file__).with_name('music.wav')
with wave.open(str(path), 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f'Wrote {path}')
