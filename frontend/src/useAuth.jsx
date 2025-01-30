import { useState, useEffect } from 'react';

// Custom hook for authentication
const useAuth = () => {
  const [user, setUser] = useState(null);

  // Load user data from sessionStorage when the app loads
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user from sessionStorage
    }
  }, []);

  // Login function to store user in context and sessionStorage
  const setUserData = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData)); // Store user data in sessionStorage
  };

  // Logout function to clear session and user state
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); // Remove user data from sessionStorage
  };

  return {
    user,
    setUserData,
    logout,
  };
};

export default useAuth;
