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
  const { status } = useAuthenticate;
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
              Home
            </Link>
          </Typography>
          {status === "not-authenticated" ? (
            <>
              <Link
                to="/auth/login"
                style={{
                  color: "#fff",
                  marginRight: 20,
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Register
              </Link>
            </>
          ) : (
            <Link to="/app" style={{ color: "#fff", textDecoration: "none" }}>
              Ingresar
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
