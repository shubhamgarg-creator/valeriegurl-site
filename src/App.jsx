import React, { useState, useEffect } from 'react';
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
  Save
} from 'lucide-react';

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
  
  const [hostedParties, setHostedParties] = useState(() => {
    const saved = localStorage.getItem('valerie_hosted_parties');
    return saved ? saved : '2,130+';
  });
  const [newHostedCount, setNewHostedCount] = useState(hostedParties);
  const [isEditingParties, setIsEditingParties] = useState(false);

  const realValerieAvatar = "https://sunday-city-waves--00ko1l64.preview.static.emergentagent.com/valerie-avatar.jpeg";

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
    },
    { 
      id: 2, 
      name: 'CyberSamurai', 
      tag: '133LNO', 
      waves: 5, 
      gems: 200, 
      total: 1000, 
      timestamp: '2026-11-01 13:40 UTC', 
      status: 'Approved', 
      screenshot: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' 
    },
    { 
      id: 3, 
      name: 'PixelQueen', 
      tag: '774AB', 
      waves: 1, 
      gems: 250, 
      total: 250, 
      timestamp: '2026-11-01 12:10 UTC', 
      status: 'Completed', 
      screenshot: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80' 
    },
  ];

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('valerie_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultSubmissions; }
    }
    return defaultSubmissions;
  });

  const [deletedSubmissions, setDeletedSubmissions] = useState(() => {
    const saved = localStorage.getItem('valerie_deleted_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('valerie_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('valerie_deleted_submissions', JSON.stringify(deletedSubmissions));
  }, [deletedSubmissions]);

  useEffect(() => {
    localStorage.setItem('valerie_hosted_parties', hostedParties);
  }, [hostedParties]);

  const [selectedProofModal, setSelectedProofModal] = useState(null);

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
    
    setSubmissions([newEntry, ...submissions]);
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
    setSubmissions(submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
  };

  const handleDeleteRequest = (id) => {
    const itemToDelete = submissions.find(sub => sub.id === id);
    if (itemToDelete) {
      setSubmissions(submissions.filter(sub => sub.id !== id));
      setDeletedSubmissions([{ ...itemToDelete, deletedAt: getCurrentUTCTime() }, ...deletedSubmissions]);
    }
  };

  const handleRestoreRequest = (id) => {
    const itemToRestore = deletedSubmissions.find(sub => sub.id === id);
    if (itemToRestore) {
      setDeletedSubmissions(deletedSubmissions.filter(sub => sub.id !== id));
      setSubmissions([itemToRestore, ...submissions]);
    }
  };

  const handleSaveHostedParties = (e) => {
    e.preventDefault();
    setHostedParties(newHostedCount);
    setIsEditingParties(false);
  };

  const CustomStyledName = ({ fontSize = "text-2xl sm:text-3xl" }) => (
    <div className={`font-black tracking-wide flex items-center gap-0.5 whitespace-nowrap ${fontSize}`}>
      <span className="text-pink-400">-</span>
      <span className="text-pink-500">V</span>
      <span className="text-purple-400">A</span>
      <span className="text-pink-500">L</span>
      <span className="text-pink-500">E</span>
      <span className="text-purple-400">R</span>
      <span className="text-purple-400">I</span>
      <span className="text-pink-500">E</span>
      <span className="text-gray-800 mx-1"></span>
      <span className="text-blue-500">G</span>
      <span className="text-blue-500">U</span>
      <span className="text-purple-400">R</span>
      <span className="text-pink-500">L</span>
      <span className="text-pink-400">-</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-pink-200 selection:text-pink-900">
      
      {/* Header Navbar with background #59ffe5 */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-black/5 px-4 lg:px-8 py-3 shadow-sm" style={{ backgroundColor: '#59ffe5' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <img 
                src={realValerieAvatar} 
                alt="VALERIE GURL" 
                className="w-10 h-10 rounded-full border-2 border-white object-cover object-top shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80";
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <CustomStyledName fontSize="text-base sm:text-lg" />
              <p className="text-xs text-gray-700 font-mono font-medium">133LNO • OG HOST</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
            <a href="#booking" onClick={() => setActiveTab('booking')} className="hover:text-pink-700 transition-colors">Wave Booking</a>
            <a href="#rules" className="hover:text-pink-700 transition-colors">Party Rules</a>
            <a href="#stats" className="hover:text-pink-700 transition-colors">Host Stats</a>
            <a href="https://discord.com/users/757598254668972065" target="_blank" rel="noreferrer" className="hover:text-pink-700 transition-colors flex items-center gap-1">
              Discord <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-black/10 text-gray-800 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Waves 15:00–19:00 UTC
            </div>

            {isLoggedIn ? (
              <button 
                onClick={() => setActiveTab(activeTab === 'dashboard' ? 'booking' : 'dashboard')}
                className="px-4 py-2 text-xs font-bold bg-white text-gray-800 rounded-lg transition-all shadow-sm hover:bg-gray-50"
              >
                {activeTab === 'dashboard' ? 'View Website' : 'Admin Dashboard'}
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/80 hover:bg-white text-gray-800 rounded-lg transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" /> Host Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
        
        {activeTab === 'dashboard' && isLoggedIn ? (
          /* Admin Dashboard */
          <section className="bg-pink-50/40 border border-pink-200/50 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200/50">
              <div>
                <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="text-pink-500" /> VALERIE GURL COMMAND CENTER
                </h2>
                <p className="text-xs text-gray-500">Manage real-time party wave registrations & host settings.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="px-3 py-1.5 text-xs bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Host Stats Update Option */}
            <div className="bg-white border border-pink-200/50 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-amber-500" />
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Total Hosted Parties Count</h4>
                  <p className="text-xs text-gray-500">Currently showing: <span className="text-pink-600 font-bold">{hostedParties}</span> on public site.</p>
                </div>
              </div>

              {isEditingParties ? (
                <form onSubmit={handleSaveHostedParties} className="flex items-center gap-2 w-full sm:w-auto">
                  <input 
                    type="text" 
                    value={newHostedCount}
                    onChange={(e) => setNewHostedCount(e.target.value)}
                    placeholder="e.g. 2,150+"
                    className="bg-gray-50 border border-pink-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-pink-400"
                  />
                  <button 
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditingParties(false)}
                    className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => { setNewHostedCount(hostedParties); setIsEditingParties(true); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 border border-pink-200 text-pink-700 text-xs font-bold rounded-lg transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Update Total Parties
                </button>
              )}
            </div>

            {/* Admin Tabs */}
            <div className="flex items-center gap-4 border-b border-pink-200/50 pb-2">
              <button 
                onClick={() => setAdminViewTab('active')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminViewTab === 'active' 
                    ? 'bg-pink-400 text-white shadow-sm' 
                    : 'bg-white text-gray-600 hover:text-gray-800 border border-pink-200/50'
                }`}
              >
                Active Registrations ({submissions.length})
              </button>
              <button 
                onClick={() => setAdminViewTab('deleted')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminViewTab === 'deleted' 
                    ? 'bg-rose-400 text-white shadow-sm' 
                    : 'bg-white text-gray-600 hover:text-gray-800 border border-pink-200/50'
                }`}
              >
                <History className="w-3.5 h-3.5" /> Deleted History ({deletedSubmissions.length})
              </button>
            </div>

            {adminViewTab === 'active' ? (
              <div className="overflow-x-auto bg-white rounded-2xl border border-pink-200/50 p-2 shadow-sm">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-pink-50/60 text-xs uppercase text-pink-700 border-b border-pink-200/50">
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
                  <tbody className="divide-y divide-pink-50">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-6 text-center text-gray-400 text-xs">No active registrations found.</td>
                      </tr>
                    ) : (
                      submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-pink-50/20">
                          <td className="p-3 font-mono text-xs text-pink-600">{sub.timestamp}</td>
                          <td className="p-3 font-semibold text-gray-800">{sub.name}</td>
                          <td className="p-3 font-mono text-gray-500">{sub.tag}</td>
                          <td className="p-3">{sub.waves} wave(s)</td>
                          <td className="p-3">{sub.gems}</td>
                          <td className="p-3 font-bold text-emerald-600">{sub.total} 💎</td>
                          <td className="p-3">
                            <button 
                              onClick={() => setSelectedProofModal(sub.screenshot)}
                              className="flex items-center gap-1 text-xs bg-pink-50 hover:bg-pink-100 text-pink-700 px-2.5 py-1 rounded-lg border border-pink-200 font-medium"
                            >
                              <Eye className="w-3 h-3" /> View
                            </button>
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                              sub.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              sub.status === 'Completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-3 flex items-center gap-2">
                            <button 
                              onClick={() => updateStatus(sub.id, 'Approved')}
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition-all"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => updateStatus(sub.id, 'Completed')}
                              className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-all"
                              title="Complete"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteRequest(sub.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200 transition-all"
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
            ) : (
              /* Deleted History Tab */
              <div className="overflow-x-auto bg-white rounded-2xl border border-pink-200/50 p-2 shadow-sm">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-rose-50 text-xs uppercase text-rose-600 border-b border-rose-100">
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
                  <tbody className="divide-y divide-rose-50">
                    {deletedSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-gray-400 text-xs">No deleted requests history.</td>
                      </tr>
                    ) : (
                      deletedSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-rose-50/20">
                          <td className="p-3 font-mono text-xs text-gray-400">{sub.timestamp}</td>
                          <td className="p-3 font-mono text-xs text-rose-500">{sub.deletedAt}</td>
                          <td className="p-3 font-semibold text-gray-700 line-through">{sub.name}</td>
                          <td className="p-3 font-mono text-pink-600">{sub.tag}</td>
                          <td className="p-3">{sub.waves} wave(s)</td>
                          <td className="p-3 text-gray-400">{sub.total} 💎</td>
                          <td className="p-3">
                            <button 
                              onClick={() => handleRestoreRequest(sub.id)}
                              className="flex items-center gap-1 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium"
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
            
            {/* Left Card: VALERIE GURL Profile with very soft pink background */}
            <div className="lg:col-span-5 border border-pink-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(255,145,240,0.08)] relative overflow-hidden" style={{ backgroundColor: '#fff3fc' }}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0 p-1 rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 shadow-sm">
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
                      <span className="px-2.5 py-0.5 text-[10px] font-bold bg-white text-pink-700 border border-pink-200 rounded-full shadow-sm whitespace-nowrap">
                        Verified OG
                      </span>
                    </div>
                    <p className="text-xs font-mono text-pink-600 mt-1 font-semibold tracking-wide">
                      133LNO • The OG Party Host • Sunday City
                    </p>
                  </div>
                </div>

                <blockquote className="text-gray-700 text-sm leading-relaxed border-l-2 border-pink-400 pl-4 italic mb-8 bg-white/80 py-3 rounded-r-xl shadow-sm">
                  "Party Host for Sunday City. Need 200 gems to organize private parties. Fast, reliable, and hustle-free!"
                </blockquote>

                <div className="grid grid-cols-3 gap-3 mb-8" id="stats">
                  <div className="bg-white/90 border border-pink-200/50 p-3 rounded-2xl text-center shadow-sm">
                    <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <div className="text-xl font-black text-gray-800">{hostedParties}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Hosted Waves</div>
                  </div>

                  <div className="bg-white/90 border border-pink-200/50 p-3 rounded-2xl text-center shadow-sm">
                    <Flame className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                    <div className="text-xl font-black text-gray-800">503</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Parties in 1 Wave</div>
                  </div>

                  <div className="bg-white/90 border border-pink-200/50 p-3 rounded-2xl text-center shadow-sm">
                    <Clock className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                    <div className="text-xl font-black text-gray-800">15–19</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">UTC Daily Window</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-pink-200/50">
                <div className="flex items-center gap-3">
                  <a 
                    href="https://discord.com/users/757598254668972065" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:opacity-90 text-white font-bold text-sm rounded-2xl transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat with VALERIE GURL
                  </a>
                  <span className="px-3 py-3 bg-white border border-pink-200 text-pink-700 text-xs font-bold rounded-2xl whitespace-nowrap shadow-sm">
                    💎 200 gems / wave
                  </span>
                </div>
                <p className="text-[11px] text-center text-gray-500">Replies in under 5 minutes during party hours — direct to her Discord profile.</p>
              </div>

            </div>

            {/* Right Card: Private Wave Registration Form with background #ff91f0 */}
            <div className="lg:col-span-7 border border-pink-300/60 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(255,145,240,0.15)] flex flex-col justify-between" style={{ backgroundColor: '#ff91f0' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-pink-800" />
                  <h3 className="text-2xl font-black text-gray-900">Register for a Private Wave</h3>
                </div>
                <p className="text-xs text-gray-800 mb-6 font-medium">Book your slot — VALERIE GURL hosts daily 15:00–19:00 UTC.</p>

                {submitted ? (
                  <div className="bg-white/90 border border-emerald-300 p-6 rounded-2xl text-center space-y-3 shadow-sm">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-lg font-bold text-gray-900">Registration Submitted!</h4>
                    <p className="text-xs text-emerald-800 max-w-md mx-auto font-medium">
                      VALERIE GURL has received your wave request. Join her Discord server to confirm queue approval.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">Game Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. NeonKitten"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                          className="w-full bg-white/90 border border-pink-300 rounded-2xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-white focus:bg-white transition-all shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">Tag</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 133LNO"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          className="w-full bg-white/90 border border-pink-300 rounded-2xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-white focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">Waves Count</label>
                        <select 
                          value={wavesCount}
                          onChange={(e) => setWavesCount(e.target.value)}
                          className="w-full bg-white/90 border border-pink-300 rounded-2xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-white focus:bg-white transition-all shadow-sm"
                        >
                          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Wave' : 'Waves'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">Gems per Wave <span className="text-gray-700">(min 200)</span></label>
                        <input 
                          type="number" 
                          min={200}
                          value={gemsPerWave}
                          onChange={(e) => setGemsPerWave(e.target.value)}
                          className="w-full bg-white/90 border border-pink-300 rounded-2xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-white focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-gray-800">Gems Proof</label>
                        <button 
                          type="button" 
                          onClick={handleSampleProof}
                          className="text-[11px] text-gray-900 hover:text-black flex items-center gap-1 font-bold underline"
                        >
                          <Zap className="w-3 h-3" /> Use sample gem proof
                        </button>
                      </div>

                      <div className="border-2 border-dashed border-pink-300 hover:border-white rounded-2xl p-4 text-center bg-white/70 transition-all relative shadow-sm">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {proofPreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={proofPreview} alt="Proof" className="w-12 h-12 rounded-xl object-cover border border-white shadow-sm" />
                            <span className="text-xs text-emerald-800 font-bold">Screenshot Attached!</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-6 h-6 text-gray-800 mx-auto" />
                            <p className="text-xs text-gray-800 font-medium">Upload screenshot of your gems</p>
                            <p className="text-[10px] text-gray-700">PNG/JPG up to 2.5 MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/90 border border-pink-300 p-3 rounded-2xl flex items-center justify-between text-sm shadow-sm">
                      <span className="text-gray-800 font-bold">Total for your waves:</span>
                      <span className="text-lg font-black text-pink-800 flex items-center gap-1">
                        💎 {totalGems} Gems
                      </span>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-pink-300" /> Submit Registration
                    </button>
                  </form>
                )}
              </div>

              <p className="text-[11px] text-center text-gray-800 mt-4 font-medium">
                No account needed — VALERIE GURL confirms on Discord.
              </p>
            </div>

          </section>
        )}

        {/* Section 2: Party Rules with background #67daff for the 3 boxes */}
        <section id="rules" className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-blue-600 tracking-wider font-semibold">HOW IT WORKS</p>
            <h3 className="text-2xl font-black text-gray-800">Party Rules, Made Simple</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-blue-200/80 p-6 rounded-3xl space-y-3 shadow-sm" style={{ backgroundColor: '#67daff' }}>
              <div className="w-10 h-10 rounded-2xl bg-white/80 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shadow-sm">
                💎
              </div>
              <h4 className="font-black text-gray-900 text-base">How Private Waves Work</h4>
              <ul className="text-xs text-gray-800 space-y-2 leading-relaxed font-medium">
                <li>• Send 200 gems per wave with a screenshot as proof.</li>
                <li>• Drop your game name + tag in the registration form.</li>
                <li>• VALERIE GURL approves in queue order — then you party!</li>
              </ul>
            </div>

            <div className="border border-blue-200/80 p-6 rounded-3xl space-y-3 shadow-sm" style={{ backgroundColor: '#67daff' }}>
              <div className="w-10 h-10 rounded-2xl bg-white/80 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shadow-sm">
                🛡️
              </div>
              <h4 className="font-black text-gray-900 text-base">Hustle-Free Guarantee</h4>
              <ul className="text-xs text-gray-800 space-y-2 leading-relaxed font-medium">
                <li>• Zero disconnects — waves restart instantly if anything drops.</li>
                <li>• Friendly queue, no drama, no waiting-room chaos.</li>
                <li>• {hostedParties} waves hosted with a 503-party single-wave record.</li>
              </ul>
            </div>

            <div className="border border-blue-200/80 p-6 rounded-3xl space-y-3 shadow-sm" style={{ backgroundColor: '#67daff' }}>
              <div className="w-10 h-10 rounded-2xl bg-white/80 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shadow-sm">
                ⏰
              </div>
              <h4 className="font-black text-gray-900 text-base">Live Host Schedule</h4>
              <p className="text-xs text-emerald-800 font-bold">Next wave starts at 15:00 UTC</p>
              <p className="text-xs text-gray-800 leading-relaxed font-medium">
                Party hours: 15:00 – 19:00 UTC, every single day. Booking stays open 24/7 — waves are served in queue order.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Discord Direct Banner */}
        <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-purple-200/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full border border-purple-200">
              ⚡ Fastest response
            </span>
            <h3 className="text-2xl font-black text-gray-800">Join Discord / Contact Host</h3>
            <p className="text-xs text-gray-600 max-w-xl">
              VALERIE GURL replies in under 5 minutes. Approvals, wave updates, and custom requests — click below to open her profile directly.
            </p>
          </div>

          <a 
            href="https://discord.com/users/757598254668972065" 
            target="_blank" 
            rel="noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:opacity-90 text-white font-bold text-sm rounded-2xl transition-all shadow-[0_4px_20px_rgba(232,121,249,0.3)] flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" /> Open VALERIE GURL's Discord Profile
          </a>
        </section>

      </main>

      {/* Host Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-pink-200 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl border border-pink-200 flex items-center justify-center mx-auto mb-2 text-pink-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Host Login</h3>
              <p className="text-xs text-gray-500">Authorize to access host command center.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-2xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Passcode</label>
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-2xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-pink-400"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-2xl transition-all shadow-[0_4px_15px_rgba(236,72,153,0.3)]"
              >
                Enter Command Center
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Proof Screenshot View Modal */}
      {selectedProofModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-pink-200 rounded-3xl p-4 max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={() => setSelectedProofModal(null)}
              className="absolute top-4 right-4 text-gray-600 bg-pink-100 p-1.5 rounded-full hover:bg-pink-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-gray-800 mb-3">Verified Gem Screenshot</h4>
            <img src={selectedProofModal} alt="Gem Proof" className="w-full rounded-2xl border border-pink-100 object-cover max-h-[70vh]" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-pink-100 py-6 text-center text-xs text-gray-500 bg-pink-50/20">
        <p>© 2026 VALERIE GURL • Sunday City Private Waves Host</p>
      </footer>
    </div>
  );
}
