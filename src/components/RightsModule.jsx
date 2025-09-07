import React from 'react';
import { ArrowLeft, Star, BookOpen, CheckCircle } from 'lucide-react';
import Button from './Button';
import Card from './Card';

const RightsModule = ({ module, onBack, onSave }) => {
  const keyPoints = [
    "Understanding your basic protections under law",
    "When and how to document violations",
    "Available remedies and next steps",
    "Common mistakes to avoid",
    "Resources for additional help"
  ];

  const actionSteps = [
    { step: 1, title: "Document Everything", description: "Keep detailed records of dates, communications, and incidents" },
    { step: 2, title: "Know the Timeline", description: "Understand any deadlines for filing complaints or taking action" },
    { step: 3, title: "Gather Evidence", description: "Collect relevant documents, photos, or witness statements" },
    { step: 4, title: "Seek Resolution", description: "Attempt good faith negotiation before formal action" },
    { step: 5, title: "Get Professional Help", description: "Contact legal aid or an attorney for complex situations" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2 border-blue-300 text-blue-100 hover:bg-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Button
          variant="primary"
          onClick={() => onSave(module)}
          className="flex items-center space-x-2"
        >
          <Star className="w-4 h-4" />
          <span>Save</span>
        </Button>
      </div>

      <Card>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{module.title}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {module.category}
              </span>
              <BookOpen className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">5 min read</span>
            </div>
            <p className="text-lg text-gray-700">{module.summary}</p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Points to Know</h2>
            <div className="space-y-3">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Action Steps</h2>
            <div className="space-y-4">
              {actionSteps.map((action) => (
                <div key={action.step} className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {action.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-800 font-bold text-sm">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This information is for educational purposes only and does not constitute legal advice. 
                  For specific legal situations, please consult with a qualified attorney.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RightsModule;