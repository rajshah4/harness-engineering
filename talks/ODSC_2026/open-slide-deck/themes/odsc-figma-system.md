# ODSC Harness Engineering: Figma ↔ Open Slide system

Figma is the visual-composition workspace for this deck. Open Slide remains the
presentation source of truth for the final live deck, including animations,
progressive reveals, speaker notes, source links, and reproducible assets.

When a slide is approved in Figma, recreate its layout in
`slides/odsc-harness-engineering/index.tsx`; do not treat Figma as an export-only
source. Preserve the slide's source image, link, and notes in the repo.

## Figma template style

File template style: **ODSC Harness Engineering**

| Use | Figma style | Size |
| --- | --- | ---: |
| Section open / workshop divider | Section heading | 104 px |
| Normal slide headline | Content heading | 66 px |
| Supporting statement | Subhead | 42 px |
| Explanatory copy | Body | 30 px |
| Kicker, source, footer | Kicker and footer | 19 px |

Typeface: Inter in Figma. Map to the closest available Open Slide web font only
when the slide is rebuilt; do not let an implementation constraint change the
approved visual hierarchy.

## Shared palette

| Token | Hex | Use |
| --- | --- | --- |
| Text | `#03030C` | Primary type, high-contrast rules |
| Canvas | `#F9F1D9` | Default warm background |
| Accent | `#2E70FF` | Data emphasis, links, selected state |
| Muted | `#767880` | Secondary type and source lines |
| Rule | `#C9C1AA` | Dividers and quiet structure |
| Orange | `#F05A24` | Warnings / contrasting data series |
| Green | `#4F8F45` | Positive results / alternative series |
| Purple | `#795CA5` | Third data series / categorical emphasis |

## Rebuild contract

- Keep the layout deliberately simple enough to present live: one idea per slide,
  one visual proof point, and restrained supporting copy.
- Screenshots of benchmark sources are evidence, not decoration. Keep a readable
  source URL in speaker notes or a discreet source line.
- Figma template colors are the editable presentation-level color system. If a
  later workflow requires native Figma Variables, create them with the same token
  names and hex values above; do not introduce a second palette.
