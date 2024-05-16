import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teachers from "../models/teachers.js";
import config from "../config.js";

export class TeachersController {
  // Primero checamos si el profesor existe con una funcion reutilizable, debería ser privada pero en Javascript no existe una forma de hacerlo
  static async checkIfTeacherExists(email) {
    const teacher = await Teachers.findOne({ email });
    return teacher ? true : false;
  }

  // Despues creamos la funcion para registrar un nuevo profesor
  static async registerTeacher(req, res) {
    const { name, age, email, password } = req.body;
    try {
      const teacherExists = await TeachersController.checkIfTeacherExists(
        email
      );

      if (teacherExists) {
        throw new Error("El profesor ya existe"); // Lanzamos un error si el profesor ya existe
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña

      const newTeacher = new Teachers({
        name,
        age,
        email,
        password: hashedPassword,
      });

      const savedTeacher = await newTeacher.save(); // Guardamos el nuevo profesor en la base de datos

      res.send({
        success: true,
        teacher: savedTeacher,
        message: "Profesor registrado correctamente",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginTeacher(req, res) {
    const { email, password } = req.body;

    try {
      const teacher = await Teachers.findOne({ email });

      if (!teacher) {
        throw new Error("El usuario no existe"); // Lanzamos un error si el usuario no existe
      }

      // Comprobamos la contraseña
      const isPasswordCorrect = await bcrypt.compare(
        password,
        teacher.password
      );

      if (!isPasswordCorrect) {
        res.status(401).send({
          success: false,
          message: "Contraseña incorrecta",
        }); // Lanzamos un error si la contraseña es incorrecta
        return;
      }

      // Generamos los datos del usuario
      const teacherData = {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
      };

      // Generamos el token
      const secret = config.JWT_SECRET;
      const token = jwt.sign(teacherData, secret, {
        expiresIn: "1h",
      });

      // Enviamos la respuesta
      res.send({
        ...teacherData,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
