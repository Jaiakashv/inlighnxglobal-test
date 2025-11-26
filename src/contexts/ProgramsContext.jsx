import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://web-backend-0aiv.onrender.com';

const ProgramsContext = createContext();

export const usePrograms = () => {
  const context = useContext(ProgramsContext);
  if (!context) {
    throw new Error('usePrograms must be used within a ProgramsProvider');
  }
  return context;
};

export const ProgramsProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/programs`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setPrograms(result.data);
        } else if (Array.isArray(result)) {
          setPrograms(result);
        } else {
          setPrograms([]);
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch programs immediately when the app loads
    fetchPrograms();
  }, []);

  const value = {
    programs,
    loading,
    error,
    refetch: async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/programs`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setPrograms(result.data);
        } else if (Array.isArray(result)) {
          setPrograms(result);
        } else {
          setPrograms([]);
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ProgramsContext.Provider value={value}>
      {children}
    </ProgramsContext.Provider>
  );
};

