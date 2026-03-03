import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: '',
  userId: null,
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    console.log('AuthContext init - stored data:', {storedToken, storedUserId});
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const loginHandler = (token, userId) => {
    console.log('Login handler executing with:', {token, userId});
    if (!token || !userId) {
      console.error('Invalid login parameters');
      return;
    }
    
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    console.log('Login successful - data saved to localStorage');
  };
  
  const logoutHandler = () => {
    console.log('Logout handler executing');
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const contextValue = {
    token,
    userId,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;