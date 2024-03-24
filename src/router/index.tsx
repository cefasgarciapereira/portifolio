import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Post from "../pages/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/post",
    element: <Post />
  }
]);

export default router