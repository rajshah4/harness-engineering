# Applied Compute and turbopuffer: trained code search

Source: [Training a Specialist Code Search Agent with turbopuffer](https://www.appliedcompute.com/case-studies/turbopuffer)

Published: September 4, 2026

Status: Strong example and useful visual source. It is a vendor-authored case study, so attribute the measurements and avoid presenting them as a universal benchmark result.

## Why it belongs in the deck

This source connects three workshop ideas that otherwise risk feeling separate:

1. The tool environment is part of what the model learns.
2. Retrieval design changes latency, token use, and cost.
3. The right search harness depends on workload scale, not just benchmark accuracy.

## Reported findings worth preserving

- A 15x increase in corpus size increased ripgrep latency by 11x, while turbopuffer search latency increased by 1.2x.
- A small model trained to use search tools over precomputed indexes ran search tasks at up to 100x lower token cost than frontier models.
- In the authors' large-scale setting, the indexed-search approach made median search nearly 3x faster and cut the marginal cost of a search by 100x.
- The article explicitly says filesystem primitives remain effective for frontier models in a single-repository setting. The advantage appears when workloads involve many searches over large volumes of code.

## Important caveats

- The results are reported by Applied Compute in collaboration with a search-infrastructure provider.
- Precomputed indexes move compute to write time. The write-to-read ratio and corpus churn determine whether that investment pays off.
- BM25, dense vectors, late interaction, and query expansion have different storage and inference costs.
- Do not reduce the takeaway to “vector search beats grep.” The stronger claim is that workload scale can justify training and serving a different search policy.

## Proposed slide uses

### Workshop 1: model and harness co-adaptation

Headline: **Models learn the harness they train against**

Use this as the concrete example behind the abstract claim that tool schemas and loop behavior can become part of post-training.

### Workshop 3: context and retrieval

Headline: **At codebase scale, train the search behavior too**

Use the original latency-versus-corpus figure. Add only one explanatory boundary: frontier model plus filesystem search for one repository; trained specialist plus index for repeated search over a large corpus.

## Visual assets to return to

- Article hero image: `https://cdn.sanity.io/images/rda7lbmb/production/3f831b42a8fd5a63fbb8a6a1c01dd583a3a206c0-7680x4320.png?w=1200&q=90&auto=format`
- Latency figure: `https://cdn.sanity.io/images/rda7lbmb/production/db484c4f48d4a8a510b15c7c52a32ae68de4e7d5-1920x1199.svg`
- Interactive demonstration: [codesearch.appliedcompute.com](https://codesearch.appliedcompute.com/)

