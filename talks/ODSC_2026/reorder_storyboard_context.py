#!/usr/bin/env python3
"""Place the context and compaction sequence between tools and memory."""

from __future__ import annotations

import re
import sys
from pathlib import Path


def main() -> None:
    path = Path(sys.argv[1])
    text = path.read_text(encoding="utf-8")
    marker = "<!-- source-slide: 001 -->"
    preamble, slide_text = text.split(marker, 1)
    slide_text = marker + slide_text

    blocks = re.findall(
        r"<!-- source-slide: (\d{3}) -->\n.*?(?=\n<!-- source-slide: \d{3} -->|\Z)",
        slide_text,
        flags=re.S,
    )
    full_blocks = {
        match.group(1): match.group(0).rstrip()
        for match in re.finditer(
            r"<!-- source-slide: (\d{3}) -->\n.*?(?=\n<!-- source-slide: \d{3} -->|\Z)",
            slide_text,
            flags=re.S,
        )
    }
    if len(blocks) != len(full_blocks) or len(blocks) < 200:
        raise RuntimeError("Could not parse the storyboard safely")

    original_order = list(blocks)
    context_ids = [f"{n:03d}" for n in range(44, 64)]
    remaining = [slide_id for slide_id in original_order if slide_id not in context_ids]
    insert_before = remaining.index("039")

    context_bridge = """<!-- new-slide: tools-to-context -->
## Tool calls compete for space in the context window

Every tool result, file, and instruction consumes attention. A larger context window delays the problem, but long tasks still fill it.

---"""

    summary_bridge = """<!-- new-slide: summarization -->
## Summarization keeps the useful parts of a long run

A useful summary preserves the goal, decisions, evidence, open questions, and next action. The raw conversation can fall away.

---"""

    reordered_parts = [full_blocks[slide_id] for slide_id in remaining[:insert_before]]
    reordered_parts.append(context_bridge)
    # Put the framing and long-context evidence first, then state the summary rule
    # immediately before the existing compaction examples.
    for slide_id in context_ids:
        if slide_id == "060":
            reordered_parts.append(summary_bridge)
        reordered_parts.append(full_blocks[slide_id])
    reordered_parts.extend(full_blocks[slide_id] for slide_id in remaining[insert_before:])

    path.write_text(preamble + "\n\n".join(reordered_parts) + "\n", encoding="utf-8")
    print(f"Reordered {path}")
    print("Placed source slides 044-063 and two new bridge slides before source slide 039.")


if __name__ == "__main__":
    main()
