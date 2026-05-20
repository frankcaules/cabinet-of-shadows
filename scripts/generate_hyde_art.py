"""
Generate ComfyUI illustrations for Mr. Hyde.
Outputs to: public/illustrations/hyde/
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "illustrations" / "hyde"
OUT_DIR.mkdir(parents=True, exist_ok=True)

GENERATIONS = [
    {
        "out": "visage.png",
        "width": 832,
        "height": 1152,
        "seed": 18860105,
        "prompt": (
            "a sinister small wiry Victorian gentleman in a tall black silk top hat, "
            "dark caped coat, gaunt pale chiseled face with sharp cheekbones, "
            "subtly malevolent half smile, holding a small dark glass apothecary vial "
            "with luminous ether-green liquid inside, "
            "standing in a narrow cobblestone London alley at night, gas lamp casting harsh shadows, "
            "thin green vapor curling around him, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, dramatic chiaroscuro, "
            "sin red and ether green and gentleman grey palette, "
            "atmospheric, brooding, menacing, "
            "intricate detail, masterpiece"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright colors, cheerful, comic book, "
            "neon, cyberpunk, gore, zombie, monster, ape face, deformed, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts, "
            "extra limbs, bad anatomy"
        ),
    },
    {
        "out": "apothecary.png",
        "width": 1216,
        "height": 832,
        "seed": 18860819,
        "prompt": (
            "a Victorian apothecary laboratory at midnight split between order and chaos, "
            "left half meticulous and immaculate with ordered glass beakers and ledgers, "
            "right half overturned with shattered phials and a fallen chair, "
            "an open mahogany cabinet of dark apothecary bottles, "
            "a half empty vial of luminous ether green liquid on the central desk, "
            "an ornate framed mirror reflecting only one half of the room, "
            "soot stained gas lamps, scattered loose papers covered in handwriting, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, atmospheric perspective, "
            "ether green and sin red and laboratory cream and gentleman grey palette, "
            "dramatic chiaroscuro, no people, "
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
                "seed": seed, "steps": 6, "cfg": 1.6,
                "sampler_name": "dpmpp_sde", "scheduler": "karras", "denoise": 1.0,
                "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0],
            },
        },
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": width, "height": height, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": negative, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "cos_hyde", "images": ["8", 0]}},
    }


def queue(workflow: dict, client_id: str) -> str:
    body = json.dumps({"prompt": workflow, "client_id": client_id}).encode()
    req = urllib.request.Request(f"{COMFYUI}/prompt", data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())["prompt_id"]


def wait_for(prompt_id: str, timeout_s: int = 360) -> dict:
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
