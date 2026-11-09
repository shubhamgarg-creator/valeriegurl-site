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

// --- ANIMATED CANVAS / EFFECTS COMPONENT ---
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

  // Generate Blinking / Glowing Orbs
  useEffect(() => {
    if (!enableBlinkGlow) {
      setParticles([]);
      return;
    }
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

  // Generate Snowflakes
  useEffect(() => {
    if (!enableSnowfall) {
      setSnowflakes([]);
      return;
    }
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
      {/* 1. Blinking Orbs Layer */}
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

      {/* 2. Snowfall Layer */}
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
            <div 
              className="rounded-full bg-current shadow-sm"
              style={{ width: `${s.size}px`, height: `${s.size}px`, backgroundColor: snowColor }} 
            />
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

  // --- DEFAULT THEME + ANIMATIONS & SNOWFALL CONTROLS ---
  const defaultTheme = {
    fontFamily: "'Inter', sans-serif",
    pageBg: '#ffffff',
    
    // Animated Blink Glow FX
    enableBlinkGlow: true,
    blinkCount: 25,
    blinkSpeed: 2,
    blinkColor1: '#ff00d4',
    blinkColor2: '#00f0ff',

    // Snowfall FX Controls
    enableSnowfall: true,
    snowCount: 45,
    snowSpeed: 1.5,
    snowSize: 6,
    snowColor: '#ec4899',
    snowShape: 'snowflake', // 'snowflake' | 'circle' | 'heart' | 'star'

    // Top Navbar Font Sizes & Colors
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

    // Host Profile Left Card Font Sizes
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

    // Stats Cards Font Sizes
    statsBoxBg: '#ffffff',
    statsBoxBorderColor: '#fbcfe8',
    statsTextColor: '#111827',
    statsNumberFontSize: '18px',
    statsLabelFontSize: '10px',

    // Profile Card Buttons & Footer Text
    chatBtnFontSize: '14px',
    gemsBadgeFontSize: '12px',
    profileFooterFontSize: '11px',

    // Registration Form Right Card Font Sizes
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

    // Party Rules Section Font Sizes & Colors
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

    // Bottom Discord Banner Font Sizes & Colors
    bannerBg: '#fce7f3',
    bannerBorder: '#fbcfe8',
    bannerTextColor: '#111827',
    bannerAlignment: 'left',
    bannerBadgeFontSize: '10px',
    bannerTitleFontSize: '24px',
    bannerTextFontSize: '12px',
    bannerBtnFontSize: '14px',

    // Primary Buttons (General)
    primaryBtnBg: '#111827',
    primaryBtnText: '#ffffff',
    btnBorderWidth: '2px',
    btnBorderColor: '#111827',
    btnBorderStyle: 'solid',
    btnBorderRadius: '16px',

    // Multi-color Letter Colors for Name
    nameLetterColors: ['#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea', '#2563eb', '#db2777', '#9333ea']
  };

  // --- DEFAULT DYNAMIC CONTENT ---
  const defaultSiteContent = {
    brandName: "-VALERIE GURL-",
    selectedSymbol: "👑",
    verifiedBadgeText: "Verified OG",
    hostSubtag: "133LNO • The OG Party Host • Sunday City",
    hostBio: "Dedicated and 100% trusted host committed to a NoScams guarantee. With 90%–100% verified, trustworthy participants in every wave, I ensure a safe and scam-free experience",
    wavesTimingText: "Waves 15:00–19:00 UTC",
    maxPartiesSingleWave: "503",

    regTitle: "Register for a Private Wave",
    regSubtext: "All form fields including screenshot proof are strictly mandatory.",
    formFooterNote: "No login required — Host confirms on Discord directly.",

    rulesCategoryHeading: "HOW IT WORKS",
    rulesMainHeading: "Party Rules, Made Simple",
    
    rule1Emoji: "💎",
    rule1Title: "How to book Wave?",
    rule1Bullet1: "Send 200 gems with a screenshot as proof.",
    rule1Bullet2: "Drop your game name + tag",
    rule1Bullet3: "Host approves in queue order — then wait",

    rule2Emoji: "🍒",
    rule2Title: "Hustle-Free Guarantee",
    rule2Bullet1: "Fast-Paced",
    rule2Bullet2: "Friendly queue, no drama",
    rule2Bullet3: "Waves Hosted so far",

    rule3Emoji: "🌷",
    rule3Title: "Host Schedule",
    rule3NextWave: "Party hours: 15:00 – 19:00 UTC, every single day.",
    rule3Desc: "Booking stays open 24/7 — waves are served in queue order.",

    bannerBadgeText: "Fastest response",
    bannerTitle: "Join Discord / Contact Host",
    bannerText: "Host replies in under 5 minutes. Approvals, wave updates, and custom requests — click below to open profile directly.",
    discordUrl: "https://discord.com/users/757598254668972065"
  };

  // --- STATES WITH CLOUD SYNC ---
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

  // --- REAL-TIME LISTENERS FROM FIREBASE ---
  useEffect(() => {
    const themeRef = ref(db, 'valerie_site/theme');
    onValue(themeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTheme({ ...defaultTheme, ...data });
        setEditThemeForm({ ...defaultTheme, ...data });
      }
    });

    const hostedRef = ref(db, 'valerie_site/hostedParties');
    onValue(hostedRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setHostedParties(data);
        setNewHostedCount(data);
      }
    });

    const contentRef = ref(db, 'valerie_site/siteContent');
    onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSiteContent({ ...defaultSiteContent, ...data });
        setEditContentForm({ ...defaultSiteContent, ...data });
      }
    });

    const subRef = ref(db, 'valerie_site/submissions');
    onValue(subRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setSubmissions(data);
      else setSubmissions([]);
    });

    const delRef = ref(db, 'valerie_site/deletedSubmissions');
    onValue(delRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setDeletedSubmissions(data);
      else setDeletedSubmissions([]);
    });
  }, []);

  const realValerieAvatar = "https://sunday-city-waves--00ko1l64.preview.static.emergentagent.com/valerie-avatar.jpeg";
  const totalGems = (parseInt(wavesCount) || 0) * (parseInt(gemsPerWave) || 0);

  const getCurrentUTCTime = () => {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
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

  const handleDeleteRequest = (id) => {
    const itemToDelete = submissions.find(sub => sub.id === id);
    if (itemToDelete) {
      const newActive = submissions.filter(sub => sub.id !== id);
      const newDeleted = [{ ...itemToDelete, deletedAt: getCurrentUTCTime() }, ...deletedSubmissions];
      set(ref(db, 'valerie_site/submissions'), newActive);
      set(ref(db, 'valerie_site/deletedSubmissions'), newDeleted);
    }
  };

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
    showTempMsg("All Animations, Snowfall, Font Sizes & Theme synced to cloud!");
  };

  const handleResetTheme = () => {
    set(ref(db, 'valerie_site/theme'), defaultTheme);
    setEditThemeForm(defaultTheme);
    showTempMsg("Theme & Animations reset to default!");
  };

  const showTempMsg = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const RenderDynamicBrandName = ({ name, customSize }) => {
    const colors = theme.nameLetterColors || defaultTheme.nameLetterColors;
    const letters = name.split('');
    return (
      <span className="font-black tracking-wide inline-flex items-center" style={{ fontSize: customSize || theme.profileTitleFontSize || '24px' }}>
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

  const buttonBorderStyle = {
    backgroundColor: theme.primaryBtnBg,
    color: theme.primaryBtnText,
    borderWidth: theme.btnBorderWidth || '2px',
    borderColor: theme.btnBorderColor || '#111827',
    borderStyle: theme.btnBorderStyle || 'solid',
    borderRadius: theme.btnBorderRadius || '16px'
  };

  const adminBtnBorderStyle = {
    backgroundColor: theme.adminBtnBg || '#111827',
    color: theme.adminBtnText || '#ffffff',
    borderColor: theme.adminBtnBorderColor || '#111827',
    borderWidth: theme.adminBtnBorderWidth || '2px',
    borderRadius: theme.adminBtnBorderRadius || '16px',
    borderStyle: 'solid',
    fontSize: theme.adminBtnFontSize || '12px'
  };

  const inputStyle = {
    backgroundColor: theme.inputFieldBg || '#ffffff',
    color: theme.inputFieldText || '#111827',
    borderColor: theme.inputFieldBorderColor || '#f472b6',
    borderWidth: theme.inputFieldBorderWidth || '1.5px',
    borderRadius: theme.inputFieldBorderRadius || '16px',
    borderStyle: 'solid',
    fontSize: theme.inputFieldFontSize || '14px'
  };

  const uploadBoxStyle = {
    backgroundColor: theme.uploadBoxBg || '#ffffff',
    borderColor: theme.uploadBoxBorderColor || '#f472b6',
    borderStyle: theme.uploadBoxBorderStyle || 'dashed',
    borderWidth: theme.inputFieldBorderWidth || '1.5px',
    borderRadius: theme.inputFieldBorderRadius || '16px'
  };

  const calcBoxStyle = {
    backgroundColor: theme.calcBoxBg || '#ffffff',
    borderColor: theme.calcBoxBorderColor || '#f472b6',
    color: theme.calcBoxText || '#111827',
    borderWidth: theme.inputFieldBorderWidth || '1.5px',
    borderRadius: theme.inputFieldBorderRadius || '16px',
    borderStyle: 'solid'
  };

  const statsBoxStyle = {
    backgroundColor: theme.statsBoxBg || '#ffffff',
    borderColor: theme.statsBoxBorderColor || '#fbcfe8',
    color: theme.statsTextColor || '#111827',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderRadius: '16px'
  };

  const emojiBoxStyle = {
    backgroundColor: theme.emojiBoxBg || '#ffffff',
    borderColor: theme.emojiBoxBorderColor || '#38bdf8',
    borderWidth: theme.emojiBoxBorderWidth || '1.5px',
    borderStyle: 'solid',
    borderRadius: '14px'
  };

  const symbolList = ["👑", "💎", "🔥", "⚡", "✨", "🛡️", "⭐", "🏆", "🌟", "🌸", "💖", "🎮", "🚀", "💥", "🎯", "⏰", "🔮", "🧿", "🎁", "🎨"];

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

  const getAlignmentClass = (align) => {
    if (align === 'center') return 'text-center items-center justify-center';
    if (align === 'right') return 'text-right items-end justify-end';
    return 'text-left items-start justify-start';
  };

  return (
    <div 
      className="min-h-screen relative selection:bg-pink-200 selection:text-pink-900 transition-colors duration-200"
      style={{ backgroundColor: theme.pageBg, fontFamily: theme.fontFamily, color: theme.rulesBoxText || '#111827' }}
    >
      {/* Dynamic Background FX (Snowfall + Blinking Orbs) */}
      <DynamicBackgroundEffects theme={theme} />

      {/* 1. Top Header Navbar */}
      <header 
        className="sticky top-0 z-50 px-4 lg:px-8 py-3 shadow-md border-b-2 relative" 
        style={{ backgroundColor: theme.headerBg, color: theme.headerText, borderColor: 'rgba(0,0,0,0.15)' }}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between ${theme.headerAlignment === 'center' ? 'flex-col sm:flex-row' : ''}`}>
          <div className={`flex items-center gap-3 ${getAlignmentClass(theme.headerAlignment)}`}>
            <div className="relative w-10 h-10 flex-shrink-0">
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
                <span style={{ fontSize: theme.profileTitleFontSize || '20px' }}>{siteContent.selectedSymbol}</span>
                <RenderDynamicBrandName name={siteContent.brandName} customSize={theme.profileTitleFontSize || '20px'} />
              </div>
              <p className="text-xs font-mono font-bold flex items-center gap-1" style={{ color: theme.headerText }}>
                <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" /> LIVE CLOUD SYNC
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-bold" style={{ color: theme.headerText, fontSize: theme.navLinksFontSize || '14px' }}>
            <a href="#booking" onClick={() => setActiveTab('booking')} className="hover:opacity-80 transition-opacity">Wave Booking</a>
            <a href="#rules" className="hover:opacity-80 transition-opacity">Party Rules</a>
            <a href="#stats" className="hover:opacity-80 transition-opacity">Host Stats</a>
            <a href={siteContent.discordUrl} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1">
              Discord <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div 
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-900 font-bold shadow-sm border border-gray-200"
              style={{ fontSize: theme.timingBadgeFontSize || '12px' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {siteContent.wavesTimingText}
            </div>

            {isLoggedIn ? (
              <button 
                onClick={() => setActiveTab(activeTab === 'dashboard' ? 'booking' : 'dashboard')}
                style={adminBtnBorderStyle}
                className="px-4 py-2 font-black transition-all shadow-sm hover:opacity-90"
              >
                {activeTab === 'dashboard' ? 'View Website' : 'Admin Dashboard'}
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                style={adminBtnBorderStyle}
                className="flex items-center gap-1.5 px-3.5 py-2 font-bold transition-all shadow-sm hover:opacity-90"
              >
                <LogIn className="w-3.5 h-3.5" /> Host Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 relative z-10">
        
        {saveSuccessMsg && (
          <div className="fixed top-16 right-4 z-50 bg-emerald-600 text-white font-black px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5" /> {saveSuccessMsg}
          </div>
        )}

        {activeTab === 'dashboard' && isLoggedIn ? (
          /* Admin Dashboard */
          <section className="bg-white/95 backdrop-blur-md border-2 border-pink-200 rounded-3xl p-6 shadow-md space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
              <div>
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="text-pink-600" /> COMMAND CENTER (ANIMATIONS, SNOWFALL & GRANULAR CONTROLS)
                </h2>
                <p className="text-xs text-gray-600 font-bold">Full customization & toggle ON/OFF for Snowfall FX, Blink Orbs, Font Sizes, Colors & Text.</p>
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
                <Palette className="w-3.5 h-3.5" /> Font Sizes & Colors
              </button>

              <button 
                onClick={() => setAdminViewTab('animations')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'animations' 
                    ? 'bg-cyan-600 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5 animate-spin" /> Animations & Snowfall FX
              </button>

              <button 
                onClick={() => setAdminViewTab('content')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'content' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" /> All Sentences & Emojis
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
                    placeholder="e.g. 2,375"
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

            {/* TAB 1: REGISTRATIONS */}
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

            {/* TAB NEW: ANIMATIONS & SNOWFALL FX CUSTOMIZATION */}
            {adminViewTab === 'animations' && (
              <form onSubmit={handleSaveTheme} className="bg-white border-2 border-cyan-200 rounded-2xl p-6 space-y-8 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <Snowflake className="text-cyan-600 animate-spin" /> Background Animations & Snowfall Customization
                    </h3>
                    <p className="text-xs text-gray-600 font-bold">Enable/Disable & tweak speed, density, shapes & glowing colors for Snowfall & Blink Glow Orbs.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleResetTheme}
                    className="flex items-center gap-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 font-bold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
                  </button>
                </div>

                {/* 1. SNOWFALL FX CONTROL BOX */}
                <div className="bg-sky-50/80 border-2 border-sky-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-sky-900 flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-sky-600" /> 1. Snowfall Effect Controls
                    </h4>
                    
                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-sky-300 shadow-sm">
                      <input 
                        type="checkbox" 
                        checked={editThemeForm.enableSnowfall} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, enableSnowfall: e.target.checked})}
                        className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                      />
                      <span className="text-xs font-black text-sky-900">
                        {editThemeForm.enableSnowfall ? "Snowfall ENABLED" : "Snowfall DISABLED"}
                      </span>
                    </label>
                  </div>

                  {editThemeForm.enableSnowfall && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Snow Density (Count)</label>
                        <input 
                          type="number"
                          min={10}
                          max={150}
                          value={editThemeForm.snowCount}
                          onChange={(e) => setEditThemeForm({...editThemeForm, snowCount: e.target.value})}
                          className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Fall Speed Multiplier</label>
                        <input 
                          type="number"
                          step="0.5"
                          min={0.5}
                          max={5}
                          value={editThemeForm.snowSpeed}
                          onChange={(e) => setEditThemeForm({...editThemeForm, snowSpeed: e.target.value})}
                          className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Snow Particle Size</label>
                        <input 
                          type="number"
                          min={2}
                          max={15}
                          value={editThemeForm.snowSize}
                          onChange={(e) => setEditThemeForm({...editThemeForm, snowSize: e.target.value})}
                          className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Snow Particle Shape</label>
                        <select 
                          value={editThemeForm.snowShape}
                          onChange={(e) => setEditThemeForm({...editThemeForm, snowShape: e.target.value})}
                          className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        >
                          <option value="snowflake">❄️ Snowflake</option>
                          <option value="circle">⚪ Round Dots</option>
                          <option value="heart">💖 Pink Hearts</option>
                          <option value="star">✨ Shining Stars</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Snow Color</label>
                        <div className="flex items-center gap-2 bg-white p-1.5 border border-sky-300 rounded-xl">
                          <input 
                            type="color" 
                            value={editThemeForm.snowColor} 
                            onChange={(e) => setEditThemeForm({...editThemeForm, snowColor: e.target.value})}
                            className="w-6 h-6 rounded border cursor-pointer"
                          />
                          <span className="text-xs font-mono font-bold text-gray-900">{editThemeForm.snowColor}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. BLINK GLOW ORBS CONTROL BOX */}
                <div className="bg-fuchsia-50/80 border-2 border-fuchsia-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-fuchsia-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-fuchsia-600" /> 2. Blink Glow Orbs Controls
                    </h4>

                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-fuchsia-300 shadow-sm">
                      <input 
                        type="checkbox" 
                        checked={editThemeForm.enableBlinkGlow} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, enableBlinkGlow: e.target.checked})}
                        className="w-4 h-4 text-fuchsia-600 rounded focus:ring-fuchsia-500"
                      />
                      <span className="text-xs font-black text-fuchsia-900">
                        {editThemeForm.enableBlinkGlow ? "Blink Orbs ENABLED" : "Blink Orbs DISABLED"}
                      </span>
                    </label>
                  </div>

                  {editThemeForm.enableBlinkGlow && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Total Blinking Orbs</label>
                        <input 
                          type="number"
                          min={5}
                          max={60}
                          value={editThemeForm.blinkCount}
                          onChange={(e) => setEditThemeForm({...editThemeForm, blinkCount: e.target.value})}
                          className="w-full bg-white border border-fuchsia-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Blink Speed Multiplier</label>
                        <input 
                          type="number"
                          step="0.5"
                          min={0.5}
                          max={5}
                          value={editThemeForm.blinkSpeed}
                          onChange={(e) => setEditThemeForm({...editThemeForm, blinkSpeed: e.target.value})}
                          className="w-full bg-white border border-fuchsia-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Glow Color 1</label>
                        <div className="flex items-center gap-2 bg-white p-1.5 border border-fuchsia-300 rounded-xl">
                          <input 
                            type="color" 
                            value={editThemeForm.blinkColor1} 
                            onChange={(e) => setEditThemeForm({...editThemeForm, blinkColor1: e.target.value})}
                            className="w-6 h-6 rounded border cursor-pointer"
                          />
                          <span className="text-xs font-mono font-bold text-gray-900">{editThemeForm.blinkColor1}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-800 mb-1">Glow Color 2</label>
                        <div className="flex items-center gap-2 bg-white p-1.5 border border-fuchsia-300 rounded-xl">
                          <input 
                            type="color" 
                            value={editThemeForm.blinkColor2} 
                            onChange={(e) => setEditThemeForm({...editThemeForm, blinkColor2: e.target.value})}
                            className="w-6 h-6 rounded border cursor-pointer"
                          />
                          <span className="text-xs font-mono font-bold text-gray-900">{editThemeForm.blinkColor2}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Animation & Snowfall FX Settings to Cloud
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: GRANULAR FONT SIZE CONTROLS FOR EVERY SINGLE ELEMENT */}
            {adminViewTab === 'theme' && (
              <form onSubmit={handleSaveTheme} className="bg-white border-2 border-pink-200 rounded-2xl p-6 space-y-8 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <Type className="text-indigo-600" /> Granular Font Size Control (Every Single Text Element)
                    </h3>
                    <p className="text-xs text-gray-600 font-bold">Type or select exact font size for every single heading, label, paragraph, badge and button.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleResetTheme}
                    className="flex items-center gap-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 font-bold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
                  </button>
                </div>

                {/* 1. Header Navbar Elements */}
                <div className="bg-indigo-50/80 border-2 border-indigo-200 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-black text-indigo-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-600" /> 1. Top Navbar Font Sizes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Brand Name / Title Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.profileTitleFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, profileTitleFontSize: e.target.value})}
                        className="w-full bg-white border border-indigo-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 24px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Nav Links Font Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.navLinksFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, navLinksFontSize: e.target.value})}
                        className="w-full bg-white border border-indigo-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 14px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Timing Badge Font Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.timingBadgeFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, timingBadgeFontSize: e.target.value})}
                        className="w-full bg-white border border-indigo-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 12px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Host Login Button Font Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.adminBtnFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, adminBtnFontSize: e.target.value})}
                        className="w-full bg-white border border-indigo-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 12px"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Left Host Profile Card Elements */}
                <div className="bg-pink-50/80 border-2 border-pink-200 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-black text-pink-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-pink-600" /> 2. Left Host Profile Card Font Sizes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Verified Badge Text Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.verifiedBadgeFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, verifiedBadgeFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 10px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Host Subtag Text Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.subtagFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, subtagFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 12px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Host Bio Quote Text Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.bioFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, bioFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 14px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Stats Card Number Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.statsNumberFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, statsNumberFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 18px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Stats Card Label Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.statsLabelFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, statsLabelFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 10px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Chat Button Font Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.chatBtnFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, chatBtnFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 14px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Gems 200/wave Badge Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.gemsBadgeFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, gemsBadgeFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 12px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Profile Bottom Note Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.profileFooterFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, profileFooterFontSize: e.target.value})}
                        className="w-full bg-white border border-pink-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 11px"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Right Registration Form Card Elements */}
                <div className="bg-sky-50/80 border-2 border-sky-200 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-black text-sky-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-sky-600" /> 3. Registration Form Card Font Sizes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Form Main Title Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.regTitleFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, regTitleFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 24px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Form Subtitle Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.regSubtextFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, regSubtextFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 12px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Field Label Font Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.formLabelFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, formLabelFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 12px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Input Text & Select Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.inputFieldFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, inputFieldFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 14px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Upload Box Main Text Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.uploadTextFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, uploadTextFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 12px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Upload Box Subtext Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.uploadSubtextFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, uploadSubtextFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 10px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Total Calc Text Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.calcTextFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, calcTextFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 14px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Total Gems Number Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.calcGemsFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, calcGemsFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 20px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Submit Button Font Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.submitBtnFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, submitBtnFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 16px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-800 mb-1">Form Bottom Footer Note Size</label>
                      <input 
                        type="text"
                        value={editThemeForm.formFooterFontSize}
                        onChange={(e) => setEditThemeForm({...editThemeForm, formFooterFontSize: e.target.value})}
                        className="w-full bg-white border border-sky-300 rounded-xl p-2 text-xs font-bold text-gray-900"
                        placeholder="e.g. 11px"
                      />
                    </div>
                  </div>
                </div>

                {/* Global Font Family & Alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Website Main Font Family</h4>
                    <select 
                      value={editThemeForm.fontFamily}
                      onChange={(e) => setEditThemeForm({ ...editThemeForm, fontFamily: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg p-1.5 text-xs font-bold text-gray-900"
                    >
                      {fontOptions.map((f, i) => (
                        <option key={i} value={f.value}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Page Background Color</h4>
                    <input 
                      type="color" 
                      value={editThemeForm.pageBg} 
                      onChange={(e) => setEditThemeForm({...editThemeForm, pageBg: e.target.value})}
                      className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Registration Card BG</h4>
                    <input 
                      type="color" 
                      value={editThemeForm.regBoxBg} 
                      onChange={(e) => setEditThemeForm({...editThemeForm, regBoxBg: e.target.value})}
                      className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save All Granular Font Sizes & Theme to Cloud
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: ALL SENTENCES, TITLES, EMOJIS & TEXT DYNAMIC EDITOR */}
            {adminViewTab === 'content' && (
              <form onSubmit={handleSaveDynamicContent} className="bg-white border-2 border-pink-200 rounded-2xl p-6 space-y-8 shadow-sm">
                <div className="pb-3 border-b border-gray-200">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Globe className="text-purple-600" /> Complete Dynamic Text & Emoji Command Center
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
                      <label className="block text-xs font-black text-gray-900 mb-1">Brand Symbol Badge</label>
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

                {/* Section B: Host Profile Text */}
                <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-200 space-y-4">
                  <h4 className="text-xs font-black text-pink-900 uppercase tracking-wider">2. Host Profile Subtag & Bio</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-900 mb-1">Host Subtag Sentence</label>
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
          <section id="booking" className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch ${theme.regBoxAlignment === 'center' ? 'text-center' : ''}`}>
            
            {/* Left Card: Host Profile */}
            <div 
              className={`lg:col-span-5 border-2 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden transition-colors ${theme.profileAlignment === 'center' ? 'items-center text-center' : ''}`} 
              style={{ backgroundColor: theme.profileBoxBg, borderColor: theme.profileBoxBorder, color: theme.profileBoxText || '#111827' }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none"></div>

              <div className="w-full">
                <div className={`flex items-center gap-4 mb-6 ${theme.profileAlignment === 'center' ? 'flex-col text-center' : ''}`}>
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
                    <div className={`flex items-center gap-2 flex-wrap ${theme.profileAlignment === 'center' ? 'justify-center' : ''}`}>
                      <span style={{ fontSize: theme.profileTitleFontSize || '24px' }}>{siteContent.selectedSymbol}</span>
                      <RenderDynamicBrandName name={siteContent.brandName} customSize={theme.profileTitleFontSize || '24px'} />
                      <span 
                        className="px-2.5 py-0.5 font-black bg-white text-pink-800 border border-pink-300 rounded-full shadow-sm whitespace-nowrap"
                        style={{ fontSize: theme.verifiedBadgeFontSize || '10px' }}
                      >
                        {siteContent.verifiedBadgeText}
                      </span>
                    </div>
                    
                    <p 
                      className="font-bold mt-1 tracking-wide"
                      style={{ 
                        color: theme.subtagTextColor || '#be185d', 
                        fontFamily: theme.subtagFontFamily || theme.fontFamily,
                        fontSize: theme.subtagFontSize || '12px'
                      }}
                    >
                      {siteContent.hostSubtag}
                    </p>
                  </div>
                </div>

                <blockquote 
                  className="leading-relaxed border-l-4 border-pink-500 pl-4 italic mb-8 bg-white/90 py-3.5 rounded-r-2xl shadow-sm font-medium"
                  style={{ color: theme.profileBoxText || '#111827', fontSize: theme.bioFontSize || '14px' }}
                >
                  "{siteContent.hostBio}"
                </blockquote>

                {/* Host Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mb-8" id="stats">
                  <div className="p-3 text-center shadow-sm" style={statsBoxStyle}>
                    <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <div className="font-black" style={{ fontSize: theme.statsNumberFontSize || '18px' }}>{hostedParties}</div>
                    <div className="uppercase tracking-wider font-bold opacity-80" style={{ fontSize: theme.statsLabelFontSize || '10px' }}>Hosted Waves</div>
                  </div>

                  <div className="p-3 text-center shadow-sm" style={statsBoxStyle}>
                    <Flame className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                    <div className="font-black" style={{ fontSize: theme.statsNumberFontSize || '18px' }}>{siteContent.maxPartiesSingleWave}</div>
                    <div className="uppercase tracking-wider font-bold opacity-80" style={{ fontSize: theme.statsLabelFontSize || '10px' }}>Parties in 1 Wave</div>
                  </div>

                  <div className="p-3 text-center shadow-sm" style={statsBoxStyle}>
                    <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="font-black" style={{ fontSize: theme.statsNumberFontSize || '18px' }}>15–19</div>
                    <div className="uppercase tracking-wider font-bold opacity-80" style={{ fontSize: theme.statsLabelFontSize || '10px' }}>UTC Window</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-pink-200 w-full">
                <div className="flex items-center gap-3">
                  <a 
                    href={siteContent.discordUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ ...buttonBorderStyle, fontSize: theme.chatBtnFontSize || '14px' }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 font-bold transition-all shadow-md hover:opacity-90"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat with Host
                  </a>
                  <span 
                    className="px-3.5 py-3 bg-white border border-pink-300 text-pink-800 font-black rounded-2xl whitespace-nowrap shadow-sm"
                    style={{ fontSize: theme.gemsBadgeFontSize || '12px' }}
                  >
                    Gems 200 / wave
                  </span>
                </div>
                <p className="text-center text-gray-600 font-medium" style={{ fontSize: theme.profileFooterFontSize || '11px' }}>
                  Replies in under 5 minutes during party hours.
                </p>
              </div>

            </div>

            {/* Right Card: Private Wave Registration Form */}
            <div 
              className="lg:col-span-7 border-2 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between transition-colors" 
              style={{ backgroundColor: theme.regBoxBg, borderColor: theme.regBoxBorder, color: theme.regBoxText }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-6 h-6" style={{ color: theme.regBoxText }} />
                  <h3 className="font-black" style={{ color: theme.regBoxText, fontSize: theme.regTitleFontSize || '24px' }}>{siteContent.regTitle}</h3>
                </div>
                <p className="mb-6 font-bold" style={{ color: theme.regBoxText, fontSize: theme.regSubtextFontSize || '12px' }}>{siteContent.regSubtext}</p>

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
                        <label className="block font-black mb-1.5" style={{ color: theme.regBoxText, fontSize: theme.formLabelFontSize || '12px' }}>
                          Game Name <span className="text-red-600">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Enter your game name"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                          style={inputStyle}
                          className="w-full px-4 py-2.5 font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-black mb-1.5" style={{ color: theme.regBoxText, fontSize: theme.formLabelFontSize || '12px' }}>
                          Tag <span className="text-red-600">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 133LNO"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          style={inputStyle}
                          className="w-full px-4 py-2.5 font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-black mb-1.5" style={{ color: theme.regBoxText, fontSize: theme.formLabelFontSize || '12px' }}>Waves Count <span className="text-red-600">*</span></label>
                        <select 
                          value={wavesCount}
                          onChange={(e) => setWavesCount(e.target.value)}
                          style={inputStyle}
                          className="w-full px-4 py-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm transition-all"
                        >
                          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Wave' : 'Waves'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-black mb-1.5" style={{ color: theme.regBoxText, fontSize: theme.formLabelFontSize || '12px' }}>Gems per Wave <span className="text-red-600">*</span></label>
                        <input 
                          type="number" 
                          min={200}
                          value={gemsPerWave}
                          onChange={(e) => setGemsPerWave(e.target.value)}
                          style={inputStyle}
                          className="w-full px-4 py-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-black mb-1.5" style={{ color: theme.regBoxText, fontSize: theme.formLabelFontSize || '12px' }}>
                        Gems Screenshot Proof <span className="text-red-600">* (Mandatory)</span>
                      </label>

                      <div 
                        style={uploadBoxStyle}
                        className="p-4 text-center hover:border-pink-600 transition-all relative shadow-sm"
                      >
                        <input 
                          type="file" 
                          accept="image/*"
                          required
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {proofPreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={proofPreview} alt="Proof" className="w-12 h-12 rounded-xl object-cover border border-pink-400 shadow-sm" />
                            <span className="text-xs text-emerald-700 font-black">Screenshot Proof Attached!</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-6 h-6 mx-auto text-pink-600" />
                            <p className="font-bold" style={{ color: theme.regBoxText, fontSize: theme.uploadTextFontSize || '12px' }}>Upload screenshot of your gems (Mandatory)</p>
                            <p className="opacity-80 font-medium" style={{ color: theme.regBoxText, fontSize: theme.uploadSubtextFontSize || '10px' }}>PNG or JPG file</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div 
                      style={calcBoxStyle}
                      className="p-3.5 flex items-center justify-between shadow-sm"
                    >
                      <span className="font-black" style={{ color: theme.calcBoxText, fontSize: theme.calcTextFontSize || '14px' }}>Total for your waves:</span>
                      <span className="font-black text-pink-600 flex items-center gap-1" style={{ fontSize: theme.calcGemsFontSize || '20px' }}>
                        Gems {totalGems}
                      </span>
                    </div>

                    <button 
                      type="submit"
                      style={{ ...buttonBorderStyle, fontSize: theme.submitBtnFontSize || '16px' }}
                      className="w-full py-4 font-black transition-all shadow-md flex items-center justify-center gap-2 hover:opacity-90"
                    >
                      <Sparkles className="w-4 h-4" /> Submit Registration
                    </button>
                  </form>
                )}
              </div>

              <p className="text-center mt-4 font-bold" style={{ color: theme.regBoxText, fontSize: theme.formFooterFontSize || '11px' }}>
                {siteContent.formFooterNote}
              </p>
            </div>

          </section>
        )}

        {/* Section 2: Party Rules Section */}
        <section id="rules" className="space-y-4">
          <div className={`${theme.rulesBoxAlignment === 'center' ? 'text-center' : ''}`}>
            <p 
              className="font-mono uppercase tracking-wider font-bold"
              style={{ color: theme.rulesCategoryColor || '#0284c7', fontSize: theme.rulesCategoryFontSize || '12px' }}
            >
              {siteContent.rulesCategoryHeading}
            </p>
            <h3 
              className="font-black"
              style={{ color: theme.rulesTitleColor || '#111827', fontSize: theme.rulesTitleFontSize || '24px' }}
            >
              {siteContent.rulesMainHeading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div 
              className={`border-2 p-6 rounded-3xl space-y-3 shadow-md transition-colors ${theme.rulesBoxAlignment === 'center' ? 'text-center flex flex-col items-center' : ''}`} 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder, color: theme.rulesBoxText || '#111827' }}
            >
              <div 
                style={emojiBoxStyle}
                className="w-10 h-10 flex items-center justify-center font-bold shadow-sm"
              >
                <span style={{ fontSize: theme.emojiFontSize || '20px' }}>{siteContent.rule1Emoji}</span>
              </div>
              <h4 className="font-black" style={{ color: theme.rulesBoxText || '#111827', fontSize: theme.rulesBoxTitleFontSize || '16px' }}>{siteContent.rule1Title}</h4>
              <ul className="space-y-2 leading-relaxed font-bold" style={{ color: theme.rulesBoxText || '#111827', fontSize: theme.rulesBoxBodyFontSize || '12px' }}>
                <li>• {siteContent.rule1Bullet1}</li>
                <li>• {siteContent.rule1Bullet2}</li>
                <li>• {siteContent.rule1Bullet3}</li>
              </ul>
            </div>

            {/* Box 2 */}
            <div 
              className={`border-2 p-6 rounded-3xl space-y-3 shadow-md transition-colors ${theme.rulesBoxAlignment === 'center' ? 'text-center flex flex-col items-center' : ''}`} 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder, color: theme.rulesBoxText || '#111827' }}
            >
              <div 
                style={emojiBoxStyle}
                className="w-10 h-10 flex items-center justify-center font-bold shadow-sm"
              >
                <span style={{ fontSize: theme.emojiFontSize || '20px' }}>{siteContent.rule2Emoji}</span>
              </div>
              <h4 className="font-black" style={{ color: theme.rulesBoxText || '#111827', fontSize: theme.rulesBoxTitleFontSize || '16px' }}>{siteContent.rule2Title}</h4>
              <ul className="space-y-2 leading-relaxed font-bold" style={{ color: theme.rulesBoxText || '#111827', fontSize: theme.rulesBoxBodyFontSize || '12px' }}>
                <li>• {siteContent.rule2Bullet1}</li>
                <li>• {siteContent.rule2Bullet2}</li>
                <li>• {hostedParties} {siteContent.rule2Bullet3}</li>
              </ul>
            </div>

            {/* Box 3 */}
            <div 
              className={`border-2 p-6 rounded-3xl space-y-3 shadow-md transition-colors ${theme.rulesBoxAlignment === 'center' ? 'text-center flex flex-col items-center' : ''}`} 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder, color: theme.rulesBoxText || '#111827' }}
            >
              <div 
                style={emojiBoxStyle}
                className="w-10 h-10 flex items-center justify-center font-bold shadow-sm"
              >
                <span style={{ fontSize: theme.emojiFontSize || '20px' }}>{siteContent.rule3Emoji}</span>
              </div>
              <h4 className="font-black" style={{ color: theme.rulesBoxText || '#111827', fontSize: theme.rulesBoxTitleFontSize || '16px' }}>{siteContent.rule3Title}</h4>
              <p className="font-black" style={{ color: theme.rulesBoxText || '#111827', fontSize: theme.rulesBoxBodyFontSize || '12px' }}>{siteContent.rule3NextWave}</p>
              <p className="leading-relaxed font-bold" style={{ color: theme.rulesBoxText || '#111827', fontSize: theme.rulesBoxBodyFontSize || '12px' }}>
                {siteContent.rule3Desc}
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: Bottom Discord Banner */}
        <section 
          className="border-2 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-colors"
          style={{ 
            backgroundColor: theme.bannerBg || '#fce7f3', 
            borderColor: theme.bannerBorder || '#fbcfe8',
            color: theme.bannerTextColor || '#111827'
          }}
        >
          <div className="space-y-2 text-center md:text-left">
            <span 
              className="px-3 py-1 bg-white text-pink-800 font-black rounded-full border border-pink-300 shadow-sm"
              style={{ fontSize: theme.bannerBadgeFontSize || '10px' }}
            >
              {siteContent.bannerBadgeText}
            </span>
            <h3 className="font-black" style={{ color: theme.bannerTextColor, fontSize: theme.bannerTitleFontSize || '24px' }}>{siteContent.bannerTitle}</h3>
            <p className="max-w-xl font-medium" style={{ color: theme.bannerTextColor, fontSize: theme.bannerTextFontSize || '12px' }}>
              {siteContent.bannerText}
            </p>
          </div>

          <a 
            href={siteContent.discordUrl} 
            target="_blank" 
            rel="noreferrer"
            style={{ ...buttonBorderStyle, fontSize: theme.bannerBtnFontSize || '14px' }}
            className="px-6 py-3.5 font-black transition-all shadow-md flex items-center gap-2 whitespace-nowrap hover:opacity-90"
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
                className="w-full py-3.5 font-black transition-all shadow-md hover:opacity-90"
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
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-600 bg-gray-50 font-medium relative z-10">
        <p>© 2026 {siteContent.brandName} • Sunday City Private Waves Host</p>
      </footer>
    </div>
  );
}
