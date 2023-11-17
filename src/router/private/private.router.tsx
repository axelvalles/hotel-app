import AdminLayout from "@/components/admin-layout";
import { PATHS } from "@/constants";
import HotelsPage from "@/pages/private/hotels/hotels.page";
import LoginPage from "@/pages/private/login/login.page";
import { RouteObject } from "react-router-dom";

export const privateRouter: RouteObject[] = [
  {
    path: PATHS.ADMIN.INDEX,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <div>hola mundo</div>,
      },
      {
        path: PATHS.ADMIN.HOTELS,
        element: <HotelsPage />,
      },
    ],
  },
  {
    path: PATHS.ADMIN.LOGIN,
    element: <LoginPage />,
  },
];
