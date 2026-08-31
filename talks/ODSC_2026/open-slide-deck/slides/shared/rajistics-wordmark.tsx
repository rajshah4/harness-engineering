const orbitronFontUrl = new URL('../../assets/fonts/orbitron-variable.ttf', import.meta.url).href;

export const RajisticsWordmark = ({ overlay = false }: { overlay?: boolean }) => (
  <>
    <style>{`
      @font-face {
        font-family: 'Rajistics Orbitron';
        src: url("${orbitronFontUrl}") format('truetype');
        font-style: normal;
        font-weight: 400 900;
        font-display: block;
      }
    `}</style>
    <span
      data-brand-element="rajistics-wordmark"
      style={{
        width: 170,
        height: 40,
        display: 'block',
        color: '#AAA9A4',
        fontFamily: '"Rajistics Orbitron", Orbitron, sans-serif',
        fontSize: 31,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '40px',
        letterSpacing: 0,
        whiteSpace: 'nowrap',
        userSelect: 'text',
        ...(overlay ? { position: 'absolute', left: 48, bottom: 34, zIndex: 3 } : {}),
      }}
    >
      @rajistics
    </span>
  </>
);
