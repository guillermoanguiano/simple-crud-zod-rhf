import { API_URL } from "../utils/constants";

export const teachersApi = {
  register: async (data) => {
    try {
      const response = await fetch(`${API_URL}/teachers/register`, {
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
};
