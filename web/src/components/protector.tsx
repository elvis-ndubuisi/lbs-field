import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "./auth-provider";

export default function Protector() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to={"/auth"} replace />;
  }

  return (
    <section
      style={{
        display: "flex",
        gap: 18,
        height: "100vh",
        width: "100vw",
      }}
    >
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Link to={"member"}>Member</Link>
        <Link to={"liberian"}>Liberian</Link>
        <Link to={"administrator"}>Administrator</Link>
      </aside>

      <main
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h2>{user?.name}</h2>
          <button
            onClick={async () => {
              await logout();
            }}
          >
            Logout
          </button>
        </div>
        <Outlet />
      </main>
    </section>
  );
}

export function ProtectRole({
  role,
}: {
  role: "member" | "liberian" | "administrator";
}) {
  const { user } = useAuth();

  if (user?.role !== role) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}
