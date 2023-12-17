import React, { useState, useEffect } from "react";
import {
    fetchGuideline,
    deleteGuideline,
} from "../services/guideline.service";
import Card from "../components/CardGuilelines";
import "../styles/subsidyPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuidelinePage = () => {
  const [guideline, setGuideline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const isAdmin = user.roles[0] === "admin";


  const handleCreateGuidelineClick = () => {
    // Utiliza navigate para redirigir a la página de creación de subsidios
    navigate("/createguideline");
  };

  const getGuidelines = async () => {
    try {
      const guidelines = await fetchGuideline();
      setGuideline(guidelines);
    } catch (error) {
      setError("Error al cargar las pautas");
      // Manejar el error aquí
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuidelines();
  }, []);


  const handleModifyGuideline = (guideline) => {
    // Utiliza navigate para redirigir a la página de creación de subsidios
    navigate(`/createguideline?guidelineId=${guideline._id}&guidelineName=${guideline.name}&guidelineMaxSocial=${guideline.maxSocialPercentage}&guidelineMinMembers=${guideline.minMembers}`);
  };

  const handleDeleteGuideline = async (guidelineId, guidelineName) => {
    try {
      const confirmed = window.confirm(
        `¿Estás seguro de eliminar la pauta "${guidelineName}"?`
      );

      if (!confirmed) {
        // El usuario canceló la operación
        return;
      }

      // Llama a la función para eliminar el subsidio
      await deleteGuideline(guidelineId);

      // Elimina directamente el subsidio del estado sin buscarlo
      setGuideline((prevGuidelines) =>
        prevGuidelines.filter((guideline) => guideline._id !== guidelineId)
      );

      // Muestra un mensaje de tostada con el nombre del subsidio
      toast.success(`Pauta "${guidelineName}" eliminado correctamente`, {
        autoClose: 2000,
      }); // Auto cierra la tostada después de 2000 milisegundos (opcional)

      // Puedes realizar otras acciones después de eliminar el subsidio
      getGuidelines();
    } catch (error) {
      console.error("Error deleting guideline:", error);
      setError("Error al eliminar la pauta. Por favor, inténtalo de nuevo.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error: {error}</div>;

  return (
    <div className="subsidy-page-container">
      <div className="subsidy-page-header">
        <h1>Pautas</h1>
        <p>Estas son las pautas que tiene el municipio</p>
        <div className="button-container">
          {isAdmin ? (
            <div>
              <button onClick={handleCreateGuidelineClick}>Crear pauta</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="card-container">
        {guideline.map((guideline) => (
          <Card
            key={guideline._id}
            name={guideline.name}
            maxSocialPercentage={guideline.maxSocialPercentage}
            minMembers={guideline.minMembers}
            onModify={() => handleModifyGuideline(guideline)}
            onDelete={() => { handleDeleteGuideline(guideline._id, guideline.name);}}
          ></Card>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default GuidelinePage;