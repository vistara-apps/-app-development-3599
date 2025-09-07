import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Scale, Home, FileText, Star } from 'lucide-react';

const AppShell = ({ children, currentView, onNavigate, savedCount }) => {
  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'saved', label: `Saved (${savedCount})`, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <header className="glass-card border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Legalo</h1>
                <p className="text-sm text-blue-200">Rights Navigator</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <nav className="glass-card border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    currentView === item.id
                      ? 'border-blue-400 text-blue-100'
                      : 'border-transparent text-blue-200 hover:text-blue-100 hover:border-blue-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="glass-card border-t border-white/20 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-blue-200">
            <p className="text-sm">© 2024 Legalo. Empowering rights awareness.</p>
            <p className="text-xs mt-1">Not legal advice. Consult professionals for specific situations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;