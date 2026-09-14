#!/usr/bin/env python3
"""Apply the September 4 external structural review to the Markdown storyboard.

The main line is curated into six workshop sections. Every source slide omitted
from that line is preserved, in its original relative order, under Reserves.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


def parse_blocks(text: str) -> tuple[str, dict[str, str], list[str]]:
    marker = re.compile(r"<!-- (source-slide|new-slide): ([^ ]+) -->")
    matches = list(marker.finditer(text))
    if not matches:
        raise RuntimeError("No slide markers found")
    preamble = text[: matches[0].start()].rstrip()
    blocks: dict[str, str] = {}
    order: list[str] = []
    for index, match in enumerate(matches):
        key = f"{match.group(1)}:{match.group(2)}"
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        blocks[key] = text[match.start() : end].strip()
        order.append(key)
    return preamble, blocks, order


def new_slide(slug: str, title: str, body: str, source: str = "") -> str:
    block = f"<!-- new-slide: {slug} -->\n## {title}\n\n{body.strip()}\n"
    if source:
        block += f"\nSource: {source}\n"
    return block.rstrip() + "\n\n---"


def replace_heading(block: str, title: str) -> str:
    return re.sub(r"^## .*?$", f"## {title}", block, count=1, flags=re.M)


def replace_text_slide(block: str, title: str, body: str) -> str:
    marker, _, _rest = block.partition("\n")
    return f"{marker}\n## {title}\n\n{body.strip()}\n\n---"


def key(number: int) -> str:
    return f"source-slide:{number:03d}"


def main() -> None:
    path = Path(sys.argv[1])
    text = path.read_text(encoding="utf-8")
    preamble, blocks, original_order = parse_blocks(text)

    if len([k for k in blocks if k.startswith("source-slide:")]) != 207:
        raise RuntimeError("Expected 207 source slides before reordering")

    # New slides requested by the review. Claims that need research stay marked.
    blocks["new-slide:why-alternatives"] = new_slide(
        "why-alternatives",
        "Claude Code is good. You still inherit its decisions.",
        "Its tool interfaces, context policy, memory, model routing, and update schedule are product choices. Studying harnesses lets you see those choices, measure their costs, and change them when the task demands it.",
    )
    blocks["new-slide:model-harness-coadaptation"] = new_slide(
        "model-harness-coadaptation",
        "Models learn the harness they train against",
        "Post-training can tune a model to particular tool schemas, edit formats, and loop behavior. A harness that fits one model may fit another model poorly.\n\nTO VERIFY: Add primary evidence and one same-model comparison.",
    )
    blocks["new-slide:workshop-2-prediction"] = new_slide(
        "workshop-2-prediction",
        "Which tool setup will win?",
        "Choose before the run: a broad MCP catalog, a focused MCP server, or terminal plus API. Compare verified outcome, context cost, failed calls, and wall time.",
    )
    blocks["new-slide:edit-format"] = new_slide(
        "edit-format",
        "The edit format changes the loop",
        "Whole-file rewrites, search-and-replace, and structured patches fail in different ways. Their failures create different retry and token costs.\n\nTO FILL: Add one controlled comparison using the same model and task.",
    )
    blocks["new-slide:untrusted-tool-results"] = new_slide(
        "untrusted-tool-results",
        "Tool results can carry instructions too",
        "Retrieved pages, error messages, and MCP responses enter the same token stream as trusted instructions. The harness needs a code-level trust boundary.\n\nTO FILL: Add one primary-source example of indirect prompt injection through a tool return.",
    )
    blocks["new-slide:context-budget-stack"] = new_slide(
        "context-budget-stack",
        "The harness spends context before the task starts",
        "Visual to build: one stacked bar per harness showing the system prompt, tool schemas, saved instructions, retrieved files, tool results, and conversation. Use the Workshop 3 measurements for OpenCode, Pi, and OpenHands.",
    )
    blocks["new-slide:prompt-caching"] = new_slide(
        "prompt-caching",
        "Compaction can break the prompt cache",
        "When compaction rewrites the prefix, the provider may need to process it again. Measure cache hits alongside context tokens before calling compaction cheaper.\n\nTO VERIFY: Validate the mechanism and reported effects against the paper before presenting.",
        "[Don't Break the Cache, arXiv 2601.06007](https://arxiv.org/abs/2601.06007)",
    )
    blocks["new-slide:memory-writers"] = new_slide(
        "memory-writers",
        "Who is allowed to write durable memory?",
        "An agent can turn untrusted content into a future instruction if it writes directly to AGENTS.md or a skill. Durable memory needs provenance, review, and a narrow write path.\n\nTO FILL: Add a primary-source memory-poisoning example.",
    )
    blocks["new-slide:hooks"] = new_slide(
        "hooks",
        "Hooks enforce rules outside the model",
        "Pre-tool, post-tool, and pre-exit hooks can block unsafe actions, require tests, or prevent unsupported completion without relying on the model to remember.\n\nTO FILL: Add a concrete production harness example.",
    )

    # Reuse the two bridge slides already introduced, with sharper wording.
    blocks["new-slide:tools-to-context"] = new_slide(
        "tools-to-context",
        "Tool calls compete for space in the context window",
        "Tool schemas, results, files, instructions, and conversation all draw from the same budget. Larger windows delay the problem, but long tasks still fill them.",
    )
    blocks["new-slide:summarization"] = new_slide(
        "summarization",
        "A useful summary has a contract",
        "Preserve the goal, decisions, evidence, open questions, and next action. The raw conversation can fall away.\n\nTO FILL: Show one real before-and-after compaction artifact.",
    )

    # Adopt one vocabulary throughout the context and memory section.
    blocks[key(44)] = replace_text_slide(
        blocks[key(44)],
        "Context is what the model can use for the next action",
        "Active context holds what the model needs now.\n\nWorking state lets this task resume.\n\nDurable memory carries reviewed guidance into later tasks.\n\nRetrieval decides what enters active context.",
    )
    blocks[key(46)] = replace_text_slide(
        blocks[key(46)],
        "Information belongs at its shortest useful lifetime",
        "Active context holds only what the model needs for this turn.\n\nWorking state holds checkpoints and evidence for resuming the task.\n\nDurable memory holds reviewed rules and reusable procedures.",
    )
    blocks[key(60)] = replace_heading(blocks[key(60)], "Reset and compaction recover active context")
    blocks[key(65)] = replace_heading(blocks[key(65)], "Working state belongs outside the conversation")
    blocks[key(72)] = replace_heading(blocks[key(72)], "Durable memory should survive the task")
    blocks[key(59)] = replace_heading(
        blocks[key(59)], "LangChain cut its base prompt from about 6K to 2K tokens"
    )

    # Strengthen the three section handoffs without adding more transition slides.
    blocks[key(96)] = replace_text_slide(
        blocks[key(96)],
        "The model is another harness setting",
        "Until now, we held the model fixed. A harness can choose a different model or reasoning level for each step.",
    )
    blocks[key(114)] = replace_text_slide(
        blocks[key(114)],
        "Routing depends on evidence from the loop",
        "A routing policy needs to know whether the last step worked. The loop defines verification, recovery, and safe stopping.",
    )
    blocks[key(154)] = replace_text_slide(
        blocks[key(154)],
        "A second agent buys another context window at a high price",
        "It also adds another loop, more tokens, and a handoff that can fail. The work needs a clean boundary before another agent helps.",
    )
    blocks[key(184)] = replace_text_slide(
        blocks[key(184)],
        "Six harness decisions shape the agent",
        "Harness choice changes the path.\n\nTools define the available actions.\n\nContext and memory decide what information remains useful.\n\nRouting chooses the model for each step.\n\nThe loop controls recovery and completion.\n\nMulti-agent design decides when separate work repays coordination.",
    )

    sections: list[tuple[str, list[str]]] = [
        (
            "Opening",
            [key(n) for n in [1, 3, 4, 6, 57, 8, 9, 10, 11]]
            + ["new-slide:why-alternatives", key(12)],
        ),
        (
            "Workshop 1: Harness choice",
            [key(n) for n in [13, 14, 15]]
            + ["new-slide:model-harness-coadaptation"]
            + [key(n) for n in [17, 19, 18, 16, 58, 197, 22, 24, 25, 26]],
        ),
        (
            "Workshop 2: Tool design",
            [key(n) for n in [29, 30, 34]]
            + ["new-slide:workshop-2-prediction"]
            + [key(n) for n in [31, 33]]
            + ["new-slide:edit-format"]
            + [key(n) for n in [32, 196, 38, 205]]
            + ["new-slide:untrusted-tool-results", key(36)],
        ),
        (
            "Workshop 3: Context and memory",
            [key(n) for n in [39, 40, 41, 42, 43]]
            + ["new-slide:tools-to-context"]
            + [key(n) for n in [44, 46, 50, 51, 53, 55, 56]]
            + ["new-slide:context-budget-stack"]
            + [key(47), "new-slide:summarization"]
            + [key(n) for n in [60, 61]]
            + ["new-slide:prompt-caching"]
            + [key(n) for n in [63, 64, 65, 68, 71, 72, 73, 74, 102, 103, 75, 76, 77, 78, 79, 59, 80, 81, 82, 84]]
            + ["new-slide:memory-writers"]
            + [key(n) for n in [90, 94, 95]],
        ),
        (
            "Workshop 4: Model routing",
            [key(n) for n in [96, 97, 98, 99, 100, 108, 109, 111, 106, 107, 112, 113]],
        ),
        (
            "Workshop 5: Agent loops",
            [key(n) for n in [114, 115, 116, 117, 118, 123, 66, 67, 127, 129, 135, 133, 134, 136, 137, 125]]
            + ["new-slide:hooks"]
            + [key(n) for n in [142, 143, 146, 147, 152, 153]],
        ),
        (
            "Workshop 6: Multi-agent systems",
            [key(n) for n in [154, 155, 156, 157, 158, 162, 167, 169, 172, 170, 171, 174, 175, 176]],
        ),
        ("Close", [key(n) for n in [177, 184, 91, 185, 186, 187]]),
    ]

    main_keys = [item for _section, items in sections for item in items]
    if len(main_keys) != len(set(main_keys)):
        raise RuntimeError("A slide appears twice in the proposed main line")
    missing = [item for item in main_keys if item not in blocks]
    if missing:
        raise RuntimeError(f"Missing slide blocks: {missing}")

    parts = [preamble]
    for section, items in sections:
        parts.append(f"# {section}")
        parts.extend(blocks[item] for item in items)

    source_main = {item for item in main_keys if item.startswith("source-slide:")}
    reserve_keys = [
        item for item in original_order if item.startswith("source-slide:") and item not in source_main
    ]
    parts.append("# Reserves\n\nSlides below remain available for the three-hour master deck, but they are outside the current main line.")
    parts.extend(blocks[item] for item in reserve_keys)

    path.write_text("\n\n".join(parts).rstrip() + "\n", encoding="utf-8")
    print(f"Updated {path}")
    print(f"Main line: {len(main_keys)} slides")
    print(f"Reserves: {len(reserve_keys)} source slides")


if __name__ == "__main__":
    main()
