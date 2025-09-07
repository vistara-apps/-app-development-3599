import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { BookOpen, FileText, Trash2, Eye, Copy } from 'lucide-react';

const SavedItems = ({ savedRights, savedTemplates }) => {
  const [activeTab, setActiveTab] = useState('rights');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCopyTemplate = (template) => {
    navigator.clipboard.writeText(template.body);
    alert('Template copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Saved Items</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Quick access to your saved rights modules and templates
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('rights')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'rights'
              ? 'bg-white text-primary shadow-card'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Rights Modules ({savedRights.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'templates'
              ? 'bg-white text-primary shadow-card'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Templates ({savedTemplates.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'rights' && (
        <div className="space-y-4">
          {savedRights.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No saved rights modules</h3>
              <p className="text-white/80">Start exploring rights to save modules for quick access</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedRights.map(module => (
                <Card key={module.id} variant="interactive">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{module.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {module.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItem(module)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-4">
          {savedTemplates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No saved templates</h3>
              <p className="text-white/80">Purchase templates to access them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTemplates.map(template => (
                <Card key={template.id} variant="interactive">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-gray-900">{template.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {template.category}
                      </span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyTemplate(template)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedItem(template)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
        >
          <div className="space-y-4">
            {selectedItem.detailedContent ? (
              /* Rights Module */
              <div className="prose prose-sm max-w-none">
                {selectedItem.detailedContent.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h4 key={index} className="font-semibold text-gray-900 mt-4 mb-2">
                        {paragraph.slice(2, -2)}
                      </h4>
                    );
                  }
                  if (paragraph.trim() === '') return null;
                  return (
                    <p key={index} className="text-gray-700 mb-2">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              /* Template */
              <div className="space-y-4">
                <p className="text-gray-700">{selectedItem.description}</p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Template Content:</h4>
                  <div className="bg-white p-3 border rounded text-sm font-mono whitespace-pre-wrap overflow-auto max-h-64">
                    {selectedItem.body}
                  </div>
                </div>
                
                {selectedItem.usageInstructions && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Usage Instructions:</h4>
                    <div className="text-sm text-blue-800 whitespace-pre-line">
                      {selectedItem.usageInstructions}
                    </div>
                  </div>
                )}
                
                <Button
                  variant="primary"
                  onClick={() => handleCopyTemplate(selectedItem)}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Template to Clipboard
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SavedItems;