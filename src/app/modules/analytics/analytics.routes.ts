import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";

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
router.get("/", AnalyticsController.getDashboardAnalytics);

export const AnalyticsRoute = router;
