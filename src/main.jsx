import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import NotFound from "./Components/NotFound";
import FirebaseProvider from "./FirebaseProvider/FirebaseProvider";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const url = "https://my-json-server.typicode.com/faarhaan10/react-sunglasses/sunglasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: async () => fetch(url),
      },
      {
        path: "products",
        element: <Products />,
        loader: async () => fetch(url),
      },
      {
        path: "product/:id",
        element: <PrivateRoute>
          <ProductDetail />
        </PrivateRoute>,
        loader: async ({ params }) => fetch(`${url}/${params.id}`),
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>
);
