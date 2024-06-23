import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const name = process.env.BD_NAME_TAREAS as string;
const user = process.env.BD_USER_TAREAS as string;
const password = process.env.BD_PASS_TAREAS as string;
const host = process.env.BD_HOST_TAREAS as string;

const ecommerceDB = new Sequelize(name, user, password, {
  host: host,
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export default ecommerceDB;
