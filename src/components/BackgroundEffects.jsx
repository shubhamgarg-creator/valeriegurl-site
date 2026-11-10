import React, { useMemo } from 'react';
export const DEFAULT_EFFECTS = { animationEnabled:true, snowfallEnabled:true, animationColor:'#f9a8d4', animationCount:32, animationSpeed:1, animationOpacity:0.55, animationSize:5, snowColor:'#ffffff', snowCount:65, snowSpeed:1, snowOpacity:0.8, snowSize:5 };
const clamp=(v,min,max,def)=>Number.isFinite(Number(v))?Math.min(max,Math.max(min,Number(v))):def;
const safeColor=(v,f)=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v)?v:f;
const rand=n=>{const x=Math.sin(n*127.1)*43758.5453;return x-Math.floor(x)};
const particles=count=>Array.from({length:count},(_,i)=>({id:i,x:rand(i*1.31+1)*100,y:rand(i*2.19+2)*100,delay:-rand(i*3.17+3)*24,duration:0.8+rand(i*4.23+4)*1.6,scale:0.55+rand(i*5.41+5),drift:(rand(i*6.73+6)-0.5)*140}));
export default function BackgroundEffects({settings={}}){
 const c={...DEFAULT_EFFECTS,...settings};
 const glowCount=clamp(c.animationCount,0,150,32),snowCount=clamp(c.snowCount,0,250,65);
 const glows=useMemo(()=>particles(glowCount),[glowCount]);
 const snow=useMemo(()=>particles(snowCount),[snowCount]);
 const gc=safeColor(c.animationColor,'#f9a8d4'),sc=safeColor(c.snowColor,'#ffffff');
 const gs=clamp(c.animationSpeed,0.1,5,1),ss=clamp(c.snowSpeed,0.1,5,1);
 return <div className="v21-effects-layer" aria-hidden="true">
 {c.animationEnabled&&glows.map(p=>{const s=clamp(c.animationSize,1,25,5)*p.scale;return <span key={'g'+p.id} className="v21-glow" style={{left:p.x+'%',top:p.y+'%',width:s,height:s,backgroundColor:gc,boxShadow:`0 0 ${s*3}px ${gc}`,'--particle-opacity':clamp(c.animationOpacity,0,1,.55),animationDuration:(p.duration*3/gs)+'s',animationDelay:p.delay+'s'}}/>})}
 {c.snowfallEnabled&&snow.map(p=>{const s=clamp(c.snowSize,1,25,5)*p.scale;return <span key={'s'+p.id} className="v21-snow" style={{left:p.x+'%',width:s,height:s,opacity:clamp(c.snowOpacity,0,1,.8),backgroundColor:sc,boxShadow:`0 0 ${s}px ${sc}`,'--snow-drift':p.drift+'px',animationDuration:((8+p.duration*5)/ss)+'s',animationDelay:p.delay+'s'}}/>})}
 </div>;
}
