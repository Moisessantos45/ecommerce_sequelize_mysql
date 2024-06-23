import { Router } from "express";
import fs from "fs";

const router = Router();

const directory = __dirname;

const deleteExtension = (file: string) => {
  const extension = file.split(".").shift() || "";
  return extension;
};

const createRoutes = async () => {
  const files = fs.readdirSync(directory).filter((file) => {
    const omitExtension = deleteExtension(file);
    const extensions = ["index"].includes(omitExtension);
    return !extensions;
  });

  for (const file of files) {
    const omitExtension = deleteExtension(file);
    const pathFile = `./${omitExtension}`;
    const route = `/${omitExtension}`;

    const controller = await import(pathFile);
    router.use(route, controller.default);
  }
};

createRoutes();

export default router;
