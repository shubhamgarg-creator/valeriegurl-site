import React from 'react';
import { DEFAULT_GIRLS } from './BackgroundEffects';
const clamp=(v,min,max,def)=>Number.isFinite(Number(v))?Math.min(max,Math.max(min,Number(v))):def;
const color=(v,f)=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v)?v:f;
const STEPS=['hip-hop','disco','shuffle','wave','twist'];

// Original SVG figures: no external media, no clicks captured, no change to existing page layout.
export default function GirlDancers({settings={}}){
  if(settings.girlsEnabled===false)return null;
  const count=Math.round(clamp(settings.girlsCount,3,5,3));
  const girls=Array.from({length:count},(_,i)=>({ ...DEFAULT_GIRLS[i], ...(settings.girlsIndividuals?.[i]||{}) }));
  return <div className="v24-girls-layer" aria-hidden="true">
    {girls.map((g,i)=>{
      if(!g.enabled)return null;
      const size=clamp(g.size,40,260,100);
      const speed=clamp(g.danceSpeed,.2,5,1);
      const movement=['stationary','left-to-right','right-to-left'].includes(g.movement)?g.movement:'stationary';
      const step=STEPS.includes(g.step)?g.step:STEPS[i];
      return <div key={i} className={`v24-girl v24-step-${step} v24-move-${movement}`}
        style={{left:`${clamp(g.x,0,100,50)}%`,bottom:`${clamp(g.y,0,85,15)}%`,width:size,
          color:color(g.color,DEFAULT_GIRLS[i].color),opacity:clamp(g.opacity,0,1,.55),
          '--dance-duration':`${.85/speed}s`,
          '--travel-duration':`${22/clamp(g.travelSpeed,.2,5,1)}s`,
          '--girl-size':`${size}px`}}>
        <div className="v24-girl-body">
          <svg viewBox="0 0 100 190" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <g fill="currentColor">
              <path d={i%2===0?'M29 34 Q24 8 50 7 Q77 8 71 36 L77 73 Q65 69 64 47 L36 47 Q35 68 23 72Z':'M31 32 Q31 7 50 7 Q70 7 69 32 L74 53 L64 52 L61 38 L39 38 L35 53 L25 53Z'}/>
              <circle cx="50" cy="34" r="14"/><rect x="45" y="45" width="10" height="12" rx="4"/>
              <path d="M38 55 Q50 50 62 55 L66 99 L34 99Z"/>
              <path d="M35 92 L65 92 L79 127 Q50 139 21 127Z"/>
              <g className="v24-arm-left"><path d="M38 58 Q30 56 26 68 L15 97 Q12 106 19 108 Q24 109 27 102 L44 73Z"/></g>
              <g className="v24-arm-right"><path d="M62 58 Q71 55 75 68 L86 97 Q89 106 82 108 Q77 109 74 102 L56 73Z"/></g>
              <g className="v24-leg-left"><path d="M35 124 L49 124 L46 172 L45 184 L32 184 L34 164Z"/><path d="M32 181 L46 181 Q53 184 53 188 L27 188Z"/></g>
              <g className="v24-leg-right"><path d="M51 124 L65 124 L66 164 L68 184 L55 184 L54 172Z"/><path d="M55 181 L69 181 Q76 184 76 188 L50 188Z"/></g>
            </g>
          </svg>
        </div>
      </div>;
    })}
  </div>;
}
