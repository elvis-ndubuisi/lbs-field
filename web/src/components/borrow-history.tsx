import React from "react";
import { History } from "../helpers/types";
import http from "../helpers/http";
import { mutate } from "swr";
import { useAuth } from "./auth-provider";

export default function BorrowHistory(props: React.PropsWithChildren<History>) {
  const [approving, setApproving] = React.useState(false);
  const { user } = useAuth();

  async function handleApproval() {
    setApproving(true);
    try {
      await http.patch(`/books/borrow/history/${props.id}`);
      mutate("/books/borrow/history");
    } catch (err) {
      console.log(err);
    } finally {
      setApproving(false);
    }
  }

  return (
    <section
      style={{ borderWidth: "1px", backgroundColor: "grey", padding: "1px" }}
    >
      <p>Book Title: {props.BookBorrowed?.title}</p>
      <p>ISBN: {props.BookBorrowed?.isbn}</p>
      {user?.role === "liberian" && (
        <>
          <p>Borrowed by: {props.BorrowedBy?.name}</p>
          <button
            onClick={() => handleApproval()}
            disabled={props.approved || approving}
          >
            {/* Both cancels out the visibility of "Approve" text */}
            {props.approved && !approving ? "Approved" : "Approve"}
            {approving && !props.approved && "Approving"}
          </button>
        </>
      )}
      {user?.role === "member" && <p>Approved: {props.approved.toString()}</p>}
    </section>
  );
}
