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

export const createGuideline = async (guidelineData) => {
  try {
    const response = await axios.post("/guidelines", guidelineData);
    const { status, data } = response;

    if (status === 201) {
      return data;
    } else {
      throw new Error(`Error al crear la pauta. Estado: ${status}`);
    }
  } catch (error) {

    if (error.response && error.response.data) {
      // Si la respuesta contiene datos, obtenemos el mensaje de error
      const errorMessage = error.response.data.message;
  
      // Lanza un nuevo error con el mensaje para que pueda ser manejado en el componente
      throw new Error(errorMessage);
    } else {
      // Si no hay datos en la respuesta, lanza un error genérico
      throw new Error("Error al crear la pauta. Inténtalo de nuevo más tarde. desde el service");
    }
  }
};

export const deleteGuideline = async (guidelineId) => {
  try {
    const response = await axios.delete(`/guidelines/${guidelineId}`);
    return response.data.data;
  } catch (error) {
    console.error(
      `There was an error deleting the subsidy with ID ${guidelineIdId}: `,
      error
    );
    throw error;
  }
};

export const modifyGuideline = async (guidelineId, updatedData) => {
  try {
    const response = await axios.put(`/guidelines/${guidelineId}`, updatedData);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Si la respuesta contiene datos, obtenemos el mensaje de error
      const errorMessage = error.response.data.message;
  
      // Lanza un nuevo error con el mensaje para que pueda ser manejado en el componente
      throw new Error(errorMessage);
    } else {
      // Si no hay datos en la respuesta, lanza un error genérico
      throw new Error("Error al crear la pauta. Inténtalo de nuevo más tarde. desde el service");
    }
  }
};
