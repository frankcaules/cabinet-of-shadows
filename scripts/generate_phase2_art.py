"""
Generate masterpiece-tier ComfyUI illustrations for the nine remaining
Cabinet of Shadows monsters: Griffin, Carmilla, Erik, Dorian, Varney,
Sweeney, Jack, Golem, Horseman.

Uses the same masterpiece pipeline as the Werewolf: 12 steps,
dpmpp_2m + karras, cfg 2.2, RealVisXL Lightning baked VAE.

For each monster:
  visage.png — 896 x 1280 portrait/figure
  scene.png  — 1280 x 896 environmental scene

Outputs to public/illustrations/<slug>/.
Idempotent: skips files that already exist.
"""
import json
import time
import uuid
import urllib.request
import urllib.parse
from pathlib import Path

COMFYUI = "http://127.0.0.1:8000"
CHECKPOINT = "realvisxlV50_v50LightningBakedvae.safetensors"
OUT_BASE = Path(__file__).resolve().parent.parent / "public" / "illustrations"

COMMON_NEG = (
    "modern, contemporary, cartoon, anime, bright saturated colors, smiling, "
    "cheerful, comic book, neon, cyberpunk, video game, plastic, "
    "watermark, text, signature, logo, lowres, blurry, jpeg artifacts, "
    "deformed, mutated, extra limbs, bad anatomy, ugly hands"
)

GENERATIONS = [
    # ─────────────────────── Griffin ───────────────────────
    {
        "slug": "griffin",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 18970808,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting, "
            "the figure of a man entirely wrapped in tight white linen bandages "
            "from head to toe, wearing a long dark Victorian travelling coat, "
            "a wide brimmed hat, round dark blue spectacles, "
            "leather gloves, standing in a snow-dusted English village lane at dusk, "
            "gas lamp casting long shadows behind him, faint footprints in the snow leading away, "
            "no visible skin, an unsettling sense of vacancy beneath the bandages, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, atmospheric perspective, "
            "bandage cream and laboratory ink and reagent yellow palette, "
            "dramatic chiaroscuro, brooding mood, intricate detail, masterpiece"
        ),
    },
    {
        "slug": "griffin",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 18971212,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "abandoned 19th century laboratory at dawn, "
            "tall arched windows, scattered scientific glassware, "
            "an open journal on a table with frantic handwritten formulas, "
            "an empty chair pulled back from the desk, "
            "a single set of fresh footprints in dust leading toward the door, "
            "a partly visible empty coat draped on a chair as if recently removed, "
            "no people visible, an unsettling sense of recent departure, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, atmospheric perspective, "
            "bandage cream and laboratory ink palette, "
            "dramatic morning chiaroscuro, melancholic mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Carmilla ───────────────────────
    {
        "slug": "carmilla",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 18720427,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting, "
            "young noblewoman in flowing dark velvet 19th century Austrian dress, "
            "long loose dark hair, languid pose seated in an ornate baroque drawing room, "
            "pale skin, melancholy expression, eyes downcast, "
            "single black rose on the side table, lit candles in a candelabra, "
            "damask wallpaper, faded tapestries, a black cat at her feet, "
            "moonlight from a tall arched window, "
            "Pre-Raphaelite romantic style with steel engraving fine cross-hatching, "
            "carmilla plum and pale rose and moonlight palette, "
            "dramatic candlelight chiaroscuro, intimate brooding mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "carmilla",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 18720910,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "Styrian Austrian castle on a misty wooded hilltop at twilight, "
            "ancient stone schloss with pointed turrets, "
            "thick dark forest of fir and beech below shrouded in mist, "
            "a thin sickle moon overhead, "
            "small chapel and overgrown family burial ground in the foreground, "
            "wrought iron gate ajar, "
            "Pre-Raphaelite romantic landscape with steel engraving cross-hatching, "
            "carmilla plum and pale rose and moonlight and black velvet palette, "
            "atmospheric perspective, melancholic mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Erik (Phantom) ───────────────────────
    {
        "slug": "erik",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 19100110,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting, "
            "solemn figure in formal 19th century evening wear, long black opera cloak, "
            "wearing an ornate white half-mask covering the right side of his face, "
            "the visible side of his face refined and sorrowful, "
            "seated alone at a grand baroque pipe organ in candlelit underground stone chamber, "
            "sheet music scattered across the keyboard, "
            "reflections in a still black underground lake behind him, "
            "single candelabra dripping wax, dust motes in the air, "
            "19th century steel engraving aesthetic with oil painting depth, "
            "opera gold and crimson velvet and lake black and bone mask palette, "
            "dramatic candlelight chiaroscuro, tragic brooding mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "erik",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 19100815,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "vast underground subterranean lake beneath a Paris opera house at night, "
            "an ornate gondola moored at a stone landing, single lit candelabra reflected in still black water, "
            "Gothic stone arches receding into darkness overhead, "
            "a fallen pearl necklace on the stones, sheet music drifting on the water, "
            "ornate gilt picture frames stacked against the wall, "
            "no people visible, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, atmospheric perspective, "
            "opera gold and crimson velvet and lake black palette, "
            "dramatic candlelight chiaroscuro, haunting mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Dorian Gray ───────────────────────
    {
        "slug": "dorian",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 18900520,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting, "
            "elegant young Victorian aristocrat man early twenties, "
            "fine fair features, pale skin, immaculate evening dress with white tie, "
            "boutonniere, holding a champagne flute, "
            "standing in an opulent 1890 London drawing room with gilt mirrors, "
            "marble fireplace, oriental rug, art nouveau lamps, "
            "an ornate gilt-framed full-length portrait of himself behind him on the wall, "
            "but the portrait shows a grotesquely aged corrupted version of his face, "
            "his living face perfect and untouched, "
            "John Singer Sargent style with steel engraving fine detail, "
            "gilt gold and portrait umber and decadent rose and english cream palette, "
            "dramatic gas lamp chiaroscuro, decadent brooding mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "dorian",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 18900904,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "dust-shrouded attic room in a 1890 London townhouse, "
            "single ornate gilt-framed full length portrait propped against the wall, "
            "the portrait depicting a horrifically aged decayed corrupted face with cracking paint, "
            "deep craquelure across the painting, "
            "scattered champagne bottles and a silver knife on the bare wooden floor, "
            "shaft of dusty light from a single skylight, "
            "no people visible, "
            "Pre-Raphaelite oil painting style with steel engraving cross-hatching, "
            "gilt gold and portrait umber and rot green and english cream palette, "
            "dramatic chiaroscuro, decadent decay mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Varney ───────────────────────
    {
        "slug": "varney",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 18450506,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting in penny dreadful style, "
            "gaunt tall English gentleman of indeterminate middle age, "
            "long thin face, hollow cheeks, pale skin, dark hair pulled back, "
            "intense weary mournful eyes, dressed in shabby black 1840 frock coat and high collar, "
            "standing in pouring rain on a desolate Yorkshire moor at midnight, "
            "lightning illuminating jagged crags behind him, "
            "ruined abbey silhouetted in the distance, "
            "his expression utterly exhausted by his own existence, "
            "19th century steel engraving woodcut aesthetic with cheap printing texture, "
            "newsprint yellow and penny red and woodcut black and moor grey palette, "
            "dramatic lightning chiaroscuro, melancholic tragic mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "varney",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 18470203,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "the crater of Mount Vesuvius at dawn 1847, "
            "rising sulphurous smoke, glowing molten lava far below, "
            "jagged volcanic rock walls, a lone black coat torn and abandoned at the edge, "
            "torn pages of a penny dreadful broadsheet caught on the rocks, "
            "the rising sun behind the mountain, "
            "no people visible, an unmistakable sense of final departure, "
            "19th century steel engraving woodcut aesthetic, fine cross-hatching, "
            "newsprint yellow and penny red and woodcut black palette, "
            "dramatic dawn chiaroscuro, final tragic mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Sweeney Todd ───────────────────────
    {
        "slug": "sweeney",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 18460718,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting, "
            "haunted-looking middle aged 1840 London barber, "
            "lean weathered face with grey at the temples, deep-set dark eyes, "
            "wearing a stained barber's white apron over dark wool waistcoat, "
            "standing in a gaslit cramped Victorian barber shop on Fleet Street, "
            "an ornate wooden chair with a hidden mechanism beside him, "
            "open straight razor in his right hand, "
            "small mirrors on the wall, jars of pomade, a strop of leather, "
            "his expression resigned and grim, neither rage nor pleasure, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, fleet fog and barber pole red and pie crust and gaslit amber palette, "
            "dramatic gaslamp chiaroscuro, brooding tragic mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "sweeney",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 18461129,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "a foggy Fleet Street London at midnight 1846, "
            "cobblestone street wet with rain, narrow Tudor and Georgian buildings, "
            "St Dunstan-in-the-West church spire in the distance, "
            "a single gas lamp casting amber light through fog, "
            "wooden hanging shop sign for a barber, painted barber pole stripes, "
            "a smaller wooden sign for a pie shop adjacent, "
            "no people visible, oppressive atmosphere of secrets, "
            "19th century steel engraving aesthetic, Gustave Dore inspired, "
            "fine cross-hatching, fleet fog and barber pole red and pie crust and gaslit amber palette, "
            "dramatic gaslamp chiaroscuro, ominous brooding mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Spring-Heeled Jack ───────────────────────
    {
        "slug": "jack",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 18380109,
        "prompt": (
            "masterpiece, ultra detailed, museum quality woodcut illustration, "
            "tall lean figure in black tight-fitting Victorian acrobat costume and tall stovepipe top hat, "
            "wearing a black domino mask, glowing icy blue eyes, "
            "clawed metal gauntlets, breathing a thin trail of blue flame from his mouth, "
            "mid-leap clearing the gable of a 19th century London terrace house, "
            "gas lamps below, dark slate rooftops at night, full moon behind him, "
            "London skyline of chimneys and spires, "
            "Victorian penny dreadful broadsheet woodcut aesthetic, "
            "phosphor blue and gaslamp yellow and London soot and foggy night palette, "
            "dramatic moonlight chiaroscuro, sensational menacing mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "jack",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 18380226,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "panoramic Victorian London rooftops at midnight 1838, "
            "endless dark slate roofs and chimney pots receding into thick yellow fog, "
            "gas lamps below glowing through the fog, "
            "St Paul's cathedral dome distant on the horizon, "
            "a single trail of icy blue flame arcing across one gable as if from a leap, "
            "scattered torn newspaper broadsheets caught on a chimney, "
            "no people visible, atmosphere of urban legend, "
            "Victorian penny dreadful woodcut aesthetic with steel engraving fine detail, "
            "phosphor blue and gaslamp yellow and London soot and foggy night palette, "
            "dramatic atmospheric perspective, ominous mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Golem ───────────────────────
    {
        "slug": "golem",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 19090101,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting, "
            "tall humanoid figure made of unbaked grey-ochre river clay, "
            "approximately seven feet tall, broad-shouldered, plain unsculpted features, "
            "eyes open but devoid of expression, "
            "three Hebrew letters אמת glowing faintly on his clay forehead, "
            "standing patiently in a narrow medieval Prague alley at night, "
            "cobblestones wet with snow, leaning timber buildings on either side, "
            "single lit lantern hanging above a doorway, "
            "wearing a plain dark wool peasant tunic that does not quite fit him, "
            "his hands at his sides, deferential, waiting for instruction, "
            "Rembrandt-inspired chiaroscuro with steel engraving fine detail, "
            "clay ochre and kabbalah indigo and prague stone and parchment palette, "
            "dramatic lantern chiaroscuro, solemn brooding mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "golem",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 19090214,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "the dim attic of an ancient medieval Prague synagogue at dawn, "
            "exposed timber beams, dusty wooden floor, single small window with snow outside, "
            "a tarnished brass menorah on a chest, "
            "shelves of crumbling Hebrew manuscripts and bound volumes, "
            "a large mound of unfired river clay shaped vaguely as a recumbent man covered with a sheet, "
            "a single Hebrew prayer book open beside the clay, "
            "shaft of cold morning light from the window, "
            "no people visible, atmosphere of patient sacred grief, "
            "Rembrandt-inspired chiaroscuro with steel engraving cross-hatching, "
            "clay ochre and kabbalah indigo and prague stone and parchment palette, "
            "dramatic morning light, solemn melancholic mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
    # ─────────────────────── Horseman ───────────────────────
    {
        "slug": "horseman",
        "out": "visage.png",
        "width": 896, "height": 1280, "seed": 18201031,
        "prompt": (
            "masterpiece, ultra detailed, museum quality oil painting, "
            "tall imposing rider on a massive black warhorse mid-canter, "
            "the rider's body wearing 18th century Hessian mercenary uniform, dark green coat, leather boots, sabre at hip, "
            "absolutely no head above the high collar, the cleanly severed neck visible, "
            "the rider carrying a glowing carved jack-o-lantern under his right arm, "
            "an autumn moonlit New England wooded road in the foreground, "
            "scattered fallen oak and maple leaves swirling around the hooves, "
            "covered wooden bridge in the background, "
            "Boughton 1893 American Romantic illustration style with steel engraving cross-hatching, "
            "pumpkin flame and hollow shadow and maple rust and hessian grey palette, "
            "dramatic moonlight chiaroscuro, ominous folk-tale mood, "
            "intricate detail, masterpiece"
        ),
    },
    {
        "slug": "horseman",
        "out": "scene.png",
        "width": 1280, "height": 896, "seed": 18201129,
        "prompt": (
            "masterpiece, ultra detailed, museum quality, "
            "a covered wooden bridge in autumn New England at midnight 1820, "
            "the bridge spanning a small dark creek, "
            "ancient oaks and maples in full red and ochre autumn colour, "
            "scattered fallen leaves on the planks, mist rising from the water below, "
            "a shattered jack-o-lantern with a still-flickering candle on the bridge approach, "
            "an old Dutch burying ground silhouetted on the far hill with leaning headstones, "
            "full moon obscured by drifting cloud, "
            "no people visible, atmosphere of folk legend, "
            "Boughton 1893 American Romantic illustration style with steel engraving cross-hatching, "
            "pumpkin flame and hollow shadow and maple rust and hessian grey palette, "
            "dramatic moonlight chiaroscuro, ominous mood, no people, "
            "intricate detail, masterpiece"
        ),
    },
]


def build_workflow(prompt: str, width: int, height: int, seed: int, slug: str) -> dict:
    return {
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed, "steps": 12, "cfg": 2.2,
                "sampler_name": "dpmpp_2m", "scheduler": "karras", "denoise": 1.0,
                "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0],
            },
        },
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CHECKPOINT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": width, "height": height, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": COMMON_NEG, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": f"cos_{slug}", "images": ["8", 0]}},
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


def fetch_image(filename: str, subfolder: str, image_type: str) -> bytes:
    qs = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": image_type})
    with urllib.request.urlopen(f"{COMFYUI}/view?{qs}", timeout=120) as resp:
        return resp.read()


def main() -> None:
    client_id = str(uuid.uuid4())
    total = len(GENERATIONS)
    for idx, spec in enumerate(GENERATIONS, 1):
        out_dir = OUT_BASE / spec["slug"]
        out_dir.mkdir(parents=True, exist_ok=True)
        target = out_dir / spec["out"]
        if target.exists():
            print(f"[skip {idx}/{total}] {spec['slug']}/{spec['out']} already exists", flush=True)
            continue
        print(f"[gen {idx}/{total}] {spec['slug']}/{spec['out']} ({spec['width']}x{spec['height']}, seed={spec['seed']})", flush=True)
        wf = build_workflow(spec["prompt"], spec["width"], spec["height"], spec["seed"], spec["slug"])
        try:
            pid = queue(wf, client_id)
            result = wait_for(pid)
        except Exception as e:
            print(f"[err  {idx}/{total}] {spec['slug']}/{spec['out']}: {e}", flush=True)
            continue
        images = result.get("outputs", {}).get("9", {}).get("images", [])
        if not images:
            status = result.get("status", {})
            for m in status.get("messages", []):
                if isinstance(m, (list, tuple)) and len(m) > 1 and m[0] == "execution_error":
                    print(f"[err  {idx}/{total}] {spec['slug']}/{spec['out']}: {m[1].get('exception_message', '?')}", flush=True)
                    break
            else:
                print(f"[warn {idx}/{total}] no image artifact for {spec['slug']}/{spec['out']}", flush=True)
            continue
        info = images[0]
        blob = fetch_image(info["filename"], info["subfolder"], info["type"])
        target.write_bytes(blob)
        print(f"[done {idx}/{total}] {spec['slug']}/{spec['out']}  ({len(blob) / 1024:.1f} KB)", flush=True)


if __name__ == "__main__":
    main()
