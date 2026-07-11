window.MODEL_SPECIALIZATION_DATA = {
  "title": "OpenHands cross-benchmark specialization snapshot",
  "generated_at": "2026-06-17T02:30:09+00:00",
  "source_repo": "https://github.com/OpenHands/openhands-index-results",
  "benchmarks": [
    {
      "id": "swe-bench",
      "label": "SWE-Bench",
      "task_type": "Bug fixing",
      "functional_label": "Bug fixing",
      "description": "Issue resolution on real repositories.",
      "total_instances": 500
    },
    {
      "id": "commit0",
      "label": "Commit0",
      "task_type": "Greenfield building",
      "functional_label": "App building",
      "description": "Greenfield application building tasks, often closer to end-to-end feature construction than patching.",
      "total_instances": 16
    },
    {
      "id": "gaia",
      "label": "GAIA",
      "task_type": "Research",
      "functional_label": "Research",
      "description": "Research-heavy tasks with tool use.",
      "total_instances": 165
    },
    {
      "id": "swt-bench",
      "label": "SWT-Bench",
      "task_type": "Terminal execution",
      "functional_label": "Terminal work",
      "description": "Software tasks with heavier shell interaction.",
      "total_instances": 433
    },
    {
      "id": "swe-bench-multimodal",
      "label": "SWE-Bench Multimodal",
      "task_type": "Multimodal software work",
      "functional_label": "Multimodal software work",
      "description": "Software issue resolution where visual context is part of the task.",
      "total_instances": 102
    }
  ],
  "models": [
    {
      "id": "claude-opus-4-7",
      "label": "claude-opus-4-7",
      "source_path": "results/claude-opus-4-7",
      "scores": {
        "swe-bench": 81.6,
        "commit0": 56.2,
        "gaia": 81.2,
        "swt-bench": 80.8,
        "swe-bench-multimodal": 48.5
      },
      "details": {
        "swe-bench": {
          "score": 81.6,
          "metric": "accuracy",
          "agent_version": "v1.24.0",
          "submission_time": "2026-06-02T15:47:40+00:00",
          "cost_per_instance": 1.33,
          "average_runtime": 233.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-anthropic-claude-opus-4-7/26818006424/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-anthropic-claude-opus-4-7/26818006424/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/1444530f-c12e-43c7-a0b4-5847f0223a1e",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 498,
            "resolved": 408,
            "missed": 92,
            "unresolved": 90,
            "empty_patch": 2,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        },
        "commit0": {
          "score": 56.2,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-23T02:56:45+00:00",
          "cost_per_instance": 5.69,
          "average_runtime": 636.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-anthropic-claude-opus-4-7/24805652683/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-anthropic-claude-opus-4-7/24805652683/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/825aa22d-16cb-49c1-8080-97a46db81099",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 14,
            "completed": 14,
            "resolved": 9,
            "missed": 7,
            "unresolved": 5,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        },
        "gaia": {
          "score": 81.2,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-17T22:13:04+00:00",
          "cost_per_instance": 0.89,
          "average_runtime": 129.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-anthropic-claude-opus-4-7/24585074284/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-anthropic-claude-opus-4-7/24585074284/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/734845e8-b910-414f-a4b7-ad60d464131c",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 162,
            "resolved": 134,
            "missed": 31,
            "unresolved": 28,
            "empty_patch": 0,
            "error": 3,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        },
        "swt-bench": {
          "score": 80.8,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-18T21:45:55+00:00",
          "cost_per_instance": 0.82,
          "average_runtime": 143.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-anthropic-claude-opus-4-7/24612239545/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-anthropic-claude-opus-4-7/24612239545/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/96a4370b-a553-4c91-951b-79ae3a93979d",
          "component_scores": null,
          "task_counts": {
            "total": 433,
            "submitted": 433,
            "completed": 431,
            "resolved": 350,
            "missed": 83,
            "unresolved": 81,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 48.5,
          "metric": "solveable_accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-20T03:16:57+00:00",
          "cost_per_instance": 2.83,
          "average_runtime": 372.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-anthropic-claude-opus-4-7/24642030719/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-anthropic-claude-opus-4-7/24642030719/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/cfe39593-1e41-44ba-bf2f-a29e64a51432",
          "component_scores": {
            "solveable_accuracy": 48.5,
            "unsolveable_accuracy": 0.0,
            "combined_accuracy": 32.4
          },
          "task_counts": {
            "total": 102,
            "submitted": 64,
            "completed": 64,
            "resolved": 33,
            "missed": 69,
            "unresolved": 31,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/claude-opus-4-7/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 69.66,
      "score_range": 33.1,
      "score_stddev": 14.34,
      "ranks": {
        "swe-bench": 1,
        "commit0": 1,
        "gaia": 2,
        "swt-bench": 2,
        "swe-bench-multimodal": 1
      },
      "first_place_count": 3,
      "podium_count": 5
    },
    {
      "id": "gpt-5-5",
      "label": "GPT-5.5",
      "source_path": "results/GPT-5.5",
      "scores": {
        "swe-bench": 78.2,
        "commit0": 43.8,
        "gaia": 86.1,
        "swt-bench": 83.4,
        "swe-bench-multimodal": 38.2
      },
      "details": {
        "swe-bench": {
          "score": 78.2,
          "metric": "accuracy",
          "agent_version": "v1.18.1",
          "submission_time": "2026-05-04T23:34:49+00:00",
          "cost_per_instance": 1.52,
          "average_runtime": 294.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-openai-gpt-5-5/25335148711/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-openai-gpt-5-5/25335148711/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/0875da38-90b0-4b49-9d66-0cbac446fd85",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 500,
            "resolved": 391,
            "missed": 109,
            "unresolved": 109,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.5/scores.json"
        },
        "commit0": {
          "score": 43.8,
          "metric": "accuracy",
          "agent_version": "v1.21.1",
          "submission_time": "2026-05-08T17:11:59+00:00",
          "cost_per_instance": 5.56,
          "average_runtime": 1029.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-openai-gpt-5-5/25565888384/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-openai-gpt-5-5/25565888384/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/bab0c2b3-3c08-442d-98e8-7f34bfd76ebd",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 16,
            "completed": 16,
            "resolved": 7,
            "missed": 9,
            "unresolved": 9,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.5/scores.json"
        },
        "gaia": {
          "score": 86.1,
          "metric": "accuracy",
          "agent_version": "v1.18.1",
          "submission_time": "2026-04-28T17:28:03+00:00",
          "cost_per_instance": 0.74,
          "average_runtime": 151.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-openai-gpt-5-5/25064674912/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-openai-gpt-5-5/25064674912/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/268dd4d4-e587-449f-ba49-c2a3b6405683",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 164,
            "resolved": 142,
            "missed": 23,
            "unresolved": 22,
            "empty_patch": 0,
            "error": 1,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.5/scores.json"
        },
        "swt-bench": {
          "score": 83.4,
          "metric": "accuracy",
          "agent_version": "v1.18.1",
          "submission_time": "2026-04-27T23:12:01+00:00",
          "cost_per_instance": 0.92,
          "average_runtime": 183.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-openai-gpt-5-5/25001986019/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-openai-gpt-5-5/25001986019/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/6eec49a3-ecfb-4081-8282-caf1e3e1dda0",
          "component_scores": null,
          "task_counts": {
            "total": 433,
            "submitted": 433,
            "completed": 431,
            "resolved": 361,
            "missed": 72,
            "unresolved": 70,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.5/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 38.2,
          "metric": "solveable_accuracy",
          "agent_version": "v1.18.1",
          "submission_time": "2026-04-28T19:12:41+00:00",
          "cost_per_instance": 2.81,
          "average_runtime": 458.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-openai-gpt-5-5/25064691625/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-openai-gpt-5-5/25064691625/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/55c33492-2ff8-4f59-ba0a-566bcdbb2cd4",
          "component_scores": {
            "solveable_accuracy": 38.2,
            "unsolveable_accuracy": 0.0,
            "combined_accuracy": 25.5
          },
          "task_counts": {
            "total": 102,
            "submitted": 68,
            "completed": 67,
            "resolved": 26,
            "missed": 76,
            "unresolved": 41,
            "empty_patch": 1,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GPT-5.5/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 65.94,
      "score_range": 47.9,
      "score_stddev": 20.6,
      "ranks": {
        "swe-bench": 2,
        "commit0": 2,
        "gaia": 1,
        "swt-bench": 1,
        "swe-bench-multimodal": 4
      },
      "first_place_count": 2,
      "podium_count": 4
    },
    {
      "id": "glm-5-1",
      "label": "GLM-5.1",
      "source_path": "results/GLM-5.1",
      "scores": {
        "swe-bench": 75.0,
        "commit0": 37.5,
        "gaia": 67.3,
        "swt-bench": 70.2,
        "swe-bench-multimodal": 41.2
      },
      "details": {
        "swe-bench": {
          "score": 75.0,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-21T06:01:18+00:00",
          "cost_per_instance": 1.54,
          "average_runtime": 748.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-openrouter-z-ai-glm-5-1/24697829798/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-openrouter-z-ai-glm-5-1/24697829798/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/6543c602-c721-48e6-a0fe-a1abb08fab4b",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 498,
            "completed": 498,
            "resolved": 375,
            "missed": 125,
            "unresolved": 123,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        },
        "commit0": {
          "score": 37.5,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-24T22:03:39+00:00",
          "cost_per_instance": 5.31,
          "average_runtime": 2498.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-openrouter-z-ai-glm-5-1/24902095932/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-openrouter-z-ai-glm-5-1/24902095932/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/069f1865-a4b0-4a67-9451-3043c2ab138c",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 13,
            "completed": 13,
            "resolved": 6,
            "missed": 10,
            "unresolved": 7,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        },
        "gaia": {
          "score": 67.3,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-14T04:36:03+00:00",
          "cost_per_instance": 0.47,
          "average_runtime": 280.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-openrouter-z-ai-glm-5-1/24376299760/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-openrouter-z-ai-glm-5-1/24376299760/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/0d35046a-cbee-473b-b316-d4f57ff7f9d2",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 155,
            "resolved": 111,
            "missed": 54,
            "unresolved": 44,
            "empty_patch": 0,
            "error": 10,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        },
        "swt-bench": {
          "score": 70.2,
          "metric": "accuracy",
          "agent_version": "v1.16.1",
          "submission_time": "2026-04-10T06:58:18+00:00",
          "cost_per_instance": 0.76,
          "average_runtime": 280.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-openrouter-z-ai-glm-5-1/24214829814/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-openrouter-z-ai-glm-5-1/24214829814/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/edae3592-9be7-4da5-83c3-b6ebe10e1bf6",
          "component_scores": null,
          "task_counts": {
            "total": 433,
            "submitted": 433,
            "completed": 431,
            "resolved": 304,
            "missed": 129,
            "unresolved": 127,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 41.2,
          "metric": "solveable_accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-21T19:14:21+00:00",
          "cost_per_instance": 6.92,
          "average_runtime": 3031.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-openrouter-z-ai-glm-5-1/24730025059/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-openrouter-z-ai-glm-5-1/24730025059/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/26dfa179-9ab7-4b15-988d-b7ed2bf91328",
          "component_scores": {
            "solveable_accuracy": 41.2,
            "unsolveable_accuracy": 0.0,
            "combined_accuracy": 27.5
          },
          "task_counts": {
            "total": 102,
            "submitted": 67,
            "completed": 67,
            "resolved": 28,
            "missed": 74,
            "unresolved": 39,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/GLM-5.1/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 58.24,
      "score_range": 37.5,
      "score_stddev": 15.66,
      "ranks": {
        "swe-bench": 4,
        "commit0": 3,
        "gaia": 4,
        "swt-bench": 4,
        "swe-bench-multimodal": 2
      },
      "first_place_count": 0,
      "podium_count": 2
    },
    {
      "id": "kimi-k2-6",
      "label": "Kimi-K2.6",
      "source_path": "results/Kimi-K2.6",
      "scores": {
        "swe-bench": 74.6,
        "commit0": 25.0,
        "gaia": 74.5,
        "swt-bench": 70.4,
        "swe-bench-multimodal": 41.2
      },
      "details": {
        "swe-bench": {
          "score": 74.6,
          "metric": "accuracy",
          "agent_version": "v1.18.1",
          "submission_time": "2026-04-27T16:55:58+00:00",
          "cost_per_instance": 0.67,
          "average_runtime": 1077.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-moonshot-kimi-k2-6/25007210109/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-moonshot-kimi-k2-6/25007210109/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/e024c27b-0bc2-437c-8b36-f3695942dcef",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 497,
            "resolved": 373,
            "missed": 127,
            "unresolved": 124,
            "empty_patch": 2,
            "error": 1,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.6/scores.json"
        },
        "commit0": {
          "score": 25.0,
          "metric": "accuracy",
          "agent_version": "v1.22.0",
          "submission_time": "2026-05-12T07:06:51+00:00",
          "cost_per_instance": 1.52,
          "average_runtime": 1012.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-moonshot-kimi-k2-6/25710683155/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-moonshot-kimi-k2-6/25710683155/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/65cee637-c137-4253-8fab-616dfbeda695",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 8,
            "completed": 8,
            "resolved": 4,
            "missed": 12,
            "unresolved": 4,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.6/scores.json"
        },
        "gaia": {
          "score": 74.5,
          "metric": "accuracy",
          "agent_version": "v1.22.0",
          "submission_time": "2026-05-12T07:16:05+00:00",
          "cost_per_instance": 0.42,
          "average_runtime": 729.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-moonshot-kimi-k2-6/25710749383/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-moonshot-kimi-k2-6/25710749383/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/f9cb5c66-98fb-48d9-87d6-08d7b16e66c3",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 163,
            "resolved": 123,
            "missed": 42,
            "unresolved": 40,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.6/scores.json"
        },
        "swt-bench": {
          "score": 70.4,
          "metric": "accuracy",
          "agent_version": "v1.18.1",
          "submission_time": "2026-04-25T03:39:06+00:00",
          "cost_per_instance": 0.33,
          "average_runtime": 717.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-moonshot-kimi-k2-6/24901879531/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-moonshot-kimi-k2-6/24901879531/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/9a4d9991-37b4-44a1-acff-2057c6525748",
          "component_scores": null,
          "task_counts": {
            "total": 433,
            "submitted": 433,
            "completed": 431,
            "resolved": 305,
            "missed": 128,
            "unresolved": 126,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.6/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 41.2,
          "metric": "solveable_accuracy",
          "agent_version": "v1.21.1",
          "submission_time": "2026-05-15T19:26:14+00:00",
          "cost_per_instance": 0.64,
          "average_runtime": 746.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-moonshot-kimi-k2-6/25924060044/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-moonshot-kimi-k2-6/25924060044/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/bf318301-2c72-4fe2-a705-d104161d05c0",
          "component_scores": {
            "solveable_accuracy": 41.2,
            "unsolveable_accuracy": 0.0,
            "combined_accuracy": 27.5
          },
          "task_counts": {
            "total": 102,
            "submitted": 56,
            "completed": 56,
            "resolved": 28,
            "missed": 74,
            "unresolved": 28,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Kimi-K2.6/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 57.14,
      "score_range": 49.6,
      "score_stddev": 20.34,
      "ranks": {
        "swe-bench": 5,
        "commit0": 4,
        "gaia": 3,
        "swt-bench": 3,
        "swe-bench-multimodal": 2
      },
      "first_place_count": 0,
      "podium_count": 3
    },
    {
      "id": "deepseek-v3-2-reasoner",
      "label": "DeepSeek-V3.2-Reasoner",
      "source_path": "results/DeepSeek-V3.2-Reasoner",
      "scores": {
        "swe-bench": 71.6,
        "commit0": 25.0,
        "gaia": 50.3,
        "swt-bench": 53.6,
        "swe-bench-multimodal": 27.9
      },
      "details": {
        "swe-bench": {
          "score": 71.6,
          "metric": "accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-27T18:40:51.252521+00:00",
          "cost_per_instance": 0.16,
          "average_runtime": 1429.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-21386741317-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-27-17-23.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-21386741317-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-27-17-23/output.report.json",
          "eval_visualization_page": null,
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 358,
            "resolved": 358,
            "missed": 142,
            "unresolved": 142,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V3.2-Reasoner/scores.json"
        },
        "commit0": {
          "score": 25.0,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-28T08:57:17+00:00",
          "cost_per_instance": 0.57,
          "average_runtime": 1683.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-deepseek-deepseek-reasoner/25033123976/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-deepseek-deepseek-reasoner/25033123976/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/df76145a-e319-468e-ae2e-07f71208496f",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 14,
            "completed": 14,
            "resolved": 4,
            "missed": 12,
            "unresolved": 10,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V3.2-Reasoner/scores.json"
        },
        "gaia": {
          "score": 50.3,
          "metric": "accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-27T18:40:51.252521+00:00",
          "cost_per_instance": 0.06,
          "average_runtime": 427.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-21070491317-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-16-16-39.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-21070491317-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-16-16-39/output.report.json",
          "eval_visualization_page": null,
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 83,
            "resolved": 83,
            "missed": 82,
            "unresolved": 82,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V3.2-Reasoner/scores.json"
        },
        "swt-bench": {
          "score": 53.6,
          "metric": "accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-27T18:40:51.252521+00:00",
          "cost_per_instance": 0.12,
          "average_runtime": 1215.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-21233988879-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-24-02-34.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-21233988879-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-24-02-34/output.report.json",
          "eval_visualization_page": null,
          "component_scores": null,
          "task_counts": {
            "total": 433,
            "submitted": 433,
            "completed": 232,
            "resolved": 232,
            "missed": 201,
            "unresolved": 201,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V3.2-Reasoner/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 27.9,
          "metric": "solveable_accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-27T18:40:51.252521+00:00",
          "cost_per_instance": 0.19,
          "average_runtime": 1515.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-21345780997-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-26-11-33.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-21345780997-deepseek-v_litellm_proxy-deepseek-deepseek-reasoner_26-01-26-11-33/output.report.json",
          "eval_visualization_page": null,
          "component_scores": {
            "solveable_accuracy": 27.9,
            "unsolveable_accuracy": 0.0,
            "combined_accuracy": 18.6
          },
          "task_counts": {
            "total": 102,
            "submitted": 102,
            "completed": 28,
            "resolved": 28,
            "missed": 74,
            "unresolved": 74,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V3.2-Reasoner/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 45.68,
      "score_range": 46.6,
      "score_stddev": 17.32,
      "ranks": {
        "swe-bench": 7,
        "commit0": 4,
        "gaia": 6,
        "swt-bench": 7,
        "swe-bench-multimodal": 7
      },
      "first_place_count": 0,
      "podium_count": 0
    },
    {
      "id": "qwen3-coder-next",
      "label": "Qwen3-Coder-Next",
      "source_path": "results/Qwen3-Coder-Next",
      "scores": {
        "swe-bench": 66.6,
        "commit0": 25.0,
        "gaia": 50.9,
        "swt-bench": 45.7,
        "swe-bench-multimodal": 30.9
      },
      "details": {
        "swe-bench": {
          "score": 66.6,
          "metric": "accuracy",
          "agent_version": "v1.11.1",
          "submission_time": "2026-02-06T12:08:20+00:00",
          "cost_per_instance": 1.36,
          "average_runtime": 1445.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-openrouter-qwen-qwen3-coder-next/21713643251/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-openrouter-qwen-qwen3-coder-next/21713643251/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/68c415d3-db32-418b-b0b4-2030edc2216e",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 333,
            "resolved": 333,
            "missed": 167,
            "unresolved": 167,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-Next/scores.json"
        },
        "commit0": {
          "score": 25.0,
          "metric": "accuracy",
          "agent_version": "v1.11.5",
          "submission_time": "2026-02-05T16:58:27+00:00",
          "cost_per_instance": 1.04,
          "average_runtime": 751.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-openrouter-qwen-qwen3-coder-next/21713658799/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-openrouter-qwen-qwen3-coder-next/21713658799/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/0a1fbe3f-6704-42ad-8b8a-d598dbf493d8",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 16,
            "completed": 4,
            "resolved": 4,
            "missed": 12,
            "unresolved": 12,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-Next/scores.json"
        },
        "gaia": {
          "score": 50.9,
          "metric": "accuracy",
          "agent_version": "v1.11.5",
          "submission_time": "2026-02-10T22:34:57+00:00",
          "cost_per_instance": 0.13,
          "average_runtime": 487.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-openrouter-qwen-qwen3-coder-next/21862734213/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-openrouter-qwen-qwen3-coder-next/21862734213/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/04627eda-dae6-42d7-9533-669b5187640d",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 84,
            "resolved": 84,
            "missed": 81,
            "unresolved": 81,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-Next/scores.json"
        },
        "swt-bench": {
          "score": 45.7,
          "metric": "accuracy",
          "agent_version": "v1.22.0",
          "submission_time": "2026-05-17T04:31:46+00:00",
          "cost_per_instance": 1.1,
          "average_runtime": 1137.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-openrouter-qwen-qwen3-coder-next/25976432719/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-openrouter-qwen-qwen3-coder-next/25976432719/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/a9302f07-92a9-48cb-9964-d91280be4d28",
          "component_scores": null,
          "task_counts": {
            "total": 424,
            "submitted": 424,
            "completed": 399,
            "resolved": 198,
            "missed": 226,
            "unresolved": 201,
            "empty_patch": 0,
            "error": 25,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-Next/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 30.9,
          "metric": "solveable_accuracy",
          "agent_version": "v1.11.0",
          "submission_time": "2026-02-07T04:57:05+00:00",
          "cost_per_instance": 1.52,
          "average_runtime": 1589.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-openrouter-qwen-qwen3-coder-next/21759113321/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-openrouter-qwen-qwen3-coder-next/21759113321/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/8964f6e6-fcbd-4f26-a1ce-9fc657b8da43",
          "component_scores": {
            "solveable_accuracy": 30.9,
            "unsolveable_accuracy": 2.9,
            "combined_accuracy": 21.6
          },
          "task_counts": {
            "total": 102,
            "submitted": 102,
            "completed": 32,
            "resolved": 32,
            "missed": 70,
            "unresolved": 70,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-Next/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 43.82,
      "score_range": 41.6,
      "score_stddev": 14.79,
      "ranks": {
        "swe-bench": 8,
        "commit0": 4,
        "gaia": 5,
        "swt-bench": 8,
        "swe-bench-multimodal": 6
      },
      "first_place_count": 0,
      "podium_count": 0
    },
    {
      "id": "minimax-m2-7",
      "label": "MiniMax-M2.7",
      "source_path": "results/MiniMax-M2.7",
      "scores": {
        "swe-bench": 75.6,
        "commit0": 18.8,
        "gaia": 25.5,
        "swt-bench": 69.1,
        "swe-bench-multimodal": 27.9
      },
      "details": {
        "swe-bench": {
          "score": 75.6,
          "metric": "accuracy",
          "agent_version": "v1.14.0",
          "submission_time": "2026-03-23T23:35:12+00:00",
          "cost_per_instance": 0.1795,
          "average_runtime": 529.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-minimax-MiniMax-M2-7/23463806447/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-minimax-MiniMax-M2-7/23463806447/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/a248d81f-d8d0-4823-9853-0378eed4dcc4",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 499,
            "resolved": 378,
            "missed": 122,
            "unresolved": 121,
            "empty_patch": 1,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/MiniMax-M2.7/scores.json"
        },
        "commit0": {
          "score": 18.8,
          "metric": "accuracy",
          "agent_version": "v1.17.0",
          "submission_time": "2026-04-27T22:04:27+00:00",
          "cost_per_instance": 0.8926,
          "average_runtime": 1621.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-minimax-MiniMax-M2-7/25008721830/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-minimax-MiniMax-M2-7/25008721830/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/081a0b7f-fef2-4dad-a267-49f90b2fc866",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 11,
            "completed": 11,
            "resolved": 3,
            "missed": 13,
            "unresolved": 8,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/MiniMax-M2.7/scores.json"
        },
        "gaia": {
          "score": 25.5,
          "metric": "accuracy",
          "agent_version": "v1.16.0",
          "submission_time": "2026-04-01T22:22:23+00:00",
          "cost_per_instance": 0.2163,
          "average_runtime": 676.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-minimax-MiniMax-M2-7/23855930236/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-minimax-MiniMax-M2-7/23855930236/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/6839ba33-64fc-4b43-8ec2-e0c18f2f94bf",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 165,
            "resolved": 42,
            "missed": 123,
            "unresolved": 123,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/MiniMax-M2.7/scores.json"
        },
        "swt-bench": {
          "score": 69.1,
          "metric": "accuracy",
          "agent_version": "v1.15.0",
          "submission_time": "2026-04-06T18:38:26+00:00",
          "cost_per_instance": 0.1283,
          "average_runtime": 352.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-minimax-MiniMax-M2-7/24039895569/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-minimax-MiniMax-M2-7/24039895569/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/f42deebe-f174-41f7-96e8-3e2fbc8a61d7",
          "component_scores": null,
          "task_counts": {
            "total": 433,
            "submitted": 433,
            "completed": 431,
            "resolved": 299,
            "missed": 134,
            "unresolved": 132,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/MiniMax-M2.7/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 27.9,
          "metric": "solveable_accuracy",
          "agent_version": "v1.14.0",
          "submission_time": "2026-03-21T07:29:33+00:00",
          "cost_per_instance": 0.388,
          "average_runtime": 1084.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-minimax-MiniMax-M2-7/23369175877/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-minimax-MiniMax-M2-7/23369175877/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/161dd621-b70d-4089-afcf-ea2e3d13e874",
          "component_scores": {
            "solveable_accuracy": 27.9,
            "unsolveable_accuracy": 2.9,
            "combined_accuracy": 19.6
          },
          "task_counts": {
            "total": 102,
            "submitted": 102,
            "completed": 98,
            "resolved": 20,
            "missed": 82,
            "unresolved": 78,
            "empty_patch": 4,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/MiniMax-M2.7/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 43.38,
      "score_range": 56.8,
      "score_stddev": 23.93,
      "ranks": {
        "swe-bench": 3,
        "commit0": 7,
        "gaia": 9,
        "swt-bench": 5,
        "swe-bench-multimodal": 7
      },
      "first_place_count": 0,
      "podium_count": 1
    },
    {
      "id": "deepseek-v4-pro",
      "label": "DeepSeek-V4-Pro",
      "source_path": "results/DeepSeek-V4-Pro",
      "scores": {
        "swe-bench": 73.2,
        "commit0": 12.5,
        "gaia": 12.7,
        "swt-bench": 68.1,
        "swe-bench-multimodal": 36.8
      },
      "details": {
        "swe-bench": {
          "score": 73.2,
          "metric": "accuracy",
          "agent_version": "v1.22.1",
          "submission_time": "2026-05-16T17:12:48+00:00",
          "cost_per_instance": 0.0395,
          "average_runtime": 751.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-deepseek-deepseek-v4-pro/25967325971/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-deepseek-deepseek-v4-pro/25967325971/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/bec3b865-3408-4160-9d6a-c3830854c14e",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 499,
            "resolved": 366,
            "missed": 134,
            "unresolved": 133,
            "empty_patch": 1,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V4-Pro/scores.json"
        },
        "commit0": {
          "score": 12.5,
          "metric": "accuracy",
          "agent_version": "v1.22.1",
          "submission_time": "2026-05-17T05:01:37+00:00",
          "cost_per_instance": 0.1577,
          "average_runtime": 1805.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-deepseek-deepseek-v4-pro/25976440104/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-deepseek-deepseek-v4-pro/25976440104/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/413fa09a-4b62-451f-9139-9d140a4d108c",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 7,
            "completed": 7,
            "resolved": 2,
            "missed": 14,
            "unresolved": 5,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V4-Pro/scores.json"
        },
        "gaia": {
          "score": 12.7,
          "metric": "accuracy",
          "agent_version": "v1.22.1",
          "submission_time": "2026-05-20T19:36:39+00:00",
          "cost_per_instance": 0.1594,
          "average_runtime": 422.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-deepseek-deepseek-v4-pro/26178826257/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-deepseek-deepseek-v4-pro/26178826257/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/ae011071-8444-4be2-87f3-99fde238eff1",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 165,
            "resolved": 21,
            "missed": 144,
            "unresolved": 144,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V4-Pro/scores.json"
        },
        "swt-bench": {
          "score": 68.1,
          "metric": "accuracy",
          "agent_version": "v1.22.1",
          "submission_time": "2026-05-16T19:31:10+00:00",
          "cost_per_instance": 0.0354,
          "average_runtime": 589.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-deepseek-deepseek-v4-pro/25967349971/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-deepseek-deepseek-v4-pro/25967349971/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/4e693e26-5442-4d6a-9ee4-bdd26fc39213",
          "component_scores": null,
          "task_counts": {
            "total": 420,
            "submitted": 420,
            "completed": 418,
            "resolved": 295,
            "missed": 125,
            "unresolved": 123,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V4-Pro/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 36.8,
          "metric": "solveable_accuracy",
          "agent_version": "v1.22.1",
          "submission_time": "2026-05-16T23:02:48+00:00",
          "cost_per_instance": 0.3746,
          "average_runtime": 1034.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-deepseek-deepseek-v4-pro/25967365988/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-deepseek-deepseek-v4-pro/25967365988/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/926fc133-2a36-4c9c-b40b-353aa98057a9",
          "component_scores": {
            "solveable_accuracy": 36.8,
            "unsolveable_accuracy": 0.0,
            "combined_accuracy": 24.5
          },
          "task_counts": {
            "total": 102,
            "submitted": 68,
            "completed": 68,
            "resolved": 25,
            "missed": 77,
            "unresolved": 43,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/DeepSeek-V4-Pro/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 40.66,
      "score_range": 60.7,
      "score_stddev": 26.08,
      "ranks": {
        "swe-bench": 6,
        "commit0": 8,
        "gaia": 10,
        "swt-bench": 6,
        "swe-bench-multimodal": 5
      },
      "first_place_count": 0,
      "podium_count": 0
    },
    {
      "id": "nemotron-3-super",
      "label": "Nemotron-3-Super",
      "source_path": "results/Nemotron-3-Super",
      "scores": {
        "swe-bench": 62.0,
        "commit0": 12.5,
        "gaia": 40.0,
        "swt-bench": 45.7,
        "swe-bench-multimodal": 20.6
      },
      "details": {
        "swe-bench": {
          "score": 62.0,
          "metric": "accuracy",
          "agent_version": "v1.16.1",
          "submission_time": "2026-04-09T07:52:01+00:00",
          "cost_per_instance": 0.4663,
          "average_runtime": 874.0,
          "full_archive": "https://results.eval.all-hands.dev/swebench/litellm_proxy-converse-nemotron-super-3-120b/24135041475/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebench/litellm_proxy-converse-nemotron-super-3-120b/24135041475/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/054f0361-d26c-4466-82ae-042503b93f2e",
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 499,
            "completed": 497,
            "resolved": 310,
            "missed": 190,
            "unresolved": 187,
            "empty_patch": 0,
            "error": 2,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Nemotron-3-Super/scores.json"
        },
        "commit0": {
          "score": 12.5,
          "metric": "accuracy",
          "agent_version": "v1.16.1",
          "submission_time": "2026-04-09T23:08:31+00:00",
          "cost_per_instance": 1.2153,
          "average_runtime": 2905.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-converse-nemotron-super-3-120b/24197990049/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-converse-nemotron-super-3-120b/24197990049/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/ba725a00-2947-484f-9dad-951071d34c3d",
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 9,
            "completed": 9,
            "resolved": 2,
            "missed": 14,
            "unresolved": 7,
            "empty_patch": 0,
            "error": 0,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Nemotron-3-Super/scores.json"
        },
        "gaia": {
          "score": 40.0,
          "metric": "accuracy",
          "agent_version": "v1.16.1",
          "submission_time": "2026-04-09T21:31:04+00:00",
          "cost_per_instance": 0.1206,
          "average_runtime": 527.0,
          "full_archive": "https://results.eval.all-hands.dev/gaia/litellm_proxy-converse-nemotron-super-3-120b/24197982616/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/gaia/litellm_proxy-converse-nemotron-super-3-120b/24197982616/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/83b65b31-9799-4019-844c-815151e4798e",
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 127,
            "resolved": 66,
            "missed": 99,
            "unresolved": 61,
            "empty_patch": 0,
            "error": 38,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Nemotron-3-Super/scores.json"
        },
        "swt-bench": {
          "score": 45.7,
          "metric": "accuracy",
          "agent_version": "v1.16.1",
          "submission_time": "2026-04-09T05:03:09+00:00",
          "cost_per_instance": 0.3333,
          "average_runtime": 1027.0,
          "full_archive": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-converse-nemotron-super-3-120b/24106920313/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swtbench/litellm_proxy-converse-nemotron-super-3-120b/24106920313/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/01e58390-f947-4dcc-8d34-5e8c61bd3788",
          "component_scores": null,
          "task_counts": {
            "total": 429,
            "submitted": 429,
            "completed": 425,
            "resolved": 198,
            "missed": 231,
            "unresolved": 227,
            "empty_patch": 0,
            "error": 4,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Nemotron-3-Super/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 20.6,
          "metric": "solveable_accuracy",
          "agent_version": "v1.16.1",
          "submission_time": "2026-04-10T01:36:28+00:00",
          "cost_per_instance": 0.7679,
          "average_runtime": 1311.0,
          "full_archive": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-converse-nemotron-super-3-120b/24197975725/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/swebenchmultimodal/litellm_proxy-converse-nemotron-super-3-120b/24197975725/output.report.json",
          "eval_visualization_page": "https://laminar.sh/shared/evals/44cc701e-6ecf-4c70-9cca-4246cbd402f4",
          "component_scores": {
            "solveable_accuracy": 20.6,
            "unsolveable_accuracy": 0.0,
            "combined_accuracy": 13.7
          },
          "task_counts": {
            "total": 102,
            "submitted": 68,
            "completed": 66,
            "resolved": 14,
            "missed": 88,
            "unresolved": 52,
            "empty_patch": 1,
            "error": 1,
            "inferred": 0
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Nemotron-3-Super/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 36.16,
      "score_range": 49.5,
      "score_stddev": 17.75,
      "ranks": {
        "swe-bench": 10,
        "commit0": 8,
        "gaia": 7,
        "swt-bench": 8,
        "swe-bench-multimodal": 10
      },
      "first_place_count": 0,
      "podium_count": 0
    },
    {
      "id": "qwen3-coder-480b",
      "label": "Qwen3-Coder-480B",
      "source_path": "results/Qwen3-Coder-480B",
      "scores": {
        "swe-bench": 62.4,
        "commit0": 0.0,
        "gaia": 33.9,
        "swt-bench": 34.9,
        "swe-bench-multimodal": 23.5
      },
      "details": {
        "swe-bench": {
          "score": 62.4,
          "metric": "accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-26T15:55:58.082973+00:00",
          "cost_per_instance": 1.26,
          "average_runtime": 680.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-20979851181-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-14-09-02.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-20979851181-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-14-09-02/output.report.json",
          "eval_visualization_page": null,
          "component_scores": null,
          "task_counts": {
            "total": 500,
            "submitted": 500,
            "completed": 312,
            "resolved": 312,
            "missed": 188,
            "unresolved": 188,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-480B/scores.json"
        },
        "commit0": {
          "score": 0.0,
          "metric": "accuracy",
          "agent_version": "v1.11.0",
          "submission_time": "2026-02-17T15:35:19+00:00",
          "cost_per_instance": 0.01,
          "average_runtime": 1.0,
          "full_archive": "https://results.eval.all-hands.dev/commit0/litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct/22104205466/results.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/commit0/litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct/22104205466/output.report.json",
          "eval_visualization_page": null,
          "component_scores": null,
          "task_counts": {
            "total": 16,
            "submitted": 16,
            "completed": 0,
            "resolved": 0,
            "missed": 16,
            "unresolved": 16,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-480B/scores.json"
        },
        "gaia": {
          "score": 33.9,
          "metric": "accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-26T15:55:58.082973+00:00",
          "cost_per_instance": 0.28,
          "average_runtime": 197.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-21093373009-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-17-12-54.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-21093373009-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-17-12-54/output.report.json",
          "eval_visualization_page": null,
          "component_scores": null,
          "task_counts": {
            "total": 165,
            "submitted": 165,
            "completed": 56,
            "resolved": 56,
            "missed": 109,
            "unresolved": 109,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-480B/scores.json"
        },
        "swt-bench": {
          "score": 34.9,
          "metric": "accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-26T15:55:58.082973+00:00",
          "cost_per_instance": 0.97,
          "average_runtime": 626.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-21179579508-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-21-01-51.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-21179579508-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-21-01-51/output.report.json",
          "eval_visualization_page": null,
          "component_scores": null,
          "task_counts": {
            "total": 433,
            "submitted": 433,
            "completed": 151,
            "resolved": 151,
            "missed": 282,
            "unresolved": 282,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-480B/scores.json"
        },
        "swe-bench-multimodal": {
          "score": 23.5,
          "metric": "solveable_accuracy",
          "agent_version": "v1.8.3",
          "submission_time": "2026-01-26T15:55:58.082973+00:00",
          "cost_per_instance": 2.09,
          "average_runtime": 1006.0,
          "full_archive": "https://results.eval.all-hands.dev/eval-21357041327-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-26-15-08.tar.gz",
          "report_url": "https://results.eval.all-hands.dev/eval-21357041327-qwen-3-cod_litellm_proxy-fireworks_ai-qwen3-coder-480b-a35b-instruct_26-01-26-15-08/output.report.json",
          "eval_visualization_page": null,
          "component_scores": {
            "solveable_accuracy": 23.5,
            "unsolveable_accuracy": 5.9,
            "combined_accuracy": 17.6
          },
          "task_counts": {
            "total": 102,
            "submitted": 102,
            "completed": 24,
            "resolved": 24,
            "missed": 78,
            "unresolved": 78,
            "empty_patch": 0,
            "error": 0,
            "inferred": 1
          },
          "source_url": "https://raw.githubusercontent.com/OpenHands/openhands-index-results/main/results/Qwen3-Coder-480B/scores.json"
        }
      },
      "coverage": 5,
      "mean_score": 30.94,
      "score_range": 62.4,
      "score_stddev": 20.13,
      "ranks": {
        "swe-bench": 9,
        "commit0": 10,
        "gaia": 8,
        "swt-bench": 10,
        "swe-bench-multimodal": 9
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
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 81.6
        },
        {
          "rank": 2,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 78.2
        },
        {
          "rank": 3,
          "model_id": "minimax-m2-7",
          "model": "MiniMax-M2.7",
          "score": 75.6
        },
        {
          "rank": 4,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 75.0
        },
        {
          "rank": 5,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 74.6
        },
        {
          "rank": 6,
          "model_id": "deepseek-v4-pro",
          "model": "DeepSeek-V4-Pro",
          "score": 73.2
        },
        {
          "rank": 7,
          "model_id": "deepseek-v3-2-reasoner",
          "model": "DeepSeek-V3.2-Reasoner",
          "score": 71.6
        },
        {
          "rank": 8,
          "model_id": "qwen3-coder-next",
          "model": "Qwen3-Coder-Next",
          "score": 66.6
        },
        {
          "rank": 9,
          "model_id": "qwen3-coder-480b",
          "model": "Qwen3-Coder-480B",
          "score": 62.4
        },
        {
          "rank": 10,
          "model_id": "nemotron-3-super",
          "model": "Nemotron-3-Super",
          "score": 62.0
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 81.6
        },
        {
          "rank": 2,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 78.2
        },
        {
          "rank": 3,
          "model_id": "minimax-m2-7",
          "model": "MiniMax-M2.7",
          "score": 75.6
        }
      ]
    },
    {
      "benchmark": "commit0",
      "rankings": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 56.2
        },
        {
          "rank": 2,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 43.8
        },
        {
          "rank": 3,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 37.5
        },
        {
          "rank": 4,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 25.0
        },
        {
          "rank": 4,
          "model_id": "deepseek-v3-2-reasoner",
          "model": "DeepSeek-V3.2-Reasoner",
          "score": 25.0
        },
        {
          "rank": 4,
          "model_id": "qwen3-coder-next",
          "model": "Qwen3-Coder-Next",
          "score": 25.0
        },
        {
          "rank": 7,
          "model_id": "minimax-m2-7",
          "model": "MiniMax-M2.7",
          "score": 18.8
        },
        {
          "rank": 8,
          "model_id": "deepseek-v4-pro",
          "model": "DeepSeek-V4-Pro",
          "score": 12.5
        },
        {
          "rank": 8,
          "model_id": "nemotron-3-super",
          "model": "Nemotron-3-Super",
          "score": 12.5
        },
        {
          "rank": 10,
          "model_id": "qwen3-coder-480b",
          "model": "Qwen3-Coder-480B",
          "score": 0.0
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 56.2
        },
        {
          "rank": 2,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 43.8
        },
        {
          "rank": 3,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 37.5
        }
      ]
    },
    {
      "benchmark": "gaia",
      "rankings": [
        {
          "rank": 1,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 86.1
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 81.2
        },
        {
          "rank": 3,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 74.5
        },
        {
          "rank": 4,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 67.3
        },
        {
          "rank": 5,
          "model_id": "qwen3-coder-next",
          "model": "Qwen3-Coder-Next",
          "score": 50.9
        },
        {
          "rank": 6,
          "model_id": "deepseek-v3-2-reasoner",
          "model": "DeepSeek-V3.2-Reasoner",
          "score": 50.3
        },
        {
          "rank": 7,
          "model_id": "nemotron-3-super",
          "model": "Nemotron-3-Super",
          "score": 40.0
        },
        {
          "rank": 8,
          "model_id": "qwen3-coder-480b",
          "model": "Qwen3-Coder-480B",
          "score": 33.9
        },
        {
          "rank": 9,
          "model_id": "minimax-m2-7",
          "model": "MiniMax-M2.7",
          "score": 25.5
        },
        {
          "rank": 10,
          "model_id": "deepseek-v4-pro",
          "model": "DeepSeek-V4-Pro",
          "score": 12.7
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 86.1
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 81.2
        },
        {
          "rank": 3,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 74.5
        }
      ]
    },
    {
      "benchmark": "swt-bench",
      "rankings": [
        {
          "rank": 1,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 83.4
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 80.8
        },
        {
          "rank": 3,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 70.4
        },
        {
          "rank": 4,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 70.2
        },
        {
          "rank": 5,
          "model_id": "minimax-m2-7",
          "model": "MiniMax-M2.7",
          "score": 69.1
        },
        {
          "rank": 6,
          "model_id": "deepseek-v4-pro",
          "model": "DeepSeek-V4-Pro",
          "score": 68.1
        },
        {
          "rank": 7,
          "model_id": "deepseek-v3-2-reasoner",
          "model": "DeepSeek-V3.2-Reasoner",
          "score": 53.6
        },
        {
          "rank": 8,
          "model_id": "qwen3-coder-next",
          "model": "Qwen3-Coder-Next",
          "score": 45.7
        },
        {
          "rank": 8,
          "model_id": "nemotron-3-super",
          "model": "Nemotron-3-Super",
          "score": 45.7
        },
        {
          "rank": 10,
          "model_id": "qwen3-coder-480b",
          "model": "Qwen3-Coder-480B",
          "score": 34.9
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 83.4
        },
        {
          "rank": 2,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 80.8
        },
        {
          "rank": 3,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 70.4
        }
      ]
    },
    {
      "benchmark": "swe-bench-multimodal",
      "rankings": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 48.5
        },
        {
          "rank": 2,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 41.2
        },
        {
          "rank": 2,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 41.2
        },
        {
          "rank": 4,
          "model_id": "gpt-5-5",
          "model": "GPT-5.5",
          "score": 38.2
        },
        {
          "rank": 5,
          "model_id": "deepseek-v4-pro",
          "model": "DeepSeek-V4-Pro",
          "score": 36.8
        },
        {
          "rank": 6,
          "model_id": "qwen3-coder-next",
          "model": "Qwen3-Coder-Next",
          "score": 30.9
        },
        {
          "rank": 7,
          "model_id": "minimax-m2-7",
          "model": "MiniMax-M2.7",
          "score": 27.9
        },
        {
          "rank": 7,
          "model_id": "deepseek-v3-2-reasoner",
          "model": "DeepSeek-V3.2-Reasoner",
          "score": 27.9
        },
        {
          "rank": 9,
          "model_id": "qwen3-coder-480b",
          "model": "Qwen3-Coder-480B",
          "score": 23.5
        },
        {
          "rank": 10,
          "model_id": "nemotron-3-super",
          "model": "Nemotron-3-Super",
          "score": 20.6
        }
      ],
      "top_podium": [
        {
          "rank": 1,
          "model_id": "claude-opus-4-7",
          "model": "claude-opus-4-7",
          "score": 48.5
        },
        {
          "rank": 2,
          "model_id": "glm-5-1",
          "model": "GLM-5.1",
          "score": 41.2
        },
        {
          "rank": 2,
          "model_id": "kimi-k2-6",
          "model": "Kimi-K2.6",
          "score": 41.2
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
