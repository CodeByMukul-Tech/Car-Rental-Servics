// SessionContext.js
import React, { createContext, useState } from 'react';

// Create a context for session data
const SessionContext = createContext();

// Provider component that will manage session state
const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);  // Store sessionId here

  // Function to set sessionId after login
  const login = () => {
    
    // Assume response contains sessionId (e.g., from API login response)
    setSessionId(localStorage.getItem());  // Save sessionId in context
  };

  return (
    <SessionContext.Provider value={{ login, sessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
