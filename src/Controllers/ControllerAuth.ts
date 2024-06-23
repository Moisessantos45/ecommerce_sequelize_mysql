import { Request, Response } from "express";
import errorHandle from "../services/errorHandle";
import listUserShema from "../models/model.users";
import { comparePassword } from "../helpers/bcrypt";
import { generateToken } from "../helpers/generateToken";

const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;
  try {
    const findOneUser = await listUserShema.findOne({
      where: { correo },
    });
    if (!findOneUser) {
      res.status(400).send("User not found");
      return;
    }

    const passwordDB = findOneUser.getDataValue("password");
    const verifyPassword = await comparePassword(password, passwordDB);

    if (!verifyPassword) {
      res.status(400).send("Password incorrect");
      return;
    }
    
    const token = generateToken(findOneUser.getDataValue("idCliente"));
    const newData = {
      idCliente: findOneUser.getDataValue("idCliente"),
      typeUser: findOneUser.getDataValue("typeUser"),
      correo: findOneUser.getDataValue("correo"),
      nameUser: findOneUser.getDataValue("nameUser"),
      avatar: findOneUser.getDataValue("avatar"),
    };
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 3600000),
      })
      .status(200)
      .send(newData);
  } catch (error) {
    res.clearCookie("access_token");
    errorHandle(error, res);
  }
};

const getAccess = async (req: Request, res: Response) => {
  const idCliente = req.query.id as string;

  try {
    const findOneUser = await listUserShema.findByPk(idCliente);

    if (!findOneUser) {
      res.status(400).send("User not found");
      return;
    }

    const { typeUser, correo, nameUser, avatar } = findOneUser.dataValues;

    const newData = {
      idCliente,
      typeUser,
      correo,
      nameUser,
      avatar,
    };

    res.status(200).send(newData);
  } catch (error) {
    errorHandle(error, res);
  }
};

const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("access_token").status(200).send("Logout");
  } catch (error) {
    res.clearCookie("access_token");
    errorHandle(error, res);
  }
};

export { login, getAccess, logout };
