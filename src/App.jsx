import React, { useState } from 'react';
import { Search, BookOpen, FileText, Star, Scale, Shield, Home } from 'lucide-react';
import AppShell from './components/AppShell';
import SearchInput from './components/SearchInput';
import Card from './components/Card';
import Button from './components/Button';
import Modal from './components/Modal';
import RightsModule from './components/RightsModule';
import TemplateGenerator from './components/TemplateGenerator';
import { useSupabase } from './hooks/useSupabase';
import { usePaymentContext } from './hooks/usePaymentContext';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  
  const { rightsModules, templates, loading } = useSupabase();
  const { createSession } = usePaymentContext();

  const featuredRights = [
    {
      id: 1,
      title: "Tenant Rights",
      summary: "Know your rights as a renter, including deposit protection, repair obligations, and eviction procedures.",
      category: "Housing",
      isPremium: false,
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Workplace Rights",
      summary: "Understanding employment law, discrimination protection, and wage & hour regulations.",
      category: "Employment",
      isPremium: false,
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Consumer Protection",
      summary: "Your rights when purchasing goods and services, including warranties and refunds.",
      category: "Consumer",
      isPremium: true,
      icon: <Scale className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Privacy Rights",
      summary: "Digital privacy, data protection, and your rights in the information age.",
      category: "Privacy",
      isPremium: true,
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const handleModuleClick = (module) => {
    if (module.isPremium) {
      setSelectedModule(module);
      setShowPaymentModal(true);
    } else {
      setSelectedModule(module);
      setCurrentView('module');
    }
  };

  const handlePayment = async () => {
    try {
      await createSession();
      setShowPaymentModal(false);
      setCurrentView('module');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleSaveItem = (item) => {
    if (!savedItems.find(saved => saved.id === item.id)) {
      setSavedItems([...savedItems, item]);
    }
  };

  const filteredModules = featuredRights.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 gradient-text">Legalo</h1>
        <p className="text-xl text-blue-100 mb-6">Your Pocket Rights Navigator</p>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for rights information..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          variant="interactive"
          className="col-span-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Quick Rights Check</h3>
              <p className="text-blue-100">Get instant guidance for your situation</p>
            </div>
          </div>
        </Card>

        {filteredModules.map((module) => (
          <Card
            key={module.id}
            variant="interactive"
            onClick={() => handleModuleClick(module)}
            className="cursor-pointer transform hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="text-blue-600">{module.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  {module.isPremium && (
                    <Star className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{module.summary}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {module.category}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            onClick={() => setCurrentView('templates')}
            className="flex items-center space-x-2 py-4"
          >
            <FileText className="w-5 h-5" />
            <span>Browse Templates</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentView('saved')}
            className="flex items-center space-x-2 py-4 border-blue-300 text-blue-100 hover:bg-blue-800"
          >
            <Star className="w-5 h-5" />
            <span>Saved Items ({savedItems.length})</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <TemplateGenerator onSave={handleSaveItem} />
  );

  const renderSaved = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Saved Items</h2>
        <Button variant="outline" onClick={() => setCurrentView('home')}>
          Back to Home
        </Button>
      </div>
      
      {savedItems.length === 0 ? (
        <Card className="text-center py-12">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved items yet</h3>
          <p className="text-gray-600">Save rights modules and templates for quick access</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedItems.map((item) => (
            <Card key={item.id} variant="interactive">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.summary}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <AppShell
      currentView={currentView}
      onNavigate={setCurrentView}
      savedCount={savedItems.length}
    >
      {currentView === 'home' && renderHome()}
      {currentView === 'templates' && renderTemplates()}
      {currentView === 'saved' && renderSaved()}
      {currentView === 'module' && selectedModule && (
        <RightsModule
          module={selectedModule}
          onBack={() => setCurrentView('home')}
          onSave={handleSaveItem}
        />
      )}

      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Premium Content Access"
      >
        <div className="space-y-4">
          <div className="text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unlock Premium Rights Guide</h3>
            <p className="text-gray-600 mb-4">
              Get detailed guidance and templates for {selectedModule?.title}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-2xl font-bold text-blue-600">$0.001 USDC</p>
              <p className="text-sm text-gray-600">One-time access</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePayment}
              className="flex-1"
            >
              Pay & Access
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}

export default App;