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
  FileText,
  List,
  Palette,
  Type,
  RefreshCw,
  Wifi,
  AlertCircle,
  Crown,
  Star,
  Zap,
  Smile,
  Sliders
} from 'lucide-react';

// --- FIREBASE CONFIGURATION ---
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

  // --- DEFAULT DYNAMIC THEME ---
  const defaultTheme = {
    fontFamily: "'Inter', sans-serif",
    pageBg: '#ffffff',
    
    // Top Header Navbar
    headerBg: '#59ffe5',
    headerText: '#111827',
    
    // Profile Box
    profileBoxBg: '#fff0f6',
    profileBoxBorder: '#fbcfe8',
    profileBoxText: '#111827',
    subtagTextColor: '#be185d',
    subtagFontFamily: "'Inter', sans-serif",
    avatarRingColor: '#ec4899',

    // Registration Form Box
    regBoxBg: '#ff91f0',
    regBoxBorder: '#f472b6',
    regBoxText: '#111827',
    
    // Party Rules Section
    rulesTitleColor: '#111827',
    rulesCategoryColor: '#0284c7',
    rulesBoxBg: '#67daff',
    rulesBoxBorder: '#38bdf8',
    rulesBoxText: '#111827',

    // Bottom Discord Banner
    bannerBg: '#fce7f3',
    bannerBorder: '#fbcfe8',
    bannerTextColor: '#111827',

    // Primary Buttons (General)
    primaryBtnBg: '#111827',
    primaryBtnText: '#ffffff',
    btnBorderWidth: '2px',
    btnBorderColor: '#111827',
    btnBorderStyle: 'solid',
    btnBorderRadius: '16px',

    // Admin Login Button Specific Border (Fixed Point 1)
    adminBtnBg: '#111827',
    adminBtnText: '#ffffff',
    adminBtnBorderColor: '#111827',

    // Multi-color Letter Colors for Name
    nameLetterColors: ['#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea']
  };

  // --- DEFAULT DYNAMIC CONTENT & TEXT ---
  const defaultSiteContent = {
    brandName: "-VALERIE GURL-",
    selectedSymbol: "👑",
    verifiedBadgeText: "Verified OG",
    hostSubtag: "133LNO • The OG Party Host • Sunday City",
    hostBio: "Party Host for Sunday City. Need 200 gems to organize private parties. Fast, reliable, and hustle-free!",
    wavesTimingText: "Waves 15:00–19:00 UTC",
    maxPartiesSingleWave: "503",

    // Registration Form Headings & Text
    regTitle: "Register for a Private Wave",
    regSubtext: "All form fields including screenshot proof are strictly mandatory.",
    formFooterNote: "No login required — Host confirms on Discord directly.",

    // Rules Section Text & Emojis
    rulesCategoryHeading: "HOW IT WORKS",
    rulesMainHeading: "Party Rules, Made Simple",
    
    rule1Emoji: "💎",
    rule1Title: "How Private Waves Work",
    rule1Bullet1: "Send 200 gems per wave with a screenshot as proof.",
    rule1Bullet2: "Drop your game name + tag in the registration form.",
    rule1Bullet3: "Host approves in queue order — then you party!",

    rule2Emoji: "🛡️",
    rule2Title: "Hustle-Free Guarantee",
    rule2Bullet1: "Zero disconnects — waves restart instantly if anything drops.",
    rule2Bullet2: "Friendly queue, no drama, no waiting-room chaos.",
    rule2Bullet3: "waves hosted with a 503-party single-wave record.",

    rule3Emoji: "⏰",
    rule3Title: "Live Host Schedule",
    rule3NextWave: "Next wave starts at 15:00 UTC",
    rule3Desc: "Party hours: 15:00 – 19:00 UTC, every single day. Booking stays open 24/7 — waves are served in queue order.",

    // Bottom Banner Text
    bannerBadgeText: "Fastest response",
    bannerTitle: "Join Discord / Contact Host",
    bannerText: "Host replies in under 5 minutes. Approvals, wave updates, and custom requests — click below to open profile directly.",
    discordUrl: "https://discord.com/users/757598254668972065"
  };

  const defaultSubmissions = [];

  // --- STATES WITH CLOUD SYNC ---
  const [theme, setTheme] = useState(defaultTheme);
  const [editThemeForm, setEditThemeForm] = useState(defaultTheme);

  const [hostedParties, setHostedParties] = useState('2,130+');
  const [newHostedCount, setNewHostedCount] = useState('2,130+');
  const [isEditingParties, setIsEditingParties] = useState(false);

  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [editContentForm, setEditContentForm] = useState(defaultSiteContent);

  const [submissions, setSubmissions] = useState(defaultSubmissions);
  const [deletedSubmissions, setDeletedSubmissions] = useState([]);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [selectedProofModal, setSelectedProofModal] = useState(null);

  // --- REAL-TIME LISTENERS FROM FIREBASE ---
  useEffect(() => {
    // Theme Listener
    const themeRef = ref(db, 'valerie_site/theme');
    onValue(themeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTheme({ ...defaultTheme, ...data });
        setEditThemeForm({ ...defaultTheme, ...data });
      }
    });

    // Hosted Count Listener
    const hostedRef = ref(db, 'valerie_site/hostedParties');
    onValue(hostedRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setHostedParties(data);
        setNewHostedCount(data);
      }
    });

    // Dynamic Site Content Listener
    const contentRef = ref(db, 'valerie_site/siteContent');
    onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSiteContent({ ...defaultSiteContent, ...data });
        setEditContentForm({ ...defaultSiteContent, ...data });
      }
    });

    // Registrations Listener
    const subRef = ref(db, 'valerie_site/submissions');
    onValue(subRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSubmissions(data);
      } else {
        setSubmissions([]);
      }
    });

    // Deleted Submissions Listener
    const delRef = ref(db, 'valerie_site/deletedSubmissions');
    onValue(delRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDeletedSubmissions(data);
      } else {
        setDeletedSubmissions([]);
      }
    });
  }, []);

  const realValerieAvatar = "https://sunday-city-waves--00ko1l64.preview.static.emergentagent.com/valerie-avatar.jpeg";
  const totalGems = (parseInt(wavesCount) || 0) * (parseInt(gemsPerWave) || 0);

  const getCurrentUTCTime = () => {
    const now = new Date();
    const isoString = now.toISOString();
    return isoString.replace('T', ' ').substring(0, 16) + ' UTC';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGemsProof(file);
      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameName.trim()) {
      setFormError('Game Name is mandatory.');
      return;
    }
    if (!tag.trim()) {
      setFormError('Tag is mandatory.');
      return;
    }
    if (!proofPreview) {
      setFormError('Screenshot proof of gems is strictly mandatory.');
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
      timestamp: getCurrentUTCTime(),
      status: 'Pending',
      screenshot: proofPreview
    };
    
    const updated = [newEntry, ...submissions];
    set(ref(db, 'valerie_site/submissions'), updated);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setGameName('');
      setTag('');
      setGemsProof(null);
      setProofPreview(null);
    }, 4000);
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

  const updateStatus = (id, newStatus) => {
    const updated = submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub);
    set(ref(db, 'valerie_site/submissions'), updated);
  };

  // Soft Delete (Moves to History)
  const handleDeleteRequest = (id) => {
    const itemToDelete = submissions.find(sub => sub.id === id);
    if (itemToDelete) {
      const newActive = submissions.filter(sub => sub.id !== id);
      const newDeleted = [{ ...itemToDelete, deletedAt: getCurrentUTCTime() }, ...deletedSubmissions];
      set(ref(db, 'valerie_site/submissions'), newActive);
      set(ref(db, 'valerie_site/deletedSubmissions'), newDeleted);
    }
  };

  // Permanently Delete (Point 7 Requirement)
  const handlePermanentDelete = (id, isFromActive = true) => {
    if (window.confirm("Are you sure you want to permanently delete this registration data? This cannot be undone.")) {
      if (isFromActive) {
        const newActive = submissions.filter(sub => sub.id !== id);
        set(ref(db, 'valerie_site/submissions'), newActive);
      } else {
        const newDeleted = deletedSubmissions.filter(sub => sub.id !== id);
        set(ref(db, 'valerie_site/deletedSubmissions'), newDeleted);
      }
      showTempMsg("Registration permanently deleted!");
    }
  };

  const handleRestoreRequest = (id) => {
    const itemToRestore = deletedSubmissions.find(sub => sub.id === id);
    if (itemToRestore) {
      const newDeleted = deletedSubmissions.filter(sub => sub.id !== id);
      const newActive = [itemToRestore, ...submissions];
      set(ref(db, 'valerie_site/deletedSubmissions'), newDeleted);
      set(ref(db, 'valerie_site/submissions'), newActive);
    }
  };

  const handleSaveHostedParties = (e) => {
    e.preventDefault();
    set(ref(db, 'valerie_site/hostedParties'), newHostedCount);
    setIsEditingParties(false);
    showTempMsg("Hosted count synced to cloud successfully!");
  };

  const handleSaveDynamicContent = (e) => {
    e.preventDefault();
    set(ref(db, 'valerie_site/siteContent'), editContentForm);
    showTempMsg("All website sentences, titles & emojis synced to cloud!");
  };

  const handleSaveTheme = (e) => {
    e.preventDefault();
    set(ref(db, 'valerie_site/theme'), editThemeForm);
    showTempMsg("Colors, Font, Letter Colors & Borders synced to cloud!");
  };

  const handleResetTheme = () => {
    set(ref(db, 'valerie_site/theme'), defaultTheme);
    setEditThemeForm(defaultTheme);
    showTempMsg("Theme reset to default!");
  };

  const showTempMsg = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const handleLetterColorChange = (index, color) => {
    const newColors = [...(editThemeForm.nameLetterColors || [])];
    newColors[index] = color;
    setEditThemeForm({ ...editThemeForm, nameLetterColors: newColors });
  };

  // Dynamic Multi-Color Letter-by-Letter Brand Name Renderer
  const RenderDynamicBrandName = ({ name, fontSize = "text-xl sm:text-2xl" }) => {
    const colors = theme.nameLetterColors || defaultTheme.nameLetterColors;
    const letters = name.split('');
    return (
      <span className={`font-black tracking-wide inline-flex items-center ${fontSize}`}>
        {letters.map((char, index) => {
          const color = colors[index % colors.length] || '#db2777';
          return (
            <span key={index} style={{ color: color }}>
              {char === ' ' ? ' ' : char}
            </span>
          );
        })}
      </span>
    );
  };

  // Helper for Button Dynamic Border Styles
  const buttonBorderStyle = {
    backgroundColor: theme.primaryBtnBg,
    color: theme.primaryBtnText,
    borderWidth: theme.btnBorderWidth || '2px',
    borderColor: theme.btnBorderColor || '#111827',
    borderStyle: theme.btnBorderStyle || 'solid',
    borderRadius: theme.btnBorderRadius || '16px'
  };

  // Admin Button Specific Border Style (Point 1 fix)
  const adminBtnBorderStyle = {
    backgroundColor: theme.adminBtnBg || theme.primaryBtnBg,
    color: theme.adminBtnText || theme.primaryBtnText,
    borderWidth: theme.btnBorderWidth || '2px',
    borderColor: theme.adminBtnBorderColor || theme.btnBorderColor || '#111827',
    borderStyle: theme.btnBorderStyle || 'solid',
    borderRadius: theme.btnBorderRadius || '16px'
  };

  // Expanded Symbol Options
  const symbolList = ["👑", "💎", "🔥", "⚡", "✨", "🛡️", "⭐", "🏆", "🌟", "🌸", "💖", "🎮", "🚀", "💥", "🎯", "⏰", "🔮", "🧿", "🎁", "🎨"];

  // Expanded Fonts Collection (Point 2 & Point 9)
  const fontOptions = [
    { name: "Modern Sans-Serif (Inter)", value: "'Inter', sans-serif" },
    { name: "Clean Geometric (Poppins)", value: "'Poppins', sans-serif" },
    { name: "Bold & Sleek (Montserrat)", value: "'Montserrat', sans-serif" },
    { name: "High Contrast Elegant (Playfair)", value: "'Playfair Display', serif" },
    { name: "Coding Monospace (Fira Code)", value: "'Fira Code', monospace" },
    { name: "Retro Pixel Gaming (Press Start 2P)", value: "'Press Start 2P', cursive" },
    { name: "Futuristic (Outfit)", value: "'Outfit', sans-serif" },
    { name: "Handcrafted Cursive (Pacifico)", value: "'Pacifico', cursive" },
    { name: "Classic Serif (Georgia)", value: "Georgia, serif" },
    { name: "Native System UI", value: "system-ui, -apple-system, sans-serif" }
  ];

  return (
    <div 
      className="min-h-screen text-gray-900 selection:bg-pink-200 selection:text-pink-900 transition-colors duration-200"
      style={{ backgroundColor: theme.pageBg, fontFamily: theme.fontFamily }}
    >
      
      {/* 1. Top Header Navbar */}
      <header 
        className="sticky top-0 z-50 px-4 lg:px-8 py-3 shadow-md border-b-2" 
        style={{ backgroundColor: theme.headerBg, color: theme.headerText, borderColor: 'rgba(0,0,0,0.15)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              {/* Point 8: Border synced with main avatar ring color */}
              <img 
                src={realValerieAvatar} 
                alt="Host Avatar" 
                style={{ borderColor: theme.avatarRingColor || '#ec4899' }}
                className="w-10 h-10 rounded-full border-2 object-cover object-top shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80";
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg">{siteContent.selectedSymbol}</span>
                <RenderDynamicBrandName name={siteContent.brandName} fontSize="text-base sm:text-lg" />
              </div>
              <p className="text-xs font-mono font-bold flex items-center gap-1" style={{ color: theme.headerText }}>
                <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" /> LIVE CLOUD SYNC
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold" style={{ color: theme.headerText }}>
            <a href="#booking" onClick={() => setActiveTab('booking')} className="hover:opacity-80 transition-opacity">Wave Booking</a>
            <a href="#rules" className="hover:opacity-80 transition-opacity">Party Rules</a>
            <a href="#stats" className="hover:opacity-80 transition-opacity">Host Stats</a>
            <a href={siteContent.discordUrl} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1">
              Discord <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-900 text-xs font-bold shadow-sm border border-gray-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {siteContent.wavesTimingText}
            </div>

            {isLoggedIn ? (
              <button 
                onClick={() => setActiveTab(activeTab === 'dashboard' ? 'booking' : 'dashboard')}
                style={adminBtnBorderStyle}
                className="px-4 py-2 text-xs font-black transition-all shadow-sm hover:opacity-90"
              >
                {activeTab === 'dashboard' ? 'View Website' : 'Admin Dashboard'}
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                style={adminBtnBorderStyle}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold transition-all shadow-sm hover:opacity-90"
              >
                <LogIn className="w-3.5 h-3.5" /> Host Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
        
        {saveSuccessMsg && (
          <div className="fixed top-16 right-4 z-50 bg-emerald-600 text-white font-black px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5" /> {saveSuccessMsg}
          </div>
        )}

        {activeTab === 'dashboard' && isLoggedIn ? (
          /* Admin Dashboard */
          <section className="bg-pink-50 border-2 border-pink-200 rounded-3xl p-6 shadow-md space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
              <div>
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="text-pink-600" /> COMMAND CENTER (100% DYNAMIC CONTROL)
                </h2>
                <p className="text-xs text-gray-600 font-bold">Customize every sentence, font, emoji, border, and color across the entire website.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-red-100 border border-red-300 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-3 border-b border-pink-200 pb-3 overflow-x-auto">
              <button 
                onClick={() => setAdminViewTab('active')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'active' 
                    ? 'bg-pink-500 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <List className="w-3.5 h-3.5" /> Registrations ({submissions.length})
              </button>

              <button 
                onClick={() => setAdminViewTab('theme')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'theme' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" /> Colors, Fonts & Borders (100% Adjustable)
              </button>

              <button 
                onClick={() => setAdminViewTab('content')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'content' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" /> All Sentences, Emojis & Text Controls
              </button>

              <button 
                onClick={() => setAdminViewTab('deleted')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'deleted' 
                    ? 'bg-rose-500 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <History className="w-3.5 h-3.5" /> Deleted History ({deletedSubmissions.length})
              </button>
            </div>

            {/* HOST STATS UPDATE */}
            <div className="bg-white border-2 border-pink-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-amber-500" />
                <div>
                  <h4 className="text-sm font-black text-gray-900">Total Hosted Parties Count</h4>
                  <p className="text-xs text-gray-600">Currently live: <span className="text-pink-600 font-black">{hostedParties}</span> (Synced across all devices).</p>
                </div>
              </div>

              {isEditingParties ? (
                <form onSubmit={handleSaveHostedParties} className="flex items-center gap-2 w-full sm:w-auto">
                  <input 
                    type="text" 
                    value={newHostedCount}
                    onChange={(e) => setNewHostedCount(e.target.value)}
                    placeholder="e.g. 2,150+"
                    className="bg-gray-50 border border-pink-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 font-bold focus:outline-none focus:border-pink-500"
                  />
                  <button 
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-black"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditingParties(false)}
                    className="px-2 py-1.5 text-xs text-gray-600 hover:text-gray-900 font-bold"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => { setNewHostedCount(hostedParties); setIsEditingParties(true); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 border border-pink-300 text-pink-800 text-xs font-black rounded-lg transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Count
                </button>
              )}
            </div>

            {/* TAB 1: REGISTRATIONS WITH PERMANENT DELETE (Point 7) */}
            {adminViewTab === 'active' && (
              <div className="overflow-x-auto bg-white rounded-2xl border-2 border-pink-200 p-2 shadow-sm">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-pink-100/80 text-xs uppercase text-pink-900 border-b border-pink-200">
                    <tr>
                      <th className="p-3">UTC Timestamp</th>
                      <th className="p-3">Player Name</th>
                      <th className="p-3">Tag</th>
                      <th className="p-3">Waves</th>
                      <th className="p-3">Gems/Wave</th>
                      <th className="p-3">Total Gems</th>
                      <th className="p-3">Screenshot Proof</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-100">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-6 text-center text-gray-500 text-xs font-medium">No active registrations found.</td>
                      </tr>
                    ) : (
                      submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-pink-50/50">
                          <td className="p-3 font-mono text-xs text-pink-700 font-bold">{sub.timestamp}</td>
                          <td className="p-3 font-bold text-gray-900">{sub.name}</td>
                          <td className="p-3 font-mono text-gray-600">{sub.tag}</td>
                          <td className="p-3">{sub.waves} wave(s)</td>
                          <td className="p-3">{sub.gems}</td>
                          <td className="p-3 font-black text-emerald-600">{sub.total} Gems</td>
                          <td className="p-3">
                            <button 
                              onClick={() => setSelectedProofModal(sub.screenshot)}
                              className="flex items-center gap-1 text-xs bg-pink-100 hover:bg-pink-200 text-pink-900 px-2.5 py-1 rounded-lg border border-pink-300 font-bold"
                            >
                              <Eye className="w-3 h-3" /> View Proof
                            </button>
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                              sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              sub.status === 'Completed' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                              'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-3 flex items-center gap-2">
                            <button 
                              onClick={() => updateStatus(sub.id, 'Approved')}
                              className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg border border-emerald-300 transition-all"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => updateStatus(sub.id, 'Completed')}
                              className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg border border-blue-300 transition-all"
                              title="Complete"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteRequest(sub.id)}
                              className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg border border-amber-300 transition-all"
                              title="Move to Trash"
                            >
                              <History className="w-4 h-4" />
                            </button>
                            {/* Point 7: Permanent Delete Button */}
                            <button 
                              onClick={() => handlePermanentDelete(sub.id, true)}
                              className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all"
                              title="Permanently Delete Data"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: FULL THEME, FONT, BORDER & COLOR CUSTOMIZER (FIXES FOR POINTS 1, 2, 3, 4, 5, 6, 8, 9) */}
            {adminViewTab === 'theme' && (
              <form onSubmit={handleSaveTheme} className="bg-white border-2 border-pink-200 rounded-2xl p-6 space-y-8 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <Palette className="text-indigo-600" /> Full Theme, Fonts, Borders & Colors Customizer
                    </h3>
                    <p className="text-xs text-gray-600 font-bold">100% dynamic settings for website backgrounds, titles, cards, subtag fonts, and borders.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleResetTheme}
                    className="flex items-center gap-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 font-bold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
                  </button>
                </div>

                {/* --- Point 2 & Point 6: Website Font & Entire Website Page Background --- */}
                <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                    <Type className="w-4 h-4 text-indigo-600" /> Global Website Font & Page Background
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Main Website Font Family (Point 2 Fix)</label>
                      <select 
                        value={editThemeForm.fontFamily}
                        onChange={(e) => setEditThemeForm({ ...editThemeForm, fontFamily: e.target.value })}
                        className="w-full bg-white border border-indigo-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      >
                        {fontOptions.map((f, i) => (
                          <option key={i} value={f.value}>{f.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Entire Website Background Color (Point 6 Fix)</label>
                      <div className="flex items-center gap-3 bg-white p-2 border border-indigo-300 rounded-xl">
                        <input 
                          type="color" 
                          value={editThemeForm.pageBg} 
                          onChange={(e) => setEditThemeForm({...editThemeForm, pageBg: e.target.value})}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-xs font-mono font-bold text-gray-900">{editThemeForm.pageBg}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Point 1: Separated Button & Admin Login Borders --- */}
                <div className="bg-purple-50/70 border-2 border-purple-200 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-black text-purple-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-purple-600" /> Clickable Buttons & Admin Login Border Controls (Point 1 Fix)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Main Button Border Width</label>
                      <select 
                        value={editThemeForm.btnBorderWidth}
                        onChange={(e) => setEditThemeForm({ ...editThemeForm, btnBorderWidth: e.target.value })}
                        className="w-full bg-white border border-purple-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                      >
                        <option value="0px">None (0px)</option>
                        <option value="1px">Thin (1px)</option>
                        <option value="2px">Standard (2px)</option>
                        <option value="3px">Thick (3px)</option>
                        <option value="4px">Extra Thick (4px)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Main Button Border Color</label>
                      <div className="flex items-center gap-2 bg-white p-1.5 border border-purple-300 rounded-xl">
                        <input 
                          type="color" 
                          value={editThemeForm.btnBorderColor}
                          onChange={(e) => setEditThemeForm({ ...editThemeForm, btnBorderColor: e.target.value })}
                          className="w-7 h-7 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-gray-700">{editThemeForm.btnBorderColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Admin Login Btn Border Color</label>
                      <div className="flex items-center gap-2 bg-white p-1.5 border border-purple-300 rounded-xl">
                        <input 
                          type="color" 
                          value={editThemeForm.adminBtnBorderColor}
                          onChange={(e) => setEditThemeForm({ ...editThemeForm, adminBtnBorderColor: e.target.value })}
                          className="w-7 h-7 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-gray-700">{editThemeForm.adminBtnBorderColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Corner Radius</label>
                      <select 
                        value={editThemeForm.btnBorderRadius}
                        onChange={(e) => setEditThemeForm({ ...editThemeForm, btnBorderRadius: e.target.value })}
                        className="w-full bg-white border border-purple-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                      >
                        <option value="4px">Square (4px)</option>
                        <option value="10px">Rounded (10px)</option>
                        <option value="16px">Pill / Soft (16px)</option>
                        <option value="9999px">Fully Pill (9999px)</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* --- Letter-by-Letter Color Picker --- */}
                <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border-2 border-pink-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-pink-600" /> Letter-by-Letter Name Color Picker
                      </h4>
                      <p className="text-xs text-gray-600">Assign individual colors to each character of your brand name!</p>
                    </div>
                    <div className="px-3 py-1 bg-white rounded-xl border border-pink-200 shadow-sm">
                      <RenderDynamicBrandName name={siteContent.brandName} fontSize="text-lg" />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {siteContent.brandName.split('').map((char, idx) => (
                      <div key={idx} className="bg-white border border-pink-300 rounded-xl p-2 flex flex-col items-center gap-1.5 shadow-sm">
                        <span className="text-sm font-black text-gray-900">{char === ' ' ? 'Space' : char}</span>
                        <input 
                          type="color" 
                          value={(editThemeForm.nameLetterColors || [])[idx] || '#db2777'} 
                          onChange={(e) => handleLetterColorChange(idx, e.target.value)}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid for Component Colors (Points 1, 3, 4, 5, 8, 9) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  
                  {/* Left Profile Card + Avatar Border (Point 1 & Point 8 & Point 9 Fix) */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Host Profile Card & Subtag (Point 8, 9)</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Card Background</label>
                      <input 
                        type="color" 
                        value={editThemeForm.profileBoxBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, profileBoxBg: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Card Border (Point 1)</label>
                      <input 
                        type="color" 
                        value={editThemeForm.profileBoxBorder} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, profileBoxBorder: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Avatar Border Ring (Point 8)</label>
                      <input 
                        type="color" 
                        value={editThemeForm.avatarRingColor} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, avatarRingColor: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Subtag Font Color (Point 9)</label>
                      <input 
                        type="color" 
                        value={editThemeForm.subtagTextColor} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, subtagTextColor: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Subtag Font Family (Point 9)</label>
                      <select 
                        value={editThemeForm.subtagFontFamily}
                        onChange={(e) => setEditThemeForm({ ...editThemeForm, subtagFontFamily: e.target.value })}
                        className="w-full bg-white border border-gray-300 rounded-lg p-1.5 text-xs font-bold text-gray-900"
                      >
                        {fontOptions.map((f, i) => (
                          <option key={i} value={f.value}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Registration Box Customizer (Point 3 Fix) */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Registration Card Colors (Point 3)</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Background Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.regBoxBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, regBoxBg: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Border Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.regBoxBorder} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, regBoxBorder: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Font Color (Point 3 Fix)</label>
                      <input 
                        type="color" 
                        value={editThemeForm.regBoxText} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, regBoxText: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Party Rules Title & Box Colors (Point 4 Fix) */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Party Rules Section Colors (Point 4)</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Category Header Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.rulesCategoryColor} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, rulesCategoryColor: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Main Title Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.rulesTitleColor} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, rulesTitleColor: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Card Background</label>
                      <input 
                        type="color" 
                        value={editThemeForm.rulesBoxBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, rulesBoxBg: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Card Border</label>
                      <input 
                        type="color" 
                        value={editThemeForm.rulesBoxBorder} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, rulesBoxBorder: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Bottom Discord Banner Customizer (Point 5 Fix) */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Bottom Banner Colors (Point 5)</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Banner Background</label>
                      <input 
                        type="color" 
                        value={editThemeForm.bannerBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, bannerBg: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Banner Border</label>
                      <input 
                        type="color" 
                        value={editThemeForm.bannerBorder} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, bannerBorder: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Text Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.bannerTextColor} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, bannerTextColor: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save All Styling & Colors to Cloud
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: ALL SENTENCES, TITLES, EMOJIS & TEXT DYNAMIC EDITOR (POINTS 4, 9, 10, 11 FIXES) */}
            {adminViewTab === 'content' && (
              <form onSubmit={handleSaveDynamicContent} className="bg-white border-2 border-pink-200 rounded-2xl p-6 space-y-8 shadow-sm">
                <div className="pb-3 border-b border-gray-200">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Globe className="text-purple-600" /> Complete Dynamic Text & Emoji Command Center (Point 11)
                  </h3>
                  <p className="text-xs text-gray-600 font-bold">Edit every single heading, sentence, quote, badge, and emoji across all website sections.</p>
                </div>

                {/* Section A: Brand Name & Symbol */}
                <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-4">
                  <h4 className="text-xs font-black text-purple-900 uppercase tracking-wider">1. Brand Name & Navbar Symbol</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Dynamic Brand Name</label>
                      <input 
                        type="text"
                        value={editContentForm.brandName}
                        onChange={(e) => setEditContentForm({...editContentForm, brandName: e.target.value})}
                        className="w-full bg-white border border-purple-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Brand Symbol Badge (Point 10)</label>
                      <select 
                        value={editContentForm.selectedSymbol}
                        onChange={(e) => setEditContentForm({ ...editContentForm, selectedSymbol: e.target.value })}
                        className="w-full bg-white border border-purple-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      >
                        {symbolList.map((sym, idx) => (
                          <option key={idx} value={sym}>{sym} Symbol</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Verified Badge Text</label>
                      <input 
                        type="text"
                        value={editContentForm.verifiedBadgeText}
                        onChange={(e) => setEditContentForm({...editContentForm, verifiedBadgeText: e.target.value})}
                        className="w-full bg-white border border-purple-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Host Profile Text (Point 9 Fix) */}
                <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-200 space-y-4">
                  <h4 className="text-xs font-black text-pink-900 uppercase tracking-wider">2. Host Profile Subtag & Bio (Point 9 Fix)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Host Subtag Sentence ("The OG Party Host • 133LNO")</label>
                      <input 
                        type="text"
                        value={editContentForm.hostSubtag}
                        onChange={(e) => setEditContentForm({...editContentForm, hostSubtag: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Host Bio Quote</label>
                      <textarea 
                        rows={2}
                        value={editContentForm.hostBio}
                        onChange={(e) => setEditContentForm({...editContentForm, hostBio: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section C: Registration Box Titles & Footers (Point 11 Fix) */}
                <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200 space-y-4">
                  <h4 className="text-xs font-black text-sky-900 uppercase tracking-wider">3. Wave Registration Box Titles & Footer</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Form Main Title</label>
                      <input 
                        type="text"
                        value={editContentForm.regTitle}
                        onChange={(e) => setEditContentForm({...editContentForm, regTitle: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Form Subtitle Sentence</label>
                      <input 
                        type="text"
                        value={editContentForm.regSubtext}
                        onChange={(e) => setEditContentForm({...editContentForm, regSubtext: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Form Bottom Sentence</label>
                      <input 
                        type="text"
                        value={editContentForm.formFooterNote}
                        onChange={(e) => setEditContentForm({...editContentForm, formFooterNote: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section D: Party Rules Section Sentences & Emojis (Point 4 & Point 10 Fixes) */}
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-4">
                  <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider">4. Party Rules Section Main Headings & Box Sentences (Points 4, 10, 11)</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 border-b border-emerald-200">
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Section Category Heading ("HOW IT WORKS")</label>
                      <input 
                        type="text"
                        value={editContentForm.rulesCategoryHeading}
                        onChange={(e) => setEditContentForm({...editContentForm, rulesCategoryHeading: e.target.value})}
                        className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Section Main Title ("Party Rules, Made Simple")</label>
                      <input 
                        type="text"
                        value={editContentForm.rulesMainHeading}
                        onChange={(e) => setEditContentForm({...editContentForm, rulesMainHeading: e.target.value})}
                        className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Box 1 Customizer */}
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
                    <h5 className="text-xs font-black text-gray-900">Rule Box 1 Customizer</h5>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700">Emoji (Point 10)</label>
                        <input type="text" value={editContentForm.rule1Emoji} onChange={(e) => setEditContentForm({...editContentForm, rule1Emoji: e.target.value})} className="w-full border rounded-lg p-1.5 text-xs font-bold" />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-gray-700">Box 1 Title</label>
                        <input type="text" value={editContentForm.rule1Title} onChange={(e) => setEditContentForm({...editContentForm, rule1Title: e.target.value})} className="w-full border rounded-lg p-1.5 text-xs font-bold" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input type="text" value={editContentForm.rule1Bullet1} onChange={(e) => setEditContentForm({...editContentForm, rule1Bullet1: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                      <input type="text" value={editContentForm.rule1Bullet2} onChange={(e) => setEditContentForm({...editContentForm, rule1Bullet2: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                      <input type="text" value={editContentForm.rule1Bullet3} onChange={(e) => setEditContentForm({...editContentForm, rule1Bullet3: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                    </div>
                  </div>

                  {/* Box 2 Customizer */}
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
                    <h5 className="text-xs font-black text-gray-900">Rule Box 2 Customizer</h5>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700">Emoji (Point 10)</label>
                        <input type="text" value={editContentForm.rule2Emoji} onChange={(e) => setEditContentForm({...editContentForm, rule2Emoji: e.target.value})} className="w-full border rounded-lg p-1.5 text-xs font-bold" />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-gray-700">Box 2 Title</label>
                        <input type="text" value={editContentForm.rule2Title} onChange={(e) => setEditContentForm({...editContentForm, rule2Title: e.target.value})} className="w-full border rounded-lg p-1.5 text-xs font-bold" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input type="text" value={editContentForm.rule2Bullet1} onChange={(e) => setEditContentForm({...editContentForm, rule2Bullet1: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                      <input type="text" value={editContentForm.rule2Bullet2} onChange={(e) => setEditContentForm({...editContentForm, rule2Bullet2: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                      <input type="text" value={editContentForm.rule2Bullet3} onChange={(e) => setEditContentForm({...editContentForm, rule2Bullet3: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                    </div>
                  </div>

                  {/* Box 3 Customizer */}
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
                    <h5 className="text-xs font-black text-gray-900">Rule Box 3 Customizer</h5>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700">Emoji (Point 10)</label>
                        <input type="text" value={editContentForm.rule3Emoji} onChange={(e) => setEditContentForm({...editContentForm, rule3Emoji: e.target.value})} className="w-full border rounded-lg p-1.5 text-xs font-bold" />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-gray-700">Box 3 Title</label>
                        <input type="text" value={editContentForm.rule3Title} onChange={(e) => setEditContentForm({...editContentForm, rule3Title: e.target.value})} className="w-full border rounded-lg p-1.5 text-xs font-bold" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" value={editContentForm.rule3NextWave} onChange={(e) => setEditContentForm({...editContentForm, rule3NextWave: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                      <input type="text" value={editContentForm.rule3Desc} onChange={(e) => setEditContentForm({...editContentForm, rule3Desc: e.target.value})} className="border rounded-lg p-1.5 text-xs font-bold" />
                    </div>
                  </div>

                </div>

                {/* Section E: Bottom Banner Sentences */}
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-4">
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">5. Bottom Discord Banner Sentences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Badge Text</label>
                      <input type="text" value={editContentForm.bannerBadgeText} onChange={(e) => setEditContentForm({...editContentForm, bannerBadgeText: e.target.value})} className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Banner Main Title</label>
                      <input type="text" value={editContentForm.bannerTitle} onChange={(e) => setEditContentForm({...editContentForm, bannerTitle: e.target.value})} className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Banner Description Sentence</label>
                      <input type="text" value={editContentForm.bannerText} onChange={(e) => setEditContentForm({...editContentForm, bannerText: e.target.value})} className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs font-bold" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save All Sentences & Emojis to Cloud
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: DELETED HISTORY */}
            {adminViewTab === 'deleted' && (
              <div className="overflow-x-auto bg-white rounded-2xl border-2 border-pink-200 p-2 shadow-sm">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-rose-100 text-xs uppercase text-rose-800 border-b border-rose-200">
                    <tr>
                      <th className="p-3">Original UTC Time</th>
                      <th className="p-3">Deleted At (UTC)</th>
                      <th className="p-3">Player Name</th>
                      <th className="p-3">Tag</th>
                      <th className="p-3">Waves</th>
                      <th className="p-3">Total Gems</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100">
                    {deletedSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-gray-500 text-xs font-medium">No deleted requests history.</td>
                      </tr>
                    ) : (
                      deletedSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-rose-50/50">
                          <td className="p-3 font-mono text-xs text-gray-500">{sub.timestamp}</td>
                          <td className="p-3 font-mono text-xs text-rose-600 font-bold">{sub.deletedAt}</td>
                          <td className="p-3 font-bold text-gray-800 line-through">{sub.name}</td>
                          <td className="p-3 font-mono text-pink-700">{sub.tag}</td>
                          <td className="p-3">{sub.waves} wave(s)</td>
                          <td className="p-3 text-gray-500">{sub.total} Gems</td>
                          <td className="p-3 flex items-center gap-2">
                            <button 
                              onClick={() => handleRestoreRequest(sub.id)}
                              className="flex items-center gap-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-300 font-bold"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> Restore
                            </button>
                            <button 
                              onClick={() => handlePermanentDelete(sub.id, false)}
                              className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all"
                              title="Permanently Delete Data"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : (
          /* Public Hero Section */
          <section id="booking" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Card: Host Profile */}
            <div 
              className="lg:col-span-5 border-2 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden transition-colors" 
              style={{ backgroundColor: theme.profileBoxBg, borderColor: theme.profileBoxBorder, color: theme.profileBoxText }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* Point 8: Avatar ring style synchronized */}
                  <div 
                    className="relative w-20 h-20 flex-shrink-0 p-1 rounded-full shadow-md"
                    style={{ backgroundColor: theme.avatarRingColor || '#ec4899' }}
                  >
                    <img 
                      src={realValerieAvatar} 
                      alt="Host Avatar" 
                      className="w-full h-full rounded-full object-cover object-top border-2 border-white"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80";
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl sm:text-2xl">{siteContent.selectedSymbol}</span>
                      <RenderDynamicBrandName name={siteContent.brandName} fontSize="text-xl sm:text-2xl" />
                      <span className="px-2.5 py-0.5 text-[10px] font-black bg-white text-pink-800 border border-pink-300 rounded-full shadow-sm whitespace-nowrap">
                        {siteContent.verifiedBadgeText}
                      </span>
                    </div>
                    
                    {/* Point 9: Subtag with customizable font & color */}
                    <p 
                      className="text-xs font-bold mt-1 tracking-wide"
                      style={{ color: theme.subtagTextColor || '#be185d', fontFamily: theme.subtagFontFamily || theme.fontFamily }}
                    >
                      {siteContent.hostSubtag}
                    </p>
                  </div>
                </div>

                <blockquote className="text-gray-800 text-sm leading-relaxed border-l-4 border-pink-500 pl-4 italic mb-8 bg-white/90 py-3.5 rounded-r-2xl shadow-sm font-medium">
                  "{siteContent.hostBio}"
                </blockquote>

                <div className="grid grid-cols-3 gap-3 mb-8" id="stats">
                  <div className="bg-white border border-pink-200 p-3 rounded-2xl text-center shadow-sm">
                    <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <div className="text-xl font-black text-gray-900">{hostedParties}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Hosted Waves</div>
                  </div>

                  <div className="bg-white border border-pink-200 p-3 rounded-2xl text-center shadow-sm">
                    <Flame className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                    <div className="text-xl font-black text-gray-900">{siteContent.maxPartiesSingleWave}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Parties in 1 Wave</div>
                  </div>

                  <div className="bg-white border border-pink-200 p-3 rounded-2xl text-center shadow-sm">
                    <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-xl font-black text-gray-900">15–19</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">UTC Window</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-pink-200">
                <div className="flex items-center gap-3">
                  <a 
                    href={siteContent.discordUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={buttonBorderStyle}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 font-bold text-sm transition-all shadow-md hover:opacity-90"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat with Host
                  </a>
                  <span className="px-3.5 py-3 bg-white border border-pink-300 text-pink-800 text-xs font-black rounded-2xl whitespace-nowrap shadow-sm">
                    Gems 200 / wave
                  </span>
                </div>
                <p className="text-[11px] text-center text-gray-600 font-medium">Replies in under 5 minutes during party hours.</p>
              </div>

            </div>

            {/* Right Card: Private Wave Registration Form (Point 3 Fix for font color) */}
            <div 
              className="lg:col-span-7 border-2 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between transition-colors" 
              style={{ backgroundColor: theme.regBoxBg, borderColor: theme.regBoxBorder, color: theme.regBoxText }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-6 h-6" style={{ color: theme.regBoxText }} />
                  <h3 className="text-2xl font-black" style={{ color: theme.regBoxText }}>{siteContent.regTitle}</h3>
                </div>
                <p className="text-xs mb-6 font-bold" style={{ color: theme.regBoxText }}>{siteContent.regSubtext}</p>

                {formError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-2xl text-xs font-black text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {formError}
                  </div>
                )}

                {submitted ? (
                  <div className="bg-white border-2 border-emerald-500 p-6 rounded-2xl text-center space-y-3 shadow-md">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-lg font-black text-gray-900">Registration Submitted!</h4>
                    <p className="text-xs text-gray-800 max-w-md mx-auto font-bold">
                      Host has received your wave request and verified screenshot proof.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black mb-1.5" style={{ color: theme.regBoxText }}>
                          Game Name <span className="text-red-600">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Enter your game name"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                          className="w-full bg-white border-2 border-gray-900 rounded-2xl px-4 py-2.5 text-sm text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black mb-1.5" style={{ color: theme.regBoxText }}>
                          Tag <span className="text-red-600">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 133LNO"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          className="w-full bg-white border-2 border-gray-900 rounded-2xl px-4 py-2.5 text-sm text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black mb-1.5" style={{ color: theme.regBoxText }}>Waves Count <span className="text-red-600">*</span></label>
                        <select 
                          value={wavesCount}
                          onChange={(e) => setWavesCount(e.target.value)}
                          className="w-full bg-white border-2 border-gray-900 rounded-2xl px-4 py-2.5 text-sm text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                        >
                          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Wave' : 'Waves'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black mb-1.5" style={{ color: theme.regBoxText }}>Gems per Wave <span className="text-red-600">*</span></label>
                        <input 
                          type="number" 
                          min={200}
                          value={gemsPerWave}
                          onChange={(e) => setGemsPerWave(e.target.value)}
                          className="w-full bg-white border-2 border-gray-900 rounded-2xl px-4 py-2.5 text-sm text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black mb-1.5" style={{ color: theme.regBoxText }}>
                        Gems Screenshot Proof <span className="text-red-600">* (Mandatory)</span>
                      </label>

                      <div className="border-2 border-dashed border-gray-900 hover:border-black rounded-2xl p-4 text-center bg-white transition-all relative shadow-sm">
                        <input 
                          type="file" 
                          accept="image/*"
                          required
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {proofPreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={proofPreview} alt="Proof" className="w-12 h-12 rounded-xl object-cover border-2 border-gray-900 shadow-sm" />
                            <span className="text-xs text-emerald-700 font-black">Screenshot Proof Attached!</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-6 h-6 text-gray-900 mx-auto" />
                            <p className="text-xs text-gray-900 font-bold">Upload screenshot of your gems (Mandatory)</p>
                            <p className="text-[10px] text-gray-700 font-medium">PNG or JPG file</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white border-2 border-gray-900 p-3.5 rounded-2xl flex items-center justify-between text-sm shadow-sm">
                      <span className="text-gray-900 font-black">Total for your waves:</span>
                      <span className="text-xl font-black text-pink-600 flex items-center gap-1">
                        Gems {totalGems}
                      </span>
                    </div>

                    <button 
                      type="submit"
                      style={buttonBorderStyle}
                      className="w-full py-4 font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 hover:opacity-90"
                    >
                      <Sparkles className="w-4 h-4" /> Submit Registration
                    </button>
                  </form>
                )}
              </div>

              <p className="text-[11px] text-center mt-4 font-bold" style={{ color: theme.regBoxText }}>
                {siteContent.formFooterNote}
              </p>
            </div>

          </section>
        )}

        {/* Section 2: Party Rules (Point 4 & Point 10 Fixes) */}
        <section id="rules" className="space-y-4">
          <div>
            <p 
              className="text-xs font-mono uppercase tracking-wider font-bold"
              style={{ color: theme.rulesCategoryColor || '#0284c7' }}
            >
              {siteContent.rulesCategoryHeading}
            </p>
            <h3 
              className="text-2xl font-black"
              style={{ color: theme.rulesTitleColor || '#111827' }}
            >
              {siteContent.rulesMainHeading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div 
              className="border-2 p-6 rounded-3xl space-y-3 shadow-md transition-colors" 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder, color: theme.rulesBoxText }}
            >
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-900 flex items-center justify-center text-gray-900 font-bold shadow-sm text-xl">
                {siteContent.rule1Emoji}
              </div>
              <h4 className="font-black text-base" style={{ color: theme.rulesBoxText }}>{siteContent.rule1Title}</h4>
              <ul className="text-xs space-y-2 leading-relaxed font-bold" style={{ color: theme.rulesBoxText }}>
                <li>• {siteContent.rule1Bullet1}</li>
                <li>• {siteContent.rule1Bullet2}</li>
                <li>• {siteContent.rule1Bullet3}</li>
              </ul>
            </div>

            {/* Box 2 */}
            <div 
              className="border-2 p-6 rounded-3xl space-y-3 shadow-md transition-colors" 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder, color: theme.rulesBoxText }}
            >
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-900 flex items-center justify-center text-gray-900 font-bold shadow-sm text-xl">
                {siteContent.rule2Emoji}
              </div>
              <h4 className="font-black text-base" style={{ color: theme.rulesBoxText }}>{siteContent.rule2Title}</h4>
              <ul className="text-xs space-y-2 leading-relaxed font-bold" style={{ color: theme.rulesBoxText }}>
                <li>• {siteContent.rule2Bullet1}</li>
                <li>• {siteContent.rule2Bullet2}</li>
                <li>• {hostedParties} {siteContent.rule2Bullet3}</li>
              </ul>
            </div>

            {/* Box 3 */}
            <div 
              className="border-2 p-6 rounded-3xl space-y-3 shadow-md transition-colors" 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder, color: theme.rulesBoxText }}
            >
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-900 flex items-center justify-center text-gray-900 font-bold shadow-sm text-xl">
                {siteContent.rule3Emoji}
              </div>
              <h4 className="font-black text-base" style={{ color: theme.rulesBoxText }}>{siteContent.rule3Title}</h4>
              <p className="text-xs font-black">{siteContent.rule3NextWave}</p>
              <p className="text-xs leading-relaxed font-bold" style={{ color: theme.rulesBoxText }}>
                {siteContent.rule3Desc}
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: Bottom Discord Banner (Point 5 Fix for background color) */}
        <section 
          className="border-2 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-colors"
          style={{ 
            backgroundColor: theme.bannerBg || '#fce7f3', 
            borderColor: theme.bannerBorder || '#fbcfe8',
            color: theme.bannerTextColor || '#111827'
          }}
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-white text-pink-800 text-[10px] font-black rounded-full border border-pink-300 shadow-sm">
              {siteContent.bannerBadgeText}
            </span>
            <h3 className="text-2xl font-black" style={{ color: theme.bannerTextColor }}>{siteContent.bannerTitle}</h3>
            <p className="text-xs max-w-xl font-medium" style={{ color: theme.bannerTextColor }}>
              {siteContent.bannerText}
            </p>
          </div>

          <a 
            href={siteContent.discordUrl} 
            target="_blank" 
            rel="noreferrer"
            style={buttonBorderStyle}
            className="px-6 py-3.5 font-black text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap hover:opacity-90"
          >
            <MessageSquare className="w-4 h-4" /> Open Discord Profile
          </a>
        </section>

      </main>

      {/* Host Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl border border-pink-300 flex items-center justify-center mx-auto mb-2 text-pink-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Host Login</h3>
              <p className="text-xs text-gray-600 font-medium">Authorize to access host command center.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Passcode</label>
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black"
                />
              </div>

              <button 
                type="submit"
                style={adminBtnBorderStyle}
                className="w-full py-3.5 font-black text-sm transition-all shadow-md hover:opacity-90"
              >
                Enter Command Center
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Proof Screenshot View Modal */}
      {selectedProofModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-900 rounded-3xl p-4 max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={() => setSelectedProofModal(null)}
              className="absolute top-4 right-4 text-gray-800 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Verified Gem Screenshot Proof</h4>
            <img src={selectedProofModal} alt="Gem Proof" className="w-full rounded-2xl border border-gray-300 object-cover max-h-[70vh]" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-600 bg-gray-50 font-medium">
        <p>© 2026 {siteContent.brandName} • Sunday City Private Waves Host</p>
      </footer>
    </div>
  );
}
