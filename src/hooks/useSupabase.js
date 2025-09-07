import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export const useSupabase = () => {
  const [rightsModules, setRightsModules] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data for when Supabase is not configured
  const fallbackRightsModules = [
    {
      id: 1,
      title: "Tenant Rights & Protections",
      summary: "Essential rights every renter should know including security deposits, repairs, and eviction protections.",
      detailed_content: `As a tenant, you have fundamental rights that protect you from unfair treatment. These include:

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
      category: "housing",
      type: "basic",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Workplace Rights & Employment Law",
      summary: "Understanding your rights in the workplace including wages, discrimination, and workplace safety.",
      detailed_content: `Your workplace rights are protected by federal and state laws. Key areas include:

**Wage and Hour Rights:**
- Right to minimum wage and overtime pay
- Right to meal and rest breaks (varies by state)
- Right to receive your final paycheck promptly upon termination

**Anti-Discrimination Protections:**
- Protection from discrimination based on race, gender, age, religion, disability
- Right to file complaints with EEOC
- Protection from retaliation for reporting discrimination

**Workplace Safety:**
- Right to a safe working environment under OSHA
- Right to report unsafe conditions without retaliation
- Right to receive safety training and equipment

**Family and Medical Leave:**
- FMLA provides unpaid leave for qualified family and medical reasons
- Job protection during approved leave periods
- Continuation of health benefits during leave

Always document workplace issues and know your company's policies and procedures.`,
      tags: ['employment', 'workplace', 'legal'],
      category: "employment",
      type: "basic",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Consumer Rights & Protection",
      summary: "Your rights when purchasing goods and services, including returns, warranties, and fraud protection.",
      detailed_content: `Consumer protection laws give you important rights when making purchases:

**Purchase Rights:**
- Right to receive goods as described
- Right to return defective products
- Right to warranty protection on applicable items

**Credit and Debt Rights:**
- Right to accurate credit reporting
- Protection from unfair debt collection practices
- Right to dispute incorrect charges

**Privacy Rights:**
- Right to know how your personal information is used
- Right to opt out of data sharing in many cases
- Protection under various privacy laws

**Fraud Protection:**
- Right to dispute fraudulent charges
- Protection under various consumer fraud laws
- Right to report scams to appropriate authorities

Keep receipts, read terms and conditions, and know your state's consumer protection laws.`,
      tags: ['consumer', 'shopping', 'legal'],
      category: "consumer",
      type: "basic",
      created_at: new Date().toISOString()
    }
  ];

  const fallbackTemplates = [
    {
      id: 1,
      title: "Tenant Complaint Letter",
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
      usage_instructions: "1. Fill in all bracketed information with your specific details\n2. Be specific about the problem and how it affects you\n3. Keep copies of all correspondence\n4. Send via certified mail for important issues\n5. Follow up if no response within stated timeframe",
      category: "housing",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Workplace Complaint Letter",
      body: `[Date]

[Manager/HR Name]
[Company Name]
[Company Address]

Dear [Manager/HR Name],

I am writing to formally document and request resolution of the following workplace issue:

[Describe the issue in detail, including dates, times, witnesses, and how it affects your work environment]

This situation is concerning because [explain why this is problematic - safety, legal, policy violation, etc.].

I have attempted to resolve this matter by [describe any previous attempts to address the issue].

I respectfully request that you investigate this matter and take appropriate action to resolve it. I am available to discuss this further at your convenience.

I look forward to your prompt response and resolution of this matter.

Sincerely,
[Your Name]
[Your Title]
[Date]

---

EMPLOYEE COPY - KEEP FOR YOUR RECORDS`,
      usage_instructions: "1. Document everything with specific dates and details\n2. Keep copies of all communications\n3. Follow your company's complaint procedures\n4. Consider consulting with HR or legal counsel for serious issues\n5. Know your rights regarding retaliation protection",
      category: "employment",
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (supabase) {
          // Fetch rights modules from Supabase
          const { data: rightsData, error: rightsError } = await supabase
            .from('rights_modules')
            .select('*')
            .order('created_at', { ascending: false });

          // Fetch templates from Supabase
          const { data: templatesData, error: templatesError } = await supabase
            .from('templates')
            .select('*')
            .order('created_at', { ascending: false });

          if (rightsError) throw rightsError;
          if (templatesError) throw templatesError;

          setRightsModules(rightsData || []);
          setTemplates(templatesData || []);
        } else {
          // Use fallback data when Supabase is not configured
          console.warn('Supabase not configured, using fallback data');
          setRightsModules(fallbackRightsModules);
          setTemplates(fallbackTemplates);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        // Use fallback data on error
        setRightsModules(fallbackRightsModules);
        setTemplates(fallbackTemplates);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveUserRights = async (userId, rightsModuleId) => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('user_saves')
        .insert([
          { user_id: userId, rights_module_id: rightsModuleId, type: 'rights' }
        ]);
      
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error saving rights module:', err);
      throw err;
    }
  };

  const saveUserTemplate = async (userId, templateId) => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('user_saves')
        .insert([
          { user_id: userId, template_id: templateId, type: 'template' }
        ]);
      
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error saving template:', err);
      throw err;
    }
  };

  const getUserSaves = async (userId) => {
    if (!supabase) return { rightsModules: [], templates: [] };
    
    try {
      const { data, error } = await supabase
        .from('user_saves')
        .select(`
          *,
          rights_modules(*),
          templates(*)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      
      const savedRights = data?.filter(item => item.type === 'rights').map(item => item.rights_modules) || [];
      const savedTemplates = data?.filter(item => item.type === 'template').map(item => item.templates) || [];
      
      return { rightsModules: savedRights, templates: savedTemplates };
    } catch (err) {
      console.error('Error fetching user saves:', err);
      throw err;
    }
  };

  return { 
    rightsModules, 
    templates, 
    loading, 
    error,
    saveUserRights,
    saveUserTemplate,
    getUserSaves,
    supabase
  };
};
