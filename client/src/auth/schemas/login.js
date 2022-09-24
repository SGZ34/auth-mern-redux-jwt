import * as yup from "yup";
import es from "yup-es";
yup.setLocale(es);

export const LoginSchema = yup
  .object({
    email: yup.string().email().min(10).max(80).required().label("El correo"),
    password: yup.string().min(10).max(80).required().label("La contraseña"),
  })
  .required();
