import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Accordion from './ui/Accordion';
import { CheckCircle, Circle, AlertTriangle, FileText, Phone, Calendar } from 'lucide-react';

const ScenarioGuide = ({ scenario, onClose, onGenerateTemplate }) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [currentPhase, setCurrentPhase] = useState(0);

  const toggleStep = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const scenarios = {
    'tenant-dispute': {
      title: 'Tenant Dispute Resolution',
      description: 'Step-by-step guide for resolving issues with your landlord',
      phases: [
        {
          title: 'Document the Issue',
          description: 'Gather evidence and document the problem',
          steps: [
            {
              id: 'photo-evidence',
              title: 'Take photos/videos of the issue',
              description: 'Document the problem with clear, dated photos or videos',
              priority: 'high',
              timeframe: 'Immediately'
            },
            {
              id: 'written-record',
              title: 'Create written record',
              description: 'Write down dates, times, and details of the issue',
              priority: 'high',
              timeframe: 'Within 24 hours'
            },
            {
              id: 'lease-review',
              title: 'Review your lease agreement',
              description: 'Check lease terms related to your issue',
              priority: 'medium',
              timeframe: 'Within 2 days'
            }
          ]
        },
        {
          title: 'Initial Communication',
          description: 'Contact your landlord about the issue',
          steps: [
            {
              id: 'verbal-contact',
              title: 'Contact landlord verbally',
              description: 'Call or speak to landlord about the issue first',
              priority: 'high',
              timeframe: 'Within 3 days'
            },
            {
              id: 'follow-up-email',
              title: 'Send follow-up email',
              description: 'Confirm verbal discussion in writing via email',
              priority: 'high',
              timeframe: 'Same day as verbal contact'
            },
            {
              id: 'reasonable-timeline',
              title: 'Set reasonable timeline',
              description: 'Give landlord reasonable time to respond (7-14 days)',
              priority: 'medium',
              timeframe: 'In initial communication'
            }
          ]
        },
        {
          title: 'Formal Notice',
          description: 'Send formal written notice if initial contact fails',
          steps: [
            {
              id: 'formal-letter',
              title: 'Send formal complaint letter',
              description: 'Use certified mail for formal written notice',
              priority: 'high',
              timeframe: 'After initial timeline expires'
            },
            {
              id: 'legal-references',
              title: 'Include legal references',
              description: 'Reference relevant tenant rights and local laws',
              priority: 'medium',
              timeframe: 'In formal letter'
            },
            {
              id: 'final-timeline',
              title: 'Set final timeline',
              description: 'Give final deadline for resolution (14-30 days)',
              priority: 'high',
              timeframe: 'In formal letter'
            }
          ]
        },
        {
          title: 'Escalation Options',
          description: 'Next steps if landlord doesn\'t respond',
          steps: [
            {
              id: 'local-authority',
              title: 'Contact local housing authority',
              description: 'File complaint with city/county housing department',
              priority: 'high',
              timeframe: 'After formal notice timeline'
            },
            {
              id: 'tenant-union',
              title: 'Contact tenant rights organization',
              description: 'Seek help from local tenant advocacy groups',
              priority: 'medium',
              timeframe: 'Anytime during process'
            },
            {
              id: 'legal-consultation',
              title: 'Consider legal consultation',
              description: 'Consult with tenant rights attorney if needed',
              priority: 'medium',
              timeframe: 'For serious issues'
            }
          ]
        }
      ],
      resources: [
        {
          title: 'Tenant Complaint Letter Template',
          description: 'Professional template for formal landlord communication',
          action: () => onGenerateTemplate('tenant-complaint')
        },
        {
          title: 'Local Housing Authority Contacts',
          description: 'Find your local housing authority contact information',
          action: () => window.open('https://www.hud.gov/states', '_blank')
        }
      ]
    },
    'workplace-issue': {
      title: 'Workplace Issue Resolution',
      description: 'Navigate workplace problems professionally and legally',
      phases: [
        {
          title: 'Assess the Situation',
          description: 'Understand the nature and severity of the issue',
          steps: [
            {
              id: 'document-incident',
              title: 'Document the incident',
              description: 'Record dates, times, witnesses, and specific details',
              priority: 'high',
              timeframe: 'Immediately'
            },
            {
              id: 'review-policies',
              title: 'Review company policies',
              description: 'Check employee handbook for relevant policies',
              priority: 'high',
              timeframe: 'Within 24 hours'
            },
            {
              id: 'assess-severity',
              title: 'Assess issue severity',
              description: 'Determine if issue is safety, legal, or policy-related',
              priority: 'medium',
              timeframe: 'Within 2 days'
            }
          ]
        },
        {
          title: 'Internal Resolution',
          description: 'Try to resolve through company channels first',
          steps: [
            {
              id: 'direct-supervisor',
              title: 'Speak with direct supervisor',
              description: 'Discuss issue with immediate manager first',
              priority: 'high',
              timeframe: 'Within 3 days'
            },
            {
              id: 'hr-consultation',
              title: 'Consult with HR',
              description: 'Contact HR if supervisor is involved or unhelpful',
              priority: 'high',
              timeframe: 'If supervisor route fails'
            },
            {
              id: 'formal-complaint',
              title: 'File formal internal complaint',
              description: 'Use company\'s formal complaint process',
              priority: 'medium',
              timeframe: 'If informal resolution fails'
            }
          ]
        },
        {
          title: 'External Resources',
          description: 'Seek outside help if internal resolution fails',
          steps: [
            {
              id: 'eeoc-complaint',
              title: 'File EEOC complaint (if applicable)',
              description: 'For discrimination or harassment issues',
              priority: 'high',
              timeframe: 'Within 180-300 days of incident'
            },
            {
              id: 'labor-board',
              title: 'Contact labor board',
              description: 'For wage, hour, or safety violations',
              priority: 'high',
              timeframe: 'As soon as possible'
            },
            {
              id: 'legal-counsel',
              title: 'Consult employment attorney',
              description: 'For serious violations or retaliation',
              priority: 'medium',
              timeframe: 'If other remedies fail'
            }
          ]
        }
      ],
      resources: [
        {
          title: 'Workplace Complaint Letter Template',
          description: 'Professional template for documenting workplace issues',
          action: () => onGenerateTemplate('workplace-complaint')
        },
        {
          title: 'EEOC Filing Information',
          description: 'Learn how to file an EEOC complaint',
          action: () => window.open('https://www.eeoc.gov/filing-charge-discrimination', '_blank')
        }
      ]
    }
  };

  const currentScenario = scenarios[scenario] || scenarios['tenant-dispute'];
  const currentPhaseData = currentScenario.phases[currentPhase];
  const completedInPhase = currentPhaseData.steps.filter(step => completedSteps.has(step.id)).length;
  const totalInPhase = currentPhaseData.steps.length;
  const phaseProgress = (completedInPhase / totalInPhase) * 100;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Calendar;
      case 'low': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">{currentScenario.title}</h2>
        <p className="text-white/80">{currentScenario.description}</p>
      </div>

      {/* Phase Navigation */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Progress Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentScenario.phases.map((phase, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhase(index)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  index === currentPhase
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Phase {index + 1}: {phase.title}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Current Phase */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Phase {currentPhase + 1}: {currentPhaseData.title}
              </h3>
              <p className="text-gray-600 mt-1">{currentPhaseData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{completedInPhase}/{totalInPhase}</div>
              <div className="text-sm text-gray-500">completed</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {currentPhaseData.steps.map((step) => {
              const isCompleted = completedSteps.has(step.id);
              const PriorityIcon = getPriorityIcon(step.priority);
              
              return (
                <div
                  key={step.id}
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                          {step.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(step.priority)}`}>
                            <PriorityIcon className="w-3 h-3 mr-1" />
                            {step.priority}
                          </span>
                          <span className="text-xs text-gray-500">{step.timeframe}</span>
                        </div>
                      </div>
                      <p className={`text-sm ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Phase Navigation */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
              disabled={currentPhase === 0}
            >
              Previous Phase
            </Button>
            <Button
              onClick={() => setCurrentPhase(Math.min(currentScenario.phases.length - 1, currentPhase + 1))}
              disabled={currentPhase === currentScenario.phases.length - 1}
            >
              Next Phase
            </Button>
          </div>
        </div>
      </Card>

      {/* Resources */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Helpful Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentScenario.resources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{resource.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resource.action}
                  >
                    Access
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Close Button */}
      <div className="text-center">
        <Button variant="outline" onClick={onClose}>
          Close Guide
        </Button>
      </div>
    </div>
  );
};

export default ScenarioGuide;
