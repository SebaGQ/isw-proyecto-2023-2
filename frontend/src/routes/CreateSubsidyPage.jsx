import React, { useState, useEffect } from "react";
import { createSubsidy } from "../services/subsidy.service";
import { useNavigate } from "react-router-dom";
import "../styles/CreateSubsidyPage.css";
import { fetchGuideline } from "../services/guideline.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSubsidyPage = () => {
  const [subsidyData, setSubsidyData] = useState({
    name: "",
    description: "",
    amount: "",
    dateStart: "",
    dateEnd: "",
    typeSubsidy: "",
    guidelineId: "",
  });

  const [error, setError] = useState({ hasError: false, message: "" }); // Nuevo estado para manejar errores
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubsidyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const subsidyDataWithGuideline = {
        ...subsidyData,
        guidelineId: selectedGuidelineId,
      };

      console.log(selectedGuidelineId);
      console.log("Subsidy Data with Guideline:", subsidyDataWithGuideline);

      await createSubsidy(subsidyDataWithGuideline);
      // Muestra un toast de éxito
      toast.success("¡Subsidio creado correctamente!");

      // Redirige a la página de subsidios después de la creación exitosa
      navigate("/subsidies");

    } catch (error) {
      console.error("Error creating subsidy desde la página:", error);

      // Muestra un toast de error con el mensaje recibido desde el servicio
      toast.error(error.message);
    }
  };

  //pautas
  const [guidelines, setGuidelines] = useState([]); // Nuevo estado para almacenar las pautas
  const [selectedGuidelineId, setSelectedGuidelineId] = useState(""); // Nuevo estado para almacenar el ID de la guía seleccionada

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const guidelinesData = await fetchGuideline(); // Ajusta el nombre de la función
        setGuidelines(guidelinesData);
      } catch (error) {
        console.error("Error fetching guidelines:", error);
      }
    };

    fetchGuidelines();
  }, []);

  return (
    <div className="create-subsidy-container">
      <h2 className="form-title">Crear Nuevo Subsidio</h2>{" "}
      {/* Título del formulario */}
      <form onSubmit={handleSubmit} className="create-subsidy-form">
        {error.hasError && <div className="error-message">{error.message}</div>}
        <div className="form-group">
          <label htmlFor="subsidyName">Nombre del Subsidio</label>
          <input
            id="subsidyName"
            type="text"
            value={subsidyData.name}
            onChange={(e) =>
              setSubsidyData({ ...subsidyData, name: e.target.value })
            }
            placeholder="Ingresa el nombre del subsidio"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subsidyDescription">Descripción del Subsidio</label>
          <textarea
            id="subsidyDescription"
            value={subsidyData.description}
            onChange={(e) =>
              setSubsidyData({ ...subsidyData, description: e.target.value })
            }
            placeholder="Ingresa la descripción del subsidio"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subsidyAmount">Monto del Subsidio</label>
          <input
            id="subsidyAmount"
            type="number"
            value={subsidyData.amount}
            onChange={(e) =>
              setSubsidyData({ ...subsidyData, amount: e.target.value })
            }
            placeholder="Ingresa el monto del subsidio"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subsidyDateStart">Fecha de Inicio del Subsidio</label>
          <input
            id="subsidyDateStart"
            type="date"
            value={subsidyData.dateStart}
            onChange={(e) =>
              setSubsidyData({ ...subsidyData, dateStart: e.target.value })
            }
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subsidyDateEnd">Fecha de Fin del Subsidio</label>
          <input
            id="subsidyDateEnd"
            type="date"
            value={subsidyData.dateEnd}
            onChange={(e) =>
              setSubsidyData({ ...subsidyData, dateEnd: e.target.value })
            }
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subsidyType">Tipo de Subsidio</label>
          <input
            id="subsidyType"
            type="text"
            value={subsidyData.typeSubsidy}
            onChange={(e) =>
              setSubsidyData({ ...subsidyData, typeSubsidy: e.target.value })
            }
            placeholder="Ingresa el tipo de subsidio"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subsidyGuidelineId">ID de la Guía del Subsidio</label>
          <select
            id="subsidyGuidelineId"
            value={selectedGuidelineId}
            onChange={(e) => setSelectedGuidelineId(e.target.value)}
            required
            className="form-control"
          >
            <option value="">Selecciona una guía</option>
            {guidelines.map((guideline) => (
              <option key={guideline._id} value={guideline._id}>
                {guideline.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Crear Subsidio
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateSubsidyPage;
