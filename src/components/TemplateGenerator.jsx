import React, { useState } from 'react';
import { FileText, Download, Star, ArrowLeft } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import Modal from './Modal';
import { usePaymentContext } from '../hooks/usePaymentContext';

const TemplateGenerator = ({ onSave }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customContent, setCustomContent] = useState('');
  const [paid, setPaid] = useState(false);

  const { createSession } = usePaymentContext();

  const categories = [
    {
      id: 'tenant',
      title: 'Tenant Rights',
      description: 'Rent disputes, repair requests, security deposits',
      templates: [
        { id: 1, title: 'Rent Increase Dispute Letter', isPremium: true },
        { id: 2, title: 'Repair Request Notice', isPremium: false },
        { id: 3, title: 'Security Deposit Demand', isPremium: true },
      ]
    },
    {
      id: 'employment',
      title: 'Employment Issues',
      description: 'Workplace complaints, wage disputes, discrimination',
      templates: [
        { id: 4, title: 'Wage Complaint Letter', isPremium: true },
        { id: 5, title: 'Discrimination Report', isPremium: true },
        { id: 6, title: 'FMLA Request', isPremium: false },
      ]
    },
    {
      id: 'consumer',
      title: 'Consumer Protection',
      description: 'Refund requests, warranty claims, service complaints',
      templates: [
        { id: 7, title: 'Refund Demand Letter', isPremium: false },
        { id: 8, title: 'Warranty Claim Form', isPremium: true },
        { id: 9, title: 'Service Complaint', isPremium: false },
      ]
    }
  ];

  const sampleTemplates = {
    2: {
      title: 'Repair Request Notice',
      content: `Dear [Landlord Name],

I am writing to formally request repairs to my rental unit at [Property Address]. The following issues require immediate attention:

• [Issue 1 - e.g., Leaking faucet in kitchen]
• [Issue 2 - e.g., Broken window in bedroom]
• [Issue 3 - e.g., Non-functioning heating system]

These conditions affect the habitability of the unit and may violate local housing codes. Please arrange for qualified professionals to address these issues within [reasonable timeframe, typically 7-14 days].

I am available to provide access for repairs at the following times:
[Your availability]

Please confirm receipt of this notice and provide an estimated timeline for completion.

Thank you for your prompt attention to this matter.

Sincerely,
[Your Name]
[Date]
[Contact Information]`
    },
    6: {
      title: 'FMLA Request',
      content: `Dear [HR Manager/Supervisor Name],

I am writing to formally request Family and Medical Leave Act (FMLA) leave for [reason - medical condition/family care].

Details of my request:
• Start Date: [Date]
• Expected Return Date: [Date]
• Type of Leave: [Continuous/Intermittent]
• Medical Certification: [Attached/To be provided]

I understand that this leave may be unpaid and that I need to maintain my health insurance premiums during this period. Please provide me with the necessary FMLA paperwork and information about maintaining benefits.

I am committed to ensuring a smooth transition of my responsibilities and will work with my team to minimize any disruption.

Please confirm receipt of this request and let me know the next steps in the process.

Thank you for your understanding.

Sincerely,
[Your Name]
[Date]
[Employee ID]`
    },
    7: {
      title: 'Refund Demand Letter',
      content: `Dear [Company Name],

I am writing to request a full refund for [product/service] purchased on [date] for $[amount].

Order/Transaction Details:
• Order Number: [Number]
• Purchase Date: [Date]
• Amount Paid: $[Amount]
• Payment Method: [Credit card/check/etc.]

Reason for refund request:
[Detailed explanation of the problem - e.g., product defect, service not delivered as promised, etc.]

I have attempted to resolve this matter by [previous attempts - phone calls, emails, etc.] without success.

Under [relevant consumer protection law/company policy], I am entitled to a full refund. Please process this refund within [timeframe, typically 7-14 business days] to my original payment method.

If this matter is not resolved promptly, I will consider filing a complaint with [relevant authority - Better Business Bureau, state consumer protection agency, etc.].

Please confirm receipt of this letter and provide a timeline for the refund.

Sincerely,
[Your Name]
[Date]
[Contact Information]`
    }
  };

  const handleTemplateClick = (template) => {
    if (template.isPremium && !paid) {
      setSelectedTemplate(template);
      setShowPaymentModal(true);
    } else {
      setSelectedTemplate(template);
      setCustomContent(sampleTemplates[template.id]?.content || 'Template content will be loaded here...');
    }
  };

  const handlePayment = async () => {
    try {
      await createSession();
      setPaid(true);
      setShowPaymentModal(false);
      setCustomContent(sampleTemplates[selectedTemplate.id]?.content || 'Premium template content will be loaded here...');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([customContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (selectedTemplate && customContent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedTemplate(null);
              setCustomContent('');
            }}
            className="flex items-center space-x-2 border-blue-300 text-blue-100 hover:bg-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Templates</span>
          </Button>
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={() => onSave(selectedTemplate)}
              className="flex items-center space-x-2"
            >
              <Star className="w-4 h-4" />
              <span>Save</span>
            </Button>
            <Button
              variant="secondary"
              onClick={handleDownload}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>

        <Card>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.title}</h2>
            <div className="border rounded-lg">
              <textarea
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                className="w-full h-96 p-4 border-none rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Customize your template here..."
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>💡 <strong>Tip:</strong> Fill in the bracketed placeholders with your specific information.</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedCategory(null)}
            className="flex items-center space-x-2 border-blue-300 text-blue-100 hover:bg-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{category.title}</h2>
          <p className="text-blue-100">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.templates.map((template) => (
            <Card
              key={template.id}
              variant="interactive"
              onClick={() => handleTemplateClick(template)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
                {template.isPremium && <Star className="w-5 h-5 text-yellow-500" />}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
              <p className="text-sm text-gray-600">
                {template.isPremium ? 'Premium template with detailed guidance' : 'Free template available now'}
              </p>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Legal Templates</h2>
        <p className="text-xl text-blue-100">Ready-to-use templates for common legal situations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            variant="interactive"
            onClick={() => setSelectedCategory(category.id)}
            className="cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.templates.length} templates</p>
              </div>
            </div>
            <p className="text-gray-700">{category.description}</p>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Premium Template Access"
      >
        <div className="space-y-4">
          <div className="text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unlock Premium Template</h3>
            <p className="text-gray-600 mb-4">
              Get access to {selectedTemplate?.title} with detailed guidance
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
    </div>
  );
};

export default TemplateGenerator;