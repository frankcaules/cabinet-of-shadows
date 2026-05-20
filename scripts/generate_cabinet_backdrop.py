"""
Generate the ComfyUI backdrop for the 3D Cabinet hub.
Output: public/illustrations/cabinet/study.png
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "illustrations" / "cabinet"
OUT_DIR.mkdir(parents=True, exist_ok=True)

SPEC = {
    "out": "study.png",
    "width": 1920, "height": 1080, "seed": 18970101,
    "prompt": (
        "masterpiece, ultra detailed, museum quality oil painting, "
        "a dimly lit Victorian alienist's private study at midnight, "
        "wide-angle composition, deep architectural perspective, "
        "tall floor-to-ceiling oak bookshelves filled with leather-bound volumes lining the back wall, "
        "an enormous heavy oak desk in the foreground occupying most of the lower frame, "
        "the desk surface entirely clear and empty in the centre, ready for objects to be placed, "
        "polished oak wood grain catching warm candlelight, "
        "a single brass gas lamp on the left edge of the desk casting amber pool of light, "
        "a tall arched window on the right with rain streaking down the glass, "
        "lightning flickering distantly outside, "
        "hanging anatomical engravings and a Vesalius diagram framed on the wall behind, "
        "a worn turkish rug under the desk, "
        "deep velvet armchair in the shadows behind, "
        "a brass mantel clock on the bookshelf, "
        "an ink well and quill set placed off to the side, "
        "wisps of pipe smoke drifting up, dust motes in the candlelight, "
        "no people visible, no figures, atmosphere of patient scholarship and quiet horror, "
        "warm candlelight chiaroscuro, deep shadows, "
        "oxblood and bone and candlelight amber and oak brown palette, "
        "19th century Romantic painting style with steel engraving fine detail, "
        "intricate detail, masterpiece, award winning"
    ),
    "negative": (
        "modern, contemporary, cartoon, anime, bright saturated colors, neon, cyberpunk, "
        "people, person, figure, body, character, face, hands, "
        "computer, monitor, electronics, phone, "
        "watermark, text, signature, logo, lowres, blurry, jpeg artifacts, "
        "objects on the desk surface, items piled up, clutter on the desk"
    ),
}


def build_workflow(spec: dict) -> dict:
    return {
        "3": {"class_type": "KSampler", "inputs": {
            "seed": spec["seed"], "steps": 12, "cfg": 2.2,
            "sampler_name": "dpmpp_2m", "scheduler": "karras", "denoise": 1.0,
            "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0],
        }},
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": spec["width"], "height": spec["height"], "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": spec["prompt"], "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": spec["negative"], "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "cos_cabinet", "images": ["8", 0]}},
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
        time.sleep(2.0)
    raise TimeoutError(f"prompt {prompt_id} did not finish in {timeout_s}s")


def fetch_image(filename: str, subfolder: str, image_type: str) -> bytes:
    qs = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": image_type})
    with urllib.request.urlopen(f"{COMFYUI}/view?{qs}", timeout=120) as resp:
        return resp.read()


def main() -> None:
    target = OUT_DIR / SPEC["out"]
    if target.exists():
        print(f"[skip] {SPEC['out']} already exists")
        return
    print(f"[gen ] {SPEC['out']} ({SPEC['width']}x{SPEC['height']})", flush=True)
    pid = queue(build_workflow(SPEC), str(uuid.uuid4()))
    result = wait_for(pid)
    images = result.get("outputs", {}).get("9", {}).get("images", [])
    if not images:
        raise RuntimeError(f"no image output for {SPEC['out']}: {result.get('status', {})}")
    info = images[0]
    blob = fetch_image(info["filename"], info["subfolder"], info["type"])
    target.write_bytes(blob)
    print(f"[done] {SPEC['out']}  ({len(blob) / 1024:.1f} KB)", flush=True)


if __name__ == "__main__":
    main()
