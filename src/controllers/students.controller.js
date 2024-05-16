import Student from "../models/students.js";
import Teachers from "../models/teachers.js";

export class StudentsController {
  static async addStudent(req, res) {
    const { name, age, email } = req.body;
    const { teacherId } = req.params;

    try {
      // Obtener la matrícula más alta actual
      const lastStudent = await Student.findOne()
        .sort({ matricula: -1 })
        .exec();
      // Si no hay ninguna matrícula, la inicializar como 20240001
      const newMatricula = lastStudent ? lastStudent.registrationNumber + 1 : 20240001;

      // Crear el nuevo estudiante
      const newStudent = new Student({
        name,
        age,
        email,
        registrationNumber: newMatricula,
        teacher: teacherId,
      });

      // Guardar el nuevo estudiante
      await newStudent.save();

      // Agregar el estudiante al profesor
      await Teachers.updateOne(
        { _id: teacherId },
        { $push: { students: newStudent } }
      );

      // Devolver el estudiante creado
      res.send({
        success: true,
        student: newStudent,
        message: "Estudiante agregado correctamente",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStudentsByTeacher(req, res) {
    const { teacherId } = req.params;

    try {
      // Obtener los estudiantes del estudiante
      const students = await Student.find({ teacher: teacherId });
      res.send(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteStudent(req, res) {
    const { studentId } = req.params;
    try {
      // Eliminar el estudiante
      const deletedStudent = await Student.findByIdAndDelete(studentId);

      // Si no se elimino se manda error
      if (!deletedStudent) {
        throw new Error("No se encontro el estudiante");
      }

      // Eliminar el estudiante del profesor
      await Teachers.findByIdAndUpdate(deletedStudent.teacher, {
        $pull: { students: deletedStudent._id },
        updatedAt: new Date(),
      });

      res.send({
        success: true,
        message: "Estudiante eliminado correctamente",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
