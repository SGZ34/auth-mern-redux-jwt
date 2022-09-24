import { Router } from "express";
import { check } from "express-validator";
import {
  login,
  register,
  profile,
  newToken,
} from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validateFields.js";
import { validateToken } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("El correo es requerido")
      .isEmail()
      .withMessage("El correo debe ser válido")
      .isLength({ min: 10, max: 80 }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("La contraseña es requerida")
      .isLength({ min: 10, max: 80 }),
    validarCampos,
  ],
  login
);
router.post(
  "/register",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("El nombre es requerido")
      .isString()
      .isLength({ min: 10, max: 80 }),
    check("email")
      .not()
      .isEmpty()
      .withMessage("El correo es requerido")
      .isEmail()
      .withMessage("El correo debe ser válido")
      .isLength({ min: 10, max: 80 }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("La contraseña es requerida")
      .isLength({ min: 10, max: 80 }),
    validarCampos,
  ],
  register
);

router.get("/profile", validateToken, profile);

router.get("/renew", validateToken, newToken);

export default router;
