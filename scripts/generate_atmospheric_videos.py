"""
Generate ComfyUI Wan 2.1 atmospheric video loops to decorate dossier heroes.
Outputs to: public/videos/<slug>/hero.webm

Uses Wan 2.1 1.3B Text-to-Video (fp8) — clean fp16/fp8 pipeline, no
AnimateDiff dtype mismatches. Short 65-frame loops at 832x464 (16:9),
~4 seconds at 16 fps. The loops play at ~40% opacity behind the hero
quote on each dossier — ambient, not assertive.
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
UNET = "Wan2_1-T2V-1_3B_fp8_e4m3fn.safetensors"
VAE = "wan_2.1_vae.safetensors"
CLIP = "umt5_xxl_fp8_e4m3fn_scaled.safetensors"
OUT_BASE = Path(__file__).resolve().parent.parent / "public" / "videos"

GENERATIONS = [
    {
        "slug": "dracula",
        "width": 832,
        "height": 464,
        "length": 65,
        "seed": 18970525,
        "prompt": (
            "atmospheric cinematic shot, slow drift of warm candle smoke and incense haze "
            "through a dimly lit ornate Victorian gothic chamber, "
            "deep oxblood and bone palette, candlelight glow, "
            "soft floating dust motes, gentle drifting motion, "
            "no people, no characters, no faces, "
            "deep chiaroscuro, ambient brooding mood, "
            "19th century steel engraving aesthetic, intricate detail"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright saturated colors, "
            "people, person, character, figure, face, "
            "fast motion, jerky motion, jump cuts, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
    {
        "slug": "the-creature",
        "width": 832,
        "height": 464,
        "length": 65,
        "seed": 18181103,
        "prompt": (
            "atmospheric cinematic shot, slow gentle drift of fine arctic snow "
            "across an empty glacial expanse, pale aurora light overhead, "
            "distant ice cliffs in deep fog, "
            "graveyard green and ozone blue and pale bone palette, "
            "soft drifting mist, gentle slow motion, "
            "no people, no characters, no faces, no animals, "
            "atmospheric perspective, melancholic ambient mood, "
            "19th century engraving aesthetic, intricate detail"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright saturated colors, "
            "people, person, character, figure, face, animal, "
            "fast motion, jerky motion, jump cuts, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
    {
        "slug": "hyde",
        "width": 832,
        "height": 464,
        "length": 65,
        "seed": 18860819,
        "prompt": (
            "atmospheric cinematic shot, slow rising green ether vapor "
            "curling up through a dim Victorian apothecary chamber, "
            "gaslit harsh shadows on dark wood paneling and cabinet glass, "
            "ether green and sin red and gentleman grey palette, "
            "gentle floating chemical haze, ambient slow motion, "
            "no people, no characters, no faces, "
            "deep chiaroscuro, sinister brooding mood, "
            "19th century engraving aesthetic, intricate detail"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright saturated colors, "
            "people, person, character, figure, face, "
            "fast motion, jerky motion, jump cuts, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
    {
        "slug": "the-wolf",
        "width": 832,
        "height": 464,
        "length": 65,
        "seed": 18650826,
        "prompt": (
            "atmospheric cinematic shot, slow drifting moonlit fog rolling between "
            "ancient towering pines and birches of a deep Black Forest clearing, "
            "colossal luminous full moon visible through breaks in the canopy, "
            "wolfsbane purple and moon silver and forest shadow palette, "
            "gentle floating mist, ambient slow motion, "
            "no people, no characters, no faces, no animals, "
            "dramatic moonlight atmospheric perspective, ominous melancholic mood, "
            "19th century engraving aesthetic, intricate detail"
        ),
        "negative": (
            "modern, contemporary, cartoon, anime, bright saturated colors, "
            "people, person, character, figure, face, animal, wolf, dog, "
            "fast motion, jerky motion, jump cuts, "
            "watermark, text, signature, logo, lowres, blurry, jpeg artifacts"
        ),
    },
]


def build_workflow(prompt: str, negative: str, width: int, height: int, length: int, seed: int, slug: str) -> dict:
    """Wan 2.1 T2V 1.3B workflow."""
    return {
        # Model + VAE + CLIP
        "1": {"class_type": "UNETLoader", "inputs": {"unet_name": UNET, "weight_dtype": "default"}},
        "2": {"class_type": "VAELoader", "inputs": {"vae_name": VAE}},
        "3": {"class_type": "CLIPLoader", "inputs": {"clip_name": CLIP, "type": "wan", "device": "default"}},
        # Prompts
        "4": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["3", 0]}},
        "5": {"class_type": "CLIPTextEncode", "inputs": {"text": negative, "clip": ["3", 0]}},
        # Empty latent video (Wan uses HunyuanLatentVideo shape for SD3-style)
        "6": {
            "class_type": "EmptyHunyuanLatentVideo",
            "inputs": {"width": width, "height": height, "length": length, "batch_size": 1},
        },
        # Model sampling — Wan uses ModelSamplingSD3 with shift
        "7": {
            "class_type": "ModelSamplingSD3",
            "inputs": {"model": ["1", 0], "shift": 8.0},
        },
        # KSampler
        "8": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": 20,
                "cfg": 6.0,
                "sampler_name": "uni_pc",
                "scheduler": "simple",
                "denoise": 1.0,
                "model": ["7", 0],
                "positive": ["4", 0],
                "negative": ["5", 0],
                "latent_image": ["6", 0],
            },
        },
        # VAE decode
        "9": {"class_type": "VAEDecode", "inputs": {"samples": ["8", 0], "vae": ["2", 0]}},
        # Save as webm video
        "10": {
            "class_type": "VHS_VideoCombine",
            "inputs": {
                "images": ["9", 0],
                "frame_rate": 16,
                "loop_count": 0,
                "filename_prefix": f"cos_video_{slug}",
                "format": "video/webm",
                "pingpong": False,
                "save_output": True,
            },
        },
    }


def queue(workflow: dict, client_id: str) -> str:
    body = json.dumps({"prompt": workflow, "client_id": client_id}).encode()
    req = urllib.request.Request(f"{COMFYUI}/prompt", data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())["prompt_id"]


def wait_for(prompt_id: str, timeout_s: int = 900) -> dict:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        with urllib.request.urlopen(f"{COMFYUI}/history/{prompt_id}", timeout=10) as resp:
            data = json.loads(resp.read())
        if prompt_id in data:
            return data[prompt_id]
        time.sleep(3.0)
    raise TimeoutError(f"prompt {prompt_id} did not finish in {timeout_s}s")


def fetch_artifact(filename: str, subfolder: str, type_: str) -> bytes:
    qs = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": type_})
    with urllib.request.urlopen(f"{COMFYUI}/view?{qs}", timeout=180) as resp:
        return resp.read()


def main() -> None:
    client_id = str(uuid.uuid4())
    for spec in GENERATIONS:
        out_dir = OUT_BASE / spec["slug"]
        out_dir.mkdir(parents=True, exist_ok=True)
        target = out_dir / "hero.webm"
        if target.exists():
            print(f"[skip] {spec['slug']}/hero.webm already exists", flush=True)
            continue
        print(f"[gen ] {spec['slug']}/hero.webm  ({spec['width']}x{spec['height']}, {spec['length']}f, seed={spec['seed']})", flush=True)
        wf = build_workflow(spec["prompt"], spec["negative"], spec["width"], spec["height"], spec["length"], spec["seed"], spec["slug"])
        try:
            pid = queue(wf, client_id)
        except Exception as e:
            print(f"[err ] queue failed for {spec['slug']}: {e}", flush=True)
            continue
        try:
            result = wait_for(pid)
        except TimeoutError as e:
            print(f"[err ] {e}", flush=True)
            continue
        outs = result.get("outputs", {}).get("10", {})
        artifacts = outs.get("gifs") or outs.get("videos") or []
        if not artifacts:
            status = result.get("status", {})
            for m in status.get("messages", []):
                if isinstance(m, (list, tuple)) and len(m) > 1 and m[0] == "execution_error":
                    print(f"[err ] {spec['slug']}: {m[1].get('exception_message', '?')}", flush=True)
                    break
            else:
                print(f"[warn] no video artifact for {spec['slug']}; outputs: {list(outs.keys())}", flush=True)
            continue
        info = artifacts[0]
        blob = fetch_artifact(info["filename"], info.get("subfolder", ""), info.get("type", "output"))
        target.write_bytes(blob)
        print(f"[done] {spec['slug']}/hero.webm  ({len(blob) / 1024:.1f} KB)", flush=True)


if __name__ == "__main__":
    main()
