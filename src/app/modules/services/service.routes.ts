import { Router } from "express";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { ServiceController } from "./servcie.controller";

const router = Router();

// create services Admin only
router.post(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN),
  ServiceController.createService,
);
router.patch(
  "/:id",
  authGuard(USER_ROLE_ENUM.ADMIN),
  ServiceController.updateService,
);
router.delete(
  "/:id",
  authGuard(USER_ROLE_ENUM.ADMIN),
  ServiceController.deleteService,
);

// Public / user
router.get("/", ServiceController.getAllServices);

export const ServiceRoute = router;
