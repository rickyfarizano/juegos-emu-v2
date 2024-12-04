import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const hasRole = (role) => {
    return user && user.roles && user.roles.includes(role);
  };

  return (
    <AuthContext.Provider value={{ user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

