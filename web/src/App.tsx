/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useAuth } from "./components/auth-provider";
import { Navigate, useNavigate } from "react-router-dom";

type ErrorDef = {
  message: string;
  hasError: boolean;
  type: "password" | "username" | "misc" | null;
};
function App() {
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const [tab, setTab] = React.useState<"login" | "register">("login");
  const [sentLogin, setSentLogin] = React.useState(false);
  const [sentRegister, setSentRegister] = React.useState(false);
  const [error, setError] = React.useState<ErrorDef>({
    message: "",
    hasError: false,
    type: null,
  });

  async function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    setSentLogin(true);
    try {
      const dd = await login({
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      });
      // @ts-expect-error always returns a route in user object
      navigate(`/${dd?.user?.route}`);
    } catch (error: any) {
      setError({ hasError: true, message: error?.message, type: "misc" });
    } finally {
      setSentLogin(false);
    }
  }

  async function handleRegister(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    if ((formData.get("password") as string)?.length < 6) {
      setError({
        hasError: true,
        message: "Password length must be above 6 characters",
        type: "password",
      });
      return;
    }
    setSentRegister(true);
    try {
      const dd = await register({
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as string,
      });
      // @ts-expect-error always returns a route in user object
      navigate(`/${dd?.user?.route}`);
    } catch (error: any) {
      setError({ hasError: true, message: error?.message, type: "misc" });
    } finally {
      setSentRegister(false);
    }
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeContent: "center",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          padding: 16,
          minWidth: "320px",
          backgroundColor: "lightgrey",
        }}
      >
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 12,
          }}
        >
          <button
            onClick={() => setTab("login")}
            style={{
              backgroundColor: tab === "login" ? "black" : "",
              color: tab === "login" ? "white" : "",
            }}
          >
            Log In
          </button>
          <button
            onClick={() => setTab("register")}
            style={{
              backgroundColor: tab === "register" ? "black" : "",
              color: tab === "register" ? "white" : "",
            }}
          >
            Register
          </button>
        </section>

        {tab === "register" && (
          <form onSubmit={handleRegister}>
            <h3 style={{ textAlign: "center" }}>Join LIB-Field</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="user">Username</label>
              <input
                style={{ padding: 8 }}
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="password">Password</label>
              <input
                style={{ padding: 8 }}
                type="password"
                name="password"
                id="password"
                onChange={() =>
                  setError({ message: "", hasError: false, type: null })
                }
                required
                placeholder="Enter password"
              />
              {error?.hasError && error?.type === "password" && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {error?.message}
                </span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="role">Role</label>
              <select name="role" id="role" style={{ padding: 8 }}>
                <option value="member">Member</option>
                <option value="administrator">Administrator</option>
                <option value="liberian">Librarian</option>
              </select>
            </div>
            <button
              style={{ marginTop: 8, display: "inline-block" }}
              type="submit"
              disabled={sentRegister}
            >
              {sentRegister ? "Processing..." : "Register"}
            </button>
            {error?.hasError && error?.type === "misc" && (
              <span
                style={{ color: "red", fontSize: 12, display: "inline-block" }}
              >
                {error?.message}
              </span>
            )}
          </form>
        )}
        {tab === "login" && (
          <form onSubmit={handleLogin}>
            <h3 style={{ textAlign: "center" }}>Welcome back!</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="user">Username</label>
              <input
                style={{ padding: 8 }}
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="password">Password</label>
              <input
                style={{ padding: 8 }}
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter password"
              />
            </div>
            <button style={{ marginTop: 8 }} type="submit" disabled={sentLogin}>
              {sentLogin ? "Processing.." : "Login"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default App;
