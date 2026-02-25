import { Router } from "express";
import { AuthController } from "./auth.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & User Management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 *
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: john@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 *
 *     ChangePasswordInput:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           example: 123456
 *         newPassword:
 *           type: string
 *           example: 654321
 *
 *     ForgotPasswordInput:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: john@gmail.com
 *
 *     ResetPasswordInput:
 *       type: object
 *       required:
 *         - token
 *         - newPassword
 *       properties:
 *         token:
 *           type: string
 *           example: reset-token-here
 *         newPassword:
 *           type: string
 *           example: 12345678
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", AuthController.registerNewUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful (returns JWT token)
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", AuthController.loginExistingUser);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change password
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInput'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/change-password", AuthController.ChangePassword);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", authGuard(), AuthController.logOutUser);

/**
 * @swagger
 * /auth/get-me:
 *   get:
 *     summary: Get logged in user info
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User info retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/get-me", authGuard(), AuthController.getMe);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password (send reset email)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordInput'
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post("/forgot-password", AuthController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoute = router;
