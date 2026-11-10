import React from 'react';

export const DEFAULT_HEADER = {
  headerHeight: 0, headerPaddingX: 16, headerPaddingY: 12, headerMaxWidth: 1280,
  sticky: true, shadow: true, background: '', textColor: '', borderColor: 'rgba(0,0,0,0.15)',
  brandAlign: 'left', brandGap: 12, avatarVisible: true, avatarSize: 40,
  avatarRadius: 50, avatarBorderWidth: 2, avatarBorderColor: '', avatarUrl: '',
  brandVisible: true, brandFontSize: 18, brandFontWeight: 900, brandFontFamily: '', brandLetterSpacing: 0,
  brandColor: '', brandSymbolVisible: true, brandSymbolSize: 18,
  syncVisible: true, syncText: 'LIVE CLOUD SYNC', syncFontSize: 12,
  syncColor: '', syncIconColor: '#059669', syncBlink: true, syncPlacement: 'below',
  navVisible: true, navGap: 32, navFontSize: 14, navFontWeight: 700,
  navColor: '', navAlign: 'center', navItems: [
    { id: 'booking', label: 'Wave Booking', visible: true, order: 1 },
    { id: 'rules', label: 'Party Rules', visible: true, order: 2 },
    { id: 'stats', label: 'Host Stats', visible: true, order: 3 },
    { id: 'discord', label: 'Discord', visible: true, order: 4 }
  ],
  wavesVisible: true, wavesBg: '#ffffff', wavesColor: '#111827',
  wavesFontSize: 12, wavesRadius: 999, wavesBlink: true,
  adminVisible: true, adminFontSize: 12, adminPaddingX: 14, adminPaddingY: 8,
  mobileBrandSize: 16, mobileAvatarSize: 40
};

const ranges = [
  ['headerPaddingX', 'Header horizontal padding', 0, 80, 1],
  ['headerPaddingY', 'Header vertical padding', 0, 50, 1],
  ['headerHeight', 'Minimum header height (0 = automatic)', 0, 180, 1],
  ['headerMaxWidth', 'Content max width', 600, 1800, 10],
  ['brandGap', 'Logo / branding gap', 0, 48, 1],
  ['avatarSize', 'Avatar size', 20, 110, 1],
  ['avatarRadius', 'Avatar roundness (%)', 0, 50, 1],
  ['avatarBorderWidth', 'Avatar border width', 0, 10, 1],
  ['brandFontSize', 'Brand name font size', 10, 48, 1],
  ['brandFontWeight', 'Brand name font weight', 100, 900, 100],
  ['brandLetterSpacing', 'Brand letter spacing', -2, 12, 0.5],
  ['brandSymbolSize', 'Crown / emoji size', 10, 48, 1],
  ['syncFontSize', 'Cloud sync font size', 8, 30, 1],
  ['navGap', 'Navigation gap', 0, 80, 1],
  ['navFontSize', 'Navigation font size', 10, 30, 1],
  ['navFontWeight', 'Navigation font weight', 100, 900, 100],
  ['wavesFontSize', 'Waves badge font size', 9, 26, 1],
  ['wavesRadius', 'Waves badge roundness', 0, 999, 1],
  ['adminFontSize', 'Login button font size', 9, 26, 1],
  ['adminPaddingX', 'Login button horizontal padding', 0, 50, 1],
  ['adminPaddingY', 'Login button vertical padding', 0, 30, 1],
  ['mobileBrandSize', 'Mobile brand font size', 10, 30, 1],
  ['mobileAvatarSize', 'Mobile avatar size', 20, 80, 1]
];
const colors = [
  ['background', 'Header background'], ['textColor', 'Header text'],
  ['borderColor', 'Header bottom border'], ['avatarBorderColor', 'Avatar ring'],
  ['brandColor', 'Brand single color (empty = multicolor)'],
  ['syncColor', 'Sync text'], ['syncIconColor', 'Sync icon'],
  ['navColor', 'Navigation text'], ['wavesBg', 'Waves badge background'],
  ['wavesColor', 'Waves badge text']
];
const toggles = [
  ['sticky', 'Sticky header'], ['shadow', 'Header shadow'],
  ['avatarVisible', 'Show avatar'], ['brandVisible', 'Show brand name'],
  ['brandSymbolVisible', 'Show brand emoji'], ['syncVisible', 'Show cloud sync'],
  ['syncBlink', 'Animate cloud sync icon'], ['navVisible', 'Show navigation'],
  ['wavesVisible', 'Show waves badge'], ['wavesBlink', 'Animate waves indicator'],
  ['adminVisible', 'Show login / dashboard button']
];
const sections = [
  ['General & visibility', ['headerHeight','headerPaddingX','headerPaddingY','headerMaxWidth']],
  ['Branding & avatar', ['brandGap','avatarSize','avatarRadius','avatarBorderWidth','brandFontSize','brandFontWeight','brandLetterSpacing','brandSymbolSize','mobileBrandSize','mobileAvatarSize']],
  ['Cloud sync status', ['syncFontSize']],
  ['Navigation', ['navGap','navFontSize','navFontWeight']],
  ['Waves badge & login', ['wavesFontSize','wavesRadius','adminFontSize','adminPaddingX','adminPaddingY']]
];

export default function HeaderStudio({ settings, onChange, onSave, onReset, saving }) {
  const config = { ...DEFAULT_HEADER, ...settings };
  const update = (key, value) => onChange({ ...config, [key]: value });
  const input = 'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white';
  return <section className="bg-white border-2 border-pink-200 rounded-2xl p-5 space-y-6 text-gray-900">
    <div><h3 className="text-xl font-black">🎨 Header Design Studio</h3>
      <p className="text-sm text-gray-600">Existing header remains unchanged by default. Changes preview instantly; Save publishes to Firebase.</p></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {toggles.map(([key,label]) => <label key={key} className="flex items-center justify-between gap-2 p-3 rounded-lg border border-slate-200 text-xs font-bold">
        {label}<input type="checkbox" checked={Boolean(config[key])} onChange={e => update(key,e.target.checked)} className="w-4 h-4 accent-pink-600" />
      </label>)}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {colors.map(([key,label]) => <label key={key} className="block text-xs font-bold">{label}
        <div className="flex items-center gap-2 mt-1">
          <input type="color" value={/^#[\da-f]{6}$/i.test(config[key] || '') ? config[key] : '#ffffff'} onChange={e=>update(key,e.target.value)} className="h-10 w-12 cursor-pointer" />
          <input className={input} value={config[key] || ''} placeholder="Use original / CSS color" onChange={e=>update(key,e.target.value)} />
          <button type="button" className="text-xs underline" onClick={()=>update(key,'')}>Clear</button>
        </div>
      </label>)}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="text-xs font-bold">Avatar image URL (leave empty for original)<input className={`${input} mt-1`} value={config.avatarUrl || ''} onChange={e=>update('avatarUrl',e.target.value)} placeholder="https://..." /></label>
      <label className="text-xs font-bold">Brand font family (empty = original)<input className={`${input} mt-1`} value={config.brandFontFamily || ''} onChange={e=>update('brandFontFamily',e.target.value)} placeholder="'Inter', sans-serif" /></label>
      <label className="text-xs font-bold">Cloud sync text<input className={`${input} mt-1`} value={config.syncText ?? ''} onChange={e=>update('syncText',e.target.value)} /></label>
      {[['brandAlign','Brand group alignment',['left','center','right']],['navAlign','Navigation alignment',['left','center','right']],['syncPlacement','Sync placement',['below','above','right']]].map(([key,label,values])=><label key={key} className="text-xs font-bold">{label}
        <select className={`${input} mt-1`} value={config[key]} onChange={e=>update(key,e.target.value)}>{values.map(v=><option key={v} value={v}>{v}</option>)}</select>
      </label>)}
    </div>
    {sections.map(([name,keys])=><details key={name} className="rounded-xl border border-slate-200 p-4" open={name==='Branding & avatar'}>
      <summary className="font-black cursor-pointer">{name}</summary>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">{ranges.filter(([key])=>keys.includes(key)).map(([key,label,min,max,step])=><label key={key} className="text-xs font-bold">
        <span className="flex justify-between gap-2"><span>{label}</span><span>{config[key]}</span></span>
        <input type="range" className="w-full accent-pink-600" min={min} max={max} step={step} value={config[key]} onChange={e=>update(key,Number(e.target.value))} />
      </label>)}</div>
    </details>)}
    <div className="rounded-xl border border-pink-200 p-4 space-y-3">
      <h4 className="font-black">Navigation links: label, visibility & order</h4>
      {(config.navItems || DEFAULT_HEADER.navItems).map((item,i)=><div key={item.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
        <span className="font-bold text-xs">{item.id}</span>
        <input className={input} value={item.label} onChange={e=>update('navItems',config.navItems.map((x,j)=>j===i?{...x,label:e.target.value}:x))} />
        <label className="text-xs flex gap-2 items-center"><input type="checkbox" checked={item.visible} onChange={e=>update('navItems',config.navItems.map((x,j)=>j===i?{...x,visible:e.target.checked}:x))}/> Visible</label>
        <label className="text-xs flex items-center gap-2">Order<input type="number" min="1" max="99" className={input} value={item.order} onChange={e=>update('navItems',config.navItems.map((x,j)=>j===i?{...x,order:Number(e.target.value)}:x))}/></label>
      </div>)}
    </div>
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={onSave} disabled={saving} className="px-5 py-3 rounded-xl bg-pink-600 text-white font-black disabled:opacity-50">{saving?'Saving...':'💾 Save header settings'}</button>
      <button type="button" onClick={onReset} className="px-5 py-3 rounded-xl border font-bold">Reset header preview to original</button>
    </div>
  </section>;
}
