"""
Generate ComfyUI Victorian Gothic illustrations for the Dracula dossier.
Outputs to: public/illustrations/dracula/

Usage:
    python scripts/generate_dracula_art.py
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "illustrations" / "dracula"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# All-original prompts — gothic Victorian atmosphere, no character likenesses
# referenced. SDXL Lightning baked VAE → 6 steps, CFG ~1.5.

GENERATIONS = [
    {
        "out": "visage.png",
        "width": 832,
        "height": 1152,
        "seed": 4815162342,
        "prompt": (
            "ominous Victorian gothic vampire nobleman in a candlelit Carpathian castle, "
            "pale aristocratic features, gaunt cheeks, dark widow's peak hairline, "
            "burning red-rimmed eyes, immaculate high black collar, antique fur-trimmed cloak, "
            "single dripping candelabra casting deep chiaroscuro, "
            "ornate baroque interior, dusty bookcases, oil-painted portrait, "
            "19th century steel engraving aesthetic, "
            "Gustave Dore inspired, fine cross-hatching texture, "
            "sepia oxblood and bone palette, candlelight glow, "
            "dramatic shadows, atmospheric, brooding, mysterious, "
            "intricate detail, masterpiece"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright colors, smiling, comic book, neon, "
            "cyberpunk, watermark, text, signature, logo, lowres, blurry, jpeg artifacts, "
            "deformed, mutated, extra limbs, bad anatomy, ugly hands, plastic"
        ),
    },
    {
        "out": "castle.png",
        "width": 1216,
        "height": 832,
        "seed": 76548932,
        "prompt": (
            "ancient stone castle perched on jagged Carpathian mountain peak at dusk, "
            "Borgo Pass, dark pine forest below, swirling mist, "
            "thin crescent moon, single lit window, silhouetted bats wheeling overhead, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, atmospheric perspective, "
            "sepia and oxblood and bone palette, "
            "dramatic chiaroscuro, ominous, romantic, brooding, "
            "intricate detail, masterpiece, no people"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright colors, neon, cyberpunk, "
            "people, person, character, figure, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
    {
        "out": "ornament.png",
        "width": 1024,
        "height": 1024,
        "seed": 12041897,
        "prompt": (
            "a single elegant heraldic bat with wings spread, "
            "rendered as a 19th century black ink steel engraving on cream parchment, "
            "ornate Victorian art nouveau border, "
            "Gustave Dore inspired fine line work, cross-hatching, "
            "centered composition, symbolic, "
            "sepia and oxblood and bone palette, "
            "intricate detail, masterpiece, no people"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright colors, photo, neon, "
            "people, person, character, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
]


def build_workflow(prompt: str, negative: str, width: int, height: int, seed: int) -> dict:
    """Minimal SDXL Lightning workflow."""
    return {
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": 6,
                "cfg": 1.6,
                "sampler_name": "dpmpp_sde",
                "scheduler": "karras",
                "denoise": 1.0,
                "model": ["4", 0],
                "positive": ["6", 0],
                "negative": ["7", 0],
                "latent_image": ["5", 0],
            },
        },
        "4": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {"ckpt_name": CHECKPOINT},
        },
        "5": {
            "class_type": "EmptyLatentImage",
            "inputs": {"width": width, "height": height, "batch_size": 1},
        },
        "6": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": prompt, "clip": ["4", 1]},
        },
        "7": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": negative, "clip": ["4", 1]},
        },
        "8": {
            "class_type": "VAEDecode",
            "inputs": {"samples": ["3", 0], "vae": ["4", 2]},
        },
        "9": {
            "class_type": "SaveImage",
            "inputs": {"filename_prefix": "cos_dracula", "images": ["8", 0]},
        },
    }


def queue(workflow: dict, client_id: str) -> str:
    body = json.dumps({"prompt": workflow, "client_id": client_id}).encode()
    req = urllib.request.Request(
        f"{COMFYUI}/prompt",
        data=body,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())["prompt_id"]


def wait_for(prompt_id: str, timeout_s: int = 180) -> dict:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        with urllib.request.urlopen(f"{COMFYUI}/history/{prompt_id}", timeout=10) as resp:
            data = json.loads(resp.read())
        if prompt_id in data:
            return data[prompt_id]
        time.sleep(1.5)
    raise TimeoutError(f"prompt {prompt_id} did not finish in {timeout_s}s")


def fetch_image(filename: str, subfolder: str, image_type: str) -> bytes:
    qs = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": image_type})
    with urllib.request.urlopen(f"{COMFYUI}/view?{qs}", timeout=60) as resp:
        return resp.read()


def main() -> None:
    client_id = str(uuid.uuid4())
    for spec in GENERATIONS:
        target = OUT_DIR / spec["out"]
        if target.exists():
            print(f"[skip] {target.name} already exists")
            continue
        print(f"[gen ] {target.name} ({spec['width']}x{spec['height']}, seed={spec['seed']})")
        wf = build_workflow(
            prompt=spec["prompt"],
            negative=spec["negative"],
            width=spec["width"],
            height=spec["height"],
            seed=spec["seed"],
        )
        pid = queue(wf, client_id)
        result = wait_for(pid)
        images = result.get("outputs", {}).get("9", {}).get("images", [])
        if not images:
            raise RuntimeError(f"no image output for {target.name}: {result}")
        info = images[0]
        blob = fetch_image(info["filename"], info["subfolder"], info["type"])
        target.write_bytes(blob)
        print(f"[done] {target.name}  ({len(blob) / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
