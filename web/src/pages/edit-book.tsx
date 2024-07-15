import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fetcher from "../helpers/fetcher";
import React from "react";
import http from "../helpers/http";
import { useNavigate } from "react-router-dom";

export default function EditBook() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: genre, isLoading: loadingGenre } = useSWR(
    "/books/genre",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const { data, isLoading } = useSWR(`/books/${params?.id}`, fetcher, {
    revalidateOnFocus: false,
  });
  const [submitting, setSubmitting] = React.useState(false);

  async function handleEditBook(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    setSubmitting(true);
    try {
      await http.put(`/books/${params.id}`, {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        genre: formData.get("genre") as string,
        copies: parseInt(formData.get("copies") as string),
      });
      mutate("/books");
      setSubmitting(false);
      navigate("/books");
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h2>Edit Book</h2>
      {isLoading ? (
        <p>Loading data</p>
      ) : (
        <form
          onSubmit={handleEditBook}
          style={{ maxWidth: "400px", width: "100%", marginInline: "auto" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="title">Title</label>
            <input
              style={{ padding: 8 }}
              type="text"
              name="title"
              id="title"
              defaultValue={data?.title}
              placeholder="Enter title"
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="author">Author</label>
            <input
              style={{ padding: 8 }}
              type="text"
              name="author"
              id="author"
              defaultValue={data?.author}
              placeholder="Enter author"
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="copies">Copies</label>
            <input
              style={{ padding: 8 }}
              type="number"
              name="copies"
              id="copies"
              defaultValue={data?.copies}
              placeholder="Enter copies"
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="genre">Genre</label>
            {loadingGenre && !genre ? (
              <p>loading genre... </p>
            ) : (
              <select name="genre" id="genre" style={{ padding: 8 }}>
                {genre?.map((gen: { id: string; title: string }) => (
                  <option value={gen?.id}>{gen.title}</option>
                ))}
              </select>
            )}
          </div>

          <button style={{ marginTop: 8 }} type="submit" disabled={submitting}>
            {submitting ? "Processing.." : "Add"}
          </button>
        </form>
      )}
    </section>
  );
}
