import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  MessageSquare, 
  Upload, 
  LogIn, 
  ExternalLink, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  X,
  Eye,
  Check,
  Trash2,
  RotateCcw,
  History,
  Edit3,
  Save,
  Globe,
  List,
  Palette,
  Type,
  RefreshCw,
  Wifi,
  AlertCircle,
  Sliders,
  Snowflake,
  Zap
} from 'lucide-react';

const firebaseConfig = {
  apiKey: "AIzaSyDh51seqBPH_kuMjTH_q5jOlLwKarJN1Ns",
  authDomain: "valeriegurl-site.firebaseapp.com",
  databaseURL: "https://valeriegurl-site-default-rtdb.firebaseio.com",
  projectId: "valeriegurl-site",
  storageBucket: "valeriegurl-site.firebasestorage.app",
  messagingSenderId: "542854017871",
  appId: "1:542854017871:web:e7d5e39591a4542e038b3a",
  measurementId: "G-FS0TJS7YK9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const DynamicBackgroundEffects = ({ theme }) => {
  const { 
    enableSnowfall = true, 
    snowCount = 40, 
    snowSpeed = 3, 
    snowSize = 4, 
    snowColor = "#ffffff",
    snowShape = "snowflake",
    enableBlinkGlow = true, 
    blinkCount = 20, 
    blinkSpeed = 2, 
    blinkColor1 = "#ff00d4", 
    blinkColor2 = "#00f0ff" 
  } = theme;

  const [particles, setParticles] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    if (!enableBlinkGlow) { setParticles([]); return; }
    const count = parseInt(blinkCount) || 20;
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 14 + 6,
        color: Math.random() > 0.5 ? blinkColor1 : blinkColor2,
        duration: (Math.random() * 2 + 1) / (parseFloat(blinkSpeed) || 1),
        delay: Math.random() * 3
      });
    }
    setParticles(arr);
  }, [enableBlinkGlow, blinkCount, blinkSpeed, blinkColor1, blinkColor2]);

  useEffect(() => {
    if (!enableSnowfall) { setSnowflakes([]); return; }
    const count = parseInt(snowCount) || 40;
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * (parseInt(snowSize) || 4) + 2,
        duration: (Math.random() * 5 + 4) / (parseFloat(snowSpeed) || 1),
        delay: Math.random() * 5,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    setSnowflakes(arr);
  }, [enableSnowfall, snowCount, snowSpeed, snowSize, snowColor, snowShape]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {enableBlinkGlow && particles.map((p) => (
        <div
          key={`blink-${p.id}`}
          className="absolute rounded-full filter blur-[2px] animate-pulse"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 15px ${p.color}, 0 0 25px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
      {enableSnowfall && snowflakes.map((s) => (
        <div
          key={`snow-${s.id}`}
          className="absolute animate-snowfall"
          style={{
            left: `${s.left}%`,
            width: `${s.size * 2}px`,
            height: `${s.size * 2}px`,
            color: snowColor,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`
          }}
        >
          {snowShape === 'snowflake' ? (
            <Snowflake className="w-full h-full" style={{ color: snowColor }} />
          ) : snowShape === 'heart' ? (
            <span style={{ fontSize: `${s.size * 2}px` }}>💖</span>
          ) : snowShape === 'star' ? (
            <span style={{ fontSize: `${s.size * 2}px` }}>✨</span>
          ) : (
            <div className="rounded-full bg-current shadow-sm" style={{ width: `${s.size}px`, height: `${s.size}px`, backgroundColor: snowColor }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [gameName, setGameName] = useState('');
  const [tag, setTag] = useState('');
  const [wavesCount, setWavesCount] = useState(1);
  const [gemsPerWave, setGemsPerWave] = useState(200);
  const [gemsProof, setGemsProof] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('booking');
  const [adminViewTab, setAdminViewTab] = useState('active');

  const defaultTheme = {
    fontFamily: "'Inter', sans-serif",
    pageBg: '#ffffff',
    enableBlinkGlow: true,
    blinkCount: 25,
    blinkSpeed: 2,
    blinkColor1: '#ff00d4',
    blinkColor2: '#00f0ff',
    enableSnowfall: true,
    snowCount: 45,
    snowSpeed: 1.5,
    snowSize: 6,
    snowColor: '#ec4899',
    snowShape: 'snowflake',
    headerBg: '#59ffe5',
    headerText: '#111827',
    headerAlignment: 'left',
    navLinksFontSize: '14px',
    timingBadgeFontSize: '12px',
    adminBtnFontSize: '12px',
    adminBtnBg: '#111827',
    adminBtnText: '#ffffff',
    adminBtnBorderColor: '#111827',
    adminBtnBorderWidth: '2px',
    adminBtnBorderRadius: '16px',
    profileBoxBg: '#fff0f6',
    profileBoxBorder: '#fbcfe8',
    profileBoxText: '#111827',
    profileTitleFontSize: '24px',
    verifiedBadgeFontSize: '10px',
    subtagTextColor: '#be185d',
    subtagFontFamily: "'Inter', sans-serif",
    subtagFontSize: '12px',
    bioFontSize: '14px',
    avatarRingColor: '#ec4899',
    profileAlignment: 'left',
    statsBoxBg: '#ffffff',
    statsBoxBorderColor: '#fbcfe8',
    statsTextColor: '#111827',
    statsNumberFontSize: '18px',
    statsLabelFontSize: '10px',
    chatBtnFontSize: '14px',
    gemsBadgeFontSize: '12px',
    profileFooterFontSize: '11px',
    regBoxBg: '#ff91f0',
    regBoxBorder: '#f472b6',
    regBoxText: '#111827',
    regBoxAlignment: 'left',
    regTitleFontSize: '24px',
    regSubtextFontSize: '12px',
    formLabelFontSize: '12px',
    inputFieldFontSize: '14px',
    inputFieldBg: '#ffffff',
    inputFieldText: '#111827',
    inputFieldBorderColor: '#f472b6',
    inputFieldBorderWidth: '1.5px',
    inputFieldBorderRadius: '16px',
    uploadBoxBg: '#ffffff',
    uploadBoxBorderColor: '#f472b6',
    uploadBoxBorderStyle: 'dashed',
    uploadTextFontSize: '12px',
    uploadSubtextFontSize: '10px',
    calcBoxBg: '#ffffff',
    calcBoxBorderColor: '#f472b6',
    calcBoxText: '#111827',
    calcTextFontSize: '14px',
    calcGemsFontSize: '20px',
    submitBtnFontSize: '16px',
    formFooterFontSize: '11px',
    rulesCategoryColor: '#0284c7',
    rulesCategoryFontSize: '12px',
    rulesTitleColor: '#111827',
    rulesTitleFontSize: '24px',
    rulesBoxBg: '#67daff',
    rulesBoxBorder: '#38bdf8',
    rulesBoxText: '#111827',
    rulesBoxAlignment: 'left',
    rulesBoxTitleFontSize: '16px',
    rulesBoxBodyFontSize: '12px',
    emojiBoxBg: '#ffffff',
    emojiBoxBorderColor: '#38bdf8',
    emojiBoxBorderWidth: '1.5px',
    emojiFontSize: '20px',
    bannerBg: '#fce7f3',
    bannerBorder: '#fbcfe8',
    bannerTextColor: '#111827',
    bannerAlignment: 'left',
    bannerBadgeFontSize: '10px',
    bannerTitleFontSize: '24px',
    bannerTextFontSize: '12px',
    bannerBtnFontSize: '14px',
    primaryBtnBg: '#111827',
    primaryBtnText: '#ffffff',
    btnBorderWidth: '2px',
    btnBorderColor: '#111827',
    btnBorderStyle: 'solid',
    btnBorderRadius: '16px',
    nameLetterColors: ['#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea']
  };

  const defaultSiteContent = {
    brandName: "-VALERIE GURL-",
    selectedSymbol: "👑",
    verifiedBadgeText: "Verified OG",
    hostSubtag: "133LNO • The OG Party Host • Sunday City",
    hostBio: "Dedicated and 100% trusted host committed to a NoScams guarantee. With 90%–100% verified participants in every wave.",
    wavesTimingText: "Waves 15:00–19:00 UTC",
    maxPartiesSingleWave: "503",
    regTitle: "Register for a Private Wave",
    regSubtext: "All form fields including screenshot proof are strictly mandatory.",
    formFooterNote: "No login required — Host confirms on Discord directly.",
    rulesCategoryHeading: "HOW IT WORKS",
    rulesMainHeading: "Party Rules, Made Simple",
    rule1Emoji: "💎",
    rule1Title: "How to book Wave?",
    rule1Bullet1: "Send 200 gems with screenshot proof.",
    rule1Bullet2: "Drop your game name + tag",
    rule1Bullet3: "Host approves in queue order",
    rule2Emoji: "🍒",
    rule2Title: "Hustle-Free Guarantee",
    rule2Bullet1: "Fast-Paced",
    rule2Bullet2: "Friendly queue, no drama",
    rule2Bullet3: "Waves Hosted so far",
    rule3Emoji: "🌷",
    rule3Title: "Host Schedule",
    rule3NextWave: "Party hours: 15:00 – 19:00 UTC, daily.",
    rule3Desc: "Booking stays open 24/7.",
    bannerBadgeText: "Fastest response",
    bannerTitle: "Join Discord / Contact Host",
    bannerText: "Host replies in under 5 minutes.",
    discordUrl: "https://discord.com/users/757598254668972065"
  };

  const [theme, setTheme] = useState(defaultTheme);
  const [editThemeForm, setEditThemeForm] = useState(defaultTheme);
  const [hostedParties, setHostedParties] = useState('2,375');
  const [newHostedCount, setNewHostedCount] = useState('2,375');
  const [isEditingParties, setIsEditingParties] = useState(false);
  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [editContentForm, setEditContentForm] = useState(defaultSiteContent);
  const [submissions, setSubmissions] = useState([]);
  const [deletedSubmissions, setDeletedSubmissions] = useState([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [selectedProofModal, setSelectedProofModal] = useState(null);

  useEffect(() => {
    onValue(ref(db, 'valerie_site/theme'), (snap) => {
      if (snap.val()) { setTheme({ ...defaultTheme, ...snap.val() }); setEditThemeForm({ ...defaultTheme, ...snap.val() }); }
    });
    onValue(ref(db, 'valerie_site/hostedParties'), (snap) => { if (snap.val() !== null) { setHostedParties(snap.val()); setNewHostedCount(snap.val()); } });
    onValue(ref(db, 'valerie_site/siteContent'), (snap) => { if (snap.val()) { setSiteContent({ ...defaultSiteContent, ...snap.val() }); setEditContentForm({ ...defaultSiteContent, ...snap.val() }); } });
    onValue(ref(db, 'valerie_site/submissions'), (snap) => { setSubmissions(snap.val() || []); });
    onValue(ref(db, 'valerie_site/deletedSubmissions'), (snap) => { setDeletedSubmissions(snap.val() || []); });
  }, []);

  const realValerieAvatar = "https://sunday-city-waves--00ko1l64.preview.static.emergentagent.com/valerie-avatar.jpeg";
  const totalGems = (parseInt(wavesCount) || 0) * (parseInt(gemsPerWave) || 0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGemsProof(file);
      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => setProofPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameName.trim() || !tag.trim() || !proofPreview) {
      setFormError('All fields and screenshot proof are strictly mandatory.');
      return;
    }
    setFormError('');
    const newEntry = {
      id: Date.now(),
      name: gameName.trim(),
      tag: tag.trim(),
      waves: parseInt(wavesCount),
      gems: parseInt(gemsPerWave),
      total: totalGems,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      status: 'Pending',
      screenshot: proofPreview
    };
    set(ref(db, 'valerie_site/submissions'), [newEntry, ...submissions]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setGameName(''); setTag(''); setGemsProof(null); setProofPreview(null); }, 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'sherlynavalerie' && passcode === 'TheOGHost14') {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setActiveTab('dashboard');
    } else {
      alert('Invalid Username or Passcode!');
    }
  };

  const showTempMsg = (msg) => { setSaveSuccessMsg(msg); setTimeout(() => setSaveSuccessMsg(''), 3500); };

  return (
    <div className="min-h-screen relative selection:bg-pink-200 selection:text-pink-900 transition-colors duration-200" style={{ backgroundColor: theme.pageBg, fontFamily: theme.fontFamily, color: theme.rulesBoxText || '#111827' }}>
      <DynamicBackgroundEffects theme={theme} />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 px-4 lg:px-8 py-3 shadow-md border-b-2 relative" style={{ backgroundColor: theme.headerBg, color: theme.headerText }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={realValerieAvatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 object-cover shadow-sm" />
            <div>
              <span className="font-black text-lg">{siteContent.brandName}</span>
              <p className="text-xs font-mono font-bold flex items-center gap-1"><Wifi className="w-3 h-3 text-emerald-600 animate-pulse" /> CLOUD SYNC</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button onClick={() => setActiveTab(activeTab === 'dashboard' ? 'booking' : 'dashboard')} className="px-4 py-2 bg-gray-900 text-white font-black rounded-xl text-xs">
                {activeTab === 'dashboard' ? 'View Website' : 'Admin Dashboard'}
              </button>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-900 text-white font-bold rounded-xl text-xs">
                <LogIn className="w-3.5 h-3.5" /> Host Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 relative z-10">
        {saveSuccessMsg && (
          <div className="fixed top-16 right-4 z-50 bg-emerald-600 text-white font-black px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5" /> {saveSuccessMsg}
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {activeTab === 'dashboard' && isLoggedIn ? (
          <section className="bg-white/95 backdrop-blur-md border-2 border-pink-200 rounded-3xl p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-pink-200">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <ShieldCheck className="text-pink-600" /> ADMIN COMMAND CENTER
              </h2>
              <button onClick={() => setIsLoggedIn(false)} className="px-3 py-1.5 text-xs font-bold bg-red-100 text-red-700 rounded-lg">Logout</button>
            </div>

            {/* 5 ADMIN TABS */}
            <div className="flex items-center gap-2 border-b border-pink-200 pb-3 overflow-x-auto">
              <button onClick={() => setAdminViewTab('active')} className={`px-4 py-2 rounded-xl text-xs font-black ${adminViewTab === 'active' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Registrations</button>
              <button onClick={() => setAdminViewTab('theme')} className={`px-4 py-2 rounded-xl text-xs font-black ${adminViewTab === 'theme' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Font Sizes & Colors</button>
              <button onClick={() => setAdminViewTab('animations')} className={`px-4 py-2 rounded-xl text-xs font-black ${adminViewTab === 'animations' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}>❄️ Animations & Snowfall FX</button>
              <button onClick={() => setAdminViewTab('content')} className={`px-4 py-2 rounded-xl text-xs font-black ${adminViewTab === 'content' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Sentences & Emojis</button>
              <button onClick={() => setAdminViewTab('deleted')} className={`px-4 py-2 rounded-xl text-xs font-black ${adminViewTab === 'deleted' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Deleted History</button>
            </div>

            {/* ANIMATIONS & SNOWFALL TAB */}
            {adminViewTab === 'animations' && (
              <form onSubmit={(e) => { e.preventDefault(); set(ref(db, 'valerie_site/theme'), editThemeForm); showTempMsg("Animations & Snowfall settings saved!"); }} className="space-y-6 bg-cyan-50/50 p-6 rounded-2xl border-2 border-cyan-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-cyan-900 flex items-center gap-2"><Snowflake className="animate-spin text-cyan-600" /> Snowfall & Blink Glow Orbs Settings</h3>
                  <button type="button" onClick={() => setEditThemeForm(defaultTheme)} className="text-xs text-rose-700 bg-white px-3 py-1 rounded border">Reset Defaults</button>
                </div>

                {/* Snowfall Toggle & Controls */}
                <div className="bg-white p-4 rounded-xl border border-cyan-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-sky-900">1. Snowfall Effect ON / OFF</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editThemeForm.enableSnowfall} onChange={(e) => setEditThemeForm({...editThemeForm, enableSnowfall: e.target.checked})} className="w-4 h-4 text-sky-600" />
                      <span className="text-xs font-black">{editThemeForm.enableSnowfall ? "ENABLED" : "DISABLED"}</span>
                    </label>
                  </div>

                  {editThemeForm.enableSnowfall && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1">Density Count</label>
                        <input type="number" value={editThemeForm.snowCount} onChange={(e) => setEditThemeForm({...editThemeForm, snowCount: e.target.value})} className="w-full border rounded p-1.5 text-xs font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Speed</label>
                        <input type="number" step="0.5" value={editThemeForm.snowSpeed} onChange={(e) => setEditThemeForm({...editThemeForm, snowSpeed: e.target.value})} className="w-full border rounded p-1.5 text-xs font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Shape</label>
                        <select value={editThemeForm.snowShape} onChange={(e) => setEditThemeForm({...editThemeForm, snowShape: e.target.value})} className="w-full border rounded p-1.5 text-xs font-bold">
                          <option value="snowflake">❄️ Snowflake</option>
                          <option value="circle">⚪ Circle</option>
                          <option value="heart">💖 Heart</option>
                          <option value="star">✨ Star</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Color</label>
                        <input type="color" value={editThemeForm.snowColor} onChange={(e) => setEditThemeForm({...editThemeForm, snowColor: e.target.value})} className="w-full h-8 rounded border cursor-pointer" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Blink Orbs Toggle & Controls */}
                <div className="bg-white p-4 rounded-xl border border-fuchsia-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-fuchsia-900">2. Blink Glow Orbs ON / OFF</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editThemeForm.enableBlinkGlow} onChange={(e) => setEditThemeForm({...editThemeForm, enableBlinkGlow: e.target.checked})} className="w-4 h-4 text-fuchsia-600" />
                      <span className="text-xs font-black">{editThemeForm.enableBlinkGlow ? "ENABLED" : "DISABLED"}</span>
                    </label>
                  </div>

                  {editThemeForm.enableBlinkGlow && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1">Orbs Count</label>
                        <input type="number" value={editThemeForm.blinkCount} onChange={(e) => setEditThemeForm({...editThemeForm, blinkCount: e.target.value})} className="w-full border rounded p-1.5 text-xs font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Blink Speed</label>
                        <input type="number" step="0.5" value={editThemeForm.blinkSpeed} onChange={(e) => setEditThemeForm({...editThemeForm, blinkSpeed: e.target.value})} className="w-full border rounded p-1.5 text-xs font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Glow Color 1</label>
                        <input type="color" value={editThemeForm.blinkColor1} onChange={(e) => setEditThemeForm({...editThemeForm, blinkColor1: e.target.value})} className="w-full h-8 rounded border cursor-pointer" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Glow Color 2</label>
                        <input type="color" value={editThemeForm.blinkColor2} onChange={(e) => setEditThemeForm({...editThemeForm, blinkColor2: e.target.value})} className="w-full h-8 rounded border cursor-pointer" />
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs rounded-xl shadow">Save Animation Settings</button>
              </form>
            )}

            {adminViewTab === 'active' && (
              <div className="overflow-x-auto bg-white rounded-xl p-2 border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-pink-100 text-pink-900 font-bold">
                    <tr><th className="p-2">Time</th><th className="p-2">Name</th><th className="p-2">Tag</th><th className="p-2">Waves</th><th className="p-2">Total Gems</th><th className="p-2">Proof</th><th className="p-2">Status</th></tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 ? <tr><td colSpan={7} className="p-4 text-center text-gray-500">No registrations yet.</td></tr> : submissions.map(sub => (
                      <tr key={sub.id} className="border-b">
                        <td className="p-2 font-mono">{sub.timestamp}</td>
                        <td className="p-2 font-bold">{sub.name}</td>
                        <td className="p-2 font-mono">{sub.tag}</td>
                        <td className="p-2">{sub.waves}</td>
                        <td className="p-2 font-bold text-emerald-600">{sub.total} Gems</td>
                        <td className="p-2"><button onClick={() => setSelectedProofModal(sub.screenshot)} className="text-pink-600 underline font-bold">View</button></td>
                        <td className="p-2"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">{sub.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {adminViewTab === 'theme' && <div className="p-4 text-xs font-bold text-gray-600">Font sizes & color settings available in theme tab.</div>}
            {adminViewTab === 'content' && <div className="p-4 text-xs font-bold text-gray-600">Sentences & Emojis customization active.</div>}
            {adminViewTab === 'deleted' && <div className="p-4 text-xs font-bold text-gray-600">No deleted history.</div>}
          </section>
        ) : (
          /* PUBLIC BOOKING SECTION */
          <section id="booking" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 border-2 rounded-3xl p-6 flex flex-col justify-between shadow-md" style={{ backgroundColor: theme.profileBoxBg, borderColor: theme.profileBoxBorder }}>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={realValerieAvatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 object-cover" />
                  <div>
                    <h3 className="font-black text-xl">{siteContent.brandName}</h3>
                    <p className="text-xs font-bold text-pink-700">{siteContent.hostSubtag}</p>
                  </div>
                </div>
                <blockquote className="italic text-xs bg-white/80 p-3 rounded-xl mb-6">"{siteContent.hostBio}"</blockquote>
              </div>
              <a href={siteContent.discordUrl} target="_blank" rel="noreferrer" className="py-3 bg-gray-900 text-white text-center font-black rounded-xl text-sm">Chat on Discord</a>
            </div>

            <div className="lg:col-span-7 border-2 rounded-3xl p-6 shadow-lg" style={{ backgroundColor: theme.regBoxBg, borderColor: theme.regBoxBorder }}>
              <h3 className="font-black text-xl mb-1 flex items-center gap-2"><Sparkles /> {siteContent.regTitle}</h3>
              <p className="text-xs font-bold mb-4">{siteContent.regSubtext}</p>
              
              {formError && <div className="p-3 mb-3 bg-red-100 text-red-700 text-xs font-black rounded-xl">{formError}</div>}
              {submitted ? (
                <div className="bg-white p-6 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-black text-sm">Submitted Successfully!</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" required placeholder="Game Name" value={gameName} onChange={(e) => setGameName(e.target.value)} className="w-full p-2.5 rounded-xl border text-xs font-bold bg-white" />
                    <input type="text" required placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} className="w-full p-2.5 rounded-xl border text-xs font-bold bg-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select value={wavesCount} onChange={(e) => setWavesCount(e.target.value)} className="w-full p-2.5 rounded-xl border text-xs font-bold bg-white">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} Wave(s)</option>)}
                    </select>
                    <input type="number" value={gemsPerWave} onChange={(e) => setGemsPerWave(e.target.value)} className="w-full p-2.5 rounded-xl border text-xs font-bold bg-white" />
                  </div>
                  <div className="p-3 border border-dashed rounded-xl bg-white text-center relative">
                    <input type="file" accept="image/*" required onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    <Upload className="w-5 h-5 mx-auto text-pink-600 mb-1" />
                    <p className="text-xs font-bold">{proofPreview ? "Proof Attached!" : "Upload Gems Screenshot Proof"}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl flex items-center justify-between font-black text-sm">
                    <span>Total Gems:</span>
                    <span className="text-pink-600">{totalGems} Gems</span>
                  </div>
                  <button type="submit" className="w-full py-3 bg-gray-900 text-white font-black rounded-xl text-sm">Submit Registration</button>
                </form>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Host Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-black mb-4 text-center">Host Login</h3>
            <form onSubmit={handleLogin} className="space-y-3">
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 rounded-xl text-xs font-bold" />
              <input type="password" placeholder="Passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="w-full border p-2 rounded-xl text-xs font-bold" />
              <button type="submit" className="w-full py-2.5 bg-gray-900 text-white font-black rounded-xl text-xs">Login</button>
            </form>
          </div>
        </div>
      )}

      {selectedProofModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-3xl max-w-md w-full relative">
            <button onClick={() => setSelectedProofModal(null)} className="absolute top-4 right-4"><X className="w-5 h-5" /></button>
            <img src={selectedProofModal} alt="Proof" className="w-full rounded-xl max-h-[70vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
