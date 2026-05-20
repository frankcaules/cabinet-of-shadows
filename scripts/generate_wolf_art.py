"""
Generate ComfyUI MASTERPIECE-tier illustrations for the Werewolf.
Outputs to: public/illustrations/the-wolf/

Strategy: more steps (12 instead of 6), higher cfg (2.2), bigger latent,
verbose masterpiece-quality prompts. Falls back gracefully on timeout.
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "illustrations" / "the-wolf"
OUT_DIR.mkdir(parents=True, exist_ok=True)

GENERATIONS = [
    {
        "out": "visage.png",
        "width": 896,
        "height": 1280,
        "seed": 18650826,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting in the manner of "
            "19th century gothic Romanticism, ominous moonlit figure standing alone in a dense "
            "Black Forest clearing at midnight, "
            "tall gaunt man with sunken eyes and dishevelled dark hair, "
            "pale faintly lupine features in early transformation, "
            "long elegant fingers ending in subtly curved claws, "
            "ragged dark wool cloak edged with grey fur, "
            "expression conflicted between grief and hunger, "
            "enormous luminous full moon directly behind his head as a corona, "
            "ancient pine trees and birches with twisted branches, "
            "faint cold mist curling around his ankles, "
            "Gustave Dore steel engraving aesthetic, fine cross-hatching, "
            "deep chiaroscuro, atmospheric perspective, "
            "wolfsbane purple and moon silver and pelt brown and forest shadow palette, "
            "dramatic side lighting, brooding melancholic mood, "
            "intricate detail, masterpiece, award winning, sharp focus"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, smiling, cheerful, comic book, neon, "
            "cyberpunk, video game, plastic, deformed face, snout, full wolf head, "
            "cartoonish werewolf, mascot, costume, fur suit, "
            "gore, blood splatter, severed limbs, intestines, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts, "
            "deformed, mutated, extra limbs, bad anatomy, ugly hands"
        ),
    },
    {
        "out": "forest.png",
        "width": 1280,
        "height": 896,
        "seed": 18651104,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "deep Black Forest clearing at midnight under a colossal luminous full moon, "
            "ancient towering pines and white birches with twisted branches, "
            "thick mist curling along the forest floor, "
            "two faint amber eyes barely visible in the distant darkness between the trees, "
            "frost on fallen leaves, a small standing stone half buried in moss in the foreground, "
            "wolfsbane flowers blooming faintly purple in the underbrush, "
            "no people visible, "
            "Gustave Dore steel engraving aesthetic, fine cross-hatching, "
            "atmospheric perspective, layered depth, "
            "wolfsbane purple and moon silver and pelt brown and forest shadow palette, "
            "dramatic moonlight chiaroscuro, ominous melancholic mood, "
            "intricate detail, masterpiece, award winning, sharp focus"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright colors, neon, cyberpunk, "
            "people, person, character, figure, hunter, body, corpse, monster, animal, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
]


def build_workflow(prompt: str, negative: str, width: int, height: int, seed: int) -> dict:
    """Masterpiece settings: 12 steps, cfg 2.2, dpmpp_2m + karras."""
    return {
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": 12,
                "cfg": 2.2,
                "sampler_name": "dpmpp_2m",
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
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "cos_wolf", "images": ["8", 0]}},
    }


def queue(workflow: dict, client_id: str) -> str:
    body = json.dumps({"prompt": workflow, "client_id": client_id}).encode()
    req = urllib.request.Request(f"{COMFYUI}/prompt", data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())["prompt_id"]


def wait_for(prompt_id: str, timeout_s: int = 300) -> dict:
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
            print(f"[skip] {target.name} already exists", flush=True)
            continue
        print(f"[gen ] {target.name} ({spec['width']}x{spec['height']}, seed={spec['seed']})", flush=True)
        wf = build_workflow(spec["prompt"], spec["negative"], spec["width"], spec["height"], spec["seed"])
        pid = queue(wf, client_id)
        result = wait_for(pid)
        images = result.get("outputs", {}).get("9", {}).get("images", [])
        if not images:
            raise RuntimeError(f"no image output for {target.name}: {result}")
        info = images[0]
        blob = fetch_image(info["filename"], info["subfolder"], info["type"])
        target.write_bytes(blob)
        print(f"[done] {target.name}  ({len(blob) / 1024:.1f} KB)", flush=True)


if __name__ == "__main__":
    main()
