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
  Zap, 
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
  CloudSync,
  Wifi
} from 'lucide-react';

// --- FIREBASE SETUP ---
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
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('booking');
  const [adminViewTab, setAdminViewTab] = useState('active');

  // --- DEFAULT VALUES ---
  const defaultTheme = {
    fontFamily: 'sans-serif',
    headerBg: '#59ffe5',
    headerText: '#111827',
    profileBoxBg: '#fff0f6',
    profileBoxBorder: '#fbcfe8',
    profileBoxText: '#111827',
    regBoxBg: '#ff91f0',
    regBoxBorder: '#f472b6',
    regBoxText: '#111827',
    rulesBoxBg: '#67daff',
    rulesBoxBorder: '#38bdf8',
    rulesBoxText: '#111827',
    pageBg: '#ffffff'
  };

  const defaultSiteContent = {
    hostBio: "Party Host for Sunday City. Need 200 gems to organize private parties. Fast, reliable, and hustle-free!",
    wavesTimingText: "Waves 15:00–19:00 UTC",
    maxPartiesSingleWave: "503",
    rule1Title: "How Private Waves Work",
    rule1Bullet1: "Send 200 gems per wave with a screenshot as proof.",
    rule1Bullet2: "Drop your game name + tag in the registration form.",
    rule1Bullet3: "VALERIE GURL approves in queue order — then you party!",
    rule2Title: "Hustle-Free Guarantee",
    rule2Bullet1: "Zero disconnects — waves restart instantly if anything drops.",
    rule2Bullet2: "Friendly queue, no drama, no waiting-room chaos.",
    rule3Title: "Live Host Schedule",
    rule3NextWave: "Next wave starts at 15:00 UTC",
    rule3Desc: "Party hours: 15:00 – 19:00 UTC, every single day. Booking stays open 24/7 — waves are served in queue order.",
    discordBannerText: "VALERIE GURL replies in under 5 minutes. Approvals, wave updates, and custom requests — click below to open her profile directly.",
    discordUrl: "https://discord.com/users/757598254668972065"
  };

  const defaultSubmissions = [
    { 
      id: 1, 
      name: 'NeonKitten', 
      tag: '992X', 
      waves: 2, 
      gems: 200, 
      total: 400, 
      timestamp: '2026-11-01 14:15 UTC', 
      status: 'Pending', 
      screenshot: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80' 
    }
  ];

  // --- STATE WITH FIREBASE SYNC ---
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
    // Listen to Theme
    const themeRef = ref(db, 'valerie_site/theme');
    onValue(themeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTheme(data);
        setEditThemeForm(data);
      }
    });

    // Listen to Hosted Count
    const hostedRef = ref(db, 'valerie_site/hostedParties');
    onValue(hostedRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setHostedParties(data);
        setNewHostedCount(data);
      }
    });

    // Listen to Site Content
    const contentRef = ref(db, 'valerie_site/siteContent');
    onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSiteContent(data);
        setEditContentForm(data);
      }
    });

    // Listen to Submissions
    const subRef = ref(db, 'valerie_site/submissions');
    onValue(subRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSubmissions(data);
      }
    });

    // Listen to Deleted Submissions
    const delRef = ref(db, 'valerie_site/deletedSubmissions');
    onValue(delRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDeletedSubmissions(data);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleProof = () => {
    setProofPreview('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80');
    setGemsProof('sample_gems_proof.png');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameName || !tag) return;
    
    const newEntry = {
      id: Date.now(),
      name: gameName,
      tag: tag,
      waves: parseInt(wavesCount),
      gems: parseInt(gemsPerWave),
      total: totalGems,
      timestamp: getCurrentUTCTime(),
      status: 'Pending',
      screenshot: proofPreview || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80'
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
    showTempMsg("Hosted count synced to all devices!");
  };

  const handleSaveDynamicContent = (e) => {
    e.preventDefault();
    set(ref(db, 'valerie_site/siteContent'), editContentForm);
    showTempMsg("Website content synced globally!");
  };

  const handleSaveTheme = (e) => {
    e.preventDefault();
    set(ref(db, 'valerie_site/theme'), editThemeForm);
    showTempMsg("Colors & Font synced globally across all browsers!");
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

  const CustomStyledName = ({ fontSize = "text-2xl sm:text-3xl" }) => (
    <div className={`font-black tracking-wide flex items-center gap-0.5 whitespace-nowrap ${fontSize}`}>
      <span className="text-pink-600">-</span>
      <span className="text-pink-600">V</span>
      <span className="text-purple-600">A</span>
      <span className="text-pink-600">L</span>
      <span className="text-pink-600">E</span>
      <span className="text-purple-600">R</span>
      <span className="text-purple-600">I</span>
      <span className="text-pink-600">E</span>
      <span className="text-gray-900 mx-1"></span>
      <span className="text-blue-600">G</span>
      <span className="text-blue-600">U</span>
      <span className="text-purple-600">R</span>
      <span className="text-pink-600">L</span>
      <span className="text-pink-600">-</span>
    </div>
  );

  return (
    <div 
      className="min-h-screen text-gray-900 selection:bg-pink-200 selection:text-pink-900"
      style={{ backgroundColor: theme.pageBg, fontFamily: theme.fontFamily }}
    >
      
      {/* 1. Header Navbar with Dynamic Color & Text */}
      <header 
        className="sticky top-0 z-50 px-4 lg:px-8 py-3 shadow-md border-b-2" 
        style={{ backgroundColor: theme.headerBg, color: theme.headerText, borderColor: 'rgba(0,0,0,0.15)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <img 
                src={realValerieAvatar} 
                alt="VALERIE GURL" 
                className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover object-top shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80";
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <CustomStyledName fontSize="text-base sm:text-lg" />
              <p className="text-xs font-mono font-bold flex items-center gap-1" style={{ color: theme.headerText }}>
                <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" /> 133LNO • LIVE SYNC
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
                className="px-4 py-2 text-xs font-black bg-gray-900 text-white rounded-xl transition-all shadow-sm hover:bg-black"
              >
                {activeTab === 'dashboard' ? 'View Website' : 'Admin Dashboard'}
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-gray-900 text-white rounded-xl transition-all shadow-sm hover:bg-black"
              >
                <LogIn className="w-3.5 h-3.5" /> Host Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
        
        {saveSuccessMsg && (
          <div className="fixed top-16 right-4 z-50 bg-emerald-600 text-white font-black px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5" /> {saveSuccessMsg}
          </div>
        )}

        {activeTab === 'dashboard' && isLoggedIn ? (
          /* Admin Dashboard & Firebase Sync Manager */
          <section className="bg-pink-50 border-2 border-pink-200 rounded-3xl p-6 shadow-md space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
              <div>
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="text-pink-600" /> VALERIE GURL COMMAND CENTER (FIREBASE CLOUD)
                </h2>
                <p className="text-xs text-gray-600 font-bold">Changes made here instantly sync globally across all visitors and browsers.</p>
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

            {/* Admin Navigation Tabs */}
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
                <Palette className="w-3.5 h-3.5" /> Color & Font Customizer
              </button>

              <button 
                onClick={() => setAdminViewTab('content')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'content' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" /> Dynamic Content Editor
              </button>

              <button 
                onClick={() => setAdminViewTab('deleted')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  adminViewTab === 'deleted' 
                    ? 'bg-rose-500 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-pink-200'
                }`}
              >
                <History className="w-3.5 h-3.5" /> Deleted ({deletedSubmissions.length})
              </button>
            </div>

            {/* HOST STATS UPDATE (FIREBASE CLOUD SYNC) */}
            <div className="bg-white border-2 border-pink-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-amber-500" />
                <div>
                  <h4 className="text-sm font-black text-gray-900">Total Hosted Parties Count (Cloud Synced)</h4>
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
                    <Save className="w-3.5 h-3.5" /> Save to Cloud
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
                  <Edit3 className="w-3.5 h-3.5" /> Edit Total Count
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
                      <th className="p-3">Proof</th>
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
                          <td className="p-3 font-black text-emerald-600">{sub.total} 💎</td>
                          <td className="p-3">
                            <button 
                              onClick={() => setSelectedProofModal(sub.screenshot)}
                              className="flex items-center gap-1 text-xs bg-pink-100 hover:bg-pink-200 text-pink-900 px-2.5 py-1 rounded-lg border border-pink-300 font-bold"
                            >
                              <Eye className="w-3 h-3" /> View
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
                              className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg border border-rose-300 transition-all"
                              title="Delete Request"
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

            {/* TAB 2: COLOR & FONT CUSTOMIZER */}
            {adminViewTab === 'theme' && (
              <form onSubmit={handleSaveTheme} className="bg-white border-2 border-pink-200 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <Palette className="text-indigo-600" /> Full Dynamic Color & Font Customizer (Cloud Synced)
                    </h3>
                    <p className="text-xs text-gray-600 font-bold">Har ek browser aur device par same color aur font dikhega!</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleResetTheme}
                    className="flex items-center gap-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 font-bold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Default Colors
                  </button>
                </div>

                {/* Font Selector */}
                <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200 space-y-2">
                  <label className="block text-xs font-black text-indigo-900 flex items-center gap-1.5">
                    <Type className="w-4 h-4" /> Select Website Font Family
                  </label>
                  <select 
                    value={editThemeForm.fontFamily}
                    onChange={(e) => setEditThemeForm({ ...editThemeForm, fontFamily: e.target.value })}
                    className="w-full bg-white border border-indigo-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="sans-serif">Modern Sans-Serif (Default Clean)</option>
                    <option value="system-ui">System UI (Native Crisp)</option>
                    <option value="serif">Classic Serif (Elegant)</option>
                    <option value="monospace">Coding Monospace (Techy/Retro)</option>
                    <option value="cursive">Fancy Handcrafted (Creative)</option>
                  </select>
                </div>

                {/* Color Pickers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  
                  {/* Header Color */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Top Header / Navbar</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Background</label>
                      <input 
                        type="color" 
                        value={editThemeForm.headerBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, headerBg: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Text Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.headerText} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, headerText: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Left Profile Box */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Host Profile Card (Left)</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Background</label>
                      <input 
                        type="color" 
                        value={editThemeForm.profileBoxBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, profileBoxBg: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Border Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.profileBoxBorder} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, profileBoxBorder: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Wave Registration Box */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Wave Registration Box (Right)</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Background</label>
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
                  </div>

                  {/* Party Rules Boxes */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Party Rules Cards (3 Boxes)</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Background</label>
                      <input 
                        type="color" 
                        value={editThemeForm.rulesBoxBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, rulesBoxBg: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Border Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.rulesBoxBorder} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, rulesBoxBorder: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Global Page Background */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-black text-gray-900 border-b pb-1">Website Page Background</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-700 font-bold">Background Color</label>
                      <input 
                        type="color" 
                        value={editThemeForm.pageBg} 
                        onChange={(e) => setEditThemeForm({...editThemeForm, pageBg: e.target.value})}
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
                    <Save className="w-4 h-4" /> Save Colors & Font to Cloud
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: DYNAMIC CONTENT MANAGER */}
            {adminViewTab === 'content' && (
              <form onSubmit={handleSaveDynamicContent} className="bg-white border-2 border-pink-200 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="pb-3 border-b border-gray-200">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <FileText className="text-purple-600" /> Website Dynamic Content & Text Editor (Cloud Synced)
                  </h3>
                  <p className="text-xs text-gray-600 font-bold">Yahan se jo bhi text edit karoge, wo saari duniya me live update ho jayega!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-900 mb-1">Host Bio Quote</label>
                    <textarea 
                      rows={3}
                      value={editContentForm.hostBio}
                      onChange={(e) => setEditContentForm({...editContentForm, hostBio: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs text-gray-900 font-bold focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-900 mb-1">Navbar Wave Timing Tag</label>
                    <input 
                      type="text"
                      value={editContentForm.wavesTimingText}
                      onChange={(e) => setEditContentForm({...editContentForm, wavesTimingText: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold focus:outline-none focus:border-purple-600 mb-3"
                    />

                    <label className="block text-xs font-black text-gray-900 mb-1">Parties in 1 Wave Stat</label>
                    <input 
                      type="text"
                      value={editContentForm.maxPartiesSingleWave}
                      onChange={(e) => setEditContentForm({...editContentForm, maxPartiesSingleWave: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 font-bold focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                {/* Rules Section Customization */}
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <h4 className="text-xs font-black uppercase text-purple-700 tracking-wider">Party Rules Box 1 (How Waves Work)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input 
                      type="text"
                      placeholder="Rule 1 Bullet 1"
                      value={editContentForm.rule1Bullet1}
                      onChange={(e) => setEditContentForm({...editContentForm, rule1Bullet1: e.target.value})}
                      className="bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-bold"
                    />
                    <input 
                      type="text"
                      placeholder="Rule 1 Bullet 2"
                      value={editContentForm.rule1Bullet2}
                      onChange={(e) => setEditContentForm({...editContentForm, rule1Bullet2: e.target.value})}
                      className="bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-bold"
                    />
                    <input 
                      type="text"
                      placeholder="Rule 1 Bullet 3"
                      value={editContentForm.rule1Bullet3}
                      onChange={(e) => setEditContentForm({...editContentForm, rule1Bullet3: e.target.value})}
                      className="bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <h4 className="text-xs font-black uppercase text-purple-700 tracking-wider">Party Rules Box 2 & Box 3</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text"
                      placeholder="Rule 2 Bullet 1"
                      value={editContentForm.rule2Bullet1}
                      onChange={(e) => setEditContentForm({...editContentForm, rule2Bullet1: e.target.value})}
                      className="bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-bold"
                    />
                    <input 
                      type="text"
                      placeholder="Rule 3 Schedule Badge"
                      value={editContentForm.rule3NextWave}
                      onChange={(e) => setEditContentForm({...editContentForm, rule3NextWave: e.target.value})}
                      className="bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <label className="block text-xs font-black text-gray-900">Discord Banner Text</label>
                  <textarea 
                    rows={2}
                    value={editContentForm.discordBannerText}
                    onChange={(e) => setEditContentForm({...editContentForm, discordBannerText: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs text-gray-900 font-bold focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Content to Cloud
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
                      <th className="p-3">Action</th>
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
                          <td className="p-3 text-gray-500">{sub.total} 💎</td>
                          <td className="p-3">
                            <button 
                              onClick={() => handleRestoreRequest(sub.id)}
                              className="flex items-center gap-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-300 font-bold"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> Restore
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
            
            {/* Left Card: VALERIE GURL Profile */}
            <div 
              className="lg:col-span-5 border-2 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden" 
              style={{ backgroundColor: theme.profileBoxBg, borderColor: theme.profileBoxBorder }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0 p-1 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 shadow-md">
                    <img 
                      src={realValerieAvatar} 
                      alt="VALERIE GURL Avatar" 
                      className="w-full h-full rounded-full object-cover object-top border-2 border-white"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80";
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CustomStyledName fontSize="text-xl sm:text-2xl" />
                      <span className="px-2.5 py-0.5 text-[10px] font-black bg-white text-pink-800 border border-pink-300 rounded-full shadow-sm whitespace-nowrap">
                        Verified OG
                      </span>
                    </div>
                    <p className="text-xs font-mono text-pink-700 mt-1 font-bold tracking-wide">
                      133LNO • The OG Party Host • Sunday City
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
                    <div className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">UTC Daily Window</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-pink-200">
                <div className="flex items-center gap-3">
                  <a 
                    href={siteContent.discordUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-2xl transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 text-pink-300" /> Chat with VALERIE GURL
                  </a>
                  <span className="px-3.5 py-3 bg-white border border-pink-300 text-pink-800 text-xs font-black rounded-2xl whitespace-nowrap shadow-sm">
                    💎 200 gems / wave
                  </span>
                </div>
                <p className="text-[11px] text-center text-gray-600 font-medium">Replies in under 5 minutes during party hours — direct to her Discord profile.</p>
              </div>

            </div>

            {/* Right Card: Private Wave Registration Form */}
            <div 
              className="lg:col-span-7 border-2 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between" 
              style={{ backgroundColor: theme.regBoxBg, borderColor: theme.regBoxBorder }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-6 h-6 text-gray-900" />
                  <h3 className="text-2xl font-black text-gray-900">Register for a Private Wave</h3>
                </div>
                <p className="text-xs text-gray-900 mb-6 font-bold">Book your slot — VALERIE GURL hosts daily 15:00–19:00 UTC.</p>

                {submitted ? (
                  <div className="bg-white border-2 border-emerald-500 p-6 rounded-2xl text-center space-y-3 shadow-md">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-lg font-black text-gray-900">Registration Submitted!</h4>
                    <p className="text-xs text-gray-800 max-w-md mx-auto font-bold">
                      VALERIE GURL has received your wave request. Join her Discord server to confirm queue approval.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-gray-900 mb-1.5">Game Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. NeonKitten"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                          className="w-full bg-white border-2 border-gray-900 rounded-2xl px-4 py-2.5 text-sm text-gray-900 font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-900 mb-1.5">Tag</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 133LNO"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          className="w-full bg-white border-2 border-gray-900 rounded-2xl px-4 py-2.5 text-sm text-gray-900 font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-gray-900 mb-1.5">Waves Count</label>
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
                        <label className="block text-xs font-black text-gray-900 mb-1.5">Gems per Wave <span className="text-gray-800 font-semibold">(min 200)</span></label>
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
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-black text-gray-900">Gems Proof</label>
                        <button 
                          type="button" 
                          onClick={handleSampleProof}
                          className="text-[11px] text-gray-900 hover:text-black flex items-center gap-1 font-black underline"
                        >
                          <Zap className="w-3.5 h-3.5" /> Use sample gem proof
                        </button>
                      </div>

                      <div className="border-2 border-dashed border-gray-900 hover:border-black rounded-2xl p-4 text-center bg-white transition-all relative shadow-sm">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {proofPreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={proofPreview} alt="Proof" className="w-12 h-12 rounded-xl object-cover border-2 border-gray-900 shadow-sm" />
                            <span className="text-xs text-emerald-700 font-black">Screenshot Attached!</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-6 h-6 text-gray-900 mx-auto" />
                            <p className="text-xs text-gray-900 font-bold">Upload screenshot of your gems</p>
                            <p className="text-[10px] text-gray-700 font-medium">PNG/JPG up to 2.5 MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white border-2 border-gray-900 p-3.5 rounded-2xl flex items-center justify-between text-sm shadow-sm">
                      <span className="text-gray-900 font-black">Total for your waves:</span>
                      <span className="text-xl font-black text-pink-600 flex items-center gap-1">
                        💎 {totalGems} Gems
                      </span>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-pink-300" /> Submit Registration
                    </button>
                  </form>
                )}
              </div>

              <p className="text-[11px] text-center text-gray-900 mt-4 font-bold">
                No account needed — VALERIE GURL confirms on Discord.
              </p>
            </div>

          </section>
        )}

        {/* Section 2: Party Rules */}
        <section id="rules" className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-sky-600 tracking-wider font-bold">HOW IT WORKS</p>
            <h3 className="text-2xl font-black text-gray-900">Party Rules, Made Simple</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="border-2 p-6 rounded-3xl space-y-3 shadow-md" 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder }}
            >
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-900 flex items-center justify-center text-gray-900 font-bold shadow-sm">
                💎
              </div>
              <h4 className="font-black text-gray-900 text-base">{siteContent.rule1Title}</h4>
              <ul className="text-xs text-gray-900 space-y-2 leading-relaxed font-bold">
                <li>• {siteContent.rule1Bullet1}</li>
                <li>• {siteContent.rule1Bullet2}</li>
                <li>• {siteContent.rule1Bullet3}</li>
              </ul>
            </div>

            <div 
              className="border-2 p-6 rounded-3xl space-y-3 shadow-md" 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder }}
            >
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-900 flex items-center justify-center text-gray-900 font-bold shadow-sm">
                🛡️
              </div>
              <h4 className="font-black text-gray-900 text-base">{siteContent.rule2Title}</h4>
              <ul className="text-xs text-gray-900 space-y-2 leading-relaxed font-bold">
                <li>• {siteContent.rule2Bullet1}</li>
                <li>• {siteContent.rule2Bullet2}</li>
                <li>• {hostedParties} waves hosted with a {siteContent.maxPartiesSingleWave}-party single-wave record.</li>
              </ul>
            </div>

            <div 
              className="border-2 p-6 rounded-3xl space-y-3 shadow-md" 
              style={{ backgroundColor: theme.rulesBoxBg, borderColor: theme.rulesBoxBorder }}
            >
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-900 flex items-center justify-center text-gray-900 font-bold shadow-sm">
                ⏰
              </div>
              <h4 className="font-black text-gray-900 text-base">{siteContent.rule3Title}</h4>
              <p className="text-xs text-emerald-900 font-black">{siteContent.rule3NextWave}</p>
              <p className="text-xs text-gray-900 leading-relaxed font-bold">
                {siteContent.rule3Desc}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Discord Direct Banner */}
        <section className="bg-pink-100/70 border-2 border-pink-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-white text-pink-800 text-[10px] font-black rounded-full border border-pink-300 shadow-sm">
              ⚡ Fastest response
            </span>
            <h3 className="text-2xl font-black text-gray-900">Join Discord / Contact Host</h3>
            <p className="text-xs text-gray-700 max-w-xl font-medium">
              {siteContent.discordBannerText}
            </p>
          </div>

          <a 
            href={siteContent.discordUrl} 
            target="_blank" 
            rel="noreferrer"
            className="px-6 py-3.5 bg-gray-900 hover:bg-black text-white font-black text-sm rounded-2xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-pink-300" /> Open VALERIE GURL's Discord Profile
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
                className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-black text-sm rounded-2xl transition-all shadow-md"
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
            <h4 className="text-sm font-bold text-gray-900 mb-3">Verified Gem Screenshot</h4>
            <img src={selectedProofModal} alt="Gem Proof" className="w-full rounded-2xl border border-gray-300 object-cover max-h-[70vh]" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-600 bg-gray-50 font-medium">
        <p>© 2026 VALERIE GURL • Sunday City Private Waves Host (Cloud Synced)</p>
      </footer>
    </div>
  );
}
