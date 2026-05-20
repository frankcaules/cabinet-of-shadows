"""
Generate ComfyUI Victorian Gothic illustrations for Frankenstein's Creature.
Outputs to: public/illustrations/the-creature/
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "illustrations" / "the-creature"
OUT_DIR.mkdir(parents=True, exist_ok=True)

GENERATIONS = [
    {
        "out": "visage.png",
        "width": 832,
        "height": 1152,
        "seed": 18180111,
        "prompt": (
            "a tall sorrowful eight-foot humanoid figure with translucent pallid skin, "
            "yellow watery deeply intelligent eyes, lank dark hair, "
            "visible faint surgical sutures running across the forehead and cheek, "
            "wearing a tattered traveler's cloak, "
            "seated alone in a dim arctic ice cave with pale aurora light filtering in, "
            "expression mournful and articulate, not monstrous, profoundly lonely, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, glacial light, "
            "pale graveyard green and bone palette, ozone blue accents, "
            "dramatic atmospheric chiaroscuro, brooding, melancholy, "
            "intricate detail, masterpiece"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright colors, smiling, comic book, "
            "neon, cyberpunk, zombie, decayed flesh, gore, blood, horror movie monster, "
            "green skin like cartoon Frankenstein, bolts in neck, square head, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts, "
            "deformed, mutated, extra limbs, bad anatomy"
        ),
    },
    {
        "out": "laboratory.png",
        "width": 1216,
        "height": 832,
        "seed": 18181103,
        "prompt": (
            "an empty 19th century alchemist laboratory at dawn, "
            "an overturned operating slab, scattered Vesalius anatomy diagrams on the floor, "
            "a brass Voltaic pile, dusty glass beakers, "
            "open ledger on a desk with quill, an extinguished candle still smoking, "
            "tall arched windows showing pale grey dawn light over Geneva, "
            "long shadows, abandonment, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, atmospheric perspective, "
            "graveyard green and ozone blue and pallor cream palette, "
            "dramatic chiaroscuro, melancholy, no people, "
            "intricate detail, masterpiece"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright colors, neon, cyberpunk, "
            "people, person, character, figure, body, corpse, monster, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
]


def build_workflow(prompt: str, negative: str, width: int, height: int, seed: int) -> dict:
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
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": width, "height": height, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": negative, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "cos_creature", "images": ["8", 0]}},
    }


def queue(workflow: dict, client_id: str) -> str:
    body = json.dumps({"prompt": workflow, "client_id": client_id}).encode()
    req = urllib.request.Request(f"{COMFYUI}/prompt", data=body, headers={"Content-Type": "application/json"})
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
        wf = build_workflow(spec["prompt"], spec["negative"], spec["width"], spec["height"], spec["seed"])
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
