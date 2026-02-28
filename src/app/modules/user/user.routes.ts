import { Router } from "express";
import { UserController } from "./user.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "./user.constant";
import uploadMiddleware from "../../middlewares/fileUploadAndConvertToWebP";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and profile APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *         fullName:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@example.com
 *         phoneNo:
 *           type: string
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [admin, guest, editor, user]
 *           example: user
 *         status:
 *           type: string
 *           enum: [active, inactive, banned, blocked]
 *           example: active
 *         avatar:
 *           type: string
 *           example: uploads/avatar.webp
 *
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *         phoneNo:
 *           type: string
 *           example: "+1234567890"
 *         status:
 *           type: string
 *           enum: [active, inactive, banned, blocked]
 *         avatar:
 *           type: string
 *           format: binary
 *           description: User profile picture (WebP recommended)
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all user profiles
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search by fullName, email, or phoneNo
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, guest, editor, user]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, banned, blocked]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: User list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 meta:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get("/", authGuard(USER_ROLE_ENUM.ADMIN), UserController.getAllUser);

/**
 * @swagger
 * /user/{userId}:
 *   patch:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.patch(
  "/:userId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR, USER_ROLE_ENUM.GUEST),
  uploadMiddleware,
  UserController.updateProfile,
);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user specifics
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:userId",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR, USER_ROLE_ENUM.GUEST),
  UserController.getSingleUserById,
);

/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.delete(
  "/:userId",
  authGuard(USER_ROLE_ENUM.ADMIN),
  UserController.deleteUser,
);

export const UserRoute = router;
