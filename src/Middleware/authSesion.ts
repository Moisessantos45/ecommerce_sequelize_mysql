import { Request, Response, NextFunction } from "express";
import errorHandle from "../services/errorHandle";
import { verifyToken } from "../helpers/generateToken";

const authSesion = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.access_token) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const token = verifyToken(req.cookies.access_token);
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    req.body.id = token.id;
    req.query.id = token.id;
    next();
  } catch (error) {
    errorHandle(error, res);
  }
};

export default authSesion;
