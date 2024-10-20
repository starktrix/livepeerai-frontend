/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define a type for the context value
interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  store: (data: Record<any, any>) => void;
  getStore: (key: string) => string | null;
}

// Create the context with a default value
const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  
  function store(data: Record<any, any>) {
    for (const [key, value] of Object.entries(data)) {
      localStorage.setItem(key, value);
    }
  }

  function getStore(key: string) {
    return localStorage.getItem(key)
  } 

  // store ai settings on load

  return (
    <TokenContext.Provider value={{ token, setToken, store, getStore }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
