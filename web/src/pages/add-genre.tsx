import { useNavigate } from "react-router-dom";
import React from "react";
import { mutate } from "swr";
import http from "../helpers/http";

export default function AddGenre() {
  const navigate = useNavigate();
  const [adding, setAdding] = React.useState(false);

  async function handleAddUser(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    setAdding(true);
    try {
      await http.post("/books/genre", {
        title: formData.get("title") as string,
      });
      setAdding(false);
      await mutate("/books/genre");
      navigate("/administrator");
    } catch (error) {
      console.log(error);
      setAdding(false);
    }
  }
  return (
    <section>
      <h3>Add Genre</h3>
      <form onSubmit={handleAddUser}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="user">Genre Title</label>
          <input
            style={{ padding: 8 }}
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            required
          />
        </div>
        <button
          style={{ marginTop: 8, display: "inline-block" }}
          type="submit"
          disabled={adding}
        >
          {adding ? "Processing..." : "Add genre"}
        </button>
      </form>
    </section>
  );
}
