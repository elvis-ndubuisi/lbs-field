import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { History } from "../helpers/types";
import BorrowHistory from "../components/borrow-history";

export default function LiberianIndex() {
  const { data, isLoading } = useSWR("/books/borrow/history", fetcher, {
    revalidateOnFocus: false,
  });

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
        <Link to={"/books"}>View books</Link>
        <Link to={"/liberian/genre"}>Add Genre</Link>
      </div>
      <h2>Requests & Histories</h2>
      {isLoading && <h3>Loiading history data.....</h3>}
      <section
        style={{
          marginTop: 12,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "start",
        }}
      >
        {!isLoading &&
          data?.map((item: History) => (
            <BorrowHistory key={item.id} {...item} />
          ))}
      </section>
    </section>
  );
}
