import { useAuth } from "../components/auth-provider";
import React from "react";

export default function NoRole() {
  const { logout } = useAuth();
  const [processing, setProcessing] = React.useState(false);

  return (
    <div>
      <h3>Permission denied for this route</h3>
      <p>pick another role or register using another role</p>
      <button
        disabled={processing}
        onClick={async () => {
          setProcessing(true);
          try {
            await logout();
          } catch (error) {
            console.log(error);
          } finally {
            setProcessing(false);
          }
        }}
      >
        {processing ? "Processing" : "Log out"}
      </button>
    </div>
  );
}
