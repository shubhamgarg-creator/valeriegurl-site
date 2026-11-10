import React from 'react';

const clamp = (value, min, max, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(min, Math.min(max, number)) : fallback;
};
const safeColor = (value, fallback) =>
  typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;

/** Original CSS/SVG dancers. No external assets, and no interaction interception. */
export default function GirlDancers({ settings = {} }) {
  if (!settings.girlsEnabled) return null;
  const count = Math.round(clamp(settings.girlsCount, 3, 5, 3));
  const size = clamp(settings.girlsSize, 40, 260, 105);
  const speed = clamp(settings.girlsSpeed, 0.2, 5, 1);
  const opacity = clamp(settings.girlsOpacity, 0.05, 1, 0.48);
  const bottom = clamp(settings.girlsBottom, 0, 80, 6);
  const spread = clamp(settings.girlsSpacing, 35, 220, 95);
  const danceSpeed = clamp(settings.girlsDanceSpeed, 0.2, 5, 1);
  const primary = safeColor(settings.girlsColor, '#db2777');
  const secondary = safeColor(settings.girlsAccentColor, '#9333ea');
  const reverse = settings.girlsDirection === 'right-to-left';
  const dancers = Array.from({ length: count }, (_, i) => i);

  return <div className="v23-girls-track" aria-hidden="true" style={{
    '--girls-size': `${size}px`,
    '--girls-opacity': opacity,
    '--girls-bottom': `${bottom}%`,
    '--girls-travel-duration': `${28 / speed}s`,
    '--girls-direction': reverse ? 'reverse' : 'normal',
    '--girls-dance-duration': `${0.8 / danceSpeed}s`
  }}>
    {dancers.map((i) => (
      <div key={i} className="v23-girl-travel" style={{
        '--girl-offset': `${i * spread}px`,
        '--girl-delay': `${-i * (2.1 / speed)}s`,
        '--girl-color': i % 2 ? secondary : primary,
        '--girl-scale': i % 3 === 1 ? 0.88 : i % 3 === 2 ? 1.07 : 1
      }}>
        <div className="v23-girl-bop">
          <svg viewBox="0 0 100 190" xmlns="http://www.w3.org/2000/svg" role="presentation">
            <g fill="currentColor">
              {/* Stylized hair and face */}
              <path d={i % 2 === 0 ? 'M29 34 Q24 8 50 7 Q77 8 71 36 L77 73 Q65 69 64 47 L36 47 Q35 68 23 72Z' : 'M31 32 Q31 7 50 7 Q70 7 69 32 L74 53 L64 52 L61 38 L39 38 L35 53 L25 53Z'} />
              <circle cx="50" cy="34" r="14" />
              <rect x="45" y="45" width="10" height="12" rx="4" />
              {/* Torso and dress */}
              <path d="M38 55 Q50 50 62 55 L66 99 L34 99Z" />
              <path d="M35 92 L65 92 L79 127 Q50 139 21 127Z" />
              <g className="v23-girl-arm-a" style={{ transformOrigin: '39px 59px' }}>
                <path d="M38 58 Q30 56 26 68 L15 97 Q12 106 19 108 Q24 109 27 102 L44 73Z" />
              </g>
              <g className="v23-girl-arm-b" style={{ transformOrigin: '61px 59px' }}>
                <path d="M62 58 Q71 55 75 68 L86 97 Q89 106 82 108 Q77 109 74 102 L56 73Z" />
              </g>
              <g className="v23-girl-leg-a" style={{ transformOrigin: '42px 125px' }}>
                <path d="M35 124 L49 124 L46 172 L45 184 L32 184 L34 164Z" />
                <path d="M32 181 L46 181 Q53 184 53 188 L27 188Z" />
              </g>
              <g className="v23-girl-leg-b" style={{ transformOrigin: '58px 125px' }}>
                <path d="M51 124 L65 124 L66 164 L68 184 L55 184 L54 172Z" />
                <path d="M55 181 L69 181 Q76 184 76 188 L50 188Z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    ))}
  </div>;
}
