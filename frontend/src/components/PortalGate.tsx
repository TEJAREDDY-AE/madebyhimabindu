import { useState } from 'react';

interface PortalGateProps {
  isDarkMode: boolean;
  onLogin: (role: 'store' | 'admin', name: string) => void;
  bgTheme: string;
  setBgTheme: (theme: string) => void;
}

export default function PortalGate({ isDarkMode, onLogin, bgTheme, setBgTheme }: PortalGateProps) {
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  
  // Customer states
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");

  // Admin states
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const renderHudCorners = () => (
    <>
      <div className="hud-corner hud-tl"></div>
      <div className="hud-corner hud-tr"></div>
      <div className="hud-corner hud-bl"></div>
      <div className="hud-corner hud-br"></div>
    </>
  );

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || custPhone.length < 10) {
      setErrorMsg("UPLINK FAILURE: Name & 10-digit mobile number required.");
      return;
    }
    setErrorMsg(null);
    onLogin('store', custName.trim());
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Passkey verification (passcode: 1234 or user 'admin' pass 'admin123')
    if (adminPass === "1234" || (adminUser.toLowerCase() === "admin" && adminPass === "admin123")) {
      setErrorMsg(null);
      onLogin('admin', adminUser.trim() || "Console Manager");
    } else {
      setErrorMsg("ACCESS DENIED: Invalid Admin Cryptokey/Passcode.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 cyber-grid smooth-gpu relative ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      <div 
        className="cyber-backdrop-overlay"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.94), rgba(6, 10, 20, 0.96)), url('/bg_${bgTheme}.png')`
        }}
      ></div>
      
      {/* Visual background decor */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-8 text-center">
        {/* Main Logo Header */}
        <div className="space-y-2">
          <div className="inline-flex bg-gradient-to-tr from-cyan-500 to-indigo-600 p-3 rounded-2xl shadow-xl shadow-cyan-500/10 mb-2 border border-cyan-400/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
              <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent uppercase">
            REDDY ELECTRONICS
          </h1>
          <p className="text-[10px] tracking-widest text-slate-400 font-extrabold uppercase">
            Future Hardware uplink interface
          </p>
        </div>

        {/* Auth Gate Panel */}
        <div className="relative p-7 hud-panel border border-slate-800 shadow-2xl overflow-hidden rounded-2xl">
          {renderHudCorners()}

          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-slate-950/60 rounded-xl border border-slate-850">
            <button
              onClick={() => {
                setRole('customer');
                setErrorMsg(null);
              }}
              className={`py-2 px-3 text-xs font-bold transition-all rounded-lg ${
                role === 'customer'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              [ CLIENT PORTAL ]
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setErrorMsg(null);
              }}
              className={`py-2 px-3 text-xs font-bold transition-all rounded-lg ${
                role === 'admin'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              [ ADMIN CONSOLE ]
            </button>
          </div>

          {/* Backdrop Style Selector */}
          <div className="mb-6 p-3 bg-slate-950/40 rounded-xl border border-slate-850 flex items-center justify-between text-left">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Select Backdrop Style</span>
              <span className="text-[8px] text-cyan-400 font-extrabold uppercase tracking-wide">{bgTheme} active</span>
            </div>
            <div className="flex space-x-2">
              {[
                { code: 'cyan', color: 'bg-cyan-500' },
                { code: 'amber', color: 'bg-amber-500' },
                { code: 'red', color: 'bg-rose-600' },
                { code: 'green', color: 'bg-emerald-500' },
                { code: 'violet', color: 'bg-fuchsia-500' }
              ].map(item => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setBgTheme(item.code)}
                  className={`w-5 h-5 rounded-full ${item.color} border transition-all ${
                    bgTheme === item.code ? 'ring-2 ring-indigo-500 border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  title={item.code}
                />
              ))}
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4.5 p-3 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-450 text-[10px] font-bold text-left animate-fade-in flex items-center space-x-2">
              <span>⚠️</span>
              <span className="leading-tight">{errorMsg}</span>
            </div>
          )}

          {/* Customer Entry Form */}
          {role === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Client Username</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name..."
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold border bg-slate-950/80 focus:outline-none transition-all ${
                    isDarkMode ? 'border-slate-850 text-slate-200 focus:border-cyan-500/50' : 'border-slate-200 focus:border-cyan-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Uplink Mobile Number</label>
                <div className="flex border border-slate-850 rounded-xl overflow-hidden bg-slate-950/80">
                  <span className="px-3.5 py-2.5 border-r border-slate-850 text-xs font-bold text-slate-400 bg-slate-900/50 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="Enter 10-digit number..."
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2.5 text-xs font-semibold bg-transparent text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold py-3 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase mt-2 flex items-center justify-center space-x-2 border border-cyan-400/20"
              >
                <span>Initiate Customer Uplink</span>
                <span>⚡</span>
              </button>
            </form>
          )}

          {/* Admin Entry Form */}
          {role === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Console Operator SKU/Username</label>
                <input
                  type="text"
                  placeholder="Username (optional)..."
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold border bg-slate-950/80 focus:outline-none transition-all ${
                    isDarkMode ? 'border-slate-850 text-slate-200 focus:border-indigo-500/50' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Access Passcode Key (default: 1234)</label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin passcode..."
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold border bg-slate-950/80 focus:outline-none transition-all ${
                    isDarkMode ? 'border-slate-850 text-slate-200 focus:border-indigo-500/50' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-xl transition-all shadow-md text-xs tracking-wider uppercase mt-2 flex items-center justify-center space-x-2 border border-indigo-400/20"
              >
                <span>Initialize Admin Console</span>
                <span>🗝️</span>
              </button>
            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
          Reddy Electronics Corp. Security Port Protocol v4.0.1
        </div>
      </div>
    </div>
  );
}
