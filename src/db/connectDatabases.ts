import ecommerceDB from "../Config/dbEcommerce";

const connectDatabases = () => {
  ecommerceDB
    .authenticate()
    .then(() => {
      console.log("Database connected Tareas");
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export default connectDatabases;
