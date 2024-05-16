import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_URL } from "../utils/constants";

// Aqui basicamente se guardan los datos del usuario en el local storage y se almacenan en el store de Zustand, asi de esa forma se puede tener acceso a los datos del usuario en cualquier parte de la aplicacion
export const useStore = create(
  persist(
    (set, get) => ({
      teacher: null,
      getTeacher: () => get().teacher,
      login: async (data) => {
        try {
          const response = await fetch(`${API_URL}/teachers/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const teacher = await response.json();
          set({ teacher });
          return teacher;
        } catch (error) {
          console.log(error);
        }
      },
      logout: () => {
        localStorage.removeItem("teacher");
        set({ teacher: null });
      },
    }),
    {
      name: "teacher",
    }
  )
);
