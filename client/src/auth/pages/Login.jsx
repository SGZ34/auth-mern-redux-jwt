import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as LinkRouter } from "react-router-dom";
import { LoginSchema } from "../schemas";
import { LayoutAuth } from "../layout/LayoutAuth";
import { useAuthenticate } from "../../hooks/UseAuthenticate";

function Copyright() {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      sx={{ fontSize: 12 }}
    >
      Sistema de auntenticación con React, express, jwt y mysql
      <LinkRouter
        to="/auth/register"
        style={{ display: "block", color: "#123456" }}
      >
        ¿No tienes una cuenta? Aqui puedes crearla
      </LinkRouter>
    </Typography>
  );
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { startLogin } = useAuthenticate();

  const onSubmit = ({ email, password }) => {
    startLogin(email, password);
  };

  return (
    <LayoutAuth>
      <Container component="main" maxWidth="xs">
        <Card variant="outlined" sx={{ padding: 2, marginTop: 20 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
                required
                fullWidth
                label="Correo electrónico"
                type="text"
                autoComplete="email"
                color="secondary"
                {...register("email", { required: true })}
              />

              <TextField
                error={!!errors.password}
                helperText={errors.password?.message}
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                color="secondary"
                {...register("password", { required: true })}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Card>
      </Container>
    </LayoutAuth>
  );
};
