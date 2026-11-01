import React, { useState } from 'react';
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
  Check
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
  
  const [submissions, setSubmissions] = useState([
    { id: 1, name: 'NeonKitten', tag: '992X', waves: 2, gems: 200, total: 400, time: '10 mins ago', status: 'Pending', screenshot: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80' },
    { id: 2, name: 'CyberSamurai', tag: '133LNO', waves: 5, gems: 200, total: 1000, time: '35 mins ago', status: 'Approved', screenshot: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' },
    { id: 3, name: 'PixelQueen', tag: '774AB', waves: 1, gems: 250, total: 250, time: '1 hour ago', status: 'Completed', screenshot: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80' },
  ]);

  const [selectedProofModal, setSelectedProofModal] = useState(null);

  const totalGems = (parseInt(wavesCount) || 0) * (parseInt(gemsPerWave) || 0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGemsProof(file);
      setProofPreview(URL.createObjectURL(file));
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
      time: 'Just now',
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
    if (passcode === 'admin123' || username.toLowerCase() === 'valerie') {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setActiveTab('dashboard');
    } else {
      alert('Invalid Passcode! Try "admin123"');
    }
  };

  const updateStatus = (id, newStatus) => {
    setSubmissions(submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
  };

  return (
    <div className="min-h-screen bg-[#0b0813] text-gray-100 font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#120d1d]/90 backdrop-blur-md border-b border-pink-900/30 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="VALERIE GURL" 
                className="w-10 h-10 rounded-full border-2 border-pink-500 object-cover shadow-[0_0_10px_rgba(236,72,153,0.5)]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#120d1d] rounded-full"></span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-wider flex items-center gap-1.5">
                VALERIE GURL
              </h1>
              <p className="text-xs text-pink-400 font-mono">133LNO • OG HOST</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#booking" onClick={() => setActiveTab('booking')} className="hover:text-pink-400 transition-colors">Wave Booking</a>
            <a href="#rules" className="hover:text-pink-400 transition-colors">Party Rules</a>
            <a href="#stats" className="hover:text-pink-400 transition-colors">Host Stats</a>
            <a href="https://discord.com/users/757598254668972065" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors flex items-center gap-1">
              Discord <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Waves 15:00–19:00 UTC
            </div>

            {isLoggedIn ? (
              <button 
                onClick={() => setActiveTab(activeTab === 'dashboard' ? 'booking' : 'dashboard')}
                className="px-4 py-2 text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]"
              >
                {activeTab === 'dashboard' ? 'View Website' : 'Admin Dashboard'}
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-purple-950/80 hover:bg-purple-900 border border-pink-500/30 text-pink-300 rounded-lg transition-all"
              >
                <LogIn className="w-3.5 h-3.5" /> Host Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
        
        {activeTab === 'dashboard' && isLoggedIn ? (
          <section className="bg-[#120d1d] border border-pink-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-900/30">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <ShieldCheck className="text-pink-500" /> VALERIE GURL COMMAND CENTER
                </h2>
                <p className="text-xs text-gray-400">Manage real-time party wave registrations and verify gem proofs.</p>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="px-3 py-1.5 text-xs bg-red-950/80 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-900"
              >
                Logout
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-[#1a1329] text-xs uppercase text-pink-400 border-b border-pink-900/30">
                  <tr>
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
                <tbody className="divide-y divide-pink-900/20">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-purple-950/20">
                      <td className="p-3 font-semibold text-white">{sub.name}</td>
                      <td className="p-3 font-mono text-pink-300">{sub.tag}</td>
                      <td className="p-3">{sub.waves} wave(s)</td>
                      <td className="p-3">{sub.gems}</td>
                      <td className="p-3 font-bold text-emerald-400">{sub.total} 💎</td>
                      <td className="p-3">
                        <button 
                          onClick={() => setSelectedProofModal(sub.screenshot)}
                          className="flex items-center gap-1 text-xs bg-purple-900/50 hover:bg-purple-800 text-pink-300 px-2 py-1 rounded border border-pink-500/20"
                        >
                          <Eye className="w-3 h-3" /> View Screenshot
                        </button>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                          sub.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                          sub.status === 'Completed' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                          'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button 
                          onClick={() => updateStatus(sub.id, 'Approved')}
                          className="p-1.5 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 rounded border border-emerald-500/30"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateStatus(sub.id, 'Completed')}
                          className="p-1.5 bg-blue-900/40 hover:bg-blue-800/60 text-blue-400 rounded border border-blue-500/30"
                          title="Complete"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section id="booking" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Card */}
            <div className="lg:col-span-5 bg-[#120d1d] border border-pink-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                    alt="VALERIE GURL" 
                    className="w-20 h-20 rounded-full border-4 border-pink-500 object-cover shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wider">VALERIE GURL</h2>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-pink-950 text-pink-300 border border-pink-500/40 rounded-full">
                        Verified OG
                      </span>
                    </div>
                    <p className="text-xs font-mono text-pink-400 mt-0.5">133LNO • The OG Party Host • Sunday City</p>
                  </div>
                </div>

                <blockquote className="text-gray-300 text-sm leading-relaxed border-l-2 border-pink-500 pl-4 italic mb-8 bg-purple-950/20 py-2 rounded-r-lg">
                  "Party Host for Sunday City. Need 200 gems to organize private parties. Fast, reliable, and hustle-free!"
                </blockquote>

                <div className="grid grid-cols-3 gap-3 mb-8" id="stats">
                  <div className="bg-[#1a1329] border border-pink-900/30 p-3 rounded-xl text-center">
                    <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-xl font-black text-white">2,130+</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Hosted Waves</div>
                  </div>

                  <div className="bg-[#1a1329] border border-pink-900/30 p-3 rounded-xl text-center">
                    <Flame className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                    <div className="text-xl font-black text-white">503</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Parties in 1 Wave</div>
                  </div>

                  <div className="bg-[#1a1329] border border-pink-900/30 p-3 rounded-xl text-center">
                    <Clock className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-xl font-black text-white">15–19</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">UTC Daily Window</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-pink-900/30">
                <div className="flex items-center gap-3">
                  <a 
                    href="https://discord.com/users/757598254668972065" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat with VALERIE GURL
                  </a>
                  <span className="px-3 py-3 bg-[#1a1329] border border-pink-500/30 text-pink-300 text-xs font-bold rounded-xl whitespace-nowrap">
                    💎 200 gems / wave
                  </span>
                </div>
                <p className="text-[11px] text-center text-gray-400">Replies in under 5 minutes during party hours — direct to her Discord profile.</p>
              </div>

            </div>

            {/* Right Card: Registration Form */}
            <div className="lg:col-span-7 bg-[#120d1d] border border-pink-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(236,72,153,0.15)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <h3 className="text-2xl font-black text-white">Register for a Private Wave</h3>
                </div>
                <p className="text-xs text-gray-400 mb-6">Book your slot — VALERIE GURL hosts daily 15:00–19:00 UTC.</p>

                {submitted ? (
                  <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-xl text-center space-y-3 animate-fade-in">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-lg font-bold text-white">Registration Submitted!</h4>
                    <p className="text-xs text-emerald-200 max-w-md mx-auto">
                      VALERIE GURL has received your wave request. Join her Discord server to confirm queue approval.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Game Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. NeonKitten"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                          className="w-full bg-[#1a1329] border border-pink-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Tag</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 133LNO"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          className="w-full bg-[#1a1329] border border-pink-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Waves Count</label>
                        <select 
                          value={wavesCount}
                          onChange={(e) => setWavesCount(e.target.value)}
                          className="w-full bg-[#1a1329] border border-pink-900/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                        >
                          <option value={1}>1 Wave</option>
                          <option value={2}>2 Waves</option>
                          <option value={3}>3 Waves</option>
                          <option value={5}>5 Waves</option>
                          <option value={10}>10 Waves</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Gems per Wave <span className="text-gray-500">(min 200)</span></label>
                        <input 
                          type="number" 
                          min={200}
                          value={gemsPerWave}
                          onChange={(e) => setGemsPerWave(e.target.value)}
                          className="w-full bg-[#1a1329] border border-pink-900/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-gray-300">Gems Proof</label>
                        <button 
                          type="button" 
                          onClick={handleSampleProof}
                          className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3" /> Use sample gem proof
                        </button>
                      </div>

                      <div className="border-2 border-dashed border-pink-900/40 hover:border-pink-500/60 rounded-xl p-4 text-center bg-[#1a1329]/50 transition-all relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {proofPreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={proofPreview} alt="Proof" className="w-12 h-12 rounded object-cover border border-pink-500" />
                            <span className="text-xs text-emerald-400 font-semibold">Screenshot Attached!</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-6 h-6 text-pink-400 mx-auto" />
                            <p className="text-xs text-gray-300">Upload screenshot of your gems</p>
                            <p className="text-[10px] text-gray-500">PNG/JPG up to 2.5 MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#1a1329] border border-pink-500/20 p-3 rounded-xl flex items-center justify-between text-sm">
                      <span className="text-gray-300 font-medium">Total for your waves:</span>
                      <span className="text-lg font-black text-pink-400 flex items-center gap-1">
                        💎 {totalGems} Gems
                      </span>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_25px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Submit Registration
                    </button>
                  </form>
                )}
              </div>

              <p className="text-[11px] text-center text-gray-500 mt-4">
                No account needed — VALERIE GURL confirms on Discord.
              </p>
            </div>

          </section>
        )}

        {/* Section 2: Party Rules */}
        <section id="rules" className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-pink-400 tracking-wider">HOW IT WORKS</p>
            <h3 className="text-2xl font-black text-white">Party Rules, Made Simple</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#120d1d] border border-pink-900/30 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
                💎
              </div>
              <h4 className="font-bold text-white text-base">How Private Waves Work</h4>
              <ul className="text-xs text-gray-400 space-y-2 leading-relaxed">
                <li>• Send 200 gems per wave with a screenshot as proof.</li>
                <li>• Drop your game name + tag in the registration form.</li>
                <li>• VALERIE GURL approves in queue order — then you party!</li>
              </ul>
            </div>

            <div className="bg-[#120d1d] border border-pink-900/30 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
                🛡️
              </div>
              <h4 className="font-bold text-white text-base">Hustle-Free Guarantee</h4>
              <ul className="text-xs text-gray-400 space-y-2 leading-relaxed">
                <li>• Zero disconnects — waves restart instantly if anything drops.</li>
                <li>• Friendly queue, no drama, no waiting-room chaos.</li>
                <li>• 2,130+ waves hosted with a 503-party single-wave record.</li>
              </ul>
            </div>

            <div className="bg-[#120d1d] border border-pink-900/30 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
                ⏰
              </div>
              <h4 className="font-bold text-white text-base">Live Host Schedule</h4>
              <p className="text-xs text-emerald-400 font-bold">Next wave starts at 15:00 UTC</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Party hours: 15:00 – 19:00 UTC, every single day. Booking stays open 24/7 — waves are served in queue order.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Discord Direct Banner */}
        <section className="bg-gradient-to-r from-purple-950/60 to-pink-950/60 border border-pink-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-pink-950 text-pink-300 text-[10px] font-bold rounded-full border border-pink-500/30">
              ⚡ Fastest response
            </span>
            <h3 className="text-2xl font-black text-white">Join Discord / Contact Host</h3>
            <p className="text-xs text-gray-300 max-w-xl">
              VALERIE GURL replies in under 5 minutes. Approvals, wave updates, and custom requests — click below to open her profile directly.
            </p>
          </div>

          <a 
            href="https://discord.com/users/757598254668972065" 
            target="_blank" 
            rel="noreferrer"
            className="px-6 py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" /> Open VALERIE GURL's Discord Profile
          </a>
        </section>

      </main>

      {/* Host Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#120d1d] border border-pink-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-pink-950 rounded-full border border-pink-500 flex items-center justify-center mx-auto mb-2 text-pink-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Host Login</h3>
              <p className="text-xs text-gray-400">VALERIE GURL's command center — authorize to manage wave registrations.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="valerie"
                  className="w-full bg-[#1a1329] border border-pink-900/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Passcode</label>
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter host passcode (admin123)"
                  className="w-full bg-[#1a1329] border border-pink-900/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]"
              >
                Enter Command Center
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Proof Screenshot View Modal */}
      {selectedProofModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#120d1d] border border-pink-500/40 rounded-2xl p-4 max-w-lg w-full relative">
            <button 
              onClick={() => setSelectedProofModal(null)}
              className="absolute top-4 right-4 text-white bg-pink-950 p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-white mb-3">Verified Gem Screenshot</h4>
            <img src={selectedProofModal} alt="Gem Proof" className="w-full rounded-lg border border-pink-900/40 object-cover max-h-[70vh]" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-pink-900/30 py-6 text-center text-xs text-gray-500">
        <p>© 2026 VALERIE GURL • Sunday City Private Waves Host</p>
      </footer>
    </div>
  );
}
