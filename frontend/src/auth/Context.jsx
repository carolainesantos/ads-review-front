import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// verificar se o token é valido
const isValidToken = (token) => {
  const decode = jwtDecode(token);

  const currentTime = Date.now() / 1000;
  return decode.exp > currentTime;
};

// pegar a role do meu usuario
const getRole = (token) => {
  const decode = jwtDecode(token);
  return decode.role;
};

// exportar o contexto  = react context
export const AuthContext = createContext();

// exportar meu provider
export const AuthProvider = ({ children }) => {
  // token, role, loading
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageToken = localStorage.getItem("token", name, token);
    if (storageToken && isValidToken(storageToken)) {
      setToken(storageToken);
      setRole(getRole(storageToken));
    } else {
      setToken(null);
      setRole(null);
      localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    setToken(token);
    setRole(getRole(token));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
