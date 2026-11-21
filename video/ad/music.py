"""Upbeat 120 BPM royalty-free bed for the 9:16 ad -> video/ad/music.wav (pure numpy synthesis).

Structure (beat = 0.5s): 0-3s hook (filtered kick + stabs), 3s drop (full groove),
riser into the CTA at 27s, then a final hit and tail.
"""
import wave
from pathlib import Path
import numpy as np

SR = 44100
DUR = 31.0
BEAT = 0.5
N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)

def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= N: return
    sig = sig[: N - i] * gain
    L[i:i+len(sig)] += sig * (1 - max(0, pan))
    R[i:i+len(sig)] += sig * (1 + min(0, pan))

def tt(d): return np.arange(int(SR * d)) / SR
def midi(n): return 440 * 2 ** ((n - 69) / 12)

def kick():
    t = tt(0.35); f = 50 + 120 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)
def clap():
    t = tt(0.25); return rng.standard_normal(len(t)) * np.exp(-t * 22) * 0.6
def hat(open_=False):
    t = tt(0.15 if not open_ else 0.3); n = rng.standard_normal(len(t))
    n = np.diff(n, prepend=0)  # crude high-pass
    return n * np.exp(-t * (60 if not open_ else 14)) * 0.25
def stab(notes, d=0.22):
    t = tt(d); s = sum(np.sign(np.sin(2*np.pi*midi(n)*t)) * 0.25 + np.sin(2*np.pi*midi(n)*t) for n in notes) / len(notes)
    return s * np.exp(-t * 9) * np.minimum(1, t / 0.004)
def bass(n, d=0.24):
    t = tt(d); return (np.sin(2*np.pi*midi(n)*t) + 0.3*np.sin(4*np.pi*midi(n)*t)) * np.exp(-t*5) * np.minimum(1, t/0.005)
def riser(d):
    t = tt(d); n = rng.standard_normal(len(t)); n = np.diff(n, prepend=0)
    return n * (t / d) ** 2 * 0.35 + np.sin(2*np.pi*np.cumsum(300 + 900*(t/d)**2)/SR) * (t/d)**2 * 0.15

# F - G - Em - Am (in C), one chord per bar (2s)
PROG = [[65, 69, 72], [67, 71, 74], [64, 67, 71], [69, 72, 76]]
ROOT = [41, 43, 40, 45]

beats = int(DUR / BEAT)
for b in range(beats):
    t0 = b * BEAT
    bar = b // 4
    chord, root = PROG[bar % 4], ROOT[bar % 4]
    hook = t0 < 3.0
    cta_rise = 25.0 <= t0 < 27.0
    end = t0 >= 30.0
    if end: continue
    add(kick(), t0, gain=0.45 if hook else 0.9)
    if not hook:
        if b % 2 == 1: add(clap(), t0, gain=0.8)
        add(hat(), t0 + BEAT/2, pan=0.3)
        if b % 4 == 3: add(hat(True), t0 + BEAT/2, pan=-0.3)
        add(bass(root), t0, gain=0.55); add(bass(root + 12, 0.18), t0 + BEAT/2, gain=0.35)
    # stabs on the off-beat (house style)
    if not cta_rise:
        add(stab(chord), t0 + BEAT/2, pan=(-0.25 if b % 2 else 0.25), gain=0.32 if hook else 0.28)

add(riser(2.0), 25.0, gain=0.9)
# drop hits
for t0 in (3.0, 27.0):
    add(kick() * 1.2, t0); add(stab([60, 64, 67, 72], 0.8), t0, gain=0.5)
# final chord tail
t = tt(1.8); tail = sum(np.sin(2*np.pi*midi(n)*t) for n in (60, 64, 67, 72)) / 4 * np.exp(-t*2)
add(tail, 30.0, gain=0.5)

st = np.stack([L, R], 1)
fi = int(SR * 0.05); fo = int(SR * 0.6)
st[:fi] *= np.linspace(0, 1, fi)[:, None]; st[-fo:] *= np.linspace(1, 0, fo)[:, None]
st = np.tanh(st * 1.3)
st /= np.abs(st).max() / 0.85
out = Path(__file__).with_name('music.wav')
with wave.open(str(out), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
print('Wrote', out)
