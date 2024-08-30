import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Applayout from "./ui/Applayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Navigate replace to="/dashboard" />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/bookings",
          element: <Bookings />,
        },
        { path: "/booking/:bookingId", element: <Booking /> },
        {
          path: "/cabins",
          element: <Cabins />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/users",
          element: <Users />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
