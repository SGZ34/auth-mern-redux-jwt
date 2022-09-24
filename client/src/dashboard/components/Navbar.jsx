import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuthenticate } from "../../hooks/UseAuthenticate";

export function Navbar() {
  const { user, logout } = useAuthenticate();
  const handleLogout = () => {
    if (confirm("¿Deseas cerrar sesión?")) {
      logout();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{ color: "#fff", marginRight: 30, textDecoration: "none" }}
            >
              Dashboard - {user}
            </Link>
          </Typography>
          <button
            style={{
              color: "#fff",
              marginRight: 20,
              textDecoration: "none",
              background: "transparent",
              border: 0,
              fontSize: 15,
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
