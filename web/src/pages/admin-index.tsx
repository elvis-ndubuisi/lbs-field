import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import UserCard from "../components/user-card";
import { User } from "../helpers/types";
import { Link } from "react-router-dom";

export default function AdminIndex() {
  const { data, isLoading } = useSWR("/admin/users", fetcher, {
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
        <Link to={"/administrator/user/add"}>Add new user</Link>
        <Link to={"/books"}>View books</Link>
        <Link to={"/administrator/genre"}>Add Genre</Link>
      </div>
      {isLoading && <h3>Loiading.....</h3>}
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
          data?.map((item: User) => <UserCard key={item.id} item={item} />)}
      </section>
    </section>
  );
}
