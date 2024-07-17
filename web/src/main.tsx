import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Protector, { ProtectRole } from "./components/protector.tsx";
import AuthProvider from "./components/auth-provider.tsx";
import NoRole from "./pages/no-role.tsx";
import MemberIndex from "./pages/member-index.tsx";
import AdminIndex from "./pages/admin-index.tsx";
import AdminAddUser from "./pages/admin-add-user.tsx";
import AddGenre from "./pages/add-genre.tsx";
import LiberianIndex from "./pages/liberian-index.tsx";
import AddBook from "./pages/add-book.tsx";
import EditBook from "./pages/edit-book.tsx";
import ViewBooks from "./pages/view-books.tsx";
import UserIndex from "./pages/user-index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protector />,
    children: [
      { index: true, element: <UserIndex /> },
      {
        path: "member",
        element: <ProtectRole role="member" />,
        children: [{ index: true, element: <MemberIndex /> }],
      },
      {
        path: "liberian",
        element: <ProtectRole role="liberian" />,
        children: [
          { index: true, element: <LiberianIndex /> },
          { path: "genre", element: <AddGenre /> },
        ],
      },
      {
        path: "administrator",
        element: <ProtectRole role="administrator" />,
        children: [
          { index: true, element: <AdminIndex /> },
          { path: "genre", element: <AddGenre /> },
          { path: "user/add", element: <AdminAddUser /> },
        ],
      },
      {
        path: "books",
        children: [
          { index: true, element: <ViewBooks /> },
          { path: "add", element: <AddBook /> },
          { path: ":id", element: <EditBook /> },
        ],
      },
      { path: "/no-role", element: <NoRole /> },
    ],
  },
  { path: "/auth", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* <App /> */}
  </React.StrictMode>,
);
