// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IAuthContextProps {
  user: {
    email: string;
    _id: string;
  };
  login: (token: string, remember: boolean) => void;
  register: (email: string, password: string, remember: boolean) => void;
  logout: () => void;
  loading: boolean;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = (token: string, remember: boolean) => {
    if (remember) localStorage.setItem("token", token);

    const decoded: any = jwtDecode(token);
    setUser(decoded);

    navigate("/");
  };

  const register = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
      });

      const token = response.data.access_token;
      login(token, remember);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};
