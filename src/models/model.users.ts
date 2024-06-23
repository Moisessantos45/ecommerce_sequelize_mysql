import { DataTypes } from "sequelize";
import ecommerceDB from "../Config/dbEcommerce";

const listUserShema = ecommerceDB.define("listUsers", {
  idCliente: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  typeUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  indexes:[
    {
      unique:true,
      fields:['idCliente']
    }
  ]
}
);

export default listUserShema;
