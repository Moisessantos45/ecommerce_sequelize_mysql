import { Router } from "express";
import { getAccess, login, logout } from "../Controllers/ControllerAuth";
import authSesion from "../Middleware/authSesion";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Auth:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the user
 *                  example: 1
 *              email:
 *                  type: string
 *                  description: The email of the user
 *                  example: 
 *              password:
 *                 type: string
 *                 description: The password of the user
 *                 example:
 *              nameUser:
 *                type: string
 *                description: The name of the user
 *                example:
 *              avatar:
 *                 type: string 
 *                 description: The avatar of the user
 *                 example:
 */

/**
 * @swagger
 * /login:
 *      post:
 *          summary: Login user
 *          tags: 
 *                - Auth
 *          description: Login user
 *          responses:
 *             200:
 *                 description: User logged in successfully
 *                 content:
 *                     application/json:
 *                       schema:
 *                         $ref: '#/components/schemas/Auth'
 */
router.post("/login", login);

/**
 * @swagger
 * /admin:
 *      get:
 *          summary: Access to the admin
 *          tags: 
 *                - Auth
 *          description: Access to the admin
 *          security:
 *                - cookieAuth: []
 */

router.get("/admin", authSesion, getAccess);

/**
 * @swagger
 * /logout:
 *      post:
 *          summary: Logout user
 *          tags: 
 *                - Auth
 *          description: Logout user
 */

router.post("/logout", logout);

export default router;
