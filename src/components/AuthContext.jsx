import React, { createContext, useState } from 'react';

// 2. Define the Context with default values
export const AuthContext = createContext({
  authToken: null,
  setAuthToken: () => {}
});

// 3. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('token') || null);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
