import React from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { BookOpen, FileText, Search, TrendingUp, Users, Shield } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const quickActions = [
    {
      icon: Search,
      title: 'Search Rights',
      description: 'Find specific rights information',
      action: () => onNavigate('rights'),
      color: 'bg-blue-500'
    },
    {
      icon: FileText,
      title: 'Browse Templates',
      description: 'Access dispute resolution templates',
      action: () => onNavigate('templates'),
      color: 'bg-green-500'
    }
  ];

  const featuredModules = [
    {
      title: 'Tenant Rights',
      description: 'Know your rights as a renter',
      tags: ['Housing', 'Legal'],
      popular: true
    },
    {
      title: 'Workplace Issues',
      description: 'Employment rights and protections',
      tags: ['Employment', 'Labor'],
      popular: true
    },
    {
      title: 'Consumer Protection',
      description: 'Rights when purchasing goods/services',
      tags: ['Consumer', 'Shopping'],
      popular: false
    }
  ];

  const stats = [
    { label: 'Rights Modules', value: '250+', icon: BookOpen },
    { label: 'Templates', value: '50+', icon: FileText },
    { label: 'Users Helped', value: '10K+', icon: Users },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Welcome to Legalo
        </h2>
        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
          Navigate your legal rights with confidence. Access expert guidance and templates for everyday situations.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card key={index} variant="interactive" onClick={action.action}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="text-center space-y-2">
                <Icon className="w-6 h-6 text-primary mx-auto" />
                <div className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Featured Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Popular Rights Modules</h3>
          <Button variant="outline" size="sm" onClick={() => onNavigate('rights')}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredModules.map((module, index) => (
            <Card key={index} variant="interactive">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900">{module.title}</h4>
                  {module.popular && (
                    <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{module.description}</p>
                <div className="flex flex-wrap gap-1">
                  {module.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;