import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import SearchInput from './ui/SearchInput';
import Modal from './ui/Modal';
import { BookOpen, Save, Tag, Clock, CheckCircle } from 'lucide-react';

const RightsExplorer = ({ onSave, savedRights }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModule, setSelectedModule] = useState(null);

  const categories = [
    { id: 'all', label: 'All Rights' },
    { id: 'housing', label: 'Housing' },
    { id: 'employment', label: 'Employment' },
    { id: 'consumer', label: 'Consumer' },
    { id: 'family', label: 'Family' },
    { id: 'criminal', label: 'Criminal' }
  ];

  const rightsModules = [
    {
      id: 1,
      title: 'Tenant Rights & Protections',
      summary: 'Essential rights every renter should know including security deposits, repairs, and eviction protections.',
      detailedContent: `As a tenant, you have fundamental rights that protect you from unfair treatment. These include:

**Security Deposit Rights:**
- Landlords must return deposits within 30 days in most states
- They can only deduct for actual damages beyond normal wear and tear
- You have the right to an itemized list of deductions

**Repair and Habitability:**
- Landlords must maintain the property in livable condition
- You have the right to request repairs for health and safety issues
- In some cases, you can withhold rent or repair and deduct costs

**Eviction Protections:**
- Proper notice must be given (typically 30-60 days)
- Landlords cannot evict without just cause in many jurisdictions
- You have the right to contest evictions in court

**Privacy Rights:**
- Landlords must give 24-48 hours notice before entering
- Entry is only allowed for specific reasons (repairs, inspections, emergencies)

Remember to document everything in writing and know your local laws, as tenant rights vary by location.`,
      tags: ['housing', 'tenant', 'legal'],
      category: 'housing',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Workplace Discrimination & Harassment',
      summary: 'Know your rights regarding discrimination, harassment, and creating a safe work environment.',
      detailedContent: `Federal law protects employees from discrimination and harassment. Here's what you need to know:

**Protected Classes:**
- Race, color, religion, sex, national origin
- Age (40 and older), disability, pregnancy
- Sexual orientation and gender identity (in many jurisdictions)

**Types of Discrimination:**
- Hiring, firing, promotion, or compensation based on protected characteristics
- Creating hostile work environment
- Retaliation for reporting discrimination

**Your Rights:**
- File complaints with HR or management
- Report to EEOC (Equal Employment Opportunity Commission)
- Protection from retaliation for reporting

**Harassment Prevention:**
- Employers must take reasonable steps to prevent harassment
- You have the right to a harassment-free workplace
- Document incidents with dates, witnesses, and details

**Steps to Take:**
1. Report to your employer first (check employee handbook)
2. Keep detailed records of incidents
3. File EEOC complaint within 180-300 days
4. Consider consulting with an employment attorney

Know that speaking up about discrimination is protected - your employer cannot retaliate against you for making good faith reports.`,
      tags: ['employment', 'discrimination', 'workplace'],
      category: 'employment',
      readTime: '7 min'
    },
    {
      id: 3,
      title: 'Consumer Purchase Protection',
      summary: 'Rights when buying goods and services, including returns, warranties, and fraud protection.',
      detailedContent: `As a consumer, you have important rights when making purchases:

**Warranty Rights:**
- Implied warranty of merchantability (product works as expected)
- Express warranties must be honored as stated
- Lemon laws protect major purchases like cars

**Return and Refund Rights:**
- Many states require disclosure of return policies
- Credit card chargebacks for disputed purchases
- Right to cancel certain contracts within cooling-off period

**Online Shopping Protections:**
- Right to accurate product descriptions
- Protection against unauthorized charges
- Mail Order Rule - timely delivery or refund

**Fraud Protection:**
- Report fraudulent charges immediately
- Limited liability for credit card fraud ($50 maximum)
- Right to dispute charges and withhold payment during investigation

**Auto Purchase Rights:**
- Right to inspect vehicle history
- Lemon law protections for defective vehicles
- Cooling-off period for some auto purchases

**Steps When You Have Problems:**
1. Contact the seller directly first
2. Check your credit card or bank protections
3. File complaints with consumer protection agencies
4. Consider small claims court for damages

Keep all receipts, warranties, and communications to protect your rights.`,
      tags: ['consumer', 'shopping', 'protection'],
      category: 'consumer',
      readTime: '6 min'
    },
    {
      id: 4,
      title: 'Family Court & Custody Rights',
      summary: 'Understanding parental rights, custody arrangements, and family court procedures.',
      detailedContent: `Family law protects the rights of parents and children in various situations:

**Parental Rights:**
- Both parents have equal rights to custody and visitation
- Right to make decisions about child's education, health, and welfare
- Right to spend time with your child

**Custody Types:**
- Legal custody: right to make major decisions
- Physical custody: where the child lives
- Joint vs. sole custody arrangements

**Child Support:**
- Both parents have obligation to support their children
- Based on income and custody arrangement
- Can be modified when circumstances change

**Domestic Violence Protections:**
- Right to obtain protective orders
- Emergency custody modifications for safety
- Confidential address programs in some states

**Grandparent Rights:**
- Limited rights to visitation in certain circumstances
- Must prove relationship is in child's best interest

**Court Procedures:**
- Right to legal representation
- Right to present evidence and call witnesses
- Appeals process for unfavorable decisions

**Important Steps:**
1. Document everything related to your case
2. Consider mediation before going to court
3. Follow all court orders exactly
4. Keep detailed records of time spent with children

The court's primary concern is always the best interest of the child.`,
      tags: ['family', 'custody', 'court'],
      category: 'family',
      readTime: '8 min'
    },
    {
      id: 5,
      title: 'Criminal Justice & Miranda Rights',
      summary: 'Your rights when interacting with law enforcement and navigating the criminal justice system.',
      detailedContent: `Understanding your rights during police encounters is crucial:

**Miranda Rights:**
- Right to remain silent
- Right to an attorney
- Right to have attorney present during questioning
- Right to appointed attorney if you cannot afford one

**During Police Stops:**
- Provide identification when legally required
- You can ask "Am I free to leave?"
- Right to refuse searches (except with warrant or probable cause)
- Stay calm and keep hands visible

**If Arrested:**
- Clearly invoke your right to remain silent
- Ask for a lawyer immediately
- Do not resist arrest, even if you believe it's wrong
- You can challenge the arrest in court later

**Bail and Pretrial Rights:**
- Right to reasonable bail in most cases
- Right to speedy trial
- Right to be informed of charges against you

**Trial Rights:**
- Right to jury trial
- Right to confront witnesses
- Right to call witnesses on your behalf
- Right to appeal conviction

**After Conviction:**
- Rights may be limited but not eliminated
- Right to appeal
- Right to petition for post-conviction relief

**Key Reminders:**
- Anything you say can be used against you
- Police can lie during interrogation
- You cannot be punished for exercising your rights
- Get legal help as soon as possible

Know these rights and use them - they exist to protect you.`,
      tags: ['criminal', 'police', 'rights'],
      category: 'criminal',
      readTime: '9 min'
    }
  ];

  const filteredModules = rightsModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = (module) => {
    onSave(module);
  };

  const isModuleSaved = (moduleId) => {
    return savedRights.some(item => item.id === moduleId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Rights Explorer</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Search and discover your legal rights across different areas of law
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <SearchInput
          placeholder="Search rights topics..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-white text-primary shadow-card'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredModules.map(module => (
          <Card key={module.id} variant="interactive" onClick={() => setSelectedModule(module)}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900 flex-1">{module.title}</h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave(module);
                  }}
                  className={`p-1 rounded transition-colors ${
                    isModuleSaved(module.id)
                      ? 'text-green-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {isModuleSaved(module.id) ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                </button>
              </div>
              
              <p className="text-sm text-gray-600">{module.summary}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{module.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {module.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No rights modules found</h3>
          <p className="text-white/80">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Module Detail Modal */}
      {selectedModule && (
        <Modal
          isOpen={!!selectedModule}
          onClose={() => setSelectedModule(null)}
          title={selectedModule.title}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{selectedModule.readTime}</span>
              </div>
              <Button
                variant={isModuleSaved(selectedModule.id) ? "secondary" : "primary"}
                size="sm"
                onClick={() => handleSave(selectedModule)}
              >
                {isModuleSaved(selectedModule.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
            
            <div className="prose prose-sm max-w-none">
              {selectedModule.detailedContent.split('\n').map((paragraph, index) => {
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
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              {selectedModule.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RightsExplorer;