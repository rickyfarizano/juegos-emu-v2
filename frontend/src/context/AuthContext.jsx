import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // El valor inicial es null

  useEffect(() => {
    // Simulando la carga de datos, puedes obtener estos datos desde un API o un JWT
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Asegúrate de que 'user' contiene los roles
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

