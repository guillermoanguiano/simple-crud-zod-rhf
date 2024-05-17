/* eslint-disable no-extra-boolean-cast */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { StudentSchema } from "../../schema";
import { studentsApi } from "../../api/students";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const isRequired = (message) => (value) => !!value ? undefined : message;

const initialValues = {
  name: "",
  age: "",
  email: "",
};

// eslint-disable-next-line react/prop-types
export default function Modal({ openModal, handleModal, id }) {
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = {
        name: values.name,
        age: values.age,
        email: values.email,
      };
      const response = await studentsApi.addStudent(data, id);

      if (!response.success) {
        throw new Error("Error al crear la tarea");
      }

      toast.success("Tarea creada con exito");
      navigate(0);

      resetForm();
      handleModal();
    } catch (error) {
      toast.error("Error al crear la tarea");
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        openModal ? "block" : "hidden"
      } fixed z-10 inset-0 overflow-y-auto left-0 top-0 bottom-0 right-0 flex items-center justify-center p-10 bg-black bg-opacity-50`}
    >
      <div className="bg-gray-500 py-4 px-4 min-w-96 min-h-60 rounded-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1>Agrega nuevo Alumno</h1>

            <button
              onClick={handleModal}
              className="border border-solid border-gray-500 p-2 rounded-full"
            >
              <IoMdClose />
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={StudentSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-4" action="#">
              <div className="space-y-2">
                <label htmlFor="name">Nombre del Alumno</label>
                <Field
                  type="text"
                  placeholder="Nombre del Alumno"
                  className="border border-solid border-gray-500 p-2 rounded-lg w-full"
                  name="name"
                  id="name"
                  validate={isRequired("Tarea es requerida")}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="age">Edad</label>
                <Field
                  name="age"
                  type="number"
                  id="age"
                  className="border border-solid border-gray-500 p-2 rounded-lg w-full"
                  placeholder="Edad del Alumno"
                  validate={isRequired("Edad es requerida")}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email">Correo del Alumno</label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className="border border-solid border-gray-500 p-2 rounded-lg w-full"
                  placeholder="Email del Alumno"
                  validate={isRequired("Email es requerida")}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="border border-solid border-gray-500 p-2 rounded-full"
              >
                Agregar Alumno
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
