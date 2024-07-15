import React from "react";
import { User } from "../helpers/types";
import { throwServerError } from "../helpers/error-transformer";
import { jwtDecode } from "jwt-decode";
import http from "../helpers/http";

type Ctx = {
  user: User | null;
  register: (p: Record<"username" | "password" | "role", string>) => unknown;
  login: (p: Record<"username" | "password", string>) => unknown;
  logout: () => void;
};

const AuthContext = React.createContext<Ctx>({} as Ctx);

export default function AuthProvider(props: React.PropsWithChildren) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("asc");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded as User);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("asc");
      }
    }
  }, []);

  async function login(params: Record<"username" | "password", string>) {
    try {
      const response = await http.post("/auth/signin", { ...params });
      const decoded = jwtDecode(response?.data?.token);
      // http.defaults.headers.common.Authorization = `Bearer ${response?.data?.token}`;
      localStorage.setItem("asc", response?.data?.token);
      localStorage.setItem("rfs", response?.data?.xRefresh);

      setUser(decoded as User);
      return response.data;
    } catch (error) {
      throwServerError(error);
    }
  }

  async function register(
    params: Record<"username" | "password" | "role", string>
  ) {
    try {
      const response = await http.post("/auth/signup", { ...params });
      // http.defaults.headers.common.Authorization = `Bearer ${response?.data?.token}`;
      localStorage.setItem("asc", response?.data?.token);
      localStorage.setItem("rfs", response?.data?.xRefresh);
      const decoded = jwtDecode(response?.data?.token);
      setUser(decoded as User);
      return response.data;
    } catch (error) {
      throwServerError(error);
    }
  }

  async function logout() {
    try {
      await http.post("/auth/logout");
      localStorage.removeItem("asc");
      localStorage.removeItem("rfs");
      setUser(null);
    } catch (error) {
      throwServerError(error);
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, register, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
