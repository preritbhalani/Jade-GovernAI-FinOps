import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isNewUser: boolean;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('jade_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('jade_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jade_user');
    }
  }, [user]);

  const signIn = (email: string) => {
    // Mock sign in
    setUser({
      id: '1',
      name: email.split('@')[0],
      email,
      isNewUser: false,
    });
  };

  const signUp = (name: string, email: string) => {
    // Mock sign up
    setUser({
      id: '1',
      name,
      email,
      isNewUser: true,
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const completeOnboarding = () => {
    if (user) {
      setUser({ ...user, isNewUser: false });
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
