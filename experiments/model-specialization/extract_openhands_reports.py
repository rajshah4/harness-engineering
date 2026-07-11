#!/usr/bin/env python3
"""Extract compact per-instance OpenHands reports from result archives."""

from __future__ import annotations

import argparse
import json
import re
import tarfile
import urllib.request
from pathlib import Path


DEFAULT_MODELS = [
    "claude-opus-4-7",
    "GPT-5.5",
    "GLM-5.1",
    "Kimi-K2.6",
    "MiniMax-M2.7",
    "DeepSeek-V4-Pro",
]


def slug(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", value)


def download(url: str, path: Path) -> None:
    if path.exists() and path.stat().st_size > 0:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(url) as response:
        path.write_bytes(response.read())


def read_output_report(archive_path: Path) -> dict:
    with tarfile.open(archive_path, "r:gz") as archive:
        members = archive.getmembers()
        candidates = [
            member
            for member in members
            if member.name.endswith("/output.report.json")
            or (
                member.name.endswith("/report.json")
                and "/logs/run_evaluation/" not in member.name
                and "/OpenHands/" not in member.name
            )
        ]
        for member in candidates:
            if member.isfile():
                extracted = archive.extractfile(member)
                if extracted is None:
                    continue
                return json.loads(extracted.read().decode("utf-8"))
    raise FileNotFoundError(f"output.report.json not found in {archive_path}")


def load_snapshot(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--snapshot", default="openhands_snapshot.json")
    parser.add_argument("--out", default="openhands_task_reports.json")
    parser.add_argument("--cache-dir", default="/private/tmp/openhands-report-cache")
    parser.add_argument("--model", action="append", dest="models")
    parser.add_argument("--benchmark", action="append", dest="benchmarks")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    snapshot_path = Path(args.snapshot).resolve()
    out_path = Path(args.out).resolve()
    cache_dir = Path(args.cache_dir)
    snapshot = load_snapshot(snapshot_path)
    model_filter = set(args.models or DEFAULT_MODELS)
    benchmark_filter = set(args.benchmarks or [item["id"] for item in snapshot["benchmarks"]])
    rows = []

    for model in snapshot["models"]:
        if model["label"] not in model_filter:
            continue
        for benchmark, detail in model["details"].items():
            if benchmark not in benchmark_filter:
                continue
            archive_url = detail.get("full_archive")
            if not archive_url:
                continue
            archive_path = cache_dir / f"{slug(model['label'])}__{slug(benchmark)}.tar.gz"
            download(archive_url, archive_path)
            report = read_output_report(archive_path)
            rows.append(
                {
                    "model": model["label"],
                    "benchmark": benchmark,
                    "score": detail.get("score"),
                    "metric": detail.get("metric"),
                    "cost_per_instance": detail.get("cost_per_instance"),
                    "average_runtime": detail.get("average_runtime"),
                    "agent_version": detail.get("agent_version"),
                    "submission_time": detail.get("submission_time"),
                    "archive_url": archive_url,
                    "total_instances": report.get("total_instances"),
                    "submitted_instances": report.get("submitted_instances"),
                    "completed_instances": report.get("completed_instances"),
                    "resolved_instances": report.get("resolved_instances"),
                    "unresolved_instances": report.get("unresolved_instances"),
                    "empty_patch_instances": report.get("empty_patch_instances"),
                    "error_instances": report.get("error_instances"),
                    "completed_ids": report.get("completed_ids", []),
                    "submitted_ids": report.get("submitted_ids", []),
                    "resolved_ids": report.get("resolved_ids", []),
                    "unresolved_ids": report.get("unresolved_ids", []),
                    "incomplete_ids": report.get("incomplete_ids", []),
                    "empty_patch_ids": report.get("empty_patch_ids", []),
                    "error_ids": report.get("error_ids", []),
                }
            )

    out_path.write_text(json.dumps({"reports": rows}, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(rows)} report rows to {out_path}")


if __name__ == "__main__":
    main()
