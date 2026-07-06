import { useState, useEffect } from 'react';
import Storefront from './components/Storefront';
import AdminDashboard from './components/AdminDashboard';
import PortalGate from './components/PortalGate';
import { useCart } from './hooks/useCart';

export default function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'store' | 'admin'>('portal');
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userRole, setUserRole] = useState<'customer' | 'admin' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bgTheme, setBgTheme] = useState<string>(() => localStorage.getItem("reddy_bg_theme") || "cyan");
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const cart = useCart();

  // Handle class list toggles on document root for full Tailwind dark mode compatibility
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync background selection to localStorage
  useEffect(() => {
    localStorage.setItem("reddy_bg_theme", bgTheme);
  }, [bgTheme]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogin = (role: 'store' | 'admin', name: string) => {
    setLoggedInUser(name);
    setUserRole(role === 'store' ? 'customer' : 'admin');
    setActiveTab(role);
  };

  const handleLogout = () => {
    setActiveTab('portal');
    setLoggedInUser("");
    setUserRole(null);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {activeTab === 'portal' && (
        <PortalGate
          isDarkMode={isDarkMode}
          onLogin={handleLogin}
          bgTheme={bgTheme}
          setBgTheme={setBgTheme}
        />
      )}
      
      {activeTab === 'store' && (
        <Storefront
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onNavigateToAdmin={() => setActiveTab('admin')}
          onLogout={handleLogout}
          loggedInUser={loggedInUser}
          userRole={userRole}
          bgTheme={bgTheme}
          setBgTheme={setBgTheme}
          cart={cart}
          currency={currency}
          setCurrency={setCurrency}
        />
      )}
      
      {activeTab === 'admin' && (
        <AdminDashboard
          isDarkMode={isDarkMode}
          onNavigateToStore={() => setActiveTab('store')}
          onLogout={handleLogout}
          loggedInUser={loggedInUser}
          bgTheme={bgTheme}
          setBgTheme={setBgTheme}
          currency={currency}
        />
      )}
    </div>
  );
}
