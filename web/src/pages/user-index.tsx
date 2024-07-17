import { useAuth } from "../components/auth-provider";
import { Navigate } from "react-router-dom";

export default function UserIndex() {
  const { user } = useAuth();
  if (user?.role) {
    return <Navigate to={`/${user?.role}`} />;
  } else {
    return <Navigate to={`/no-role`} />;
  }
}
