import Auth from "../Pages/Auth";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import ErrorRoute from "./ErrorRoute";
import MainChat from "../Pages/MainChat";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/chats",
    element: (
      <ProtectedRoute>
        <MainChat />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/auth" />,
  },
  {
    path: "*",
    element: <ErrorRoute />,
  },
]);

const Body = () => {
  return (
    <div className="bg-blue-200 h-screen w-screen overflow-x-hidden">
      <RouterProvider router={router} />
    </div>
  );
};

export default Body;
