import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get dashboard analytics
 *     description: Returns analytics data for the dashboard.
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Dashboard analytics retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  USER_ROLE_ENUM.ADMIN,
  AnalyticsController.getDashboardAnalytics,
);

export const AnalyticsRoute = router;
