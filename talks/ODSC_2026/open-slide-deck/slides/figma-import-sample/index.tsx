import type { Page, SlideMeta } from '@open-slide/core';
import odscPages from '../odsc-harness-engineering';

// Six real opening pages for testing what Figma preserves on PDF import.
export const meta: SlideMeta = {
  title: 'ODSC — Figma import sample',
  createdAt: '2026-09-01T02:26:59.146Z',
};

export default odscPages.slice(0, 6) satisfies Page[];
