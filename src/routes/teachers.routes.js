import { Router } from "express";
import {
  handleValidationErrors,
  validateRequiredFields,
} from "../middlewares/handleInputErrors.js";
import { TeachersController } from "../controllers/teachers.controller.js";

const router = Router();

// POST /teachers/auth
router.post(
  "/login",
  ...validateRequiredFields(["email", "password"]),
  handleValidationErrors,
  TeachersController.loginTeacher
);

// POST /teachers/register
router.post(
  "/register",
  ...validateRequiredFields(["name", "age", "email", "password"]),
  handleValidationErrors,
  TeachersController.registerTeacher
);

export default router;
