import axios from "./root.service";

export const fetchGuideline = async () => {
  try {
    const response = await axios.get("/guidelines");

    if (response.status === 204) {
      return []; // Devuelve un array vacío en caso de 204 No Content
    }
    return response.data.data; // Asumiendo que los datos están en response.data.data
  } catch (error) {
    console.error("Error fetching guidelines:", error.response);
    throw error;
  }
};