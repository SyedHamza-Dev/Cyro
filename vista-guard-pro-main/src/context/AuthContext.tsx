import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  isAuthenticated: boolean;
  pendingOtp: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_EMAIL = "demo@bank.app";
const DEMO_PASSWORD = "demo123";
const SESSION_KEY = "vgp_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingOtp, setPendingOtp] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      setIsAuthenticated(!!parsed.isAuthenticated);
      setPendingOtp(!!parsed.pendingOtp);
      setUserEmail(parsed.userEmail ?? null);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ isAuthenticated, pendingOtp, userEmail })
    );
  }, [isAuthenticated, pendingOtp, userEmail]);

  const login = async (email: string, password: string) => {
    // demo session auth
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setUserEmail(email);
      setPendingOtp(true);
      navigate("/verify");
      return true;
    }
    return false;
  };

  const verifyOtp = async (code: string) => {
    if (code && code.length >= 4) {
      setPendingOtp(false);
      setIsAuthenticated(true);
      navigate("/");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPendingOtp(false);
    setUserEmail(null);
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/login");
  };

  const value = useMemo(
    () => ({ isAuthenticated, pendingOtp, userEmail, login, verifyOtp, logout }),
    [isAuthenticated, pendingOtp, userEmail]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const demoCreds = { email: DEMO_EMAIL, password: DEMO_PASSWORD };
