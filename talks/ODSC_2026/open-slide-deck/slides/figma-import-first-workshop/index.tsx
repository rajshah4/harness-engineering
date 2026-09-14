import type { Page, SlideMeta } from '@open-slide/core';
import odscPages from '../odsc-harness-engineering';

// A small, deliberately frozen export surface for Figma. It reuses the
// authoritative ODSC pages rather than copying or restyling their content.
export const meta: SlideMeta = {
  title: 'ODSC — Figma import: opening through Workshop 1',
  createdAt: '2026-09-01T02:22:31.899Z',
};

export default odscPages.slice(0, 30) satisfies Page[];
