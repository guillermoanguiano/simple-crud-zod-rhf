import { API_URL } from "../utils/constants";

export const studentsApi = {
  addStudent: async (data, id) => {
    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  },
  getStudents: async (id) => {
    try {
      const response = await fetch(`${API_URL}/students/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteStudent: async (id) => {
    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
};
