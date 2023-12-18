import React, { useState, useEffect } from "react";
import {
  createGuideline,
  modifyGuideline,
} from "../services/guideline.service";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CreateGuidelinePage.css";

const CreateGuidelinePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const initialGuidelineData = {
    name: "",
    maxSocialPercentage: 0,
    minMembers: 0,
  };

  const [guidelineData, setGuidelineData] = useState(initialGuidelineData);
  const [error, setError] = useState({ hasError: false, message: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const guidelineIdParam = queryParams.get("guidelineId");

  useEffect(() => {
    if (guidelineIdParam) {
      setIsEditMode(true);

      // Fetch de la pauta por ID y actualización del estado

      setGuidelineData({
        name: queryParams.get("guidelineName") || "",
        maxSocialPercentage: queryParams.get("guidelineMaxSocial") || "",
        minMembers: queryParams.get("guidelineMinMembers") || "",
        // Actualiza con otros atributos de la pauta
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuidelineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await modifyGuideline(queryParams.get("guidelineId"), guidelineData);
        toast.success("¡Pauta modificada correctamente!");
      } else {
        await createGuideline(guidelineData);
        toast.success("¡Pauta creada correctamente!");
      }

      navigate("/guidelines");
    } catch (error) {
      console.error("Error creating/modifying guideline:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-guideline-container">
      <h2 className="form-title">
        {isEditMode ? "Modificar Pauta" : "Crear Nueva Pauta"}
      </h2>
      <form onSubmit={handleSubmit} className="create-guideline-form">
        {error.hasError && <div className="error-message">{error.message}</div>}
        <div className="form-group">
          <label htmlFor="GuidelineName">Nombre de la pauta</label>
          <textarea
            id="GuidelineName"
            value={guidelineData.name}
            onChange={(e) =>
              setGuidelineData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
            placeholder="Ingresa el nombre de la pauta"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="GuidelineMaxSocial">Porcentaje social maximo</label>
          <input
            id="GuidelineMaxSocial"
            type="number"
            value={guidelineData.maxSocialPercentage}
            onChange={(e) =>
              setGuidelineData((prevData) => ({
                ...prevData,
                maxSocialPercentage: e.target.value,
              }))
            }
            placeholder="Ingresa el procentaje social maximo permitido"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="GuidelineMinMembers">
            Cantidad minima de miembros
          </label>
          <input
            id="GuidelineMinMembers"
            type="number"
            value={guidelineData.minMembers}
            onChange={(e) =>
              setGuidelineData((prevData) => ({
                ...prevData,
                minMembers: e.target.value,
              }))
            }
            placeholder="Ingresa la cantidad minima de miembros permitido"
            required
            className="form-control"
          />
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Procesando..." : isEditMode ? "Modificar Pauta" : "Crear Pauta"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/guidelines")}
          >
            Cancelar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateGuidelinePage;
