import React, { useState, useEffect } from "react";
import {
  createSubsidy,
  modifySubsidy,
} from "../services/subsidy.service";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CreateSubsidyPage.css";
import { fetchGuideline } from "../services/guideline.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSubsidyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const initialSubsidyData = {
    name: "",
    description: "",
    amount: "",
    dateStart: "",
    dateEnd: "",
    typeSubsidy: "",
    guidelineId: "",
  };

  const [subsidyData, setSubsidyData] = useState(initialSubsidyData);
  const [error, setError] = useState({ hasError: false, message: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [guidelines, setGuidelines] = useState([]);
  const [selectedGuidelineId, setSelectedGuidelineId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const guidelinesData = await fetchGuideline();
        setGuidelines(guidelinesData);
      } catch (error) {
        console.error("Error fetching guidelines:", error);
      }
    };

    fetchGuidelines();
  }, []); // Solo se ejecutará una vez al montar el componente

  const subsidyIdParam = queryParams.get("subsidyId");

  useEffect(() => {


    if (subsidyIdParam) {
      // Si hay un subsidyId en la URL, se trata de una edición
      setIsEditMode(true);

      // Fetch del subsidio por ID y actualización del estado
      setSubsidyData({
        name: queryParams.get("subsidyName") || "",
        description: queryParams.get("subsidyDescription") || "",
        amount: queryParams.get("subsidyAmount") || "",
        dateStart: formatDate(queryParams.get("subsidyStart")) || "",
        dateEnd: formatDate(queryParams.get("subsidyEnd")) || "",
        typeSubsidy: queryParams.get("subsidyType") || "",
        guidelineId: queryParams.get("subsidyGuideline") || "",
      });

      setSelectedGuidelineId(queryParams.get("subsidyGuideline") || "");
    }
  }, []);

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
        dateStart: new Date(subsidyData.dateStart).toISOString().split("T")[0],
        dateEnd: new Date(subsidyData.dateEnd).toISOString().split("T")[0],
      };

      if (isEditMode) {
        await modifySubsidy(subsidyIdParam, subsidyDataWithGuideline);
        toast.success("¡Subsidio modificado correctamente!");
      } else {
        await createSubsidy(subsidyDataWithGuideline);
        toast.success("¡Subsidio creado correctamente!");
      }

      navigate("/subsidies");
    } catch (error) {
      console.error("Error creating/modifying subsidy:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-subsidy-container">
      <h2 className="form-title">{isEditMode ? "Modificar Subsidio" : "Crear Subsidio"}</h2>{" "}
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
              setSubsidyData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
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
              setSubsidyData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
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
              setSubsidyData((prevData) => ({
                ...prevData,
                amount: e.target.value,
              }))
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
              setSubsidyData((prevData) => ({
                ...prevData,
                dateStart: e.target.value,
              }))
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
              setSubsidyData((prevData) => ({
                ...prevData,
                dateEnd: e.target.value,
              }))
            }
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subsidyType">Tipo de Subsidio</label>
          <select
            id="subsidyType"
            value={subsidyData.typeSubsidy}
            onChange={(e) =>
              setSubsidyData((prevData) => ({
                ...prevData,
                typeSubsidy: e.target.value,
              }))
            }
            required
            className="form-control"
          >
            <option value="">Selecciona un tipo</option>
            <option value="Subsidio">Subsidio</option>
            <option value="Beneficio">Beneficio</option>
          </select>
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Procesando..." : isEditMode ? "Modificar Subsidio" : "Crear Subsidio"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/subsidies")}
          >
            Cancelar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateSubsidyPage;
