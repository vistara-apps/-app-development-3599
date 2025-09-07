import { useState, useEffect, createContext, useContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [farcasterData, setFarcasterData] = useState(null);
  
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // Mock Farcaster integration (in real implementation, this would use Privy or similar)
  const mockFarcasterData = {
    fid: '12345',
    username: 'user.eth',
    displayName: 'Legal User',
    pfpUrl: 'https://via.placeholder.com/150',
    followerCount: 150,
    followingCount: 75
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        if (isConnected && address) {
          // In a real implementation, you would:
          // 1. Verify the wallet connection
          // 2. Fetch user data from your backend
          // 3. Get Farcaster profile data via Privy or similar
          
          const userData = {
            id: address,
            walletAddress: address,
            farcasterData: mockFarcasterData,
            savedRights: [],
            savedTemplates: [],
            premiumAccess: false,
            createdAt: new Date().toISOString()
          };
          
          setUser(userData);
          setFarcasterData(mockFarcasterData);
        } else {
          setUser(null);
          setFarcasterData(null);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setUser(null);
        setFarcasterData(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [isConnected, address]);

  const login = async (connector) => {
    try {
      setIsLoading(true);
      await connect({ connector });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await disconnect();
      setUser(null);
      setFarcasterData(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates) => {
    if (!user) return;
    
    try {
      // In a real implementation, this would update the backend
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const saveRightsModule = async (moduleId) => {
    if (!user) return;
    
    try {
      const updatedSavedRights = [...(user.savedRights || [])];
      if (!updatedSavedRights.includes(moduleId)) {
        updatedSavedRights.push(moduleId);
        await updateUserProfile({ savedRights: updatedSavedRights });
      }
    } catch (error) {
      console.error('Failed to save rights module:', error);
      throw error;
    }
  };

  const saveTemplate = async (templateId) => {
    if (!user) return;
    
    try {
      const updatedSavedTemplates = [...(user.savedTemplates || [])];
      if (!updatedSavedTemplates.includes(templateId)) {
        updatedSavedTemplates.push(templateId);
        await updateUserProfile({ savedTemplates: updatedSavedTemplates });
      }
    } catch (error) {
      console.error('Failed to save template:', error);
      throw error;
    }
  };

  const removeSavedItem = async (itemId, type) => {
    if (!user) return;
    
    try {
      if (type === 'rights') {
        const updatedSavedRights = (user.savedRights || []).filter(id => id !== itemId);
        await updateUserProfile({ savedRights: updatedSavedRights });
      } else if (type === 'template') {
        const updatedSavedTemplates = (user.savedTemplates || []).filter(id => id !== itemId);
        await updateUserProfile({ savedTemplates: updatedSavedTemplates });
      }
    } catch (error) {
      console.error('Failed to remove saved item:', error);
      throw error;
    }
  };

  const hasAccess = (contentType = 'basic') => {
    if (!user) return false;
    
    switch (contentType) {
      case 'premium':
        return user.premiumAccess || false;
      case 'basic':
      default:
        return true;
    }
  };

  const value = {
    user,
    farcasterData,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserProfile,
    saveRightsModule,
    saveTemplate,
    removeSavedItem,
    hasAccess,
    connectors
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth without provider (fallback)
export const useAuthFallback = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address) {
      setUser({
        id: address,
        walletAddress: address,
        savedRights: [],
        savedTemplates: [],
        premiumAccess: false
      });
    } else {
      setUser(null);
    }
  }, [isConnected, address]);

  const login = async (connector) => {
    try {
      setIsLoading(true);
      await connect({ connector });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await disconnect();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    connectors,
    hasAccess: () => true,
    saveRightsModule: () => {},
    saveTemplate: () => {},
    removeSavedItem: () => {}
  };
};
