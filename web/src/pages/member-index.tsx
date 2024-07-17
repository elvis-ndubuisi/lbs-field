import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import BookCard from "../components/book-card";
import type { Book, History } from "../helpers/types";
import BorrowHistory from "../components/borrow-history";

export default function MemberIndex() {
  const { data, isLoading } = useSWR("/books", fetcher, {
    revalidateOnFocus: false,
  });

  const { data: borrowed, isLoading: isLoadingBorrowed } = useSWR(
    "/books/borrow",
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const { data: history, isLoading: isLoadngHistory } = useSWR(
    "/books/borrow/history",
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <section style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingInline: 12,
        }}
      >
        <Link to={"#borrowed"}>Borrowed books</Link>
        {/* <Link to={"/liberian/genre"}>Add Genre</Link> */}
      </div>

      <h2>All Books</h2>
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
          {data?.map((book: Book) => <BookCard key={book.id} item={book} />)}
        </section>
      )}

      <hr />
      <h2 id="borrowed">Borrowed Books</h2>
      {isLoadingBorrowed && <h3>Loiading.....</h3>}
      {borrowed?.length < 1 && <h3>Not borrowed book yet</h3>}

      {!isLoadingBorrowed && (
        <section
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "start",
          }}
        >
          {borrowed?.map((book: { BookBorrowed: Book; approved: boolean }) => (
            <BookCard
              key={book.BookBorrowed.id}
              item={book.BookBorrowed}
              approved={book.approved}
            />
          ))}
        </section>
      )}

      <hr />
      <h2 id="borrowed">Borrowed History</h2>
      {isLoadngHistory && <h3>Loiading.....</h3>}
      {history?.length < 1 && <h3>No book history yet</h3>}

      {!isLoadingBorrowed && (
        <section
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "start",
          }}
        >
          {history?.map((history: History) => (
            <BorrowHistory key={history.id} {...history} />
          ))}
        </section>
      )}
    </section>
  );
}
