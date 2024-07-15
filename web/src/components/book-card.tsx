import { Book } from "../helpers/types";
import React from "react";
import { useAuth } from "./auth-provider";
import http from "../helpers/http";
import { mutate } from "swr";
import { Link } from "react-router-dom";

export default function BookCard({ item }: { item: Book }) {
  const { user } = useAuth();
  const [processing, setProcessing] = React.useState(false);

  async function handleDelete() {
    setProcessing(true);
    try {
      await http.delete(`/books/${item.id}`);
      mutate("/books");
      setProcessing(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  }

  return (
    <div
      key={item?.id}
      style={{
        display: "flex",
        flexDirection: `column`,
        width: "150px",
        padding: 3,
        gap: 6,
        border: "solid 1px white",
      }}
    >
      <p style={{ margin: 0 }}>Name: {item.title}</p>
      <p style={{ margin: 0 }}>Author: {item.author}</p>
      <p style={{ margin: 0 }}>ISBN: {item.isbn}</p>
      <p style={{ margin: 0 }}>Copies: {item.copies}</p>
      {user?.role === "liberian" && (
        <>
          <Link to={`/books/${item.id}`}>
            <button>modify</button>
          </Link>
        </>
      )}

      {(user?.role === "administrator" || user?.role === "liberian") && (
        <>
          <button onClick={async () => handleDelete()} disabled={processing}>
            {processing ? "processing" : "delete"}
          </button>
        </>
      )}
      {user?.role === "member" && <button>borrow</button>}
    </div>
  );
}
