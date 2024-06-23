import { DataTypes, Model } from "sequelize";
import ecommerceDB from "../Config/dbEcommerce";
import listUserShema from "./model.users";
import { TypesProduct } from "../types/types";

const listProductShema = ecommerceDB.define<Model<TypesProduct>>(
  "listProduct",
  {
    idProduct: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instrucciones: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imgProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

listProductShema.belongsTo(listUserShema, {
  foreignKey: "idUsuario",
  targetKey: "idCliente",
});

export default listProductShema;
