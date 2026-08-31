# open-slide workspace

Slides as React components. Each slide lives under `slides/<id>/index.tsx` and default-exports an array of page components. The `@open-slide/core` runtime handles layout, scaling, navigation, thumbnails, and fullscreen play mode — you just write the pages.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open the dev server and edit `slides/getting-started/index.tsx`, or create a new slide at `slides/<your-slide>/index.tsx`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload. |
| `pnpm build` | Build a static bundle you can deploy. |
| `pnpm preview` | Preview the built bundle locally. |

## Authoring a slide

```tsx
// slides/my-slide/index.tsx
import type { Page, SlideMeta } from '@open-slide/core';

const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%' }}>Hello</div>
);

export const meta: SlideMeta = { title: 'My slide' };
export default [Cover] satisfies Page[];
```

Every page renders into a fixed **1920 × 1080** canvas — design with absolute pixel values. Put images, videos, and fonts under `slides/<id>/assets/` and import them directly.

See [`CLAUDE.md`](./CLAUDE.md) for the full authoring guide.

## ODSC deck header system

The ODSC Harness Engineering deck uses three deliberate headline tiers:

- Native content and evidence slides: 66px, weight 850, line height 1.04,
  letter spacing -0.038em, 12px below the kicker.
- Section and workshop-claim slides: larger display type because the headline
  is the whole slide.
- Workshop result slides: smaller claim type so the finding, metrics, and
  caveat remain readable.

Use the shared `contentTitleStyle` token for every new native content slide.
Imported source-image slides retain their original typography until they are
rebuilt as native slides.

The footer always uses the shared `RajisticsWordmark` component: editable
`@rajistics` text set in Orbitron Regular at 31px, inside a 170 × 40px frame,
48px from the left and 34px from the bottom. Do not replace it with a raster
logo. `SourcePage` overlays the same text component on imported slides, and
both native deck files use it in their footer component.

## Navigation

- Arrow keys / PageUp / PageDown move between pages.
- `F` enters fullscreen play mode; Esc exits.
- In play mode: Space / → next, ← prev.

## Claude Code integration

This workspace ships with Claude Code skills preconfigured under `.claude/skills/` and `.agents/skills/`. Ask Claude Code to "make slides about X" and the `create-slide` skill takes over. Use `apply-comments` to iterate via inspector-style markers inside your source.

## Config

Optional `open-slide.config.ts` at the workspace root:

```ts
import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  port: 5173,
};

export default openSlideConfig;
```

Supported fields: `slidesDir`, `port`.
