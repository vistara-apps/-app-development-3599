import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import SearchInput from './ui/SearchInput';
import { useOpenAI } from '../hooks/useOpenAI';
import { Search, Sparkles, BookOpen, FileText, AlertCircle, Loader } from 'lucide-react';

const AISearch = ({ onSelectResult, rightsModules, templates }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { generateContent, loading: aiLoading } = useOpenAI();

  const searchSuggestions = [
    "My landlord won't fix the heating",
    "Workplace harassment by supervisor",
    "Denied overtime pay at work",
    "Security deposit not returned",
    "Discrimination in hiring process",
    "Unsafe working conditions",
    "Eviction notice received",
    "Consumer fraud complaint"
  ];

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setResults([]);
    setAiSuggestion('');

    try {
      // Search through existing rights modules and templates
      const moduleResults = rightsModules.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        module.detailed_content?.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(module => ({
        ...module,
        type: 'rights',
        relevanceScore: calculateRelevance(module, searchQuery)
      }));

      const templateResults = templates.filter(template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.body?.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(template => ({
        ...template,
        type: 'template',
        relevanceScore: calculateRelevance(template, searchQuery)
      }));

      const combinedResults = [...moduleResults, ...templateResults]
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 6);

      setResults(combinedResults);

      // Generate AI suggestion if we have API access
      if (generateContent) {
        try {
          const aiPrompt = `A user is searching for legal rights information with the query: "${searchQuery}". 
          
          Based on this query, provide:
          1. A brief explanation of the legal area this relates to
          2. Key rights the user should know about
          3. Immediate steps they should consider taking
          4. Important disclaimers about seeking professional legal advice
          
          Keep the response concise (under 200 words) and educational. Always include a disclaimer that this is not legal advice.`;

          const suggestion = await generateContent(aiPrompt);
          setAiSuggestion(suggestion);
        } catch (error) {
          console.error('AI suggestion failed:', error);
        }
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const calculateRelevance = (item, query) => {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Title match (highest weight)
    if (item.title?.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Summary/description match
    if (item.summary?.toLowerCase().includes(queryLower)) {
      score += 5;
    }

    // Tags match
    if (item.tags?.some(tag => tag.toLowerCase().includes(queryLower))) {
      score += 7;
    }

    // Category match
    if (item.category?.toLowerCase().includes(queryLower)) {
      score += 6;
    }

    // Content match (lower weight due to potential noise)
    if (item.detailed_content?.toLowerCase().includes(queryLower) || 
        item.body?.toLowerCase().includes(queryLower)) {
      score += 2;
    }

    return score;
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const getResultIcon = (type) => {
    return type === 'rights' ? BookOpen : FileText;
  };

  const getResultColor = (type) => {
    return type === 'rights' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-8 h-8 text-accent" />
          <h2 className="text-2xl font-bold text-white">AI-Powered Legal Search</h2>
        </div>
        <p className="text-white/80">
          Describe your situation in natural language and get personalized legal guidance
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Describe your legal situation... (e.g., 'My landlord won't return my security deposit')"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button
              onClick={() => handleSearch()}
              disabled={!query.trim() || isSearching}
              className="flex items-center space-x-2"
            >
              {isSearching ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Search</span>
            </Button>
          </div>

          {/* Search Suggestions */}
          {!query && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Try these common searches:</h4>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* AI Suggestion */}
      {aiSuggestion && (
        <Card>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-gray-900">AI Legal Guidance</h3>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <div className="prose prose-sm max-w-none text-gray-700">
                {aiSuggestion.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                This is educational information only and not legal advice. Consult with a qualified attorney for specific legal matters.
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Results ({results.length} found)
            </h3>
            <div className="space-y-3">
              {results.map((result, index) => {
                const Icon = getResultIcon(result.type);
                const colorClass = getResultColor(result.type);
                
                return (
                  <div
                    key={`${result.type}-${result.id}`}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onSelectResult(result)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{result.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
                              {result.type === 'rights' ? 'Rights Guide' : 'Template'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {Math.round(result.relevanceScore * 10)}% match
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {result.summary || result.usage_instructions || 'Click to view details'}
                        </p>
                        {result.tags && (
                          <div className="flex flex-wrap gap-1">
                            {result.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* No Results */}
      {query && !isSearching && results.length === 0 && (
        <Card>
          <div className="text-center py-8 space-y-4">
            <Search className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">No results found</h3>
              <p className="text-gray-600 mt-1">
                Try rephrasing your search or using different keywords
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setQuery('');
                setResults([]);
                setAiSuggestion('');
              }}
            >
              Clear Search
            </Button>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {isSearching && (
        <Card>
          <div className="text-center py-8 space-y-4">
            <Loader className="w-8 h-8 text-primary animate-spin mx-auto" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Searching...</h3>
              <p className="text-gray-600 mt-1">
                Finding relevant legal information and generating AI guidance
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AISearch;
