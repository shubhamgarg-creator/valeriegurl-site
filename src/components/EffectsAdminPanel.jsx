import React from 'react';
import { DEFAULT_EFFECTS, DEFAULT_GIRLS } from './BackgroundEffects';
const sliders=[['animationCount','Glowing particles',0,150,1],['animationSpeed','Blinking speed',.1,5,.1],['animationOpacity','Glow opacity',0,1,.05],['animationSize','Glow size',1,25,1],['snowCount','Snowflake density',0,250,1],['snowSpeed','Snowfall speed',.1,5,.1],['snowOpacity','Snow opacity',0,1,.05],['snowSize','Snowflake size',1,25,1]];
const steps=[['hip-hop','Hip-hop bounce'],['disco','Disco arms'],['shuffle','Shuffle steps'],['wave','Body wave'],['twist','Twist dance']];
const field='w-full border border-pink-200 rounded-lg px-3 py-2 bg-white text-gray-900';
export default function EffectsAdminPanel({settings,onChange,onSave,onReset,saving=false}){
  const c={...DEFAULT_EFFECTS,...settings};
  const update=(key,value)=>onChange({...c,[key]:value});
  const girls=DEFAULT_GIRLS.map((g,i)=>({...g,...(c.girlsIndividuals?.[i]||{})}));
  const updateGirl=(i,key,value)=>{
    const next=girls.map((g,j)=>j===i?{...g,[key]:value}:g);
    update('girlsIndividuals',next);
  };
  return <section className="bg-white border-2 border-pink-200 rounded-2xl p-5 space-y-6 text-gray-900">
    <div><h3 className="text-xl font-black">✨ Background Effects Studio</h3><p className="text-sm text-gray-600">Girls only: customize each dancer independently. Preview instantly, then save to Firebase.</p></div>
    {[["animationEnabled","✨ Blinking animation"],["snowfallEnabled","❄️ Snowfall effect"],["girlsEnabled","💃 Girl dancers"]].map(([key,label])=><label key={key} className="flex items-center justify-between gap-3 rounded-xl border p-4"><span className="font-bold">{label}</span><input type="checkbox" checked={Boolean(c[key])} onChange={e=>update(key,e.target.checked)} className="h-5 w-5 accent-pink-500"/></label>)}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {[["animationColor","Glow color"],["snowColor","Snow color"]].map(([key,label])=><label key={key} className="space-y-2"><span className="block text-sm font-bold">{label}</span><input type="color" value={c[key]} onChange={e=>update(key,e.target.value)} className="w-full h-12 cursor-pointer"/></label>)}
      {sliders.map(([key,label,min,max,step])=><label key={key} className="space-y-2"><div className="flex justify-between text-sm font-bold"><span>{label}</span><span>{c[key]}</span></div><input type="range" min={min} max={max} step={step} value={c[key]} onChange={e=>update(key,Number(e.target.value))} className="w-full accent-pink-500"/></label>)}
    </div>
    <label className="block space-y-2"><span className="font-bold">Number of girls: {c.girlsCount}</span><input type="range" min="3" max="5" step="1" value={c.girlsCount} onChange={e=>update('girlsCount',Number(e.target.value))} className="w-full accent-pink-500"/></label>
    <div className="space-y-4">
      <h4 className="text-lg font-black">Individual girl customization</h4>
      {girls.slice(0,Math.round(Number(c.girlsCount)||3)).map((g,i)=><div key={i} className="rounded-xl border-2 border-pink-100 p-4 space-y-4">
        <div className="flex items-center justify-between gap-3"><h5 className="font-black">💃 Girl {i+1}</h5><label className="flex gap-2 items-center text-sm font-bold"><input type="checkbox" checked={g.enabled} onChange={e=>updateGirl(i,'enabled',e.target.checked)}/>Enabled</label></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="space-y-1"><span className="text-sm font-bold">Dance step</span><select className={field} value={g.step} onChange={e=>updateGirl(i,'step',e.target.value)}>{steps.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
          <label className="space-y-1"><span className="text-sm font-bold">Movement</span><select className={field} value={g.movement} onChange={e=>updateGirl(i,'movement',e.target.value)}><option value="stationary">Stay in place</option><option value="left-to-right">Left to right</option><option value="right-to-left">Right to left</option></select></label>
          <label className="space-y-1"><span className="text-sm font-bold">Color</span><input className="w-full h-11" type="color" value={g.color} onChange={e=>updateGirl(i,'color',e.target.value)}/></label>
          {[["x","Horizontal location (%)",0,100,1],["y","Height from bottom (%)",0,85,1],["size","Size (px)",40,260,5],["opacity","Opacity",0,1,.05],["danceSpeed","Dance speed",.2,5,.1],["travelSpeed","Travel speed",.2,5,.1]].map(([key,label,min,max,step])=><label key={key} className="space-y-1"><div className="flex justify-between text-sm font-bold"><span>{label}</span><span>{g[key]}</span></div><input className="w-full accent-pink-500" type="range" min={min} max={max} step={step} value={g[key]} onChange={e=>updateGirl(i,key,Number(e.target.value))}/></label>)}
        </div>
      </div>)}
    </div>
    <div className="flex flex-wrap gap-3"><button type="button" disabled={saving} onClick={onSave} className="px-5 py-3 rounded-xl bg-pink-600 text-white font-black disabled:opacity-50">{saving?'Saving...':'💾 Save effects'}</button><button type="button" onClick={onReset} className="px-5 py-3 rounded-xl bg-gray-100 border font-bold">Reset to defaults (preview)</button></div>
  </section>;
}
