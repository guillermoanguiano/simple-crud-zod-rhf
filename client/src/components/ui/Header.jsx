import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

export default function Header() {
  const navigate = useNavigate();
  const { logout, teacher } = useStore();

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "gray" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bienvenido de vuelta, {teacher?.name}!
            </Typography>

            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate("/iniciar-sesion");
              }}
            >
              Cerrar Sesion
            </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
