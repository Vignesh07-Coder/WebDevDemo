import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient'; // Ensure you set this file up next!

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if there is an active session on load
    const checkActiveSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    
    checkActiveSession();

    // 2. Listen for login/logout events anywhere in the app
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup listener on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook so Manish and Indu can easily grab the user data in their components
export const useAuth = () => {
  return useContext(AuthContext);
};