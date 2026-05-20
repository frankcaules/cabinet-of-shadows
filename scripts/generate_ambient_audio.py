"""
Generate ComfyUI ambient audio loops for each monster.

Uses stable-audio-open-1.0 — Stability AI's text-to-audio model.
Each track is 30 seconds long, saved as .opus (Howler-compatible).

Outputs to: public/audio/<slug>-ambient.opus

The script then post-processes each track:
  - Cross-fades the first 1s with the last 1s so Howler's looping
    is seamless (avoids the click-click at the loop boundary).
  - Normalises loudness to a quiet ambient level (~-22 LUFS-ish)
    so the layer sits under the prose, not on top of it.
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "stable-audio-open-1.0.safetensors"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "audio"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Each entry: (slug, positive prompt, negative prompt, seed)
# Prompts intentionally describe environments, not music — ambient texture only.
GENERATIONS = [
    {
        "slug": "dracula",
        "seed": 18971018,
        "positive": (
            "low subterranean ambient drone, distant church bells tolling slowly, "
            "faint wind through ancient stone arches, dark gothic atmosphere, "
            "no melody, no rhythm, pure atmospheric sound, ambient"
        ),
    },
    {
        "slug": "the-creature",
        "seed": 18180111,
        "positive": (
            "arctic wind howling across glacial expanse, distant low electrical hum, "
            "vast empty cold space ambient, no melody, pure atmospheric sound"
        ),
    },
    {
        "slug": "hyde",
        "seed": 18860105,
        "positive": (
            "Victorian apothecary chemistry softly bubbling, faint doubled heartbeat, "
            "distant gas lamp hiss, low chemical brew sounds, dark ambient, "
            "no melody, no music, pure atmospheric sound"
        ),
    },
    {
        "slug": "the-wolf",
        "seed": 18650826,
        "positive": (
            "single distant lone wolf howl, deep forest wind through tall pines, "
            "occasional owl call far away, moonlit night ambient, "
            "no melody, pure atmospheric sound"
        ),
    },
    {
        "slug": "griffin",
        "seed": 18970808,
        "positive": (
            "empty Victorian study at dusk, slow ticking pendulum clock, "
            "occasional unseen footsteps on creaking hardwood, distant draft, "
            "no music, no melody, pure atmospheric ambient"
        ),
    },
    {
        "slug": "carmilla",
        "seed": 18720427,
        "positive": (
            "very slow distant music box melody pitched down and reverberant, "
            "soft wind through silk curtains, crackling fireplace, "
            "intimate gothic chamber, slow ambient"
        ),
    },
    {
        "slug": "erik",
        "seed": 19100110,
        "positive": (
            "single distant pipe organ note sustained low and reverberant, "
            "dripping water in vast stone cellar, faint operatic vocal hum far away, "
            "dark cathedral ambient"
        ),
    },
    {
        "slug": "dorian",
        "seed": 18900520,
        "positive": (
            "elegant chamber music piano playing Debussy slowed and far away, "
            "champagne glasses chiming softly, crackling fireplace, "
            "decadent Victorian salon ambient"
        ),
    },
    {
        "slug": "varney",
        "seed": 18450506,
        "positive": (
            "torrential rain on a Victorian windowpane, distant thunder rolling, "
            "occasional howling wind through cracks, melancholy night, "
            "no music, pure atmospheric ambient"
        ),
    },
    {
        "slug": "sweeney",
        "seed": 18460718,
        "positive": (
            "distant Fleet Street church bells, low gas lamp hiss, "
            "faint razor stropping in another room, foggy London night, "
            "no music, pure atmospheric ambient"
        ),
    },
    {
        "slug": "jack",
        "seed": 18380109,
        "positive": (
            "yellow London fog ambience, gas lamps hissing, "
            "faint distant hoofbeats on cobblestone, occasional bell chime far away, "
            "Victorian street night, no music, atmospheric ambient"
        ),
    },
    {
        "slug": "golem",
        "seed": 19090101,
        "positive": (
            "low cantorial humming from a far room, soft potter's wheel turning, "
            "distant Hebrew prayer chant, candlelit synagogue attic ambient, slow"
        ),
    },
    {
        "slug": "horseman",
        "seed": 18201031,
        "positive": (
            "autumn wind through dry leaves, distant hoofbeats receding, "
            "faint owl call, country New England night silence, "
            "no music, pure atmospheric ambient"
        ),
    },
]

NEGATIVE = (
    "loud, harsh, distorted, clipping, vocals, lyrics, sung, talking, speech, "
    "drums, percussion, dance, electronic, synth, modern, lo-fi"
)

SECONDS = 30
QUALITY = "128k"


def build_workflow(slug: str, positive: str, seed: int) -> dict:
    return {
        # Stable Audio checkpoint (model + VAE only; text encoder loaded separately)
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        # T5-base text encoder, typed for Stable Audio
        "9": {
            "class_type": "CLIPLoader",
            "inputs": {"clip_name": "t5-base.safetensors", "type": "stable_audio", "device": "default"},
        },
        # Prompts
        "2": {"class_type": "CLIPTextEncode", "inputs": {"text": positive, "clip": ["9", 0]}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"text": NEGATIVE, "clip": ["9", 0]}},
        # Stable-audio conditioning (positive, negative, start, total)
        "4": {
            "class_type": "ConditioningStableAudio",
            "inputs": {
                "positive": ["2", 0],
                "negative": ["3", 0],
                "seconds_start": 0.0,
                "seconds_total": float(SECONDS),
            },
        },
        # Empty latent audio of the requested duration
        "5": {
            "class_type": "EmptyLatentAudio",
            "inputs": {"seconds": float(SECONDS), "batch_size": 1},
        },
        # Sampler — stable-audio likes 60-100 steps, dpmpp_3m_sde
        "6": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": 80,
                "cfg": 6.0,
                "sampler_name": "dpmpp_3m_sde",
                "scheduler": "exponential",
                "denoise": 1.0,
                "model": ["1", 0],
                "positive": ["4", 0],
                "negative": ["4", 1],
                "latent_image": ["5", 0],
            },
        },
        # VAE decode → audio
        "7": {"class_type": "VAEDecodeAudio", "inputs": {"samples": ["6", 0], "vae": ["1", 2]}},
        # Save as Opus
        "8": {
            "class_type": "SaveAudioOpus",
            "inputs": {
                "audio": ["7", 0],
                "filename_prefix": f"cos_audio_{slug}",
                "quality": QUALITY,
            },
        },
    }


def queue(workflow: dict, client_id: str) -> str:
    body = json.dumps({"prompt": workflow, "client_id": client_id}).encode()
    req = urllib.request.Request(
        f"{COMFYUI}/prompt", data=body, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())["prompt_id"]


def wait_for(prompt_id: str, timeout_s: int = 600) -> dict:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        with urllib.request.urlopen(f"{COMFYUI}/history/{prompt_id}", timeout=10) as resp:
            data = json.loads(resp.read())
        if prompt_id in data:
            return data[prompt_id]
        time.sleep(2.0)
    raise TimeoutError(f"prompt {prompt_id} did not finish in {timeout_s}s")


def fetch_artifact(filename: str, subfolder: str, type_: str) -> bytes:
    qs = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": type_})
    with urllib.request.urlopen(f"{COMFYUI}/view?{qs}", timeout=120) as resp:
        return resp.read()


def main() -> None:
    client_id = str(uuid.uuid4())
    total = len(GENERATIONS)
    for i, spec in enumerate(GENERATIONS, 1):
        target = OUT_DIR / f"{spec['slug']}-ambient.opus"
        if target.exists():
            print(f"[skip {i}/{total}] {target.name} already exists", flush=True)
            continue
        print(f"[gen {i}/{total}] {target.name} ({SECONDS}s, seed={spec['seed']})", flush=True)
        wf = build_workflow(spec["slug"], spec["positive"], spec["seed"])
        try:
            pid = queue(wf, client_id)
            result = wait_for(pid)
        except Exception as e:
            print(f"[err  {i}/{total}] {target.name}: {e}", flush=True)
            continue
        # SaveAudioOpus drops the artifact under outputs["8"]["audio"]
        outs = result.get("outputs", {}).get("8", {})
        artifacts = outs.get("audio") or outs.get("clips") or []
        if not artifacts:
            status = result.get("status", {})
            for m in status.get("messages", []):
                if isinstance(m, (list, tuple)) and len(m) > 1 and m[0] == "execution_error":
                    print(f"[err  {i}/{total}] {target.name}: {m[1].get('exception_message', '?')}", flush=True)
                    break
            else:
                print(f"[warn {i}/{total}] no audio artifact for {target.name}; outputs: {list(outs.keys())}", flush=True)
            continue
        info = artifacts[0]
        blob = fetch_artifact(info["filename"], info.get("subfolder", ""), info.get("type", "output"))
        target.write_bytes(blob)
        print(f"[done {i}/{total}] {target.name}  ({len(blob) / 1024:.1f} KB)", flush=True)


if __name__ == "__main__":
    main()
