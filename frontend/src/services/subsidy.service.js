import axios from "./root.service";

export const fetchSubsidies = async () => {
  try {
    const response = await axios.get("/subsidies");

    if (response.status === 204) {
      return []; // Devuelve un array vacío en caso de 204 No Content
    }
    return response.data.data; // Asumiendo que los datos están en response.data.data
  } catch (error) {
    console.error("There was an error fetching the subsidies: ", error);
    throw error;
  }
};

export const createSubsidy = async (subsidyData) => {
  try {
    const response = await axios.post("/subsidies", subsidyData);
    const { status, data } = response;

    if (status === 201) {
      return data;
    } else {
      throw new Error(`Error al crear el subsidio. Estado: ${status}`);
    }
  } catch (error) {
    console.error("Error creating subsidy desde el service:", error);
    console.error("Error creating subsidy desde el service:", error);

    if (error.response && error.response.data) {
      // Si la respuesta contiene datos, obtenemos el mensaje de error
      const errorMessage = error.response.data.message;
  
      // Lanza un nuevo error con el mensaje para que pueda ser manejado en el componente
      throw new Error(errorMessage);
    } else {
      // Si no hay datos en la respuesta, lanza un error genérico
      throw new Error("Error al crear el subsidio. Inténtalo de nuevo más tarde. desde el service");
    }
  }
};

export const deleteSubsidy = async (subsidyId) => {
  try {
    const response = await axios.delete(`/subsidies/${subsidyId}`);
    return response.data.data;
  } catch (error) {
    console.error(
      `There was an error deleting the subsidy with ID ${subsidyId}: `,
      error
    );
    throw error;
  }
};

export const modifySubsidy = async (subsidyId, updatedData) => {
  try {
    const response = await axios.put(`/subsidies/${subsidyId}`, updatedData);
    return response.data.data;
  } catch (error) {
    console.error(
      `There was an error modifying the subsidy with ID ${subsidyId}: `,
      error
    );
    throw error;
  }
};
