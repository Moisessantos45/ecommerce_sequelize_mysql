import { Request, Response } from "express";
import listProductShema from "../models/model.product";
import ecommerceDB from "../Config/dbEcommerce";
import errorHandle from "../services/errorHandle";
import listUserShema from "../models/model.users";
import { TypesProduct } from "../types/types";
import { convertStringToBoolean } from "../Utils/Utils";
import { v4 as uuidv4 } from "uuid";

const registerProduct = async (req: Request, res: Response) => {
  const { idCliente, nameProduct, status, precio } = req.body;
  const t = await ecommerceDB.transaction();

  try {
    if (precio <= 0) {
      await t.rollback();
      res.status(400).send("Price cannot be less than 0");
      return;
    }

    const findUser = await listUserShema.findByPk(idCliente, {
      transaction: t,
    });

    if (!findUser) {
      await t.rollback();
      res.status(400).send("User not found");
      return;
    }

    const findProduct = await listProductShema.findOne({
      where: { nameProduct, idUsuario: idCliente },
      transaction: t,
    });

    if (findProduct) {
      await t.rollback();
      res.status(400).send("Product already exists");
      return;
    }

    await listProductShema.create(
      {
        ...req.body,
        status: convertStringToBoolean(status),
        idProduct: uuidv4(),
      },
      { transaction: t }
    );

    await t.commit();

    res.status(200).send("Product registered");
  } catch (error) {
    await t.rollback();
    errorHandle(error, res);
  }
};

const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await listProductShema.findAll();
    if (products.length === 0) {
      res.status(400).send([]);
      return;
    }
    res.status(200).send(products);
  } catch (error) {
    errorHandle(error, res);
  }
};

const getByIdProduct = async (req: Request, res: Response) => {
  const { idProduct } = req.params;
  try {
    const product = await listProductShema.findByPk(idProduct);

    if (!product) {
      res.status(400).send({});
      return;
    }

    res.status(200).send(product);
  } catch (error) {
    errorHandle(error, res);
  }
};

const getByIdClientProduct = async (req: Request, res: Response) => {
  const idCliente = req.query.idCliente as string;
  try {
    const products = await listProductShema.findAll({
      where: { idUsuario: idCliente },
    });
    if (products.length === 0) {
      res.status(400).send([]);
      return;
    }
    res.status(200).send(products);
  } catch (error) {
    errorHandle(error, res);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { idProduct } = req.body;
  const { idCliente } = req.params;
  try {
    const findProduct = await listProductShema.findByPk(idProduct);

    if (!findProduct) {
      res.status(400).send("Product not found");
      return;
    }

    const productData: TypesProduct = findProduct.get({
      plain: true,
    });

    if (productData.idUsuario !== idCliente) {
      res.status(400).send("Product not found");
      return;
    }
    const { idProduct: _, idCliente: __, ...rest } = req.body;

    await listProductShema.update(rest, {
      where: { idProduct },
    });

    res.status(200).send("Product updated");
  } catch (error) {
    errorHandle(error, res);
  }
};

const changeStatusProduct = async (req: Request, res: Response) => {
  const { idProduct } = req.params;
  try {
    const findOneProduct = await listProductShema.findByPk(idProduct);

    if (!findOneProduct) {
      res.status(400).send("Product not found");
      return;
    }

    findOneProduct.setDataValue(
      "status",
      !findOneProduct.getDataValue("status")
    );

    await findOneProduct.save();

    res.status(200).send("Status updated");
  } catch (error) {
    errorHandle(error, res);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { idProduct, idCliente } = req.params;
  try {
    const findProduct = await listProductShema.findByPk(idProduct);

    if (!findProduct) {
      res.status(400).send("Product not found");
      return;
    }

    const productData = findProduct.getDataValue("idUsuario");

    if (productData !== idCliente) {
      res.status(400).send("Product not found");
      return;
    }

    await findProduct.destroy();

    res.status(200).send("Product deleted");
  } catch (error) {
    errorHandle(error, res);
  }
};

export {
  registerProduct,
  getProducts,
  getByIdProduct,
  getByIdClientProduct,
  updateProduct,
  changeStatusProduct,
  deleteProduct,
};
