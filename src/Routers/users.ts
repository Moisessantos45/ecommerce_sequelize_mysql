import { Router } from "express";
import {
  deleteUser,
  registerUser,
  updateUser,
} from "../Controllers/ControllerUsers";

const router = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *     User:
 *      type: object
 *      properties:
 *        idCliente:
 *            type: integer
 *            description: The auto-generated id of the user
 *            example: 1
 *        typeUser:
 *            type: string
 *            description: The type of user
 *            example: admin
 *        correo:
 *            type: string
 *            description: The email of the user
 *            example:
 *        nameUser:
 *            type: string
 *            description: The name of the user
 *            example: user1
 *        password:
 *            type: string
 *            description: The password of the user
 *            example: 123456
 *        avatar:
 *           type: string
 *           description: The avatar of the user
 *           example: avatar.jpg
 */

/**
 * @swagger
 * /users:
 *    get:
 *      summary: Get all users
 *      tags:
 *        - Users
 */

router.post("/register", registerUser);
router.put("/update/:idCliente", updateUser);
router.delete("/delete/:idCliente", deleteUser);

export default router;
