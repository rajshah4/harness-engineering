import type { ReactNode } from 'react';
import { type DesignSystem, type Page, useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#F9F1D9', text: '#03030C', accent: '#2E70FF' },
  fonts: {
    display: '"Open Sans", Arial, sans-serif',
    body: '"Open Sans", Arial, sans-serif',
  },
  typeScale: { hero: 142, body: 38 },
  radius: 8,
};

const muted = '#767880';
const orange = '#F05A24';

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

const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 136, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'var(--osd-font-body)' }}>
    <Eyebrow>ODSC EAST 2026</Eyebrow>
    <h1 style={{ margin: '30px 0 0', maxWidth: 1350, fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.035em' }}>
      Engineering the Harness
    </h1>
    <p style={{ margin: '30px 0 0', maxWidth: 1050, color: muted, fontSize: 42, lineHeight: 1.4 }}>
      A practical workshop on the systems around coding models.
    </p>
    <Footer />
  </div>
);

const Evidence: Page = () => (
  <div style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '104px 136px', fontFamily: 'var(--osd-font-body)' }}>
    <Title>Evidence should carry the slide.</Title>
    <div style={{ marginTop: 90, display: 'flex', alignItems: 'flex-end', gap: 36, height: 520 }}>
      <div style={{ width: 260, height: 160, background: '#C2DBFF' }} />
      <div style={{ width: 260, height: 290, background: '#73A5FF' }} />
      <div style={{ width: 260, height: 410, background: 'var(--osd-accent)' }} />
      <div style={{ marginLeft: 52, maxWidth: 520, paddingBottom: 52 }}>
        <div style={{ color: orange, fontSize: 92, fontWeight: 800, lineHeight: 1 }}>3×</div>
        <p style={{ margin: '22px 0 0', color: muted, fontSize: 36, lineHeight: 1.45 }}>One number, one chart, one conclusion.</p>
      </div>
    </div>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 136, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: 'var(--osd-font-body)' }}>
    <Eyebrow>The workshop premise</Eyebrow>
    <div style={{ marginTop: 34, maxWidth: 1500 }}>
      <Title>The model reasons. The harness makes that reasoning useful.</Title>
    </div>
    <Footer />
  </div>
);

export default [Cover, Evidence, Closer] satisfies Page[];
