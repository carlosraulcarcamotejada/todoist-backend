import { verify } from "jsonwebtoken";
import { RequestHandler } from "express";
import { JwtPayload } from "../types/JwtPayload";

export const validateJWT: RequestHandler = (req, res, next) => {
  const token = req.header("todoist-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "There is no token in the request.",
    });
  }

  try {
    const payload = verify(
      token,
      process.env.SECRET_JWT_SEED || ""
    ) as JwtPayload;
    
    const { _id } = payload;
    req.body._id = _id;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Ivalid token.",
    });
  }
  next();
};
