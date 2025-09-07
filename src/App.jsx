import React, { useState } from 'react';
import AppShell from './components/AppShell';
import Dashboard from './components/Dashboard';
import RightsExplorer from './components/RightsExplorer';
import Templates from './components/Templates';
import SavedItems from './components/SavedItems';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [savedRights, setSavedRights] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);

  const saveRightsModule = (module) => {
    setSavedRights(prev => {
      if (prev.find(item => item.id === module.id)) {
        return prev;
      }
      return [...prev, module];
    });
  };

  const saveTemplate = (template) => {
    setSavedTemplates(prev => {
      if (prev.find(item => item.id === template.id)) {
        return prev;
      }
      return [...prev, template];
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'rights':
        return <RightsExplorer onSave={saveRightsModule} savedRights={savedRights} />;
      case 'templates':
        return <Templates onSave={saveTemplate} savedTemplates={savedTemplates} />;
      case 'saved':
        return <SavedItems savedRights={savedRights} savedTemplates={savedTemplates} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <AppShell currentView={currentView} onNavigate={setCurrentView}>
      {renderCurrentView()}
    </AppShell>
  );
}

export default App;