#!/usr/bin/env python
"""Cabinet of Shadows — original classical composition pipeline.

Each monster gets a short through-composed piece (~25–35 s) grounded in:
  • a real classical masterpiece's harmonic/rhythmic vocabulary
  • a key + mode chosen to fit the psychological phenomenon
  • a leitmotif of 4–8 notes that recurs through the piece
  • orchestration appropriate to the source novel's century

Plus:
  • 1 hub theme (~60 s ambient gas-lamp adagio)
  • 13 transition stingers (~1.8 s each, matches GSAP transition duration)

Pipeline:
  python compose_music.py → MIDI in scripts/music/midi/
                          → WAV via FluidSynth in scripts/music/wav/
                          → OPUS via ffmpeg in public/audio/ambient/ and /stingers/

Run from anywhere; uses absolute paths.

Music-theory references (every piece is original — these are *flavor* anchors,
not samples):
  Dracula      — Bartók "Bluebeard's Castle" (D minor pedal, tritone B♭→E)
  Creature     — Mahler 1 mvt I (parallel fifths, low strings ostinato, D minor)
  Hyde         — Schoenberg "Verklärte Nacht" (semi-tonal slip C maj → C min)
  Wolf         — Saint-Saëns "Danse Macabre" (6/8 dorian, tritone violin tuning)
  Griffin      — Debussy "Nuages" (whole-tone parallels, ppp)
  Carmilla     — Chopin Nocturne op.9/2 (G♭ major, chromatic descending bass)
  Erik         — Tchaikovsky Pathétique I (B minor, organ-led descent)
  Dorian       — Ravel "La Valse" (D major decaying to D minor in 3/4)
  Varney       — Schubert "Erlkönig" (G minor, triplet propulsion)
  Sweeney      — Sondheim "Sweeney Todd" theme (F♯ minor, m2 stab)
  Jack         — Stravinsky "Petrushka" (bitonal C + F♯ major, 5/8 limp)
  Golem        — Bach Toccata in D minor (D dorian, m2 grinding)
  Horseman     — Berlioz "Symphonie Fantastique" Dies Irae (E♭ minor gallop)
  Cabinet hub  — Albinoni Adagio (G minor, organ + strings, very slow)
"""

from __future__ import annotations

import os
import subprocess
import sys
import shutil
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable

import pretty_midi

# ---------- toolchain paths ----------
ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
MIDI_DIR = SCRIPTS / "music" / "midi"
WAV_DIR = SCRIPTS / "music" / "wav"
AMBIENT_OUT = ROOT / "public" / "audio" / "ambient"
STINGER_OUT = ROOT / "public" / "audio" / "stingers"

FLUIDSYNTH = Path(r"C:\tools\fluidsynth\bin\fluidsynth.exe")
SOUNDFONT = SCRIPTS / "soundfonts" / "FluidR3_GM.sf2"

for d in (MIDI_DIR, WAV_DIR, AMBIENT_OUT, STINGER_OUT):
    d.mkdir(parents=True, exist_ok=True)


# ---------- music theory helpers ----------
NOTE_NAMES = {
    "C": 0,  "B#": 0,
    "C#": 1, "Db": 1,
    "D": 2,
    "D#": 3, "Eb": 3,
    "E": 4,  "Fb": 4,
    "F": 5,  "E#": 5,
    "F#": 6, "Gb": 6,
    "G": 7,
    "G#": 8, "Ab": 8,
    "A": 9,
    "A#": 10, "Bb": 10,
    "B": 11,  "Cb": 11,
}

# scale intervals as semitones above tonic
SCALES = {
    "major":      [0, 2, 4, 5, 7, 9, 11],
    "minor":      [0, 2, 3, 5, 7, 8, 10],
    "harm_minor": [0, 2, 3, 5, 7, 8, 11],
    "mel_minor":  [0, 2, 3, 5, 7, 9, 11],
    "dorian":     [0, 2, 3, 5, 7, 9, 10],
    "phrygian":   [0, 1, 3, 5, 7, 8, 10],
    "lydian":     [0, 2, 4, 6, 7, 9, 11],
    "mixolydian": [0, 2, 4, 5, 7, 9, 10],
    "locrian":    [0, 1, 3, 5, 6, 8, 10],
    "whole_tone": [0, 2, 4, 6, 8, 10],
    "octatonic":  [0, 2, 3, 5, 6, 8, 9, 11],   # H-W diminished
    "chrom_desc": [0, 11, 10, 9, 8, 7, 6, 5],  # for descending chromatic motion
}


def pitch(name: str, octave: int) -> int:
    """E.g. pitch('D', 3) = 50, pitch('F#', 4) = 66."""
    return 12 * (octave + 1) + NOTE_NAMES[name]


def scale(tonic: str, mode: str, octave: int) -> list[int]:
    base = pitch(tonic, octave)
    return [base + iv for iv in SCALES[mode]]


def chord(root: str, kind: str, octave: int = 3) -> list[int]:
    r = pitch(root, octave)
    presets = {
        "maj":   [0, 4, 7],
        "min":   [0, 3, 7],
        "dim":   [0, 3, 6],
        "aug":   [0, 4, 8],
        "maj7":  [0, 4, 7, 11],
        "min7":  [0, 3, 7, 10],
        "dom7":  [0, 4, 7, 10],
        "halfdim": [0, 3, 6, 10],
        "dim7":  [0, 3, 6, 9],
        "sus2":  [0, 2, 7],
        "sus4":  [0, 5, 7],
        "open5": [0, 7],           # power-chord / parallel fifth
        "tritone": [0, 6],
        "minadd9": [0, 3, 7, 14],
    }
    return [r + iv for iv in presets[kind]]


# ---------- general MIDI program numbers we'll lean on ----------
GM = {
    "piano":         0,
    "harpsichord":   6,
    "celesta":       8,
    "music_box":    10,
    "vibraphone":   11,
    "marimba":      12,
    "church_organ": 19,
    "reed_organ":   20,
    "accordion":    21,
    "strings":      48,   # ensemble strings
    "slow_strings": 49,
    "tremolo_str":  44,   # tremolo strings — cinematic swell
    "orchestra_hit":55,   # the literal cinematic-trailer GM program
    "synth_pad":    89,   # warm pad
    "choir":        52,
    "voice_oohs":   53,
    "trumpet":      56,
    "frenchhorn":   60,
    "brass":        61,
    "tuba":         58,
    "soprano_sax":  64,
    "oboe":         68,
    "clarinet":     71,
    "bassoon":      70,
    "flute":        73,
    "pan_flute":    75,
    "violin":       40,
    "viola":        41,
    "cello":        42,
    "contrabass":   43,
    "pizzicato":    45,
    "harp":         46,
    "timpani":      47,
    "guitar_nylon": 24,
    "shamisen":     106,
    "shakuhachi":  77,
    "fx_atmos":     99,   # atmosphere FX
    "fx_brightness":100,
    "rev_cymbal":  119,   # reverse cymbal — the whoosh
}

# ---------- percussion (channel 10) note numbers ----------
DRUM = {
    "kick":         35,
    "snare":        38,
    "low_tom":      41,
    "mid_tom":      45,
    "high_tom":     50,
    "crash":        49,
    "ride":         51,
    "splash":       55,
    "china":        52,
    "gong":         53,   # chinese cymbal
    "low_bongo":    61,
    "tambourine":   54,
}


# ---------- builder utilities ----------
def add_note(inst: pretty_midi.Instrument, pitch_: int, start: float, dur: float,
             velocity: int = 80) -> None:
    if pitch_ < 0 or pitch_ > 127:
        return
    inst.notes.append(pretty_midi.Note(
        velocity=max(1, min(127, velocity)),
        pitch=pitch_, start=start, end=start + dur,
    ))


def add_chord(inst: pretty_midi.Instrument, pitches: list[int], start: float,
              dur: float, velocity: int = 70) -> None:
    for p in pitches:
        add_note(inst, p, start, dur, velocity)


def add_arpeggio(inst: pretty_midi.Instrument, pitches: list[int], start: float,
                 total_dur: float, step: float, velocity: int = 65) -> None:
    t = start
    for i in range(int(total_dur / step)):
        p = pitches[i % len(pitches)]
        add_note(inst, p, t, step * 0.95, velocity)
        t += step


def new_inst(program: int, name: str = "") -> pretty_midi.Instrument:
    inst = pretty_midi.Instrument(program=program, name=name)
    return inst


# ===================================================================
#  COMPOSITIONS — each function returns a pretty_midi.PrettyMIDI
# ===================================================================

# ----- Dracula --------------------------------------------------------
def compose_dracula() -> pretty_midi.PrettyMIDI:
    """D minor, harmonic minor flavour, tritone leitmotif B♭→E.
    Pedal D in low strings; harpsichord arpeggios; choir on the cadence.
    Lifts from the *gravity* of Bartók's "Bluebeard" castle pedal."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=60)
    s = scale("D", "harm_minor", 3)

    pedal = new_inst(GM["contrabass"])
    organ = new_inst(GM["church_organ"])
    harp = new_inst(GM["harp"])
    choir = new_inst(GM["voice_oohs"])

    bar = 4.0  # one bar = 4 s at 60 bpm
    # 8 bars total = 32 s
    for b in range(8):
        t = b * bar
        # pedal D (drone)
        add_note(pedal, pitch("D", 2), t, bar, 55)
        add_note(pedal, pitch("D", 1), t, bar, 45)

        # bar-by-bar harmony plan: i — i — iv6 — i — V7 — i — bII (Neapolitan) — V/i
        harmonies = [
            chord("D", "min", 3),
            chord("D", "min", 3),
            chord("G", "min", 3),     # iv
            chord("D", "min", 3),
            chord("A", "dom7", 3),    # V7
            chord("D", "min", 3),
            chord("Eb", "maj", 3),    # bII (Neapolitan, very Dracula)
            chord("A", "dom7", 3),    # V7
        ]
        add_chord(organ, harmonies[b], t, bar, 50)

        # harpsichord arpeggio over the harmony
        arp_pitches = harmonies[b] + [p + 12 for p in harmonies[b][:2]]
        add_arpeggio(harp, arp_pitches, t, bar, 0.25, 60)

        # leitmotif: B♭ → E (tritone) at the start of bars 1 and 5
        if b in (0, 4):
            add_note(choir, pitch("Bb", 4), t + 0.5, 1.2, 65)
            add_note(choir, pitch("E", 4), t + 1.8, 1.6, 70)

    pm.instruments.extend([pedal, organ, harp, choir])
    return pm


# ----- The Creature ---------------------------------------------------
def compose_creature() -> pretty_midi.PrettyMIDI:
    """D minor with parallel open fifths — Mahler-1 lurching ostinato.
    Cellos + double bass + occasional French horn cry."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=52)
    bar = 60.0 / 52 * 4

    cello = new_inst(GM["cello"])
    bass = new_inst(GM["contrabass"])
    horn = new_inst(GM["frenchhorn"])
    timpani = new_inst(GM["timpani"])

    # 8 bars
    for b in range(8):
        t = b * bar
        # cello lurching dotted-quarter + eighth ostinato (D-A open fifth)
        add_note(cello, pitch("D", 3), t, bar * 0.45, 70)
        add_note(cello, pitch("A", 3), t + bar * 0.5, bar * 0.45, 65)
        # bass on downbeats only
        add_note(bass, pitch("D", 2), t, bar * 0.95, 55)
        # timpani heartbeat on beats 1 and 3
        add_note(timpani, pitch("D", 2), t, 0.3, 80)
        add_note(timpani, pitch("D", 2), t + bar / 2, 0.3, 70)

    # horn cry — long held F over the whole thing, sliding to G♭ at bar 5
    add_note(horn, pitch("F", 4), 0, bar * 4, 60)
    add_note(horn, pitch("Gb", 4), bar * 4, bar * 4, 65)

    pm.instruments.extend([cello, bass, horn, timpani])
    return pm


# ----- Hyde -----------------------------------------------------------
def compose_hyde() -> pretty_midi.PrettyMIDI:
    """Starts in C major (Jekyll), modulates by direct chromatic slide
    to C minor (Hyde) at the midpoint. Schoenberg-influenced.
    Piano + clarinet + low strings."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=68)
    bar = 60.0 / 68 * 4

    piano = new_inst(GM["piano"])
    clarinet = new_inst(GM["clarinet"])
    cello = new_inst(GM["cello"])

    # First half (4 bars) — C major, gentle
    for b in range(4):
        t = b * bar
        # piano: I — vi — IV — V → I in C major (Jekyll, civil)
        prog = [
            chord("C", "maj", 4),
            chord("A", "min", 4),
            chord("F", "maj", 4),
            chord("G", "dom7", 4),
        ]
        add_chord(piano, prog[b], t, bar, 55)
        # cello pedal C
        add_note(cello, pitch("C", 2), t, bar, 50)
    # clarinet melody (Jekyll theme) — pentatonic C E G A E C
    melody = [(pitch("C", 5), 0.5), (pitch("E", 5), 0.5), (pitch("G", 5), 0.5),
              (pitch("A", 5), 0.5), (pitch("E", 5), 0.75), (pitch("C", 5), 1.25)]
    t = 0.5
    for p, d in melody:
        add_note(clarinet, p, t, d * (bar / 4) * 0.95, 65)
        t += d * (bar / 4)

    # SLIP — at bar 4.5, every voice slides down by a m2 → C minor world
    slip = 4 * bar - bar * 0.25
    add_chord(piano, chord("B", "dim", 4), slip, bar * 0.25, 40)

    # Second half (4 bars) — C minor (Hyde), urgent
    for b in range(4):
        t = (4 + b) * bar
        prog = [
            chord("C", "min", 4),
            chord("Ab", "maj", 4),
            chord("F", "min", 4),
            chord("G", "dom7", 4),    # back to dominant
        ]
        add_chord(piano, prog[b], t, bar, 75)
        add_note(cello, pitch("C", 2), t, bar, 70)
    # clarinet melody inverted, in C minor, faster
    melody2 = [(pitch("C", 5), 0.25), (pitch("Eb", 5), 0.25), (pitch("G", 5), 0.25),
               (pitch("Ab", 5), 0.25), (pitch("G", 5), 0.5), (pitch("F", 5), 0.5),
               (pitch("Eb", 5), 0.5), (pitch("C", 5), 0.75)]
    t = 4 * bar + 0.25
    for p, d in melody2:
        add_note(clarinet, p, t, d * (bar / 4) * 0.95, 80)
        t += d * (bar / 4)

    pm.instruments.extend([piano, clarinet, cello])
    return pm


# ----- The Werewolf ---------------------------------------------------
def compose_wolf() -> pretty_midi.PrettyMIDI:
    """G dorian, 6/8 feel — Saint-Saëns "Danse Macabre" lineage.
    Solo violin tritone interval (G–C#), pizz strings, distant horn howl."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=126)
    # 6/8 bar at 126 dotted-quarter = 60/126*2 = 0.952 s per bar — short bars
    bar = 60.0 / 126 * 2

    violin = new_inst(GM["violin"])
    pizz = new_inst(GM["pizzicato"])
    horn = new_inst(GM["frenchhorn"])

    # 16 bars (~15 s)
    for b in range(16):
        t = b * bar
        # pizz bass alternates G2 / D3 — open fifth
        add_note(pizz, pitch("G", 2) if b % 2 == 0 else pitch("D", 3),
                 t, bar * 0.4, 60)
        # violin tritone stab on the offbeat of bar 1, 5, 9, 13
        if b % 4 == 0:
            add_note(violin, pitch("G", 4), t + bar * 0.3, bar * 0.15, 75)
            add_note(violin, pitch("C#", 5), t + bar * 0.45, bar * 0.4, 80)

    # violin melody in G dorian over bars 4–15 — descending then ascending
    g_dor = scale("G", "dorian", 4)  # G A Bb C D E F (G)
    motif = [g_dor[0], g_dor[2], g_dor[4], g_dor[3], g_dor[1], g_dor[2],
             g_dor[0], g_dor[5], g_dor[4], g_dor[2], g_dor[0]]
    t = 4 * bar
    for p in motif:
        add_note(violin, p, t, bar * 0.45, 70)
        t += bar * 0.5

    # horn howl — long G3 → A3 → Bb3 portamento at bar 12+
    add_note(horn, pitch("G", 3), 12 * bar, bar * 1.8, 50)
    add_note(horn, pitch("A", 3), 13.8 * bar, bar * 1.2, 55)
    add_note(horn, pitch("Bb", 3), 15 * bar, bar * 1.0, 60)

    pm.instruments.extend([violin, pizz, horn])
    return pm


# ----- Griffin (invisibility) ----------------------------------------
def compose_griffin() -> pretty_midi.PrettyMIDI:
    """Whole-tone — Debussy "Nuages". Floating, no tonal centre.
    Flute + harp + ppp strings."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=58)
    bar = 60.0 / 58 * 4

    flute = new_inst(GM["flute"])
    harp = new_inst(GM["harp"])
    strings = new_inst(GM["slow_strings"])

    wt = scale("C", "whole_tone", 4)  # C D E F# G# A#

    # 8 bars, harp gentle arpeggio of whole-tone fragments
    for b in range(8):
        t = b * bar
        # harp arpeggio (whole-tone)
        arp = [wt[i % len(wt)] for i in range(b, b + 6)]
        add_arpeggio(harp, arp, t, bar, 0.32, 45)
        # ppp string cluster on alt bars
        if b % 2 == 0:
            add_chord(strings, [wt[0], wt[2], wt[4]], t, bar, 30)
        else:
            add_chord(strings, [wt[1], wt[3], wt[5]], t, bar, 30)

    # flute melody — drifting whole-tone fragments
    flute_melody = [
        (wt[3], 1.2), (wt[5], 1.4), (wt[2], 1.6),
        (wt[4], 1.2), (wt[1], 1.6), (wt[3], 1.4),
        (wt[0], 1.8), (wt[2], 2.0),
    ]
    t = 1.0
    for p, d in flute_melody:
        add_note(flute, p, t, d, 55)
        t += d * 0.95

    pm.instruments.extend([flute, harp, strings])
    return pm


# ----- Carmilla -------------------------------------------------------
def compose_carmilla() -> pretty_midi.PrettyMIDI:
    """G♭ major nocturne — Chopin op.9/2 lineage with chromatic
    descending bass. Piano alone, then with a pizzicato cello pulse."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=72)
    bar = 60.0 / 72 * 4

    piano = new_inst(GM["piano"])
    cello = new_inst(GM["pizzicato"])

    # 8 bars
    bass_chrom = ["Gb", "F", "E", "Eb", "D", "Db", "C", "B"]
    for b in range(8):
        t = b * bar
        # cello pizz on the chromatic descent — once per bar
        add_note(cello, pitch(bass_chrom[b], 2), t, bar * 0.9, 55)
        # piano left hand: octave on the bass + open fifth above
        add_note(piano, pitch(bass_chrom[b], 3), t, bar * 0.95, 45)
        add_note(piano, pitch(bass_chrom[b], 4), t, bar * 0.95, 40)
    # piano right-hand melody — flowing G♭ pentatonic with embellishments
    gb_pent = [pitch("Gb", 5), pitch("Ab", 5), pitch("Bb", 5),
               pitch("Db", 6), pitch("Eb", 6)]
    rh = [
        (gb_pent[2], 1.0), (gb_pent[1], 0.5), (gb_pent[3], 1.5),
        (gb_pent[2], 0.75), (gb_pent[0], 0.75), (gb_pent[1], 1.0),
        (gb_pent[4], 1.25), (gb_pent[3], 0.75), (gb_pent[2], 1.0),
        (gb_pent[1], 0.75), (gb_pent[0], 1.0), (gb_pent[2], 0.5),
        (gb_pent[1], 1.0), (gb_pent[0], 1.5),
    ]
    t = 0.5
    for p, d in rh:
        add_note(piano, p, t, d * 0.95, 65)
        t += d

    pm.instruments.extend([piano, cello])
    return pm


# ----- Erik (Phantom) -------------------------------------------------
def compose_erik() -> pretty_midi.PrettyMIDI:
    """B minor, organ-led descent — Tchaikovsky Pathétique I ancestry,
    Phantom of the Opera vibe without quoting it. Pipe organ + strings."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=56)
    bar = 60.0 / 56 * 4

    organ = new_inst(GM["church_organ"])
    strings = new_inst(GM["strings"])
    timpani = new_inst(GM["timpani"])

    # 6 bars (~25 s). i — iv — V7 — i — bVI — V7 → i (cadence)
    prog = [
        chord("B", "min", 3),
        chord("E", "min", 3),
        chord("F#", "dom7", 3),
        chord("B", "min", 3),
        chord("G", "maj", 3),
        chord("F#", "dom7", 3),
    ]
    for b, c in enumerate(prog):
        t = b * bar
        add_chord(organ, c, t, bar, 70)
        # strings double the top voice an octave up
        add_chord(strings, [p + 12 for p in c[:2]], t, bar, 55)
        # timpani on beat 1
        add_note(timpani, pitch("B", 2), t, 0.4, 70)

    # bass pedal descent B → A → G → F# (organ pedal)
    descent = ["B", "A", "G", "F#"]
    for i, n in enumerate(descent * 2):
        add_note(organ, pitch(n, 2), (i * bar / 2), bar / 2, 80)

    pm.instruments.extend([organ, strings, timpani])
    return pm


# ----- Dorian Gray ----------------------------------------------------
def compose_dorian() -> pretty_midi.PrettyMIDI:
    """A waltz in D major that gradually picks up dissonance and shifts
    to D minor by the end. Ravel "La Valse" lineage."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=144)
    # 3/4, dotted-half = 60/144 * 3 = 1.25 s per bar
    bar = 60.0 / 144 * 3

    strings = new_inst(GM["strings"])
    harp = new_inst(GM["harp"])
    cello = new_inst(GM["cello"])
    oboe = new_inst(GM["oboe"])

    # 16 bars
    for b in range(16):
        t = b * bar
        # waltz oompah-pah — bass on 1, chord on 2 and 3
        if b < 10:
            root_n, third_n, fifth_n = "D", "F#", "A"
            kind = "maj"
        else:
            # gradual collapse — modal mixture
            if b < 13:
                root_n, third_n, fifth_n = "D", "F", "A"
                kind = "min"
            else:
                root_n, third_n, fifth_n = "D", "F", "Ab"  # Db tritone substitution
                kind = "dim"
        add_note(cello, pitch(root_n, 2), t, bar / 3, 60)
        add_chord(strings, [pitch(third_n, 3), pitch(fifth_n, 3)],
                  t + bar / 3, bar / 3, 50)
        add_chord(strings, [pitch(third_n, 3), pitch(fifth_n, 3)],
                  t + 2 * bar / 3, bar / 3, 50)

    # oboe melody — graceful at first, twisted by bar 10
    nice = [pitch("F#", 5), pitch("A", 5), pitch("D", 6), pitch("A", 5),
            pitch("F#", 5), pitch("E", 5), pitch("D", 5),
            pitch("A", 4), pitch("F#", 5)]
    twisted = [pitch("F", 5), pitch("Ab", 5), pitch("D", 6), pitch("Ab", 5),
               pitch("F", 5), pitch("Eb", 5), pitch("D", 5),
               pitch("A", 4), pitch("F", 5)]
    t = 0
    for i, p in enumerate(nice * 1 + twisted):
        d = bar * 0.85
        add_note(oboe, p, t, d, 70 if i < 9 else 80)
        t += bar

    pm.instruments.extend([strings, harp, cello, oboe])
    return pm


# ----- Varney (penny dreadful pulp) ----------------------------------
def compose_varney() -> pretty_midi.PrettyMIDI:
    """G minor agitato, triplet propulsion — Schubert "Erlkönig" lineage.
    Piano triplets + cello agitato + brief flute terror motif."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=132)
    bar = 60.0 / 132 * 4

    piano = new_inst(GM["piano"])
    cello = new_inst(GM["cello"])
    flute = new_inst(GM["flute"])

    # 8 bars — relentless triplet eighths on G in piano right hand
    triplet = bar / 12   # 12 triplet eighths per 4/4 bar
    for b in range(8):
        for t_idx in range(12):
            t = b * bar + t_idx * triplet
            p = pitch("G", 4) if t_idx % 2 == 0 else pitch("Bb", 4)
            add_note(piano, p, t, triplet * 0.9, 55)
        # piano left hand bass — i — V — i — V pattern
        bass_n = "G" if b % 2 == 0 else "D"
        add_note(piano, pitch(bass_n, 2), b * bar, bar, 60)

    # cello agitato — three rising scale fragments
    g_min = scale("G", "minor", 3)
    cello_fragments = [g_min[:5], g_min[2:7], g_min[:6]]
    t = 0
    for frag in cello_fragments:
        for p in frag:
            add_note(cello, p, t, bar / 6, 70)
            t += bar / 5

    # flute terror motif at bars 5–7
    add_note(flute, pitch("D", 6), 4 * bar, bar * 0.5, 85)
    add_note(flute, pitch("Eb", 6), 4.5 * bar, bar * 0.5, 90)
    add_note(flute, pitch("D", 6), 5 * bar, bar * 1.5, 80)
    add_note(flute, pitch("C", 6), 6.5 * bar, bar * 1.0, 75)

    pm.instruments.extend([piano, cello, flute])
    return pm


# ----- Sweeney Todd ---------------------------------------------------
def compose_sweeney() -> pretty_midi.PrettyMIDI:
    """F♯ minor industrial. Minor 2nd stab (F♯→G) as razor motif.
    Low piano + cello + percussive timpani steam-hammer."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=96)
    bar = 60.0 / 96 * 4

    piano = new_inst(GM["piano"])
    cello = new_inst(GM["cello"])
    timpani = new_inst(GM["timpani"])
    organ = new_inst(GM["reed_organ"])

    # 8 bars
    for b in range(8):
        t = b * bar
        # steam-hammer timpani on beats 1 and 3
        add_note(timpani, pitch("F#", 2), t, 0.3, 90)
        add_note(timpani, pitch("F#", 2), t + bar / 2, 0.3, 75)
        # cello pedal F♯ low
        add_note(cello, pitch("F#", 2), t, bar * 0.95, 55)

    # piano: razor motif F♯→G minor 2nd stab (chord clusters)
    razor = [
        (chord("F#", "min", 4), 0.0),
        ([pitch("G", 4), pitch("Bb", 4), pitch("D", 5)], 0.4),
        (chord("F#", "min", 4), 1.5),
        ([pitch("G", 4), pitch("Bb", 4), pitch("D", 5)], 1.9),
    ]
    for b in range(0, 8, 2):
        for c, offset in razor:
            add_chord(piano, c, b * bar + offset, 0.35, 75)

    # organ sustained F♯ minor through-out, very dark
    add_chord(organ, chord("F#", "min", 3), 0, bar * 8, 40)

    pm.instruments.extend([piano, cello, timpani, organ])
    return pm


# ----- Spring-Heeled Jack ---------------------------------------------
def compose_jack() -> pretty_midi.PrettyMIDI:
    """Bitonal C major + F♯ major (Petrushka chord). 5/8 limp meter.
    Piano + brass stabs + clarinet skitter."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=120)
    # 5/8 with eighth = 60/120/2 = 0.25s, bar = 5 * 0.25 = 1.25 s
    eighth = 60.0 / 120 / 2
    bar = 5 * eighth

    piano = new_inst(GM["piano"])
    brass = new_inst(GM["brass"])
    clarinet = new_inst(GM["clarinet"])

    # 16 bars
    for b in range(16):
        t = b * bar
        # Petrushka chord — C major triad LH + F♯ major triad RH stacked
        c_maj = chord("C", "maj", 3)
        fs_maj = chord("F#", "maj", 4)
        # accent first eighth of each bar
        add_chord(piano, c_maj, t, eighth * 0.9, 80)
        add_chord(piano, fs_maj, t, eighth * 0.9, 70)
        # second cell (off beats 4 and 5) — short stabs
        add_chord(piano, c_maj[:2], t + 3 * eighth, eighth * 0.4, 55)
        add_chord(piano, fs_maj[:2], t + 4 * eighth, eighth * 0.4, 50)
        # brass stab on first eighth every 2 bars
        if b % 2 == 0:
            add_note(brass, pitch("C", 4), t, eighth * 1.5, 85)
            add_note(brass, pitch("F#", 4), t, eighth * 1.5, 80)
    # clarinet skitter — chromatic flurry every 4 bars
    chrom = [pitch("C", 6) + i for i in range(0, 12, 1)]
    for b in (4, 8, 12):
        t = b * bar
        for i, p in enumerate(chrom[:8]):
            add_note(clarinet, p, t + i * eighth * 0.5, eighth * 0.4, 75)

    pm.instruments.extend([piano, brass, clarinet])
    return pm


# ----- The Golem ------------------------------------------------------
def compose_golem() -> pretty_midi.PrettyMIDI:
    """D dorian over a slow ostinato — Bach Toccata D minor lineage.
    Pipe organ + slow-strings + low piano clusters (clay-shaping)."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=64)
    bar = 60.0 / 64 * 4

    organ = new_inst(GM["church_organ"])
    piano = new_inst(GM["piano"])
    strings = new_inst(GM["slow_strings"])

    d_dor = scale("D", "dorian", 3)  # D E F G A B C

    # 8 bars
    for b in range(8):
        t = b * bar
        # organ pedal D on each downbeat (one bar each)
        add_note(organ, pitch("D", 2), t, bar, 75)
        # organ chords on beats 1 and 3 — i, iv, i, V7, i, bVII, i, V7
        prog = ["min", "min", "min", "dom7", "min", "maj", "min", "dom7"]
        roots = ["D", "G", "D", "A", "D", "C", "D", "A"]
        add_chord(organ, chord(roots[b], prog[b], 3), t, bar * 0.95, 60)
        # piano: clay-shaping cluster (minor 2nd grinding) on beat 4
        add_chord(piano, [pitch("D", 3), pitch("Eb", 3)],
                  t + bar * 0.75, bar * 0.2, 55)

    # strings: ascending dorian scale across bars 4–7
    for i, p in enumerate(d_dor + [d_dor[0] + 12]):
        add_note(strings, p, (4 + i * 0.5) * bar, bar * 0.5, 50)

    pm.instruments.extend([organ, piano, strings])
    return pm


# ----- Horseman -------------------------------------------------------
def compose_horseman() -> pretty_midi.PrettyMIDI:
    """E♭ minor gallop with Dies Irae fragment — Berlioz Sym. Fantastique.
    Bassoon + brass + timpani gallop."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=108)
    bar = 60.0 / 108 * 4

    bassoon = new_inst(GM["bassoon"])
    brass = new_inst(GM["brass"])
    horn = new_inst(GM["frenchhorn"])
    timpani = new_inst(GM["timpani"])

    # 8 bars
    for b in range(8):
        t = b * bar
        # gallop rhythm dotted-quarter + eighth + quarter + quarter in timpani
        gallop = [(0.0, 0.45), (0.45, 0.15), (0.5, 0.25), (0.75, 0.25)]
        for (rel_t, rel_d) in gallop:
            add_note(timpani, pitch("Eb", 2), t + rel_t * bar, rel_d * bar, 75)
        # bassoon plays Dies Irae fragment (transposed to E♭ minor)
        # original Dies Irae: A G A F G E F D
        # transposed start on Eb: Eb Db Eb Cb Db Bb Cb Ab
        dies = [(pitch("Eb", 3), 0.5), (pitch("Db", 3), 0.5),
                (pitch("Eb", 3), 0.5), (pitch("Cb", 3), 0.5),
                (pitch("Db", 3), 0.5), (pitch("Bb", 2), 0.5),
                (pitch("Cb", 3), 0.5), (pitch("Ab", 2), 1.0)]
        if b in (0, 4):
            t2 = t
            for p, d in dies:
                add_note(bassoon, p, t2, d * bar * 0.95, 75)
                t2 += d * bar
        # brass swell on bar 3 and bar 7
        if b in (3, 7):
            add_chord(brass, chord("Eb", "min", 4), t, bar, 70)
        # horn: long held Bb (dominant pedal) bars 5-7
        if b in (5, 6, 7):
            add_note(horn, pitch("Bb", 3), t, bar, 55)

    pm.instruments.extend([bassoon, brass, horn, timpani])
    return pm


# ----- Cabinet (hub) --------------------------------------------------
def compose_cabinet() -> pretty_midi.PrettyMIDI:
    """G minor adagio — Albinoni Adagio lineage. Slow swelling pipe
    organ + violin solo over pad. The library at night."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=44)
    bar = 60.0 / 44 * 4

    organ = new_inst(GM["church_organ"])
    violin = new_inst(GM["violin"])
    cello = new_inst(GM["cello"])
    pad = new_inst(GM["synth_pad"])

    # 8 bars (~44 s)
    prog = [
        chord("G", "min", 3),
        chord("D", "min", 3),
        chord("Eb", "maj", 3),
        chord("F", "maj", 3),
        chord("Bb", "maj", 3),
        chord("Cm", "min", 3) if False else chord("C", "min", 3),
        chord("D", "dom7", 3),
        chord("G", "min", 3),
    ]
    for b, c in enumerate(prog):
        t = b * bar
        add_chord(organ, c, t, bar, 50)
        add_chord(pad, [p + 12 for p in c[:2]], t, bar, 35)
        add_note(cello, c[0] - 12, t, bar, 45)

    # violin solo — long, melancholy
    g_min = scale("G", "minor", 4)
    solo = [
        (g_min[4], 2.0), (g_min[3], 1.0), (g_min[2], 1.0),
        (g_min[4], 2.0), (g_min[5], 1.5), (g_min[4], 1.5),
        (g_min[3], 2.5), (g_min[1], 1.5), (g_min[2], 2.0),
        (g_min[0], 3.0),
    ]
    t = 0.5
    for p, d in solo:
        add_note(violin, p, t, d, 60)
        t += d * 0.9

    pm.instruments.extend([organ, violin, cello, pad])
    return pm


# ===================================================================
#  TRANSITION STINGERS — three-phase cinematic stabs (~2.8 s)
#
# Each stinger has the structure of a film-trailer sting:
#
#   PRE-IMPACT (0.0 – 0.65 s)  reverse-cymbal whoosh + tremolo string
#                              crescendo + breath of low brass
#   IMPACT     (0.65 – 1.05 s) the chord/note hit + percussion +
#                              orchestra-hit punch + ride/china/gong
#   TAIL       (1.05 – 2.8 s)  resonant pad + low pedal + reverb decay
#
# All three phases share the monster's key and motif. The reverse-cymbal
# (GM 119) gives the cinematic "swoosh-into" feel that pure orchestral
# hits lack.
# ===================================================================

# Pre-impact swell and tail are shared across all stingers — built here
def _pre_impact(inst_objs: dict, tonic_pitch: int) -> None:
    """0.0 → 0.65 s pre-impact whoosh + string tremolo crescendo."""
    # Reverse cymbal swell — ramp velocity 30 → 100 by holding one long note
    add_note(inst_objs["whoosh"], pitch("C", 4), 0.0, 0.65, 90)
    # Tremolo strings climbing fifth crescendo (perceived as a build)
    add_note(inst_objs["tremolo"], tonic_pitch, 0.05, 0.6, 50)
    add_note(inst_objs["tremolo"], tonic_pitch + 7, 0.05, 0.6, 50)
    add_note(inst_objs["tremolo"], tonic_pitch + 12, 0.05, 0.6, 50)


def _impact_percussion(inst_objs: dict, tonic_pitch: int,
                       at: float = 0.65) -> None:
    """The hit cluster — orchestra hit + crash + low kick."""
    add_chord(inst_objs["hit"], [tonic_pitch, tonic_pitch + 12], at,
              0.5, 115)
    add_drum(inst_objs["drum"], DRUM["crash"], at, 0.3, 115)
    add_drum(inst_objs["drum"], DRUM["kick"], at, 0.3, 120)


def _tail(inst_objs: dict, tonic_pitch: int, at: float = 1.05,
          dur: float = 1.7) -> None:
    """1.05 → 2.75 s resonant pad + low pedal."""
    add_chord(inst_objs["pad"], [tonic_pitch - 12, tonic_pitch - 5,
                                  tonic_pitch], at, dur, 65)
    add_note(inst_objs["pedal"], tonic_pitch - 24, at, dur, 75)


def add_drum(inst: pretty_midi.Instrument, note_num: int, start: float,
             dur: float, velocity: int = 100) -> None:
    """Drum hit on channel 10. We set is_drum on the instrument."""
    inst.notes.append(pretty_midi.Note(
        velocity=max(1, min(127, velocity)),
        pitch=note_num, start=start, end=start + dur,
    ))


def _build_stinger_base(tonic: str, octave: int = 3) -> tuple:
    """Make the standard pre/post instruments + return them."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=120)
    drum = pretty_midi.Instrument(program=0, name="drum", is_drum=True)
    inst_objs = {
        "whoosh":  new_inst(GM["rev_cymbal"]),
        "tremolo": new_inst(GM["tremolo_str"]),
        "hit":     new_inst(GM["orchestra_hit"]),
        "pad":     new_inst(GM["synth_pad"]),
        "pedal":   new_inst(GM["contrabass"]),
        "drum":    drum,
    }
    tonic_pitch = pitch(tonic, octave + 1)  # impact tonic at 4th-octave-ish
    _pre_impact(inst_objs, tonic_pitch)
    _impact_percussion(inst_objs, tonic_pitch)
    _tail(inst_objs, tonic_pitch)
    return pm, inst_objs, tonic_pitch


def stinger(notes_and_chords: list, instruments: dict, total_dur: float
            ) -> pretty_midi.PrettyMIDI:
    """Legacy helper preserved for compatibility (no longer used)."""
    pm = pretty_midi.PrettyMIDI(initial_tempo=120)
    inst_objs = {name: new_inst(prog) for name, prog in instruments.items()}
    for name, pitches, start, dur, vel in notes_and_chords:
        add_chord(inst_objs[name], pitches, start, dur, vel)
    pm.instruments.extend(inst_objs.values())
    return pm


def stinger_dracula() -> pretty_midi.PrettyMIDI:
    """D minor: tritone B♭→E hit + church-organ chord + cathedral tail."""
    pm, obj, tonic = _build_stinger_base("D", 3)
    organ = new_inst(GM["church_organ"])
    choir = new_inst(GM["voice_oohs"])
    # Tritone leitmotif on the impact
    add_note(choir, pitch("Bb", 4), 0.4, 0.4, 90)
    add_note(choir, pitch("E", 5), 0.65, 0.6, 100)
    # Organ Neapolitan flourish — i → bII at the impact
    add_chord(organ, chord("D", "min", 3), 0.65, 0.7, 110)
    add_chord(organ, chord("Eb", "maj", 3), 1.05, 1.4, 90)
    # Tail: choir holding the resolution
    add_note(choir, pitch("D", 4), 1.05, 1.6, 80)
    pm.instruments.extend(list(obj.values()) + [organ, choir])
    return pm


def stinger_creature() -> pretty_midi.PrettyMIDI:
    """D minor: massive open-fifth drop + thunder."""
    pm, obj, tonic = _build_stinger_base("D", 3)
    horn = new_inst(GM["frenchhorn"])
    cello = new_inst(GM["cello"])
    # Pre-impact horn breath
    add_note(horn, pitch("D", 3), 0.2, 0.45, 75)
    # Impact: power-chord open fifth on D
    add_chord(cello, [pitch("D", 3), pitch("A", 3)], 0.65, 0.7, 110)
    # Extra thunder timpani roll
    add_drum(obj["drum"], DRUM["low_tom"], 0.7, 0.2, 110)
    add_drum(obj["drum"], DRUM["low_tom"], 0.85, 0.2, 100)
    add_drum(obj["drum"], DRUM["low_tom"], 1.0, 0.2, 90)
    # Horn cry tail
    add_note(horn, pitch("F", 4), 1.05, 1.6, 70)
    pm.instruments.extend(list(obj.values()) + [horn, cello])
    return pm


def stinger_hyde() -> pretty_midi.PrettyMIDI:
    """C major dissolves into C minor cluster — chemical transformation."""
    pm, obj, tonic = _build_stinger_base("C", 3)
    piano = new_inst(GM["piano"])
    clarinet = new_inst(GM["clarinet"])
    # Pre-impact: descending C major piano arpeggio (Jekyll-side)
    nice = [pitch("C", 6), pitch("G", 5), pitch("E", 5), pitch("C", 5)]
    for i, p in enumerate(nice):
        add_note(piano, p, 0.15 + i * 0.1, 0.25, 70)
    # Impact: C minor cluster with chromatic slip
    add_chord(piano, chord("C", "min", 4) + [pitch("Db", 4)], 0.65, 0.6, 110)
    add_note(clarinet, pitch("Eb", 5), 0.65, 0.8, 95)
    # Tail: cello pedal C, clarinet bend to Db (Phrygian colour)
    add_note(clarinet, pitch("Db", 5), 1.3, 1.4, 80)
    pm.instruments.extend(list(obj.values()) + [piano, clarinet])
    return pm


def stinger_wolf() -> pretty_midi.PrettyMIDI:
    """G dorian: tritone violin stab → horn howl into the night."""
    pm, obj, tonic = _build_stinger_base("G", 3)
    violin = new_inst(GM["violin"])
    horn = new_inst(GM["frenchhorn"])
    pizz = new_inst(GM["pizzicato"])
    # Pre-impact: pizz galloping toward the hit
    for i in range(4):
        add_note(pizz, pitch("G", 2), 0.15 + i * 0.12, 0.1, 80)
    # Impact: tritone violin stab G–C#
    add_note(violin, pitch("G", 5), 0.65, 0.3, 115)
    add_note(violin, pitch("C#", 6), 0.7, 0.4, 115)
    # Tail: long horn howl rising semitone
    add_note(horn, pitch("G", 3), 0.9, 1.0, 75)
    add_note(horn, pitch("A", 3), 1.7, 0.8, 85)
    add_note(horn, pitch("Bb", 3), 2.2, 0.6, 95)
    pm.instruments.extend(list(obj.values()) + [violin, horn, pizz])
    return pm


def stinger_griffin() -> pretty_midi.PrettyMIDI:
    """Whole-tone harp ascent + ppp flute reveals the invisible."""
    pm, obj, tonic = _build_stinger_base("C", 3)
    harp = new_inst(GM["harp"])
    flute = new_inst(GM["flute"])
    wt = scale("C", "whole_tone", 4)
    # Pre-impact: rising whole-tone harp arpeggio
    for i, p in enumerate(wt + [p + 12 for p in wt[:3]]):
        add_note(harp, p, 0.05 + i * 0.06, 0.25, 65)
    # Impact: whole-tone cluster bloom
    add_chord(harp, [wt[0], wt[2], wt[4], wt[0] + 12], 0.65, 0.6, 95)
    add_note(flute, pitch("C", 6), 0.65, 0.9, 85)
    # Tail: flute hovering on D (whole-tone partner)
    add_note(flute, pitch("D", 6), 1.4, 1.3, 75)
    pm.instruments.extend(list(obj.values()) + [harp, flute])
    return pm


def stinger_carmilla() -> pretty_midi.PrettyMIDI:
    """G♭ major nocturne ascent + harp + pizzicato tail."""
    pm, obj, tonic = _build_stinger_base("Gb", 3)
    piano = new_inst(GM["piano"])
    harp = new_inst(GM["harp"])
    pizz = new_inst(GM["pizzicato"])
    # Pre-impact: ascending G♭ pentatonic harp
    arp = [pitch("Gb", 3), pitch("Bb", 3), pitch("Db", 4),
           pitch("Gb", 4), pitch("Bb", 4), pitch("Db", 5), pitch("Gb", 5)]
    for i, p in enumerate(arp):
        add_note(harp, p, 0.05 + i * 0.08, 0.4, 70)
    # Impact: piano G♭ major chord with added 9
    add_chord(piano, chord("Gb", "maj", 4) + [pitch("Ab", 5)], 0.65, 0.7, 100)
    # Tail: pizz Gb1 bass + held flute-like top G♭
    add_note(pizz, pitch("Gb", 2), 0.65, 1.8, 75)
    add_note(piano, pitch("Gb", 5), 1.3, 1.5, 65)
    pm.instruments.extend(list(obj.values()) + [piano, harp, pizz])
    return pm


def stinger_erik() -> pretty_midi.PrettyMIDI:
    """B minor: pipe-organ V7→i cadence + operatic gong."""
    pm, obj, tonic = _build_stinger_base("B", 3)
    organ = new_inst(GM["church_organ"])
    timpani = new_inst(GM["timpani"])
    # Pre-impact: dominant 7th swell
    add_chord(organ, chord("F#", "dom7", 3), 0.15, 0.5, 90)
    # Impact: minor i cadence + gong
    add_chord(organ, chord("B", "min", 3), 0.65, 1.5, 115)
    add_drum(obj["drum"], DRUM["gong"], 0.65, 1.0, 115)
    add_drum(obj["drum"], DRUM["china"], 0.65, 0.5, 100)
    # Tail: organ pedal B
    add_note(organ, pitch("B", 2), 0.65, 2.0, 95)
    # Timpani heart-thump on tail
    add_note(timpani, pitch("B", 2), 1.4, 0.4, 85)
    add_note(timpani, pitch("F#", 2), 2.0, 0.4, 75)
    pm.instruments.extend(list(obj.values()) + [organ, timpani])
    return pm


def stinger_dorian() -> pretty_midi.PrettyMIDI:
    """Waltz cadence D maj → A7 → D min (the picture turns)."""
    pm, obj, tonic = _build_stinger_base("D", 3)
    strings = new_inst(GM["strings"])
    oboe = new_inst(GM["oboe"])
    # Pre-impact: oboe descending D major thirds (the elegant social Dorian)
    add_note(oboe, pitch("F#", 5), 0.15, 0.2, 80)
    add_note(oboe, pitch("E", 5), 0.32, 0.2, 80)
    add_note(oboe, pitch("D", 5), 0.5, 0.15, 80)
    # Impact: V7 → i (D minor — the portrait's truth)
    add_chord(strings, chord("A", "dom7", 4), 0.65, 0.35, 110)
    add_chord(strings, chord("D", "min", 4), 1.0, 1.2, 115)
    add_note(oboe, pitch("F", 5), 1.0, 1.4, 95)
    pm.instruments.extend(list(obj.values()) + [strings, oboe])
    return pm


def stinger_varney() -> pretty_midi.PrettyMIDI:
    """G minor agitato triplet flurry crashing on F♯ dim7."""
    pm, obj, tonic = _build_stinger_base("G", 3)
    piano = new_inst(GM["piano"])
    flute = new_inst(GM["flute"])
    g_min = scale("G", "minor", 4)
    # Pre-impact: ascending triplet flurry
    for i, p in enumerate(g_min + [g_min[0] + 12]):
        add_note(piano, p, 0.05 + i * 0.07, 0.15, 75 + i * 3)
    # Impact: diminished crash + flute scream
    add_chord(piano, chord("F#", "dim7", 3), 0.65, 0.9, 115)
    add_note(flute, pitch("D", 6), 0.65, 0.5, 110)
    add_note(flute, pitch("Eb", 6), 1.1, 0.5, 105)
    # Tail: piano resolution to G minor + flute final
    add_chord(piano, chord("G", "min", 3), 1.6, 1.2, 90)
    add_note(flute, pitch("G", 5), 1.6, 1.2, 75)
    pm.instruments.extend(list(obj.values()) + [piano, flute])
    return pm


def stinger_sweeney() -> pretty_midi.PrettyMIDI:
    """Minor 2nd razor stab + steam-hammer + steel ride."""
    pm, obj, tonic = _build_stinger_base("F#", 3)
    piano = new_inst(GM["piano"])
    organ = new_inst(GM["reed_organ"])
    # Pre-impact: two quick razor stabs F♯→G m2
    add_note(piano, pitch("F#", 5), 0.15, 0.12, 100)
    add_note(piano, pitch("G", 5), 0.27, 0.12, 105)
    add_note(piano, pitch("F#", 5), 0.4, 0.12, 110)
    add_note(piano, pitch("G", 5), 0.52, 0.12, 115)
    # Impact: piano F♯ dim7 crash + steam-hammer
    add_chord(piano, chord("F#", "dim7", 3), 0.65, 0.8, 115)
    add_drum(obj["drum"], DRUM["snare"], 0.65, 0.2, 115)
    add_drum(obj["drum"], DRUM["china"], 0.65, 0.5, 105)
    # Tail: reed-organ F♯ minor low pedal grind
    add_chord(organ, chord("F#", "min", 3), 1.0, 1.6, 80)
    pm.instruments.extend(list(obj.values()) + [piano, organ])
    return pm


def stinger_jack() -> pretty_midi.PrettyMIDI:
    """Petrushka chord (C maj + F♯ maj bitonal) + brass + 5/8 stutter."""
    pm, obj, tonic = _build_stinger_base("C", 3)
    piano = new_inst(GM["piano"])
    brass = new_inst(GM["brass"])
    clarinet = new_inst(GM["clarinet"])
    # Pre-impact: clarinet rising chromatic scuttle
    chrom = [pitch("C", 5) + i for i in range(0, 8)]
    for i, p in enumerate(chrom):
        add_note(clarinet, p, 0.05 + i * 0.07, 0.12, 80)
    # Impact: Petrushka stab — C major LH + F♯ major RH
    add_chord(piano, chord("C", "maj", 3) + chord("F#", "maj", 4),
              0.65, 0.6, 115)
    add_chord(brass, [pitch("C", 4), pitch("F#", 4),
                      pitch("E", 4), pitch("A#", 4)], 0.65, 0.5, 110)
    add_drum(obj["drum"], DRUM["snare"], 0.65, 0.2, 110)
    # Tail: stuttered 5/8 echo of the chord (the leap-and-vanish feel)
    add_chord(piano, chord("C", "maj", 3) + chord("F#", "maj", 4),
              1.45, 0.3, 90)
    add_chord(brass, [pitch("C", 4), pitch("F#", 4)], 1.45, 0.3, 95)
    pm.instruments.extend(list(obj.values()) + [piano, brass, clarinet])
    return pm


def stinger_golem() -> pretty_midi.PrettyMIDI:
    """D dorian organ-pedal cathedral with minor 2nd grind."""
    pm, obj, tonic = _build_stinger_base("D", 3)
    organ = new_inst(GM["church_organ"])
    piano = new_inst(GM["piano"])
    # Pre-impact: organ ascending dorian fragment
    d_dor = scale("D", "dorian", 4)
    for i, p in enumerate(d_dor[:4]):
        add_note(organ, p, 0.1 + i * 0.12, 0.4, 70)
    # Impact: massive D minor + Eb cluster (the clay-shaping grind)
    add_chord(organ, chord("D", "min", 3) + [pitch("Eb", 4)],
              0.65, 1.8, 115)
    add_note(organ, pitch("D", 2), 0.65, 2.0, 110)
    add_chord(piano, [pitch("D", 3), pitch("Eb", 3)], 0.65, 1.4, 95)
    # Tail gong
    add_drum(obj["drum"], DRUM["gong"], 0.65, 1.8, 110)
    pm.instruments.extend(list(obj.values()) + [organ, piano])
    return pm


def stinger_horseman() -> pretty_midi.PrettyMIDI:
    """Dies Irae fragment in E♭ minor + gallop + brass swell + cymbal."""
    pm, obj, tonic = _build_stinger_base("Eb", 3)
    bassoon = new_inst(GM["bassoon"])
    brass = new_inst(GM["brass"])
    horn = new_inst(GM["frenchhorn"])
    # Pre-impact: gallop building
    gallop = [(0.10, 0.10), (0.22, 0.06), (0.30, 0.08),
              (0.42, 0.10), (0.54, 0.06)]
    for st, dr in gallop:
        add_drum(obj["drum"], DRUM["low_tom"], st, dr, 90)
    # Impact: brass crash + Dies Irae fragment in bassoon
    add_chord(brass, chord("Eb", "min", 4), 0.65, 0.7, 115)
    add_drum(obj["drum"], DRUM["crash"], 0.65, 0.4, 115)
    dies = [(pitch("Eb", 4), 0.65, 0.2),
            (pitch("Db", 4), 0.87, 0.2),
            (pitch("Eb", 4), 1.10, 0.3),
            (pitch("Cb", 4), 1.42, 0.4)]
    for p, st, dr in dies:
        add_note(bassoon, p, st, dr, 100)
    # Tail: horn pedal Bb (dominant) holding through the decay
    add_note(horn, pitch("Bb", 3), 1.0, 1.8, 80)
    pm.instruments.extend(list(obj.values()) + [bassoon, brass, horn])
    return pm


# ===================================================================
#  REGISTRY
# ===================================================================
@dataclass
class Track:
    slug: str
    kind: str           # "ambient" or "stinger" or "cabinet"
    compose: Callable[[], pretty_midi.PrettyMIDI]
    bitrate: str = "96k"


AMBIENT_TRACKS: list[Track] = [
    Track("dracula",     "ambient", compose_dracula),
    Track("the-creature","ambient", compose_creature),
    Track("hyde",        "ambient", compose_hyde),
    Track("the-wolf",    "ambient", compose_wolf),
    Track("griffin",     "ambient", compose_griffin),
    Track("carmilla",    "ambient", compose_carmilla),
    Track("erik",        "ambient", compose_erik),
    Track("dorian",      "ambient", compose_dorian),
    Track("varney",      "ambient", compose_varney),
    Track("sweeney",     "ambient", compose_sweeney),
    Track("jack",        "ambient", compose_jack),
    Track("golem",       "ambient", compose_golem),
    Track("horseman",    "ambient", compose_horseman),
    Track("cabinet",     "cabinet", compose_cabinet),
]

STINGER_TRACKS: list[Track] = [
    Track("dracula",     "stinger", stinger_dracula,    "96k"),
    Track("the-creature","stinger", stinger_creature,   "64k"),
    Track("hyde",        "stinger", stinger_hyde,       "64k"),
    Track("the-wolf",    "stinger", stinger_wolf,       "64k"),
    Track("griffin",     "stinger", stinger_griffin,    "64k"),
    Track("carmilla",    "stinger", stinger_carmilla,   "64k"),
    Track("erik",        "stinger", stinger_erik,       "64k"),
    Track("dorian",      "stinger", stinger_dorian,     "64k"),
    Track("varney",      "stinger", stinger_varney,     "64k"),
    Track("sweeney",     "stinger", stinger_sweeney,    "64k"),
    Track("jack",        "stinger", stinger_jack,       "64k"),
    Track("golem",       "stinger", stinger_golem,      "64k"),
    Track("horseman",    "stinger", stinger_horseman,   "64k"),
]


# ===================================================================
#  RENDER PIPELINE
# ===================================================================
def render_track(track: Track) -> Path:
    midi_path = MIDI_DIR / f"{track.kind}_{track.slug}.mid"
    wav_path = WAV_DIR / f"{track.kind}_{track.slug}.wav"
    if track.kind == "stinger":
        out_dir = STINGER_OUT
    else:
        out_dir = AMBIENT_OUT
    opus_path = out_dir / f"{track.slug}-{track.kind}.opus"
    # cabinet ambient gets a special slug
    if track.kind == "cabinet":
        opus_path = out_dir / "cabinet-ambient.opus"

    # 1. compose → MIDI
    pm = track.compose()
    pm.write(str(midi_path))

    # 2. MIDI → WAV via FluidSynth (cinematic: bigger room, longer tail)
    cmd_fs = [
        str(FLUIDSYNTH),
        "-ni",                  # no shell, no interactive
        "-F", str(wav_path),    # render to file
        "-r", "44100",          # sample rate
        "-g", "0.9" if track.kind == "stinger" else "0.75",  # stingers hotter
        "-o", "synth.reverb.active=1",
        "-o", "synth.reverb.room-size=0.92" if track.kind == "stinger" else "synth.reverb.room-size=0.8",
        "-o", "synth.reverb.damp=0.2" if track.kind == "stinger" else "synth.reverb.damp=0.4",
        "-o", "synth.reverb.width=1.0",
        "-o", "synth.reverb.level=0.85" if track.kind == "stinger" else "synth.reverb.level=0.6",
        "-o", "synth.chorus.active=1",
        "-o", "synth.chorus.level=0.5",
        "-o", "synth.chorus.depth=8",
        str(SOUNDFONT),
        str(midi_path),
    ]
    result = subprocess.run(cmd_fs, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"FluidSynth FAILED for {track.slug} ({track.kind})",
              file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        raise RuntimeError(f"FluidSynth render failed: {midi_path}")

    # 3. WAV → OPUS via ffmpeg
    # Stingers: add fade-in/out envelopes + normalize (loudnorm)
    # Ambients: leave dynamics alone (they're loops)
    if track.kind == "stinger":
        # Fade-in 60ms; trim to 3.0s then fade-out 700ms; then loudnorm.
        # atrim drops the long reverb tail at a controlled cutoff,
        # afade contours the envelope, loudnorm seats every stinger
        # at -14 LUFS so they punch through the ambient bed.
        afilter = (
            "afade=t=in:ss=0:d=0.06,"
            "atrim=end=3.0,asetpts=PTS-STARTPTS,"
            "afade=t=out:st=2.3:d=0.7,"
            "loudnorm=I=-14:TP=-1.0:LRA=11"
        )
    else:
        # Ambients: gentle loudness target so they don't drown the stinger
        afilter = "loudnorm=I=-20:TP=-2:LRA=14"

    cmd_ff = [
        "ffmpeg", "-y",
        "-loglevel", "error",
        "-i", str(wav_path),
        "-af", afilter,
        "-c:a", "libopus",
        "-b:a", track.bitrate,
        "-vbr", "on",
        "-application", "audio",
        str(opus_path),
    ]
    result = subprocess.run(cmd_ff, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ffmpeg FAILED for {track.slug}", file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        raise RuntimeError(f"ffmpeg encode failed: {wav_path}")

    return opus_path


def main():
    print(f"\n=== Cabinet of Shadows - Music Pipeline ===")
    print(f"SoundFont: {SOUNDFONT} ({SOUNDFONT.stat().st_size/1e6:.1f} MB)")
    print(f"Output: {AMBIENT_OUT}, {STINGER_OUT}\n")

    selected = sys.argv[1:]  # optional slug filter
    all_tracks = AMBIENT_TRACKS + STINGER_TRACKS
    if selected:
        all_tracks = [t for t in all_tracks
                      if any(s in f"{t.kind}_{t.slug}" for s in selected)]

    print(f"Rendering {len(all_tracks)} tracks...\n")
    successes, failures = [], []
    for t in all_tracks:
        try:
            out = render_track(t)
            sz = out.stat().st_size
            print(f"  [OK]{t.kind:8s} {t.slug:15s} → {out.name} ({sz/1024:.0f} KB)")
            successes.append((t, out))
        except Exception as e:
            print(f"  [FAIL]{t.kind:8s} {t.slug:15s} FAILED: {e}", file=sys.stderr)
            failures.append((t, e))

    print(f"\n=== Done: {len(successes)} OK, {len(failures)} failed ===")
    if failures:
        for t, e in failures:
            print(f"  - {t.kind}/{t.slug}: {e}", file=sys.stderr)
    if failures:
        sys.exit(1)


if __name__ == "__main__":
    main()
