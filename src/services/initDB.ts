import listProductShema from "../models/model.product";
import listUserShema from "../models/model.users";

const initDB = async () => {
  await listUserShema.sync();
  await listProductShema.sync();
};

export default initDB;
