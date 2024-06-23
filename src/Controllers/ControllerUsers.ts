import listUserShema from "../models/model.users";
import { Request, Response } from "express";
import errorHandle from "../services/errorHandle";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { v4 as uuidv4 } from "uuid";

const registerUser = async (req: Request, res: Response) => {
  const { correo } = req.body;
  console.log(req.body);
  try {
    const findOneUser = await listUserShema.findOne({
      where: { correo },
    });

    if (findOneUser) {
      res.status(400).send("User already exists");
      return;
    }
    const hashPasswordUser = await hashPassword(req.body.password);

    await listUserShema.create({
      ...req.body,
      idCliente: uuidv4(),
      password: hashPasswordUser,
    });

    res.status(200).send("User registered");
  } catch (error) {
    errorHandle(error, res);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  try {
    const findOneUser = await listUserShema.findByPk(idCliente);

    if (!findOneUser) {
      res.status(400).send("User not found");
      return;
    }

    let password = findOneUser.getDataValue("password");

    if (req.body.password !== "") {
      const verifyPassword = await comparePassword(req.body.password, password);
      if (!verifyPassword) {
        password = await hashPassword(req.body.password);
      }
    }
    const { idCliente: _, ...rest } = req.body;

    await listUserShema.update(
      {
        ...rest,
        password,
      },
      {
        where: { idCliente },
      }
    );

    res.status(200).send("User updated");
  } catch (error) {
    errorHandle(error, res);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  try {
    const findOneUser = await listUserShema.findByPk(idCliente);

    if (!findOneUser) {
      res.status(400).send("User not found");
      return;
    }
    await findOneUser.destroy();

    res.status(200).send("User deleted");
  } catch (error) {
    errorHandle(error, res);
  }
};

export { registerUser, updateUser, deleteUser };
