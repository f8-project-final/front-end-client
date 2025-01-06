import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import RegisterLayout from "../layouts/RegisterLayout";
import HomeDiscussionDetailPage from "@/pages/HomeDiscussionDetailPage";
import LoginLayout from "@/layouts/LoginLayout";
import NotFoundLayout from "@/layouts/NotFoundLayout";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "discussions/:discussionId",
          element: <HomeDiscussionDetailPage />,
        },
      ],
    },
    {
      path: "/register",
      element: <RegisterLayout />,
    },
    {
      path: "/login",
      element: <LoginLayout />,
    },
    {
      path: "*",
      element: <NotFoundLayout />,
    },
  ];
  return useRoutes(routes);
};

export default AppRoutes;
