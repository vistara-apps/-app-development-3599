import { useState, useEffect } from 'react';

// Mock Supabase hook for demo purposes
export const useSupabase = () => {
  const [rightsModules, setRightsModules] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRightsModules([
        {
          id: 1,
          title: "Tenant Rights",
          summary: "Know your rights as a renter",
          category: "Housing",
          isPremium: false
        },
        {
          id: 2,
          title: "Workplace Rights",
          summary: "Understanding employment law",
          category: "Employment",
          isPremium: false
        }
      ]);
      
      setTemplates([
        {
          id: 1,
          title: "Repair Request Notice",
          category: "tenant",
          isPremium: false
        },
        {
          id: 2,
          title: "Wage Complaint Letter",
          category: "employment",
          isPremium: true
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  return { rightsModules, templates, loading };
};