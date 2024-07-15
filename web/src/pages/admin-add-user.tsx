import React from "react";
import http from "../helpers/http";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";

type ErrorDef = {
  message: string;
  hasError: boolean;
  type: "password" | "username" | "misc" | null;
};

export default function AdminAddUser() {
  const navigate = useNavigate();
  const [adding, setAdding] = React.useState(false);
  const [error, setError] = React.useState<ErrorDef>({
    message: "",
    hasError: false,
    type: null,
  });

  async function handleAddUser(ev: React.FormEvent<HTMLFormElement>) {
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
    setAdding(true);
    try {
      await http.post("/admin/users", {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as string,
      });
      setAdding(true);
      await mutate("/admin/users");
      navigate("/administrator");
    } catch (error) {
      console.log(error);
      setAdding(false);
    }
  }
  return (
    <section>
      <h3>Add User</h3>
      <form onSubmit={handleAddUser}>
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
            <span style={{ color: "red", fontSize: 12 }}>{error?.message}</span>
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
          disabled={adding}
        >
          {adding ? "Processing..." : "Add user"}
        </button>
        {error?.hasError && error?.type === "misc" && (
          <span style={{ color: "red", fontSize: 12, display: "inline-block" }}>
            {error?.message}
          </span>
        )}
      </form>
    </section>
  );
}
