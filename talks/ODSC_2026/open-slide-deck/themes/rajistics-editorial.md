---
name: Rajistics Editorial
description: Warm technical editorial slides with cream paper, near-black type, and evidence-led color.
mode: light
---

# Rajistics Editorial

## Palette

| Role | Value | Notes |
| --- | --- | --- |
| bg | `#F9F1D9` | warm cream canvas inherited from the Google Slides master |
| text | `#03030C` | near-black primary copy |
| accent | `#2E70FF` | primary evidence and technical-system accent |
| muted | `#767880` | secondary copy, labels, and rules |
| orange | `#F05A24` | action, iteration, and benchmark emphasis |
| green | `#4F8F45` | verification and successful outcomes |
| purple | `#795CA5` | feedback, memory, and observation |

## Typography

- Display font: `"Open Sans", Arial, sans-serif` — weight 700–800 for headlines.
- Body font: `"Open Sans", Arial, sans-serif` — weight 400–600.
- Hero title: 142 px.
- Page heading: 76 px.
- Body text: 38 px.
- Caption / source: 22–24 px.

## Layout

- Fixed canvas: 1920 × 1080.
- Content padding: 136 px from left and right edges, 100 px vertically.
- Alignment: editorial left alignment by default; centered only for questions, section turns, and conclusions.
- Data slides give the evidence at least two-thirds of the canvas and keep citations close to the lower edge.
- Preserve generous negative space; do not replace it with dashboard cards or decorative UI chrome.

## Live-presentation constraint

- Design for a presenter speaking over the slide, not for silent close reading.
- One audience-facing claim and one dominant visual per page.
- Show at most three supporting facts; move mechanisms, methodology, and caveats into speaker notes unless the audience must see them.
- Prefer a single large comparison, chart, screenshot, or number over multi-part process diagrams.
- Keep important labels at 28 px or larger and body copy at 32 px or larger; sources and short caveats may be smaller.
- If a viewer needs more than five seconds to find the point, simplify or split the slide.

## Rajiv's spoken voice

- Write headlines as complete thoughts Rajiv could say naturally while teaching.
- Lead with the concrete observation, company, or number. Let the audience draw the larger lesson with him.
- Avoid binary contrast templates such as “not X, but Y,” slogan-like fragments, balanced reversals, and repeated two-sentence punchlines.
- Prefer a clear actor and verb: “OpenAI changed two harness settings” beats “The harness changed everything.”
- Keep useful roughness. Do not polish every headline into advertising copy.
- Use no em dashes or en dashes. Rewrite with commas, periods, or a direct sentence.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      margin: 0,
      color: '#03030C',
      fontFamily: '"Open Sans", Arial, sans-serif',
      fontSize: 76,
      fontWeight: 800,
      lineHeight: 1.08,
      letterSpacing: '-0.025em',
    }}
  >
    {children}
  </h1>
);
```

### Footer

```tsx
const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 48,
        right: 72,
        bottom: 34,
        display: 'flex',
        justifyContent: 'space-between',
        color: '#A7A6A0',
        fontFamily: '"Open Sans", Arial, sans-serif',
        fontSize: 22,
      }}
    >
      <span>@rajistics</span>
      <span>{String(current).padStart(3, '0')} / {String(total).padStart(3, '0')}</span>
    </div>
  );
};
```

### Eyebrow / accents

```tsx
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: '#2E70FF',
      fontFamily: '"Open Sans", Arial, sans-serif',
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);
```

## Motion

- Philosophy: subtle — use short opacity-and-position transitions only when they clarify a causal sequence or workshop beat.
- Keep entrance movement under 12 px and between 160–240 ms; static pages remain the default.

## Aesthetic

Technical editorial rather than product UI: warm paper, large declarative headlines, charts and source material treated as primary evidence, and restrained system colors that carry meaning. It should feel like a rigorous research notebook enlarged for a stage. Avoid gradients, glass effects, rounded card grids, decorative emoji, and generic AI imagery.

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#F9F1D9', color: '#03030C', padding: 136, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>ODSC EAST 2026</Eyebrow>
    <Title>Engineering the Harness</Title>
    <p style={{ margin: '28px 0 0', maxWidth: 1100, fontSize: 42, lineHeight: 1.4 }}>
      A practical workshop on the systems around coding models.
    </p>
    <Footer />
  </div>
);
```
