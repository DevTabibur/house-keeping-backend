import { Router } from "express";
import { ServiceController } from "./service.controller";
import authGuard from "../../middlewares/authGuard";

const router = Router();

router.post("/create", authGuard(), ServiceController.createServiceController);

export const ServiceRoutes = router;
