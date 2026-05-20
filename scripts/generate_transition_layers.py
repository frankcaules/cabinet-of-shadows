"""
Generate atmospheric overlay PNGs for the 13 transitions.

Each PNG is a single dramatic 'scene fragment' painted by ComfyUI on a near-black
background — designed to be composited as a full-bleed overlay during the GSAP
transition timeline. The existing SVG primitive (bat sprite, lightning, etc.)
animates on top; the painted PNG provides the atmosphere and cinematic depth.

Outputs to: public/transitions/<slug>.png  (1024x1024, dark vignette)
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "transitions"
OUT_DIR.mkdir(parents=True, exist_ok=True)

COMMON_STYLE = (
    "dramatic cinematic single subject, centered composition, "
    "near-black void background with deep vignette on all edges, "
    "moody chiaroscuro lighting, painterly oil-on-canvas style, "
    "Victorian Gothic atmosphere, fine detail, museum quality, "
    "no text, no border, no watermark, no human figures or faces"
)

COMMON_NEG = (
    "text, watermark, signature, logo, frame, border, white background, "
    "bright background, colorful background, landscape, scene with multiple objects, "
    "people, faces, hands, character, anime, cartoon, 3d render, cgi, "
    "modern, contemporary, neon, cyberpunk, lowres, blurry, jpeg artifacts, "
    "happy, sunny, daylight"
)

GENERATIONS = [
    {
        "slug": "dracula", "seed": 18971018,
        "subject": (
            "an enormous looming silhouette of a vampire bat with fully outstretched "
            "leathery wings spanning the entire frame, lit from behind by a blood-red "
            "moon, oxblood crimson rim light, deep shadow, painterly"
        ),
    },
    {
        "slug": "the-creature", "seed": 18180111,
        "subject": (
            "a massive jagged forking electric lightning bolt cracking vertically "
            "through pitch black storm clouds, electric blue and pale violet glow, "
            "tendrils branching out, rain falling, ominous"
        ),
    },
    {
        "slug": "hyde", "seed": 18860105,
        "subject": (
            "a thick swirling cloud of luminous green ether vapor billowing outward, "
            "translucent toxic smoke, glowing chartreuse and acid green, twisting form, "
            "deep black void around it, painterly oil"
        ),
    },
    {
        "slug": "the-wolf", "seed": 18650826,
        "subject": (
            "four enormous parallel claw slashes raking diagonally across the frame, "
            "deep ragged torn gashes with violet-black inner shadow, splinters of "
            "moonlight bleeding through the rips, silver-grey rim, painterly"
        ),
    },
    {
        "slug": "griffin", "seed": 18970808,
        "subject": (
            "long strips of white linen bandages caught mid-air unraveling and "
            "billowing in a wind, suggesting an invisible figure beneath them, "
            "soft moonlit pale ivory tones, deep shadow void background, painterly"
        ),
    },
    {
        "slug": "carmilla", "seed": 18720427,
        "subject": (
            "heavy crimson silk curtain rippling and flowing across the frame, "
            "deep wine red with darker folds and shadows, soft candlelight catching "
            "the highlights, sensual fabric texture, dark void background, painterly"
        ),
    },
    {
        "slug": "erik", "seed": 19100110,
        "subject": (
            "a massive heavy opera house curtain in deep blood-crimson velvet "
            "trimmed with tarnished gold tassels falling dramatically across the frame, "
            "stage lights catching the folds, painterly oil"
        ),
    },
    {
        "slug": "dorian", "seed": 18900520,
        "subject": (
            "a cracked and decaying oil portrait canvas surface filling the frame, "
            "fine fracture lines like spiderweb, peeling paint, jaundiced amber and "
            "sickly green hues, faint shadow of a face beneath, painterly oil"
        ),
    },
    {
        "slug": "varney", "seed": 18450506,
        "subject": (
            "torn yellowed penny dreadful newspaper pages flying and tumbling through "
            "the air, sepia and amber tones, ink columns visible, woodcut illustration "
            "fragments, edges burned, deep dark background"
        ),
    },
    {
        "slug": "sweeney", "seed": 18460718,
        "subject": (
            "a single straight razor blade tilted in the foreground, "
            "cold polished steel catching a thin slash of pale moonlight, "
            "menacing ornate ivory handle, single drop of dark crimson on the edge, "
            "near-black background, painterly oil"
        ),
    },
    {
        "slug": "jack", "seed": 18380109,
        "subject": (
            "an indigo silhouette of a tall figure mid-leap with arms outstretched, "
            "frozen in motion against deep storm-blue sky, "
            "electric blue glow from his eyes, painterly oil, ominous"
        ),
    },
    {
        "slug": "golem", "seed": 19090101,
        "subject": (
            "a thick cloud of ochre clay dust and ground earth pigment suspended "
            "in the air mid-collapse, swirling brown and umber particles, suggested "
            "form of a shoulder breaking apart, painterly oil"
        ),
    },
    {
        "slug": "horseman", "seed": 18201031,
        "subject": (
            "a single burning jack-o-lantern pumpkin frozen in mid-air arc, flames "
            "and embers trailing behind it like a comet, deep orange and red fire glow, "
            "carved triangular eyes and toothy grin lit from within, painterly oil"
        ),
    },
]


def build_workflow(slug: str, subject: str, seed: int) -> dict:
    prompt = f"masterpiece painting of {subject}, {COMMON_STYLE}"
    return {
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed, "steps": 14, "cfg": 2.4,
                "sampler_name": "dpmpp_2m", "scheduler": "karras", "denoise": 1.0,
                "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0],
            },
        },
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": 1024, "height": 1024, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": COMMON_NEG, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": f"cos_transition_{slug}", "images": ["8", 0]}},
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
        time.sleep(2.0)
    raise TimeoutError(f"prompt {prompt_id} did not finish in {timeout_s}s")


def fetch_image(filename: str, subfolder: str, type_: str) -> bytes:
    qs = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": type_})
    with urllib.request.urlopen(f"{COMFYUI}/view?{qs}", timeout=120) as resp:
        return resp.read()


def main() -> None:
    client_id = str(uuid.uuid4())
    total = len(GENERATIONS)
    for i, spec in enumerate(GENERATIONS, 1):
        target = OUT_DIR / f"{spec['slug']}.png"
        if target.exists():
            print(f"[skip {i}/{total}] {target.name} already exists", flush=True)
            continue
        print(f"[gen {i}/{total}] {target.name} (seed={spec['seed']})", flush=True)
        wf = build_workflow(spec["slug"], spec["subject"], spec["seed"])
        try:
            pid = queue(wf, client_id)
            result = wait_for(pid)
        except Exception as e:
            print(f"[err  {i}/{total}] {target.name}: {e}", flush=True)
            continue
        images = result.get("outputs", {}).get("9", {}).get("images", [])
        if not images:
            print(f"[warn {i}/{total}] no artifact for {target.name}", flush=True)
            continue
        info = images[0]
        blob = fetch_image(info["filename"], info["subfolder"], info["type"])
        target.write_bytes(blob)
        print(f"[done {i}/{total}] {target.name}  ({len(blob) / 1024:.1f} KB)", flush=True)


if __name__ == "__main__":
    main()
