import { Router } from "express";
import { StudentsController } from "../controllers/students.controller.js";
import { param } from "express-validator";
import {
  handleValidationErrors,
  validateRequiredFields,
} from "../middlewares/handleInputErrors.js";

const router = Router();

// POST /teachers/:teacherId/students
router.post(
    "/:teacherId", 
    ...validateRequiredFields(["name", "age", "email"]),
    param("teacherId").notEmpty().isMongoId(),
    handleValidationErrors,
    StudentsController.addStudent
);

// GET /teachers/:teacherId/students
router.get(
    "/:teacherId",
    param("teacherId").notEmpty().isMongoId(),
    handleValidationErrors,
    StudentsController.getStudentsByTeacher
)

// DELETE /students/:studentId
router.delete(
    "/:studentId",
    param("studentId").notEmpty().isMongoId(),
    handleValidationErrors,
    StudentsController.deleteStudent
)

export default router;
