import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { Link } from "react-router-dom";
import BookCard from "../components/book-card";
import { Book } from "../helpers/types";
import { useAuth } from "../components/auth-provider";

export default function ViewBooks() {
  const { data, isLoading } = useSWR("/books/", fetcher, {
    revalidateOnFocus: false,
  });
  const { user } = useAuth();

  return (
    <section>
      {user && user?.role !== "member" && (
        <Link to={"/books/add"}>
          <button>Add new book</button>
        </Link>
      )}
      {isLoading && <h3>Loiading.....</h3>}
      {!isLoading && (
        <section
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "start",
          }}
        >
          {data?.map((book: Book) => (
            <BookCard key={book.id} item={book} />
          ))}
        </section>
      )}
    </section>
  );
}
