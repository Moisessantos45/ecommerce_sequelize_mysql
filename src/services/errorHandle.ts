import { Response } from "express";

const errorHandle = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    const msg = error.message;
    res.status(400).send(msg);
    return;
  }
  res.status(500).send("Internal Server Error");
};

export default errorHandle;
