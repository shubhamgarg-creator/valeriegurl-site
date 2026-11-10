
import React, { useMemo } from "react";

export const DEFAULT_EFFECTS = {
  animationEnabled: true,
  snowfallEnabled: true,
  animationColor: "#f9a8d4",
  animationCount: 32,
  animationSpeed: 1,
  animationOpacity: 0.55,
  animationSize: 5,
  snowColor: "#ffffff",
  snowCount: 65,
  snowSpeed: 1,
  snowOpacity: 0.8,
  snowSize: 5
};

const clamp = (value, min, max, fallback) => {
  const number = Number(value);
  return Number.isFinite(number)
    ? Math.min(max, Math.max(min, number))
    : fallback;
};

const safeColor = (value, fallback) =>
  /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;

function makeParticles(count, prefix) {
  return Array.from({ length: count }, (_, i) => {
    const random = (seed) => {
      const x = Math.sin((i + 1) * seed * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };

    return {
      id: `${prefix}-${i}`,
      x: random(1.7) * 100,
      y: random(2.9) * 100,
      delay: random(3.1) * -20,
      duration: 0.7 + random(4.3) * 1.5,
      size: 0.5 + random(5.7),
      drift: (random(6.1) - 0.5) * 120
    };
  });
}

export default function BackgroundEffects({ settings = {} }) {
  const config = { ...DEFAULT_EFFECTS, ...settings };

  const glowCount = clamp(config.animationCount, 0, 150, 32);
  const snowCount = clamp(config.snowCount, 0, 250, 65);

  const glowSpeed = clamp(config.animationSpeed, 0.1, 5, 1);
  const snowSpeed = clamp(config.snowSpeed, 0.1, 5, 1);

  const glowOpacity = clamp(config.animationOpacity, 0, 1, 0.55);
  const snowOpacity = clamp(config.snowOpacity, 0, 1, 0.8);

  const glowSize = clamp(config.animationSize, 1, 25, 5);
  const snowSize = clamp(config.snowSize, 1, 25, 5);

  const glows = useMemo(
    () => makeParticles(glowCount, "glow"),
    [glowCount]
  );

  const snowflakes = useMemo(
    () => makeParticles(snowCount, "snow"),
    [snowCount]
  );

  return (
    <div
      className="v21-effects-layer"
      aria-hidden="true"
    >
      <style>{`
        .v21-effects-layer {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          contain: strict;
        }

        .v21-glow {
          position: absolute;
          border-radius: 50%;
          animation: v21-twinkle ease-in-out infinite alternate;
          will-change: opacity, transform;
        }

        .v21-snow {
          position: absolute;
          top: -30px;
          border-radius: 50%;
          animation: v21-snowfall linear infinite;
          will-change: transform;
        }

        @keyframes v21-twinkle {
          from {
            opacity: 0.08;
            transform: scale(0.45);
          }
          to {
            opacity: var(--particle-opacity);
            transform: scale(1.6);
          }
        }

        @keyframes v21-snowfall {
          from {
            transform: translate3d(0, -5vh, 0);
          }
          to {
            transform: translate3d(
              var(--snow-drift),
              110vh,
              0
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .v21-glow,
          .v21-snow {
            animation: none !important;
          }
        }
      `}</style>

      {config.animationEnabled && glows.map((p) => {
        const size = glowSize * p.size;

        return (
          <span
            key={p.id}
            className="v21-glow"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: size,
              height: size,
              backgroundColor: safeColor(
                config.animationColor,
                "#f9a8d4"
              ),
              boxShadow: `0 0 ${size * 3}px ${
                safeColor(config.animationColor, "#f9a8d4")
              }`,
              "--particle-opacity": glowOpacity,
              animationDuration: `${p.duration * 3 / glowSpeed}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        );
      })}

      {config.snowfallEnabled && snowflakes.map((p) => {
        const size = Math.max(1, snowSize * p.size * 0.45);

        return (
          <span
            key={p.id}
            className="v21-snow"
            style={{
              left: `${p.x}%`,
              width: size,
              height: size,
              opacity: snowOpacity,
              backgroundColor: safeColor(
                config.snowColor,
                "#ffffff"
              ),
              boxShadow: `0 0 ${size}px ${
                safeColor(config.snowColor, "#ffffff")
              }`,
              "--snow-drift": `${p.drift}px`,
              animationDuration: `${
                (8 + p.duration * 5) / snowSpeed
              }s`,
              animationDelay: `${p.delay}s`
            }}
          />
        );
      })}
    </div>
  );
}
