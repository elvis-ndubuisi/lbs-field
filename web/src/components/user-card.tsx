import http from "../helpers/http";
import { User } from "../helpers/types";
import { mutate } from "swr";
import React from "react";

export default function UserCard({ item }: { item: User }) {
  const [update, setUpdate] = React.useState({
    sending: false,
    role: item.role,
    canUpdate: false,
    newRole: "",
  });
  const [deleting, setDeleting] = React.useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await http.delete(`/admin/users/${item.id}`);
      mutate("/admin/users");
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  }

  async function handleUpdate() {
    setUpdate((prev) => ({ ...prev, sending: true }));
    try {
      await http.patch(`/admin/users/${item.id}`, {
        id: item.id,
        role: update.newRole,
      });
      mutate("/admin/users");
      setUpdate({
        sending: false,
        role: item.role,
        canUpdate: false,
        newRole: "",
      });
    } catch (error) {
      console.log(error);
      setUpdate((prev) => ({ ...prev, sending: false }));
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
      <p style={{ margin: 0 }}>Name: {item.name}</p>
      <p style={{ margin: 0 }}>Role: {item.role}</p>
      <select
        name="role"
        id="role"
        defaultValue={item?.role}
        style={{ padding: 8 }}
        onChange={(ev) => {
          if (ev.target.value === item.role) {
            setUpdate((prev) => ({ ...prev, canUpdate: false, newRole: "" }));
          } else {
            setUpdate((prev) => ({
              ...prev,
              canUpdate: true,
              newRole: ev.target.value,
            }));
          }
        }}
      >
        <option value="member">Member</option>
        <option value="administrator">Administrator</option>
        <option value="liberian">Librarian</option>
      </select>
      <button onClick={async () => handleDelete()} disabled={deleting}>
        {deleting ? "deleting..." : "delete"}
      </button>
      <button
        onClick={async () => handleUpdate()}
        disabled={!update.canUpdate || update.sending}
      >
        {update.sending ? "updating..." : "update"}
      </button>
    </div>
  );
}
