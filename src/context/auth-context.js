import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ address: "", balance: 0.0 });

  const setUserAuthInfo = (data) => {
    localStorage.setItem("address", data.address);
    localStorage.setItem("balance", data.balance);
    const address = localStorage.getItem("address");
    const balance = localStorage.getItem("balance");
    // console.log(data, address, balance);
    if (address === null || undefined) {
      setAuthState({ address: "", balance: 0.0 });
    } else {
      setAuthState({ address, balance });
    }
  };
  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.address) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const address = localStorage.getItem("address");
    const balance = localStorage.getItem("balance");
    // console.log(address);
    if (address === null || undefined) {
      setAuthState({ address: "" });
    } else {
      setAuthState({ address, balance });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
