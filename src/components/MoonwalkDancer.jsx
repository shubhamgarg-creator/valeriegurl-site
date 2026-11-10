import React from 'react';

const clamp = (value, min, max, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
};
const safeColor = (value, fallback) =>
  typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;

/** Original, self-contained silhouette: no external media or licensed choreography assets. */
export default function MoonwalkDancer({ settings = {} }) {
  if (!settings.dancerEnabled) return null;
  const size = clamp(settings.dancerSize, 45, 300, 130);
  const speed = clamp(settings.dancerSpeed, 0.2, 5, 1);
  const opacity = clamp(settings.dancerOpacity, 0.05, 1, 0.38);
  const bottom = clamp(settings.dancerBottom, 0, 85, 9);
  const color = safeColor(settings.dancerColor, '#a21caf');
  const reverse = settings.dancerDirection === 'right-to-left';
  const travelDuration = 24 / speed;
  return (
    <div className="v22-dancer-track" aria-hidden="true" style={{
      '--dancer-size': `${size}px`,
      '--dancer-color': color,
      '--dancer-opacity': opacity,
      '--dancer-bottom': `${bottom}%`,
      '--dancer-duration': `${travelDuration}s`,
      '--dancer-direction': reverse ? 'reverse' : 'normal'
    }}>
      <div className="v22-dancer-travel">
        <div className="v22-dancer-bounce">
          <svg viewBox="0 0 120 205" width="120" height="205" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor">
              {/* Fedora, head and neck */}
              <ellipse cx="60" cy="26" rx="37" ry="5" />
              <path d="M39 25L44 8Q60 2 76 8L81 25Z" />
              <ellipse cx="60" cy="40" rx="15" ry="17" />
              <rect x="55" y="53" width="10" height="10" rx="3" />
              {/* Jacket and torso */}
              <path d="M43 61Q60 55 77 61L85 117Q61 129 35 117Z" />
              <path d="M57 64L61 105L66 64" fill="#fff" opacity=".55" />
              {/* Moving arms */}
              <g className="v22-dancer-arm-left" style={{transformOrigin:'43px 66px'}}>
                <path d="M43 64Q34 65 32 83L20 111Q16 120 23 123Q30 124 33 116L48 86Z" />
                <circle cx="21" cy="123" r="7" />
              </g>
              <g className="v22-dancer-arm-right" style={{transformOrigin:'77px 66px'}}>
                <path d="M76 64Q88 67 89 83L102 109Q108 119 100 122Q94 124 90 115L72 87Z" />
                <circle cx="101" cy="121" r="7" />
              </g>
              {/* Moonwalk-like alternating feet */}
              <g className="v22-dancer-leg-left" style={{transformOrigin:'48px 116px'}}>
                <path d="M39 116H58L55 173L52 191H37L40 166Z" />
                <path d="M36 188H54Q63 193 61 199H31Q28 194 36 188Z" />
              </g>
              <g className="v22-dancer-leg-right" style={{transformOrigin:'72px 116px'}}>
                <path d="M62 116H81L80 167L85 190H69L65 170Z" />
                <path d="M69 188H86Q99 190 101 199H70Q65 195 69 188Z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
