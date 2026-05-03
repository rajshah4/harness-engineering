window.MODEL_SPECIALIZATION_DATA = {
  "title": "OpenHands cross-benchmark specialization snapshot",
  "generated_at": "2026-04-29T16:32:00+00:00",
  "source_repo": "https://github.com/OpenHands/openhands-index-results",
  "benchmarks": [
    {
      "id": "swe-bench",
      "label": "SWE-Bench",
      "task_type": "Bug fixing",
      "functional_label": "Bug fixing",
      "description": "Issue resolution on real repositories."
    },
    {
      "id": "commit0",
      "label": "Commit0",
      "task_type": "Greenfield building",
      "functional_label": "App building",
      "description": "Greenfield application building tasks, often closer to end-to-end feature construction than patching."
    },
    {
      "id": "gaia",
      "label": "GAIA",
      "task_type": "Research",
      "functional_label": "Research",
      "description": "Research-heavy tasks with tool use."
    },
    {
      "id": "swt-bench",
      "label": "SWT-Bench",
      "task_type": "Terminal execution",
      "functional_label": "Terminal work",
      "description": "Software tasks with heavier shell interaction."
    }
  ],
  "models": [
    {
      "id": "claude-opus-4-7",
      "label": "claude-opus-4-7",
      "source_path": "results/claude-opus-4-7",
      "scores": {
        "swe-bench": 74.2,
        "commit0": 56.2,
        "gaia": 81.2,
        "swt-bench": 80.8
      },
      "details": {
        "swe-bench": {
          "score": 74.2,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-18T04:25:43+00:00",
          "cost_per_instance": 1.08,
          "average_runtime": 183.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        },
        "commit0": {
          "score": 56.2,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-23T02:56:45+00:00",
          "cost_per_instance": 5.69,
          "average_runtime": 636.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        },
        "gaia": {
          "score": 81.2,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-17T22:13:04+00:00",
          "cost_per_instance": 0.89,
          "average_runtime": 129.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        },
        "swt-bench": {
          "score": 80.8,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-18T21:45:55+00:00",
          "cost_per_instance": 0.82,
          "average_runtime": 143.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 73.1,
      "score_range": 25.0,
      "score_stddev": 10.15,
      "ranks": {
        "swe-bench": 7,
        "commit0": 1,
        "gaia": 2,
        "swt-bench": 1
      },
      "first_place_count": 2,
      "podium_count": 3
    },
    {
      "id": "claude-opus-4-6",
      "label": "claude-opus-4-6",
      "source_path": "results/claude-opus-4-6",
      "scores": {
        "swe-bench": 76.8,
        "commit0": 56.2,
        "gaia": 80.0,
        "swt-bench": 78.8
      },
      "details": {
        "swe-bench": {
          "score": 76.8,
          "agent_version": "v1.15.0",
          "submission_time": "2026-03-26T02:05:02+00:00",
          "cost_per_instance": 0.77,
          "average_runtime": 207.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-6/scores.json"
        },
        "commit0": {
          "score": 56.2,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-22T02:16:04+00:00",
          "cost_per_instance": 7.69,
          "average_runtime": 1030.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-6/scores.json"
        },
        "gaia": {
          "score": 80.0,
          "agent_version": "v1.11.0",
          "submission_time": "2026-02-07T02:55:06+00:00",
          "cost_per_instance": 0.44,
          "average_runtime": 526.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-6/scores.json"
        },
        "swt-bench": {
          "score": 78.8,
          "agent_version": "v1.11.0",
          "submission_time": "2026-02-06T21:30:23+00:00",
          "cost_per_instance": 0.43,
          "average_runtime": 138.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-6/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 72.95,
      "score_range": 23.8,
      "score_stddev": 9.74,
      "ranks": {
        "swe-bench": 1,
        "commit0": 1,
        "gaia": 3,
        "swt-bench": 2
      },
      "first_place_count": 2,
      "podium_count": 4
    },
    {
      "id": "gpt-5-4",
      "label": "GPT-5.4",
      "source_path": "results/GPT-5.4",
      "scores": {
        "swe-bench": 75.6,
        "commit0": 56.2,
        "gaia": 82.4,
        "swt-bench": 70.4
      },
      "details": {
        "swe-bench": {
          "score": 75.6,
          "agent_version": "v1.18.1",
          "submission_time": "2026-04-24T21:15:07+00:00",
          "cost_per_instance": 0.63,
          "average_runtime": 284.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.4/scores.json"
        },
        "commit0": {
          "score": 56.2,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-22T17:26:30+00:00",
          "cost_per_instance": 3.53,
          "average_runtime": 1203.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.4/scores.json"
        },
        "gaia": {
          "score": 82.4,
          "agent_version": "v1.18.0",
          "submission_time": "2026-04-22T15:33:51+00:00",
          "cost_per_instance": 0.61,
          "average_runtime": 224.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.4/scores.json"
        },
        "swt-bench": {
          "score": 70.4,
          "agent_version": "v1.18.1",
          "submission_time": "2026-04-24T22:01:01+00:00",
          "cost_per_instance": 0.47,
          "average_runtime": 228.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.4/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 71.15,
      "score_range": 26.2,
      "score_stddev": 9.62,
      "ranks": {
        "swe-bench": 2,
        "commit0": 1,
        "gaia": 1,
        "swt-bench": 4
      },
      "first_place_count": 2,
      "podium_count": 3
    },
    {
      "id": "gpt-5-2",
      "label": "GPT-5.2",
      "source_path": "results/GPT-5.2",
      "scores": {
        "swe-bench": 74.6,
        "commit0": 37.5,
        "gaia": 65.5,
        "swt-bench": 73.2
      },
      "details": {
        "swe-bench": {
          "score": 74.6,
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-26T15:55:26.395894+00:00",
          "cost_per_instance": 0.86,
          "average_runtime": 476.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.2/scores.json"
        },
        "commit0": {
          "score": 37.5,
          "agent_version": "v1.11.0",
          "submission_time": "2026-02-17T14:39:30+00:00",
          "cost_per_instance": 1.34,
          "average_runtime": 399.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.2/scores.json"
        },
        "gaia": {
          "score": 65.5,
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-26T15:55:26.395894+00:00",
          "cost_per_instance": 0.48,
          "average_runtime": 189.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.2/scores.json"
        },
        "swt-bench": {
          "score": 73.2,
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-26T15:55:26.395894+00:00",
          "cost_per_instance": 0.56,
          "average_runtime": 347.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.2/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 62.7,
      "score_range": 37.1,
      "score_stddev": 14.96,
      "ranks": {
        "swe-bench": 5,
        "commit0": 5,
        "gaia": 6,
        "swt-bench": 3
      },
      "first_place_count": 0,
      "podium_count": 1
    },
    {
      "id": "glm-5-1",
      "label": "GLM-5.1",
      "source_path": "results/GLM-5.1",
      "scores": {
        "swe-bench": 75.0,
        "commit0": 31.2,
        "gaia": 67.3,
        "swt-bench": 70.2
      },
      "details": {
        "swe-bench": {
          "score": 75.0,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-21T06:01:18+00:00",
          "cost_per_instance": 1.54,
          "average_runtime": 748.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        },
        "commit0": {
          "score": 31.2,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-15T04:33:03+00:00",
          "cost_per_instance": 1.25,
          "average_runtime": 548.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        },
        "gaia": {
          "score": 67.3,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-14T04:36:03+00:00",
          "cost_per_instance": 0.47,
          "average_runtime": 280.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        },
        "swt-bench": {
          "score": 70.2,
          "agent_version": "v1.16.1",
          "submission_time": "2026-04-10T06:58:18+00:00",
          "cost_per_instance": 0.76,
          "average_runtime": 280.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 60.93,
      "score_range": 43.8,
      "score_stddev": 17.38,
      "ranks": {
        "swe-bench": 4,
        "commit0": 6,
        "gaia": 5,
        "swt-bench": 5
      },
      "first_place_count": 0,
      "podium_count": 0
    },
    {
      "id": "gemini-3-1-pro",
      "label": "Gemini-3.1-Pro",
      "source_path": "results/Gemini-3.1-Pro",
      "scores": {
        "swe-bench": 75.4,
        "commit0": 18.8,
        "gaia": 76.4,
        "swt-bench": 64.0
      },
      "details": {
        "swe-bench": {
          "score": 75.4,
          "agent_version": "v1.11.5",
          "submission_time": "2026-03-05T11:37:12+00:00",
          "cost_per_instance": 0.63,
          "average_runtime": 983.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Gemini-3.1-Pro/scores.json"
        },
        "commit0": {
          "score": 18.8,
          "agent_version": "v1.11.5",
          "submission_time": "2026-02-20T23:37:50+00:00",
          "cost_per_instance": 1.52,
          "average_runtime": 568.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Gemini-3.1-Pro/scores.json"
        },
        "gaia": {
          "score": 76.4,
          "agent_version": "v1.11.5",
          "submission_time": "2026-03-04T22:20:17+00:00",
          "cost_per_instance": 0.12,
          "average_runtime": 714.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Gemini-3.1-Pro/scores.json"
        },
        "swt-bench": {
          "score": 64.0,
          "agent_version": "v1.11.5",
          "submission_time": "2026-02-28T12:07:12+00:00",
          "cost_per_instance": 0.5,
          "average_runtime": 283.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Gemini-3.1-Pro/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 58.65,
      "score_range": 57.6,
      "score_stddev": 23.52,
      "ranks": {
        "swe-bench": 3,
        "commit0": 7,
        "gaia": 4,
        "swt-bench": 6
      },
      "first_place_count": 0,
      "podium_count": 1
    },
    {
      "id": "kimi-k2-5",
      "label": "Kimi-K2.5",
      "source_path": "results/Kimi-K2.5",
      "scores": {
        "swe-bench": 68.8,
        "commit0": 18.8,
        "gaia": 63.6,
        "swt-bench": 61.9
      },
      "details": {
        "swe-bench": {
          "score": 68.8,
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-30T23:37:19.341897+00:00",
          "cost_per_instance": 0.4063,
          "average_runtime": 707.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.5/scores.json"
        },
        "commit0": {
          "score": 18.8,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-28T06:11:37+00:00",
          "cost_per_instance": 1.26,
          "average_runtime": 1878.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.5/scores.json"
        },
        "gaia": {
          "score": 63.6,
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-30T23:37:19.341897+00:00",
          "cost_per_instance": 0.3781,
          "average_runtime": 602.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.5/scores.json"
        },
        "swt-bench": {
          "score": 61.9,
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-30T23:37:19.341897+00:00",
          "cost_per_instance": 0.4246,
          "average_runtime": 385.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.5/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 53.28,
      "score_range": 50.0,
      "score_stddev": 20.07,
      "ranks": {
        "swe-bench": 8,
        "commit0": 7,
        "gaia": 7,
        "swt-bench": 7
      },
      "first_place_count": 0,
      "podium_count": 0
    },
    {
      "id": "claude-sonnet-4-6",
      "label": "claude-sonnet-4-6",
      "source_path": "results/claude-sonnet-4-6",
      "scores": {
        "swe-bench": 74.4,
        "commit0": 50.0,
        "gaia": 13.3,
        "swt-bench": 54.0
      },
      "details": {
        "swe-bench": {
          "score": 74.4,
          "agent_version": "v1.11.5",
          "submission_time": "2026-02-21T05:06:46+00:00",
          "cost_per_instance": 1.03,
          "average_runtime": 421.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-sonnet-4-6/scores.json"
        },
        "commit0": {
          "score": 50.0,
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-24T09:01:22+00:00",
          "cost_per_instance": 6.48,
          "average_runtime": 1760.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-sonnet-4-6/scores.json"
        },
        "gaia": {
          "score": 13.3,
          "agent_version": "v1.11.5",
          "submission_time": "2026-02-24T01:15:19+00:00",
          "cost_per_instance": 0.41,
          "average_runtime": 227.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-sonnet-4-6/scores.json"
        },
        "swt-bench": {
          "score": 54.0,
          "agent_version": "v1.11.5",
          "submission_time": "2026-02-26T21:00:44+00:00",
          "cost_per_instance": 0.87,
          "average_runtime": 346.0,
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-sonnet-4-6/scores.json"
        }
      },
      "coverage": 4,
      "mean_score": 47.93,
      "score_range": 61.1,
      "score_stddev": 22.03,
      "ranks": {
        "swe-bench": 6,
        "commit0": 4,
        "gaia": 8,
        "swt-bench": 8
      },
      "first_place_count": 0,
      "podium_count": 0
    }
  ],
  "benchmark_rankings": [
    {
      "benchmark": "swe-bench",
      "rankings": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 76.8
        },
        {
          "rank": 2,
          "model_id": "gpt-5-4",
          "model": "GPT-5.4",
          "score": 75.6
        },
        {
          "rank": 3,
          "model_id": "gemini-3-1-pro",
          "model": "Gemini-3.1-Pro",
          "score": 75.4
        },
        {
          "rank": 4,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 75.0
        },
        {
          "rank": 5,
          "model_id": "gpt-5-2",
          "model": "GPT-5.2",
          "score": 74.6
        },
        {
          "rank": 6,
          "model_id": "claude-sonnet-4-6",
          "model": "claude-sonnet-4-6",
          "score": 74.4
        },
        {
          "rank": 7,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 74.2
        },
        {
          "rank": 8,
          "model_id": "kimi-k2-5",
          "model": "Kimi-K2.5",
          "score": 68.8
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 76.8
        },
        {
          "rank": 2,
          "model_id": "gpt-5-4",
          "model": "GPT-5.4",
          "score": 75.6
        },
        {
          "rank": 3,
          "model_id": "gemini-3-1-pro",
          "model": "Gemini-3.1-Pro",
          "score": 75.4
        }
      ]
    },
    {
      "benchmark": "commit0",
      "rankings": [
        {
          "rank": 1,
          "model_id": "gpt-5-4",
          "model": "GPT-5.4",
          "score": 56.2
        },
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 56.2
        },
        {
          "rank": 1,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 56.2
        },
        {
          "rank": 4,
          "model_id": "claude-sonnet-4-6",
          "model": "claude-sonnet-4-6",
          "score": 50.0
        },
        {
          "rank": 5,
          "model_id": "gpt-5-2",
          "model": "GPT-5.2",
          "score": 37.5
        },
        {
          "rank": 6,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 31.2
        },
        {
          "rank": 7,
          "model_id": "gemini-3-1-pro",
          "model": "Gemini-3.1-Pro",
          "score": 18.8
        },
        {
          "rank": 7,
          "model_id": "kimi-k2-5",
          "model": "Kimi-K2.5",
          "score": 18.8
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "gpt-5-4",
          "model": "GPT-5.4",
          "score": 56.2
        },
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 56.2
        },
        {
          "rank": 1,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 56.2
        }
      ]
    },
    {
      "benchmark": "gaia",
      "rankings": [
        {
          "rank": 1,
          "model_id": "gpt-5-4",
          "model": "GPT-5.4",
          "score": 82.4
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 81.2
        },
        {
          "rank": 3,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 80.0
        },
        {
          "rank": 4,
          "model_id": "gemini-3-1-pro",
          "model": "Gemini-3.1-Pro",
          "score": 76.4
        },
        {
          "rank": 5,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 67.3
        },
        {
          "rank": 6,
          "model_id": "gpt-5-2",
          "model": "GPT-5.2",
          "score": 65.5
        },
        {
          "rank": 7,
          "model_id": "kimi-k2-5",
          "model": "Kimi-K2.5",
          "score": 63.6
        },
        {
          "rank": 8,
          "model_id": "claude-sonnet-4-6",
          "model": "claude-sonnet-4-6",
          "score": 13.3
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "gpt-5-4",
          "model": "GPT-5.4",
          "score": 82.4
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 81.2
        },
        {
          "rank": 3,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 80.0
        }
      ]
    },
    {
      "benchmark": "swt-bench",
      "rankings": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 80.8
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 78.8
        },
        {
          "rank": 3,
          "model_id": "gpt-5-2",
          "model": "GPT-5.2",
          "score": 73.2
        },
        {
          "rank": 4,
          "model_id": "gpt-5-4",
          "model": "GPT-5.4",
          "score": 70.4
        },
        {
          "rank": 5,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 70.2
        },
        {
          "rank": 6,
          "model_id": "gemini-3-1-pro",
          "model": "Gemini-3.1-Pro",
          "score": 64.0
        },
        {
          "rank": 7,
          "model_id": "kimi-k2-5",
          "model": "Kimi-K2.5",
          "score": 61.9
        },
        {
          "rank": 8,
          "model_id": "claude-sonnet-4-6",
          "model": "claude-sonnet-4-6",
          "score": 54.0
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 80.8
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-6",
          "model": "claude-opus-4-6",
          "score": 78.8
        },
        {
          "rank": 3,
          "model_id": "gpt-5-2",
          "model": "GPT-5.2",
          "score": 73.2
        }
      ]
    }
  ],
  "notes": [
    "Scores come from different submission dates and sometimes different agent versions.",
    "Rankings are tie-aware, so a benchmark can have multiple first-place models.",
    "This experiment is meant to show rank shifts across task types, not to claim one final universal ordering."
  ]
};
