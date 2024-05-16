import { Router } from "express";
import StudentRoutes from "./students.routes.js";
import TeacherRoutes from "./teachers.routes.js";

const router = Router();

router.use("/students", StudentRoutes);
router.use("/teachers", TeacherRoutes);

export default router;