import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import { Box } from "@mui/material";
import Toast from "../ui/Toast";
import { useStore } from "../../store/index";

export default function Layout() {
  const navigate = useNavigate();
  const { teacher } = useStore();

  useEffect(() => {
    if (!teacher) {
      navigate("/iniciar-sesion");
      return
    }
  }, []);

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          paddingX: { xs: "1rem", md: "2.5rem", lg: "6rem", xl: "8rem" },
          paddingY: "2rem",
          marginX: "auto",
          height: { md: "100vh" },
        }}
      >
        <Outlet />
      </Box>

      <Toast />
    </>
  );
}
