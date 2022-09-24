import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { conn } from "../db.js";
import { JWT_SECRET } from "../config.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res
        .status(400)
        .json({ errorMessage: "Email or password not correct" });
    }

    const validatePassword = await bcrypt.compare(password, user[0].password);

    if (validatePassword) {
      const { id, name } = user[0];
      const token = jwt.sign(
        {
          id,
          name,
        },
        JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.json({
        name,
        token,
      });
    }
    return res
      .status(400)
      .json({ errorMessage: "the password is not correct" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const [user] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length > 0)
      return res.status(400).json({ errorMessage: "User already exists" });

    const response = await conn.query("INSERT INTO users SET ?", {
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: response[0].insertId,
        name,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.json({
      name,
      token,
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

export const profile = async (req, res) => {
  const { id } = req;

  const [user] = await conn.query(
    "SELECT id,name,email FROM users WHERE id = ?",
    [id]
  );

  if (!user) {
    return res.status(400).json({ errorMessage: "User don't exist" });
  }

  return res.status(200).json(user[0]);
};

export const newToken = (req, res) => {
  const { id, name } = req;

  const token = jwt.sign(
    {
      id,
      name,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return res.json({
    name,
    token,
  });
};
