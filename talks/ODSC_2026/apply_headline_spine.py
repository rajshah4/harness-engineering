#!/usr/bin/env python3
"""Apply the approved headline spine and main-line order to the Markdown deck."""

from __future__ import annotations

import re
import sys
from pathlib import Path


MARKER = re.compile(r"<!-- (source-slide|new-slide): ([^ ]+) -->")
SPINE_LINE = re.compile(r"^\d+\. `\[([^]]+)]` \*\*(.+)\*\*$")


def source_key(number: int) -> str:
    return f"source-slide:{number:03d}"


def parse_blocks(text: str) -> tuple[str, dict[str, str], list[str]]:
    matches = list(MARKER.finditer(text))
    if not matches:
        raise RuntimeError("No slide markers found")

    # Section labels belong to the storyboard structure, not to an individual
    # slide. Rebuild them below rather than carrying old labels forward.
    preamble = re.split(r"(?m)^# Opening\s*$", text[: matches[0].start()], maxsplit=1)[0].rstrip()
    blocks: dict[str, str] = {}
    order: list[str] = []
    for index, match in enumerate(matches):
        key = f"{match.group(1)}:{match.group(2)}"
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        raw_block = text[match.start() : end]
        separator = re.search(r"(?m)^---\s*$", raw_block)
        if not separator:
            raise RuntimeError(f"Slide block has no closing separator: {key}")
        blocks[key] = raw_block[: separator.end()].strip()
        order.append(key)
    return preamble, blocks, order


def parse_source_headlines(spine: str) -> dict[str, str]:
    headlines: dict[str, str] = {}
    for line in spine.splitlines():
        match = SPINE_LINE.match(line)
        if not match:
            continue
        tag, headline = match.groups()
        source = re.search(r"\b(\d{3})\b", tag)
        if source:
            headlines[f"source-slide:{source.group(1)}"] = headline
    return headlines


def replace_heading(block: str, headline: str) -> str:
    updated, count = re.subn(r"^## .*$", f"## {headline}", block, count=1, flags=re.M)
    if count != 1:
        raise RuntimeError(f"Could not replace heading in block beginning: {block[:80]!r}")
    return updated


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: apply_headline_spine.py DECK.md HEADLINE-SPINE.md")

    deck_path = Path(sys.argv[1])
    spine_path = Path(sys.argv[2])
    preamble, blocks, original_order = parse_blocks(deck_path.read_text(encoding="utf-8"))
    source_headlines = parse_source_headlines(spine_path.read_text(encoding="utf-8"))

    new_headlines = {
        "new-slide:why-alternatives": "Provider harnesses make the engineering choices for you",
        "new-slide:model-harness-coadaptation": "Models learn the harness they train against",
        "new-slide:workshop-2-prediction": "Which tool setup will win?",
        "new-slide:edit-format": "The edit format changes how often the agent must retry",
        "new-slide:untrusted-tool-results": "Tool results create a new trust boundary",
        "new-slide:tools-to-context": "Tool calls compete for space in the context window",
        "new-slide:context-budget-stack": "Schemas, instructions, and skills are charged on every turn",
        "new-slide:summarization": "A useful summary preserves the information needed to continue",
        "new-slide:prompt-caching": "Compaction can save tokens while reducing cache reuse",
        "new-slide:memory-writers": "Only trusted sources should write durable memory",
        "new-slide:hooks": "Hooks enforce rules outside the model",
    }
    headlines = source_headlines | new_headlines

    sections: list[tuple[str, list[str]]] = [
        (
            "Opening",
            [source_key(n) for n in [1, 3, 4, 6, 57, 8, 9, 10, 11]]
            + ["new-slide:why-alternatives", source_key(12)],
        ),
        (
            "Workshop 1: Harness choice",
            [source_key(n) for n in [13, 14, 15, 17, 19, 18, 16]]
            + ["new-slide:model-harness-coadaptation"]
            + [source_key(n) for n in [58, 197, 22, 24, 25, 26]],
        ),
        (
            "Workshop 2: Tool design",
            [source_key(n) for n in [29, 30, 34]]
            + ["new-slide:workshop-2-prediction"]
            + [source_key(n) for n in [31, 33]]
            + ["new-slide:edit-format"]
            + [source_key(n) for n in [32, 196, 38, 205]]
            + ["new-slide:untrusted-tool-results", source_key(36)],
        ),
        (
            "Workshop 3: Context and memory",
            [source_key(n) for n in [40, 41, 42, 43]]
            + ["new-slide:tools-to-context"]
            + [source_key(n) for n in [44, 46, 50, 51, 53, 55, 56]]
            + ["new-slide:context-budget-stack", source_key(47), "new-slide:summarization"]
            + [source_key(n) for n in [60, 61]]
            + ["new-slide:prompt-caching"]
            + [source_key(n) for n in [63, 64, 65, 68, 71, 73, 74, 102, 103, 75, 76, 77, 78, 79, 59, 80, 81, 82, 84]]
            + ["new-slide:memory-writers"]
            + [source_key(n) for n in [90, 94, 95]],
        ),
        (
            "Workshop 4: Model routing",
            [source_key(n) for n in [96, 97, 98, 99, 100, 108, 109, 111, 106, 107, 112, 113]],
        ),
        (
            "Workshop 5: Agent loops",
            [source_key(n) for n in [114, 115, 116, 117, 118, 123, 66, 67, 127, 129, 135, 133, 134, 136, 137, 125]]
            + ["new-slide:hooks"]
            + [source_key(n) for n in [142, 143, 146, 147, 152, 153]],
        ),
        (
            "Workshop 6: Multi-agent systems",
            [source_key(n) for n in [154, 155, 156, 157, 158, 162, 167, 169, 172, 170, 171, 174, 175, 176]],
        ),
        ("Close", [source_key(n) for n in [177, 184, 91, 185, 186, 187]]),
    ]

    main_keys = [item for _section, items in sections for item in items]
    if len(main_keys) != 134 or len(main_keys) != len(set(main_keys)):
        raise RuntimeError(f"Expected 134 unique main-line slides, found {len(main_keys)}")
    missing = [item for item in main_keys if item not in blocks]
    if missing:
        raise RuntimeError(f"Missing slide blocks: {missing}")
    missing_headlines = [item for item in main_keys if item not in headlines]
    if missing_headlines:
        raise RuntimeError(f"Missing approved headlines: {missing_headlines}")
    unplaced_new = [item for item in blocks if item.startswith("new-slide:") and item not in main_keys]
    if unplaced_new:
        raise RuntimeError(
            "The working deck has newer additions than this saved order. "
            "Edit the current deck and outline instead of rerunning this older pass. "
            f"Unplaced slides: {unplaced_new}"
        )

    for item in main_keys:
        blocks[item] = replace_heading(blocks[item], headlines[item])

    parts = [preamble]
    for section, items in sections:
        parts.append(f"# {section}")
        parts.extend(blocks[item] for item in items)

    source_main = {item for item in main_keys if item.startswith("source-slide:")}
    reserve_keys = [
        item for item in original_order if item.startswith("source-slide:") and item not in source_main
    ]
    parts.append(
        "# Reserves\n\n"
        "Slides below remain available for the three-hour master deck, but they are outside the current main line."
    )
    parts.extend(blocks[item] for item in reserve_keys)

    output = "\n\n".join(parts).rstrip() + "\n"
    deck_path.write_text(output, encoding="utf-8")

    # Postconditions: the deck remains complete, the main line follows the
    # approved order, and every local image reference still resolves.
    reserve_marker = "# Reserves\n"
    if output.count(reserve_marker) != 1:
        raise RuntimeError("Expected exactly one Reserves section")
    main_text, _reserve_text = output.split(reserve_marker, maxsplit=1)
    _main_preamble, main_blocks, parsed_main_order = parse_blocks(main_text)
    if parsed_main_order != main_keys:
        raise RuntimeError("Written main-line order does not match the approved order")
    for item in main_keys:
        heading = re.search(r"(?m)^## (.+)$", main_blocks[item])
        if not heading or heading.group(1) != headlines[item]:
            raise RuntimeError(f"Headline mismatch after write: {item}")
    if source_key(39) in main_blocks or source_key(72) in main_blocks:
        raise RuntimeError("Slides 039 and 072 must remain in Reserves")
    all_markers = MARKER.findall(output)
    if sum(kind == "source-slide" for kind, _slug in all_markers) != 207:
        raise RuntimeError("Source slide count changed")
    if sum(kind == "new-slide" for kind, _slug in all_markers) != 11:
        raise RuntimeError("New slide count changed")
    missing_images: list[str] = []
    for target in re.findall(r"!\[[^]]*]\(([^)]+)\)", output):
        if re.match(r"^[a-z]+://", target):
            continue
        image_path = (deck_path.parent / target).resolve()
        if not image_path.exists():
            missing_images.append(target)
    if missing_images:
        raise RuntimeError(f"Missing local images: {missing_images[:10]}")

    print(f"Updated {deck_path}")
    print(f"Main line: {len(main_keys)} slides")
    print(f"Reserves: {len(reserve_keys)} source slides")


if __name__ == "__main__":
    main()
