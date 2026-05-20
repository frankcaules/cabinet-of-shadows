"""
Convert all PNG image assets to WebP at high quality.

Targets: public/illustrations/**/*.png, public/sigils/*.png,
         public/transitions/*.png, public/visages/*.png (if any).

Strategy:
  - lossy WebP, quality 85 (visually lossless for painterly art)
  - method=6 (slowest, best compression)
  - keeps the original PNG so we can revert; the code updates will
    swap references to .webp and the .png files can be removed later
  - prints before/after sizes so we can audit the win

Outputs to: alongside each PNG → <stem>.webp

Run: python scripts/optimize_images.py
"""
from __future__ import annotations
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

# Quality knobs per directory: paintings get 85 (visually lossless),
# sigils get 82 (smaller, still crisp on a 6rem display)
PROFILE = {
    "illustrations": {"quality": 85, "method": 6},
    "sigils":        {"quality": 82, "method": 6},
    "transitions":   {"quality": 86, "method": 6},  # cinematic, full-bleed
}

DEFAULT = {"quality": 85, "method": 6}


def convert(png_path: Path) -> tuple[int, int]:
    """Returns (png_bytes, webp_bytes)."""
    webp_path = png_path.with_suffix(".webp")
    img = Image.open(png_path)
    # Determine profile by topmost folder under public
    parts = png_path.relative_to(PUBLIC).parts
    profile = PROFILE.get(parts[0], DEFAULT) if parts else DEFAULT
    img.save(
        webp_path,
        format="WEBP",
        quality=profile["quality"],
        method=profile["method"],
    )
    return png_path.stat().st_size, webp_path.stat().st_size


def main() -> None:
    targets = sorted(PUBLIC.rglob("*.png"))
    print(f"Found {len(targets)} PNG files to convert\n")

    total_png = 0
    total_webp = 0
    for p in targets:
        try:
            png_b, webp_b = convert(p)
        except Exception as e:
            print(f"  [FAIL] {p.relative_to(PUBLIC)}: {e}")
            continue
        total_png += png_b
        total_webp += webp_b
        rel = str(p.relative_to(PUBLIC)).replace("\\", "/")
        saved = (1 - webp_b / max(1, png_b)) * 100
        print(f"  {png_b/1024:7.0f} KB -> {webp_b/1024:6.0f} KB  "
              f"({saved:4.1f}% saved)  {rel}")

    print(
        f"\nTotal: {total_png/1e6:.1f} MB PNG -> {total_webp/1e6:.1f} MB WebP "
        f"({(1 - total_webp/max(1,total_png))*100:.1f}% saved)"
    )


if __name__ == "__main__":
    main()
