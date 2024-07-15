import { Link } from "react-router-dom";

export default function LiberianIndex() {
  //   const { data, isLoading } = useSWR("/books", fetcher, {
  //     revalidateOnFocus: false,
  //   });
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
      <h2>Requests</h2>
      {/* {isLoading && <h3>Loiading.....</h3>} */}
      {/* <section
        style={{
          marginTop: 12,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "start",
        }}
      >
        {!isLoading &&
          data?.map((item: Book) => <BookCard key={item.id} item={item} />)}
      </section> */}
    </section>
  );
}
