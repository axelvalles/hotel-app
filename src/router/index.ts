import { createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./home-route";
import { LoginRoute } from "./login-route";
import { privateRouter } from "./private/private.router";

export const router = createBrowserRouter([
  HomeRoute,
  LoginRoute,
  ...privateRouter,
]);
