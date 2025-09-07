import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Home, BookOpen, FileText, Bookmark, Search, Settings, Sparkles, User } from 'lucide-react';

const AppShell = ({ children, currentView, onNavigate, user, isAuthenticated }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'search', label: 'AI Search', icon: Sparkles },
    { id: 'rights', label: 'Rights', icon: BookOpen },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'saved', label: 'Saved', icon: Bookmark, requiresAuth: true },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4 sm:py-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-primary">L</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-white">Legalo</h1>
              <p className="text-xs sm:text-sm text-white/80">Your Pocket Rights Navigator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => onNavigate('search')}
              className={`p-2 transition-colors ${
                currentView === 'search' 
                  ? 'text-white bg-white/20' 
                  : 'text-white/80 hover:text-white'
              }`}
              title="AI Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 text-white/80">
                <User className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">
                  {user.farcasterData?.displayName || 
                   `${user.walletAddress?.slice(0, 6)}...${user.walletAddress?.slice(-4)}`}
                </span>
              </div>
            )}
            
            <div className="scale-75 sm:scale-100">
              <ConnectButton />
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 mb-6 sm:mb-8 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isDisabled = item.requiresAuth && !isAuthenticated;
            
            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && onNavigate(item.id)}
                disabled={isDisabled}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isDisabled
                    ? 'text-white/40 cursor-not-allowed'
                    : currentView === item.id
                    ? 'bg-white text-primary shadow-card'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title={isDisabled ? 'Connect wallet to access' : item.label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
                {isDisabled && (
                  <span className="text-xs bg-white/20 px-1 rounded">🔒</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Main Content */}
        <main className="pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
