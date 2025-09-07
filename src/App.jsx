import React, { useState } from 'react';
import AppShell from './components/AppShell';
import Dashboard from './components/Dashboard';
import RightsExplorer from './components/RightsExplorer';
import Templates from './components/Templates';
import SavedItems from './components/SavedItems';
import AISearch from './components/AISearch';
import ScenarioGuide from './components/ScenarioGuide';
import { useSupabase } from './hooks/useSupabase';
import { useAuthFallback } from './hooks/useAuth';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedSearchResult, setSelectedSearchResult] = useState(null);
  
  // Use Supabase hook for data
  const { rightsModules, templates, loading, error } = useSupabase();
  
  // Use auth hook for user management
  const { 
    user, 
    isAuthenticated, 
    saveRightsModule, 
    saveTemplate, 
    removeSavedItem 
  } = useAuthFallback();

  const handleSaveRightsModule = (module) => {
    if (isAuthenticated) {
      saveRightsModule(module.id);
    }
  };

  const handleSaveTemplate = (template) => {
    if (isAuthenticated) {
      saveTemplate(template.id);
    }
  };

  const handleSearchResultSelect = (result) => {
    setSelectedSearchResult(result);
    if (result.type === 'rights') {
      setCurrentView('rights');
    } else {
      setCurrentView('templates');
    }
  };

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setCurrentView('scenario');
  };

  const handleGenerateTemplate = (templateType) => {
    setCurrentView('templates');
    // Could add logic to filter templates by type
  };

  const renderCurrentView = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-white/80">Loading legal resources...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-red-400">Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'rights':
        return (
          <RightsExplorer 
            onSave={handleSaveRightsModule} 
            savedRights={user?.savedRights || []}
            rightsModules={rightsModules}
            selectedResult={selectedSearchResult?.type === 'rights' ? selectedSearchResult : null}
            onClearSelection={() => setSelectedSearchResult(null)}
          />
        );
      case 'templates':
        return (
          <Templates 
            onSave={handleSaveTemplate} 
            savedTemplates={user?.savedTemplates || []}
            templates={templates}
            selectedResult={selectedSearchResult?.type === 'template' ? selectedSearchResult : null}
            onClearSelection={() => setSelectedSearchResult(null)}
          />
        );
      case 'saved':
        return (
          <SavedItems 
            savedRights={user?.savedRights || []} 
            savedTemplates={user?.savedTemplates || []}
            rightsModules={rightsModules}
            templates={templates}
            onRemove={removeSavedItem}
          />
        );
      case 'search':
        return (
          <AISearch
            onSelectResult={handleSearchResultSelect}
            rightsModules={rightsModules}
            templates={templates}
          />
        );
      case 'scenario':
        return (
          <ScenarioGuide
            scenario={selectedScenario}
            onClose={() => {
              setSelectedScenario(null);
              setCurrentView('dashboard');
            }}
            onGenerateTemplate={handleGenerateTemplate}
          />
        );
      default:
        return (
          <Dashboard 
            onNavigate={setCurrentView}
            onScenarioSelect={handleScenarioSelect}
            rightsModules={rightsModules}
            templates={templates}
          />
        );
    }
  };

  return (
    <AppShell 
      currentView={currentView} 
      onNavigate={setCurrentView}
      user={user}
      isAuthenticated={isAuthenticated}
    >
      {renderCurrentView()}
    </AppShell>
  );
}

export default App;
