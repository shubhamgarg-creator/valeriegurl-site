
import React from "react";
import { DEFAULT_EFFECTS } from "./BackgroundEffects";

const controls = [
  ["animationCount", "Glowing particles", 0, 150, 1],
  ["animationSpeed", "Blinking speed", 0.1, 5, 0.1],
  ["animationOpacity", "Glow opacity", 0, 1, 0.05],
  ["animationSize", "Glow size", 1, 25, 1],
  ["snowCount", "Snowflake density", 0, 250, 1],
  ["snowSpeed", "Snowfall speed", 0.1, 5, 0.1],
  ["snowOpacity", "Snow opacity", 0, 1, 0.05],
  ["snowSize", "Snowflake size", 1, 25, 1]
];

export default function EffectsAdminPanel({
  settings,
  onChange,
  onSave,
  onReset,
  saving = false
}) {
  const config = { ...DEFAULT_EFFECTS, ...settings };

  const update = (key, value) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <section className="bg-white border-2 border-pink-200 rounded-2xl p-5 space-y-6 text-gray-900">
      <div>
        <h3 className="text-xl font-black">
          ✨ Background Effects Studio
        </h3>
        <p className="text-sm text-gray-600">
          Customize animations and snowfall.
        </p>
      </div>

      {[
        ["animationEnabled", "✨ Blinking Animation"],
        ["snowfallEnabled", "❄️ Snowfall Effect"]
      ].map(([key, label]) => (
        <label
          key={key}
          className="flex items-center justify-between gap-3 rounded-xl border p-4"
        >
          <span className="font-bold">{label}</span>
          <input
            type="checkbox"
            checked={Boolean(config[key])}
            onChange={(e) => update(key, e.target.checked)}
            className="h-5 w-5 accent-pink-500"
          />
        </label>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          ["animationColor", "Glow color"],
          ["snowColor", "Snow color"]
        ].map(([key, label]) => (
          <label key={key} className="space-y-2">
            <span className="block text-sm font-bold">{label}</span>
            <input
              type="color"
              value={config[key]}
              onChange={(e) => update(key, e.target.value)}
              className="w-full h-12 cursor-pointer"
            />
          </label>
        ))}

        {controls.map(([key, label, min, max, step]) => (
          <label key={key} className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <span>{label}</span>
              <span>{config[key]}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={config[key]}
              onChange={(e) => update(key, Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={onSave}
          className="px-5 py-3 rounded-xl bg-pink-600 text-white font-black disabled:opacity-50"
        >
          {saving ? "Saving..." : "💾 Save Effects"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="px-5 py-3 rounded-xl bg-gray-100 border font-bold"
        >
          Reset to Defaults
        </button>
      </div>
    </section>
  );
}
