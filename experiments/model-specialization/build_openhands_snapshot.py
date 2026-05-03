#!/usr/bin/env python3
"""Build a normalized OpenHands benchmark snapshot for the specialization demo."""

from __future__ import annotations

import argparse
import json
import math
import urllib.request
from datetime import UTC, datetime
from pathlib import Path

BENCHMARKS = [
    {
        "id": "swe-bench",
        "label": "SWE-Bench",
        "task_type": "Bug fixing",
        "functional_label": "Bug fixing",
        "description": "Issue resolution on real repositories.",
    },
    {
        "id": "commit0",
        "label": "Commit0",
        "task_type": "Greenfield building",
        "functional_label": "App building",
        "description": "Greenfield application building tasks, often closer to end-to-end feature construction than patching.",
    },
    {
        "id": "gaia",
        "label": "GAIA",
        "task_type": "Research",
        "functional_label": "Research",
        "description": "Research-heavy tasks with tool use.",
    },
    {
        "id": "swt-bench",
        "label": "SWT-Bench",
        "task_type": "Terminal execution",
        "functional_label": "Terminal work",
        "description": "Software tasks with heavier shell interaction.",
    },
]

DEFAULT_MODEL_PATHS = [
    "results/GPT-5.4",
    "results/claude-opus-4-7",
    "results/claude-opus-4-6",
    "results/claude-sonnet-4-6",
    "results/Gemini-3.1-Pro",
    "results/GLM-5.1",
    "results/Kimi-K2.5",
    "results/GPT-5.2",
]

RAW_BASE = "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main"
OUT_JSON = "openhands_snapshot.json"
OUT_JS = "openhands_snapshot.js"


def fetch_json(url: str) -> object:
    with urllib.request.urlopen(url) as response:
        return json.loads(response.read().decode("utf-8"))


def label_for_model_path(model_path: str) -> str:
    return model_path.strip("/").split("/")[-1]


def round2(value: float) -> float:
    return round(value + 1e-9, 2)


def build_model_entry(model_path: str, rows: list[dict], benchmark_order: list[str]) -> dict | None:
    by_benchmark = {row["benchmark"]: row for row in rows}
    available = [benchmark for benchmark in benchmark_order if benchmark in by_benchmark]
    if not available:
        return None

    scores = {benchmark: by_benchmark[benchmark]["score"] for benchmark in available}
    score_values = list(scores.values())
    range_value = max(score_values) - min(score_values)
    mean_value = sum(score_values) / len(score_values)
    stddev = math.sqrt(sum((score - mean_value) ** 2 for score in score_values) / len(score_values))

    details = {}
    for benchmark in available:
        row = by_benchmark[benchmark]
        details[benchmark] = {
            "score": row["score"],
            "agent_version": row.get("agent_version"),
            "submission_time": row.get("submission_time"),
            "cost_per_instance": row.get("cost_per_instance"),
            "average_runtime": row.get("average_runtime"),
            "source_url": f"{RAW_BASE}/{model_path}/scores.json",
        }

    return {
        "id": label_for_model_path(model_path).lower().replace(".", "-"),
        "label": label_for_model_path(model_path),
        "source_path": model_path,
        "scores": scores,
        "details": details,
        "coverage": len(available),
        "mean_score": round2(mean_value),
        "score_range": round2(range_value),
        "score_stddev": round2(stddev),
    }


def compute_benchmark_rankings(models: list[dict], benchmark_order: list[str]) -> tuple[list[dict], dict[str, dict[str, int]]]:
    benchmark_rankings = []
    rank_by_model: dict[str, dict[str, int]] = {}

    for benchmark in benchmark_order:
        ranked = sorted(
            [model for model in models if benchmark in model["scores"]],
            key=lambda model: model["scores"][benchmark],
            reverse=True,
        )
        if not ranked:
            continue

        ranking_items = []
        prev_score = None
        displayed_rank = 0
        for index, model in enumerate(ranked, start=1):
            score = model["scores"][benchmark]
            if prev_score is None or score != prev_score:
                displayed_rank = index
            ranking_items.append(
                {
                    "rank": displayed_rank,
                    "model_id": model["id"],
                    "model": model["label"],
                    "score": score,
                }
            )
            rank_by_model.setdefault(model["id"], {})[benchmark] = displayed_rank
            prev_score = score

        benchmark_rankings.append(
            {
                "benchmark": benchmark,
                "rankings": ranking_items,
                "top_podium": [item for item in ranking_items if item["rank"] <= 3],
            }
        )

    return benchmark_rankings, rank_by_model


def add_rank_summaries(models: list[dict], rank_by_model: dict[str, dict[str, int]]) -> None:
    for model in models:
        ranks = rank_by_model.get(model["id"], {})
        model["ranks"] = ranks
        model["first_place_count"] = sum(1 for rank in ranks.values() if rank == 1)
        model["podium_count"] = sum(1 for rank in ranks.values() if rank <= 3)


def build_snapshot(model_paths: list[str]) -> dict:
    benchmark_order = [item["id"] for item in BENCHMARKS]
    models = []

    for model_path in model_paths:
        rows = fetch_json(f"{RAW_BASE}/{model_path}/scores.json")
        entry = build_model_entry(model_path, rows, benchmark_order)
        if entry is not None:
            models.append(entry)

    benchmark_rankings, rank_by_model = compute_benchmark_rankings(models, benchmark_order)
    add_rank_summaries(models, rank_by_model)
    models.sort(key=lambda item: item["mean_score"], reverse=True)

    return {
        "title": "OpenHands cross-benchmark specialization snapshot",
        "generated_at": datetime.now(UTC).replace(microsecond=0).isoformat(),
        "source_repo": "https://github.com/OpenHands/openhands-index-results",
        "benchmarks": BENCHMARKS,
        "models": models,
        "benchmark_rankings": benchmark_rankings,
        "notes": [
            "Scores come from different submission dates and sometimes different agent versions.",
            "Rankings are tie-aware, so a benchmark can have multiple first-place models.",
            "This experiment is meant to show rank shifts across task types, not to claim one final universal ordering.",
        ],
    }


def write_outputs(snapshot: dict, out_dir: Path) -> None:
    json_path = out_dir / OUT_JSON
    js_path = out_dir / OUT_JS

    json_text = json.dumps(snapshot, indent=2) + "\n"
    js_text = "window.MODEL_SPECIALIZATION_DATA = " + json.dumps(snapshot, indent=2) + ";\n"

    json_path.write_text(json_text, encoding="utf-8")
    js_path.write_text(js_text, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--model-path",
        action="append",
        dest="model_paths",
        help="Model path under the OpenHands results repo, for example results/GPT-5.4",
    )
    parser.add_argument(
        "--out-dir",
        default=".",
        help="Directory where snapshot files should be written.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    model_paths = args.model_paths or DEFAULT_MODEL_PATHS
    out_dir = Path(args.out_dir).resolve()
    snapshot = build_snapshot(model_paths)
    write_outputs(snapshot, out_dir)


if __name__ == "__main__":
    main()
