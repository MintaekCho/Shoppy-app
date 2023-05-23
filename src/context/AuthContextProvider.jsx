import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
  });

  const user = authState.user;
  const loading = authState.loading


  useEffect(() => {
    onUserStateChange(setAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
