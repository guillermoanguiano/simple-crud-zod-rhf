import { useEffect, useState } from "react";
import { useStore } from "../store";
import { studentsApi } from "../api/students";
import { formatDate } from "../utils/index";
import Modal from "../components/ui/Modal";

export default function Home() {
  const { teacher } = useStore() || {};
  const [data, setData] = useState(null);
  const [abrirVentana, setAbrirVentana] = useState(false);

  useEffect(() => {
    if (teacher) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const res = await studentsApi.getStudents(teacher.id);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await studentsApi.deleteStudent(id);
      setData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => setAbrirVentana(!abrirVentana);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
            Mis Alumnos
          </h1>

          <button
            className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-green-800"
            onClick={handleModal}
          >
            Agregar alumno
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Alumnos
                </th>
                <th scope="col" className="px-6 py-3">
                  Matricula
                </th>
                <th scope="col" className="px-6 py-3">
                  Edad
                </th>
                <th scope="col" className="px-6 py-3">
                  Correo
                </th>
                <th scope="col" className="px-6 py-3">
                  Empezo curso en:
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((alumno) => (
                  <tr
                    key={alumno._id}
                    className=" border-b bg-gray-800 border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                      {alumno.name}
                    </td>
                    <td className="px-6 py-4">{alumno.registrationNumber}</td>
                    <td className="px-6 py-4">{alumno.age}</td>
                    <td className="px-6 py-4">
                      {alumno.email}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(alumno.createdAt)}
                    </td>
                    <td className="px-6 py-4 flex gap-3 justify-center">
                      <button
                        type="button"
                        className="text-white text-sm bg-red-500 px-2 py-1 rounded"
                        onClick={() => deleteStudent(alumno._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>Cargando...</p>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal openModal={abrirVentana} handleModal={handleModal} id={teacher ? teacher.id : ""} />
    </>
  );
}
