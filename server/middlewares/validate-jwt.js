import { request, response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
export const validateToken = (req = request, res = response, next) => {
  const token = req.header("x-access-token");

  if (!token) {
    return res.status(401).json({ errorMessage: "no token provided" });
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  req.id = decoded.id;
  req.name = decoded.name;
  next();
};
