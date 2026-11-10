import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT = { x: 0, y: 0, fontSize: 0, color: '', background: '', textAlign: '', letterSpacing: 0, fontWeight: '', opacity: 1 };
const safeColor = v => /^#[0-9a-f]{6}$/i.test(v || '') ? v : '';
const safeSelector = v => typeof v === 'string' && v.startsWith('#site-root > ') && /^[-#\w\s>:().]+$/.test(v) && v.length < 1200;
const number = (v, min, max, fallback = 0) => Number.isFinite(Number(v)) ? Math.max(min, Math.min(max, Number(v))) : fallback;
const textTargets = 'h1,h2,h3,h4,h5,h6,p,span,a,button,label,small,strong,b,em,li,td,th,blockquote,legend';

function getSelector(element) {
  const parts = [];
  let el = element;
  while (el && el.id !== 'site-root') {
    const parent = el.parentElement;
    if (!parent) return '';
    const index = Array.prototype.indexOf.call(parent.children, el) + 1;
    parts.unshift(`${el.tagName.toLowerCase()}:nth-child(${index})`);
    el = parent;
  }
  return el?.id === 'site-root' ? `#site-root > ${parts.join(' > ')}` : '';
}
function cssFor(styles) {
  return Object.entries(styles || {}).filter(([selector, val]) => safeSelector(selector) && val && typeof val === 'object').map(([selector, v]) => {
    const rules = [
      `translate:${number(v.x,-500,500)}px ${number(v.y,-500,500)}px`,
      `opacity:${number(v.opacity,0,1,1)}`
    ];
    if (number(v.fontSize,0,120) > 0) rules.push(`font-size:${number(v.fontSize,0,120)}px !important`);
    if (safeColor(v.color)) rules.push(`color:${v.color} !important`);
    if (safeColor(v.background)) rules.push(`background-color:${v.background} !important`);
    if (['left','center','right','justify'].includes(v.textAlign)) rules.push(`text-align:${v.textAlign} !important`);
    if (v.fontWeight && ['400','500','600','700','800','900'].includes(String(v.fontWeight))) rules.push(`font-weight:${v.fontWeight} !important`);
    if (v.letterSpacing !== undefined) rules.push(`letter-spacing:${number(v.letterSpacing,-5,20)}px !important`);
    return `${selector}{${rules.join(';')}}`;
  }).join('\n');
}
const inputStyle = { width:'100%', border:'1px solid #e5e7eb', borderRadius:8, padding:'6px 8px', color:'#111827', background:'#fff' };
export default function TextPositionStudio({ enabled, onClose, saved, onSave }) {
  const [draft, setDraft] = useState(saved || {});
  const [selected, setSelected] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (!enabled) setDraft(saved || {}); }, [saved, enabled]);
  const css = useMemo(() => cssFor(enabled ? draft : saved), [draft, saved, enabled]);
  useEffect(() => {
    if (!enabled) return;
    const handler = (event) => {
      if (event.target.closest?.('[data-v26-editor]')) return;
      const target = event.target.closest?.(textTargets);
      if (!target || !target.closest('#site-root') || target.closest('[data-v26-editor]')) return;
      if (!target.textContent?.trim()) return;
      event.preventDefault(); event.stopPropagation();
      const selector = getSelector(target);
      if (selector) { setSelected(selector); setSelectedText(target.textContent.trim().slice(0, 100)); }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [enabled]);
  const value = { ...DEFAULT, ...(draft[selected] || {}) };
  const change = (key, val) => setDraft(prev => ({ ...prev, [selected]: { ...DEFAULT, ...(prev[selected] || {}), [key]: val } }));
  const save = async () => {
    setSaving(true); setError('');
    try { await onSave(draft); } catch (e) { setError(e?.message || 'Save failed'); }
    finally { setSaving(false); }
  };
  return <>
    <style id="v26-text-position-styles">{css}</style>
    {enabled && <aside data-v26-editor="true" style={{ position:'fixed', zIndex:99999, right:12, bottom:12, width:'min(360px, calc(100vw - 24px))', maxHeight:'min(78vh, 740px)', overflowY:'auto', padding:16, borderRadius:18, boxShadow:'0 12px 48px #0005', border:'2px solid #f9a8d4', background:'#fff', color:'#111827', fontFamily:'Inter, sans-serif', fontSize:13 }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}><strong style={{fontSize:17}}>✏️ Every Text Position Studio</strong><button type="button" onClick={onClose} style={{...inputStyle,width:'auto'}}>Close</button></div>
      <p style={{margin:'8px 0',color:'#475569'}}>Click any visible text on the website to select it. Use Admin Dashboard / View Website to switch screens. Existing positions stay unchanged until you edit.</p>
      <div style={{padding:9,background:'#fdf2f8',borderRadius:8,overflowWrap:'anywhere'}}><b>Selected:</b> {selectedText || 'Click a text element'}{selected && <div style={{fontSize:10,opacity:.7}}>Target: {selected.slice(0,140)}</div>}</div>
      {selected && <>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9,marginTop:12}}>
          {[["x","Horizontal X (px)",-500,500,1],["y","Vertical Y (px)",-500,500,1],["fontSize","Font size (0 = original)",0,120,1],["letterSpacing","Letter spacing (px)",-5,20,.5],["opacity","Opacity",0,1,.05]].map(([key,label,min,max,step]) => <label key={key} style={{display:'grid',gap:4}}><span>{label}</span><input style={inputStyle} type="number" min={min} max={max} step={step} value={value[key]} onChange={e=>change(key,Number(e.target.value))}/></label>)}
          {[["color","Font color"],["background","Text background"]].map(([key,label]) => <label key={key} style={{display:'grid',gap:4}}><span>{label}</span><div style={{display:'flex',gap:5}}><input type="color" value={safeColor(value[key]) || '#ffffff'} onChange={e=>change(key,e.target.value)}/><button type="button" onClick={()=>change(key,'')} style={{...inputStyle,width:'auto'}}>Original</button></div></label>)}
          <label style={{display:'grid',gap:4}}>Text alignment<select style={inputStyle} value={value.textAlign} onChange={e=>change('textAlign',e.target.value)}>{[['','Original'],['left','Left'],['center','Center'],['right','Right'],['justify','Justify']].map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label>
          <label style={{display:'grid',gap:4}}>Font weight<select style={inputStyle} value={value.fontWeight} onChange={e=>change('fontWeight',e.target.value)}>{[['','Original'],['400','Normal'],['500','Medium'],['600','Semibold'],['700','Bold'],['800','Extra bold'],['900','Black']].map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label>
        </div>
        <div style={{display:'flex',gap:8,marginTop:12}}><button type="button" style={{...inputStyle,flex:1}} onClick={()=>setDraft(p=>{const n={...p};delete n[selected];return n})}>Reset selected</button><button type="button" style={{...inputStyle,flex:1}} onClick={()=>{setSelected('');setSelectedText('')}}>Pick another</button></div>
      </>}
      <div style={{display:'flex',gap:8,marginTop:12}}><button type="button" disabled={saving} onClick={save} style={{...inputStyle,background:'#db2777',color:'white',fontWeight:800,flex:1}}>{saving?'Saving...':'Save to Firebase'}</button><button type="button" style={{...inputStyle,width:'auto'}} onClick={()=>setDraft(saved || {})}>Discard</button></div>
      {error && <p role="alert" style={{color:'#b91c1c'}}>{error}</p>}
      <p style={{fontSize:11,color:'#64748b',marginBottom:0}}>Position is a visual offset, not a layout reflow. Dynamic or reordered elements can change their selector; reselect them if needed.</p>
    </aside>}
  </>;
}
