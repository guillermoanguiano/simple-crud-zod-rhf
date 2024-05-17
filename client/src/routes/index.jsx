import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/layouts/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </>
  )
);

export default router;
