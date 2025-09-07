import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { FileText, DollarSign, Lock, CheckCircle, Download } from 'lucide-react';

const Templates = ({ onSave, savedTemplates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [paidTemplates, setPaidTemplates] = useState(new Set());
  const { createSession } = usePaymentContext();

  const templates = [
    {
      id: 1,
      title: 'Tenant Complaint Letter',
      category: 'Housing',
      price: 0.001,
      description: 'Professional template for addressing maintenance issues, lease violations, or other tenant concerns with your landlord.',
      preview: 'This template helps you formally communicate repair requests, document problems, and establish a paper trail for tenant issues.',
      body: `[Date]

[Landlord Name]
[Landlord Address]

Dear [Landlord Name],

I am writing to formally request attention to the following issue(s) in my rental unit at [Property Address], Unit [Unit Number]:

[Describe the problem in detail, including when it started, how it affects your living situation, and any previous verbal requests made]

As my landlord, you have a legal obligation to maintain the property in habitable condition. This issue affects my ability to safely and comfortably occupy the premises.

I respectfully request that you address this matter within [reasonable timeframe, typically 14-30 days]. If the issue is not resolved within this timeframe, I may need to explore other legal remedies available to me under tenant protection laws.

Please contact me at [your phone number] or [your email] to schedule any necessary inspections or repairs.

Thank you for your prompt attention to this matter.

Sincerely,
[Your Name]
[Your Signature]
[Date]

---

TENANT COPY - KEEP FOR YOUR RECORDS`,
      usageInstructions: '1. Fill in all bracketed information with your specific details\n2. Be specific about the problem and how it affects you\n3. Keep copies of all correspondence\n4. Send via certified mail for important issues\n5. Follow up if no response within stated timeframe'
    },
    {
      id: 2,
      title: 'Workplace Discrimination Complaint',
      category: 'Employment',
      price: 0.002,
      description: 'Formal template for reporting discrimination or harassment to HR or management, ensuring your concerns are properly documented.',
      preview: 'Document workplace discrimination incidents professionally while protecting your rights and establishing a clear record.',
      body: `[Date]

[HR Manager/Supervisor Name]
[Company Name]
[Company Address]

Re: Formal Complaint of Discrimination/Harassment

Dear [HR Manager/Supervisor Name],

I am writing to file a formal complaint regarding discrimination/harassment that I have experienced in my workplace.

INCIDENT DETAILS:
Date(s) of Incident(s): [Specific dates]
Location: [Where incidents occurred]
Individuals Involved: [Names and positions of people involved]

DESCRIPTION OF INCIDENTS:
[Provide detailed, factual description of what happened, including specific words or actions, and how they relate to your protected class (race, gender, age, disability, etc.)]

IMPACT:
This behavior has created a hostile work environment and has affected my ability to perform my job duties effectively. [Describe specific impacts on your work, emotional state, etc.]

WITNESSES:
The following individuals witnessed these incidents: [List names and contact information if available]

PREVIOUS ACTIONS:
[Describe any previous informal attempts to address the issue, including dates and outcomes]

REQUESTED RESOLUTION:
I request that the company investigate this matter promptly and take appropriate corrective action to ensure this behavior stops and does not recur.

I am available to meet and discuss this matter further. Please contact me at [phone] or [email] to schedule a meeting.

I trust that you will handle this matter with the seriousness it deserves and in accordance with company policy and applicable laws.

Sincerely,
[Your Name]
[Your Position]
[Date]

---

EMPLOYEE COPY - KEEP FOR YOUR RECORDS`,
      usageInstructions: '1. Document specific incidents with dates, times, and witnesses\n2. Focus on behavior, not personality\n3. Keep detailed records of all communications\n4. Follow your company\'s complaint procedures\n5. Consider filing with EEOC if internal resolution fails'
    },
    {
      id: 3,
      title: 'Consumer Refund Demand Letter',
      category: 'Consumer',
      price: 0.001,
      description: 'Professional letter template for demanding refunds for defective products, unsatisfactory services, or misleading sales practices.',
      preview: 'Escalate consumer disputes professionally while citing relevant consumer protection laws and establishing clear expectations.',
      body: `[Date]

[Business Name]
[Business Address]

Re: Demand for Refund - [Product/Service] - [Order/Account Number]

Dear [Manager/Customer Service],

I am writing to formally demand a full refund for [product/service] purchased on [date] for $[amount].

PURCHASE DETAILS:
Product/Service: [Description]
Date of Purchase: [Date]
Amount Paid: $[Amount]
Method of Payment: [Credit card, cash, etc.]
Order/Receipt Number: [Number]

REASON FOR REFUND REQUEST:
[Clearly state the problem: defective product, misrepresentation, failure to deliver as promised, etc. Be specific about how the product/service failed to meet expectations or advertisements]

ATTEMPTS TO RESOLVE:
[Describe previous attempts to resolve the issue, including dates of contact, who you spoke with, and their responses]

LEGAL BASIS:
Under [state] consumer protection laws and/or the terms of your return policy, I am entitled to a full refund for this [defective/misrepresented] [product/service].

DEMAND:
I demand a full refund of $[amount] within 10 business days of receipt of this letter. If you fail to provide this refund, I will be forced to pursue other remedies including:
- Filing a complaint with the Better Business Bureau
- Filing a complaint with [state] consumer protection agency
- Disputing the charge with my credit card company
- Pursuing legal action in small claims court

Please process my refund immediately and confirm in writing when the refund has been issued.

Sincerely,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email]

---

CONSUMER COPY - KEEP FOR YOUR RECORDS`,
      usageInstructions: '1. Attach copies of receipts and previous correspondence\n2. Send via certified mail with return receipt\n3. Keep detailed records of all communications\n4. Follow through on stated consequences if no response\n5. Consider credit card chargeback as alternative'
    }
  ];

  const handlePurchaseTemplate = async (template) => {
    try {
      await createSession();
      setPaidTemplates(prev => new Set([...prev, template.id]));
      onSave(template);
      alert('Template purchased successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const isTemplatePaid = (templateId) => {
    return paidTemplates.has(templateId);
  };

  const isTemplateSaved = (templateId) => {
    return savedTemplates.some(item => item.id === templateId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Dispute Resolution Templates</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Professional templates for common legal disputes and communications
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {templates.map(template => (
          <Card key={template.id} variant="interactive" onClick={() => setSelectedTemplate(template)}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">{template.title}</h3>
                </div>
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  <DollarSign className="w-3 h-3" />
                  <span>${template.price}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">{template.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {template.category}
                </span>
                {isTemplatePaid(template.id) ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <Modal
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          title={selectedTemplate.title}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {selectedTemplate.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-green-600">
                  ${selectedTemplate.price}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700">{selectedTemplate.description}</p>
            
            {!isTemplatePaid(selectedTemplate.id) ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Preview:</h4>
                  <p className="text-sm text-gray-600">{selectedTemplate.preview}</p>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    onClick={() => handlePurchaseTemplate(selectedTemplate)}
                    className="flex-1"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Purchase Template (${selectedTemplate.price})
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Template Purchased</span>
                  </div>
                  <p className="text-sm text-green-700">
                    You now have access to the full template and usage instructions.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Template Content:</h4>
                  <div className="bg-white p-3 border rounded text-sm font-mono whitespace-pre-wrap overflow-auto max-h-64">
                    {selectedTemplate.body}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Usage Instructions:</h4>
                  <div className="text-sm text-blue-800 whitespace-pre-line">
                    {selectedTemplate.usageInstructions}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedTemplate.body);
                      alert('Template copied to clipboard!');
                    }}
                    className="flex-1"
                  >
                    Copy Template
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (!isTemplateSaved(selectedTemplate.id)) {
                        onSave(selectedTemplate);
                      }
                    }}
                  >
                    {isTemplateSaved(selectedTemplate.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Templates;