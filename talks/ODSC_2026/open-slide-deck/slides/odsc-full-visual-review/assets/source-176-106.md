# Harder app benchmark: freight control tower with Sonnet 4.6

## Outcome

The harder task produced a clear interaction between harness and completion strategy. Multi-agent completion materially helped Pi, but did not improve the final score of native OpenHands.

| Condition | Corrected capability score | Wall time | Provider calls | Provider tokens |
| --- | ---: | ---: | ---: | ---: |
| OpenHands single | 6/9 | 21m 12s | 37 | 3,306,064 |
| Pi single | 4/9 | 25m 36s | 41 | 1,964,231 |
| OpenHands completion system | 5/9 → 6/9 → 6/9 | 86m 56s | 247 attempted / 246 receipted | ≥21,482,581 |
| Pi completion system | 4/9 → 5/9 → 6/9 | 99m 10s | 341 | 22,439,987 |

The OpenHands completion system fixed one scored gap—its browser/CLI/snapshot surface moved from fail to pass after repair one. Repair two did not increase the score. Its final 6/9 tied OpenHands single while using at least 6.5× the provider tokens and 4.1× the wall time.

The Pi completion system improved from the same 4/9 score as Pi single to 5/9 after repair one and 6/9 after repair two. It fixed dictionary serialization/concurrent ingestion and then the browser/operations surface. That erased the two-point single-agent harness gap, but cost 11.4× Pi single's tokens and 3.9× its wall time. All 341 Pi-system calls have distinct valid provider receipts and no recorded reliability incident.

The system token figure is a lower bound, not a complete total. One implementer stream returned HTTP 200 and a unique response id but ended with `IncompleteRead` before its final usage object. The ledger correctly fails closed (`publishable: false`) rather than dropping or estimating the call. The OpenHands-single and Pi-single totals are complete.

## Benchmark design

The application is a multi-tenant freight exception control tower. It combines:

- durable SQLite state and restart;
- deterministic replay of out-of-order carrier events;
- concurrent idempotent event ingestion;
- versioned exception workflows and audit history;
- tenant isolation and viewer/operator/admin roles;
- durable SLA scheduling across concurrent instances;
- leased outbox delivery, retry, dead-letter, and replay;
- Python, HTTP, CLI, snapshot, and safe responsive browser surfaces.

This is harder because the invariants interact. For example, replay affects exception state, idempotency affects audit and outbox effects, tenant scope crosses every surface, and leases must survive restart and concurrency.

## Controls

- AWS EC2; Agent Canvas 1.15.0; agent-server/SDK 1.42.1.
- OpenHands hosted LLM provider; provider request model `claude-sonnet-4-6`.
- Calibration passed for both harnesses: `max_completion_tokens=64000`, `reasoning_effort=high`, three unique usage receipts each.
- Identical 11-skill Vasco default allow-list for both harnesses.
- Native OpenHands internal subagents explicitly disabled.
- Fresh git-initialized starter workspace per condition.
- Conditions ran sequentially.
- Singles received one prompt and no repair feedback.
- The system used a persistent implementer and fresh validator/orchestrator conversations, with at most two repairs.
- Provider receipts were labeled by run, task, condition/role, and phase at the provider boundary.

## Corrected rescoring

The original run-time verifier contained three benchmark-author mistakes: it constructed a store without calling the explicit `init_schema()` path allowed by the public task; it assumed one audit row per semantic ingest rather than comparing concurrent effects with a single-ingest reference; and one outbox case used a zero-second SLA even though the contract did not require zero to be valid.

Those assumptions were corrected after the run. The agents were not rerun and no candidate files were changed. All scores above come from re-executing the corrected verifier against the immutable candidate workspaces and the system's frozen round snapshots. The raw run artifact remains unchanged for auditability, and the corrected rescore is stored separately.

## Capability findings

OpenHands single passed durability, event replay, concurrent idempotency, exception versions/audit, public regressions, and the combined CLI/dashboard/snapshot check. It failed tenant/RBAC enforcement, concurrent SLA ticking, and leased outbox recovery/dead letters.

Pi passed durability, replay, exception versions/audit, and public regressions. Its event-details path attempted to bind a Python dictionary directly into SQLite, which cascaded into ingestion, SLA, and outbox failures. It also failed multi-tenant credential bootstrap and used unsafe `innerHTML` in the dashboard.

The OpenHands completion system started at 5/9. Repair one removed unsafe dashboard interpolation and completed the operations-surface check, reaching 6/9. Repair two did not raise its score.

The Pi completion system started at 4/9, matching Pi single. Repair one fixed event-details serialization and concurrent ingestion, reaching 5/9. Repair two removed unsafe dashboard interpolation and completed the operations-surface check, reaching 6/9.

Both completion systems converged on the same unresolved capability groups: tenant/RBAC behavior, concurrent SLA ticking, and outbox lease/dead-letter recovery. Their final orchestrators correctly stopped as budget-limited rather than claiming success.

## Workshop interpretation

This is a useful workshop exercise, with one important framing change: it demonstrates that harness choice matters and that multi-agent completion is a quality-cost tradeoff, not an automatic quality multiplier.

The strongest interaction is that the native OpenHands-versus-Pi single-agent gap was 6/9 versus 4/9, while both completion systems finished at 6/9. Completion therefore helped the weaker single-agent harness more: Pi gained two capabilities; OpenHands gained no final-score advantage over OpenHands single. This is more educational than a saturated 9/9 result because participants can inspect where orchestration compensated for harness weaknesses, where both systems plateaued, and what that compensation cost.

The result does not show that multi-agent is generally better. It shows a bounded completion loop can recover specific omissions, at roughly 20–22 million provider tokens and 87–99 minutes for this task. Native OpenHands single achieved the same final score in 21 minutes and 3.3 million tokens.

For a publishable claim about multi-agent uplift, run at least three repetitions with repaired provider streaming and a versioned verifier frozen before execution. The present run is valid as an exploratory workshop case study, but its system token total is incomplete and the verifier required post-run correction.

## Evidence

- Raw result: `results/raw/generated/freight-sonnet46-20260828-a.json`
- Corrected rescore: `results/raw/generated/freight-sonnet46-20260828-a-corrected-rescore.json`
- Provider ledger: `results/provider-ledgers/20260828-freight-sonnet46-v1-ledger.jsonl`
- Calibration: `results/calibration/freight-sonnet46-calibration-20260828.json`
- Candidate applications: `results/artifacts/freight-sonnet46-20260828-a/`
- Pi-system raw result: `results/raw/generated/pi-system-sonnet46-20260828-b.json`
- Pi-system provider ledger: `results/provider-ledgers/20260828-pi-system-sonnet46-v1-ledger.jsonl`
- Pi-system calibration: `results/calibration/pi-system-sonnet46-calibration-20260828.json`
- Pi-system candidate: `results/artifacts/pi-system-sonnet46-20260828-b/pi-system/`
- Public task and design: `benchmark/freight-control-tower/`
