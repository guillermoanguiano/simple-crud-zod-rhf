import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("email invalido").required("El email es requerido"),
    password: Yup.string().required("La contrasena es requerida"),
})

export const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Muy corta!")
        .max(50, "Muy Larga!")
        .required("Primer nombre Requerido"),
    lastName: Yup.string()
        .min(2, "Muy corta!")
        .max(50, "Muy Larga!")
        .required("Segundo nombre Requerido"),
    age: Yup.number().min(1, "Muy corta!").max(100, "Muy Larga!").required("Edad Requerida"),
    email: Yup.string().email("Email Invalido").required("El email es requerido"),
    password: Yup.string().required("La contrasena es requerida"),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords deben coincidir"
    ),
});

export const StudentSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    age: Yup.number().required("La edad es requerida"),
    email: Yup.string().email("Email Invalido").required("El email es requerido"),
})