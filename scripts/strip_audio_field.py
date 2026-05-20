"""One-shot cleanup: strip the now-dead `audio: { ... },` block from every
monster TS data file (EN + TH). Audio was removed from the site entirely,
so the Monster type no longer carries an `audio` field — keeping the data
would be a type error.

Pattern shape we're removing (across each .ts file):
    audio: {
      ambient: "/audio/ambient/<slug>-ambient.opus",
      sfx: {},
    },
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "lib" / "data" / "monsters"

# Match the audio property and its closing `},` (greedy across newlines but
# stopping at the first `},` that closes it). Two-space leading indent.
PATTERN = re.compile(
    r"^  audio: \{\n(?:    [^\n]*\n)*?  \},\n",
    re.MULTILINE,
)

changed = 0
for p in sorted(DATA.glob("*.ts")):
    src = p.read_text(encoding="utf-8")
    new = PATTERN.sub("", src)
    if new != src:
        p.write_text(new, encoding="utf-8")
        changed += 1
        print(f"  stripped audio from {p.name}")

print(f"\nChanged {changed} files")
