import { Router } from "express";
import {
  changeStatusProduct,
  deleteProduct,
  getByIdClientProduct,
  getByIdProduct,
  getProducts,
  registerProduct,
  updateProduct,
} from "../Controllers/ControllerProducts";

const router = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *     Product:
 *      type: object
 *      properties:
 *         idProduct:
 *            type: integer
 *            description: The auto-generated id of the product
 *            example: 1
 *         nameProduct:
 *            type: string
 *            description: The name of the product
 *            example:
 *         description:
 *           type: string
 *           description: The description of the product
 *           example:
 */

router.get("/", getProducts);
router.get("/:idProduct", getByIdProduct);
router.get("/client", getByIdClientProduct);
router.post("/register", registerProduct);
router.put("/update/:idCliente", updateProduct);
router.patch("/updateStatus/:idProduct", changeStatusProduct);
router.delete("/delete/:idProduct/:idCliente", deleteProduct);

export default router;
