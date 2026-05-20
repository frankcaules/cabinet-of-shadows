"""
Generate ComfyUI artistic sigil icons for each monster.

Each sigil is a single isolated object rendered as a 19th-century
steel-engraving / woodcut on aged parchment — the kind of mark you'd
find pressed into the corner of an alienist's casebook. No figures,
no scenes. Just the signature object the brief named for each monster.

Outputs to: public/sigils/<slug>.png  (1024x1024)

The existing hand-drawn SVG sigils are kept as fallback / for the
keyboard nav, but the rendered PNG becomes the primary asset for the
hero, the 3D cabinet card, and the visage placeholder.
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "sigils"
OUT_DIR.mkdir(parents=True, exist_ok=True)

COMMON_STYLE = (
    "single object centered, isolated on a cream aged parchment background, "
    "19th century steel engraving illustration, fine cross-hatching, "
    "intricate detailed ink linework, vignette, no human figures, no faces, no people, "
    "no characters, no animals visible in full, no text, no border, "
    "antique woodcut aesthetic, museum quality, masterpiece, "
    "soft warm sepia and cream and ink-black palette"
)

COMMON_NEG = (
    "photograph, photo, photorealistic, 3d render, cgi, modern, contemporary, "
    "cartoon, anime, bright saturated colors, neon, cyberpunk, plastic, "
    "people, person, figure, character, face, hands, multiple objects, scene, landscape, "
    "background scenery, room, building, watermark, text, signature, logo, "
    "lowres, blurry, jpeg artifacts, gradient background, plain white background"
)

# Each entry: signature object from the brief, rendered as an icon
GENERATIONS = [
    {
        "slug": "dracula", "seed": 18971018,
        "subject": (
            "an antique sealed letter folded in thirds with a deep red wax seal "
            "embossed with a small heraldic bat, edges of the parchment slightly torn"
        ),
    },
    {
        "slug": "the-creature", "seed": 18180111,
        "subject": (
            "an old apothecary glass jar containing a glowing electric coil of copper wire, "
            "thin tendrils of pale electricity visible, brass clamp lid"
        ),
    },
    {
        "slug": "hyde", "seed": 18860105,
        "subject": (
            "a small ornate Victorian apothecary bottle with a long thin neck and "
            "a glass stopper, filled with luminous green ether vapor curling inside, "
            "darkly translucent, ornate handwritten paper label"
        ),
    },
    {
        "slug": "the-wolf", "seed": 18650826,
        "subject": (
            "a tarnished silver oval locket on a fine chain, half open, "
            "the engraved cover showing a stylised crescent moon and a pine bough, "
            "patina, age tarnish"
        ),
    },
    {
        "slug": "griffin", "seed": 18970808,
        "subject": (
            "an empty pair of round wire-rimmed spectacles with dark blue tinted lenses, "
            "resting on a small pile of unraveled white linen bandages, "
            "ornate brass clasp visible"
        ),
    },
    {
        "slug": "carmilla", "seed": 18720427,
        "subject": (
            "a single black rose stem with one bloom, placed in a fine cut-crystal vase, "
            "petals open, one petal fallen on the surface beside it"
        ),
    },
    {
        "slug": "erik", "seed": 19100110,
        "subject": (
            "an ornate white porcelain half mask covering one side of an unseen face, "
            "resting on a folded sheet of musical notation with bar lines and notes visible, "
            "thin black ribbon attached to the mask"
        ),
    },
    {
        "slug": "dorian", "seed": 18900520,
        "subject": (
            "a small ornate gilt picture frame turned around so the canvas back faces the viewer, "
            "exposed wooden cross-braces, two corner ornaments, a single hanging wire"
        ),
    },
    {
        "slug": "varney", "seed": 18450506,
        "subject": (
            "a stack of folded yellowed penny dreadful newspaper sheets bound with twine, "
            "visible column rules and small woodcut illustration on the top page, "
            "one corner singed by candlelight"
        ),
    },
    {
        "slug": "sweeney", "seed": 18460718,
        "subject": (
            "a folded antique cutthroat straight razor with ornate ivory and steel handle, "
            "blade partly retracted, resting on a leather strop, single drop of dark liquid on the blade edge"
        ),
    },
    {
        "slug": "jack", "seed": 18380109,
        "subject": (
            "a torn yellowed broadsheet newspaper clipping with a bold sensational headline, "
            "the upper edge scorched and curled from heat, visible woodcut detail of a small figure mid-leap"
        ),
    },
    {
        "slug": "golem", "seed": 19090101,
        "subject": (
            "a small rectangular clay tablet of unfired river clay, "
            "incised with three Hebrew letters at the centre forming the word EMET, "
            "edges roughly shaped by hand, slight ochre tone"
        ),
    },
    {
        "slug": "horseman", "seed": 18201031,
        "subject": (
            "a hollowed jack-o-lantern pumpkin with a carved triangular eye and toothy grin, "
            "a candle flickering inside casting light through the carvings, "
            "stem on top, scattered autumn maple leaves at its base"
        ),
    },
]


def build_workflow(slug: str, subject: str, seed: int) -> dict:
    prompt = f"masterpiece illustration of {subject}, {COMMON_STYLE}"
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
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": f"cos_sigil_{slug}", "images": ["8", 0]}},
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
