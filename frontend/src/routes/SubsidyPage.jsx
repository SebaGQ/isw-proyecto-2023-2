import React, { useState, useEffect } from "react";
import {
  fetchSubsidies,
  deleteSubsidy,
  archiveSubsidy,
} from "../services/subsidy.service";
import Card from "../components/Card";
import ApplicationForm from "../components/ApplicationForm";
import Modal from "../components/Modal";
import RequirementsModal from "../components/RequirementsModal";
import "../styles/subsidyPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SubsidyPage = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const isAdmin = user.roles[0] === "admin";

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showArchivedSubsidies, setShowArchivedSubsidies] = useState(false);

  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const [currentSubsidy, setCurrentSubsidy] = useState(null);

  const handleApplyClick = (subsidy) => {
    setCurrentSubsidy(subsidy); // Guarda el subsidio completo
    setIsFormOpen(true);
  };

  const handleViewRequirementsClick = (subsidy) => {
    setCurrentSubsidy(subsidy); // Actualizado para pasar el objeto de subsidio completo
    setIsRequirementsOpen(true);
  };

  const handleCreateSubsidyClick = () => {
    // Utiliza navigate para redirigir a la página de creación de subsidios
    navigate("/createSubsidy");
  };

  const getSubsidies = async () => {
    try {
      const activeSubsidies = await fetchSubsidies(!showArchivedSubsidies);
      setSubsidies(activeSubsidies);
    } catch (error) {
      setError("Error al cargar los subsidios");
      // Manejar el error aquí
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubsidies();
  }, [showArchivedSubsidies]);

  // Modifica tu función para manejar la eliminación/archivado en el componente
  const handleArchiveSubsidy = async (
    subsidyId,
    subsidyName,
    currentArchiveState
  ) => {
    try {
      const actionVerb = currentArchiveState ? "desarchivar" : "archivar";
      const actionVerb2 = currentArchiveState ? "desarchivado" : "archivado";

      const confirmed = window.confirm(
        `¿Estás seguro de ${actionVerb} el subsidio "${subsidyName}"?`
      );

      if (!confirmed) {
        // El usuario canceló la operación
        return;
      }

      // Llama a una función que actualiza el subsidio a archivado
      await archiveSubsidy(subsidyId, !currentArchiveState);

      // Puedes mostrar un mensaje de éxito o manejarlo de alguna otra manera
      toast.success(`Subsidio "${subsidyName}" ${actionVerb2} correctamente.`);
      getSubsidies();
    } catch (error) {
      toast.error("Error archiving subsidy:", error);
      // Maneja el error, posiblemente mostrando un mensaje al usuario
    }
  };

  const handleModifySubsidy = (subsidy) => {
    // Utiliza navigate para redirigir a la página de creación de subsidios
    navigate(`/createSubsidy?subsidyId=${subsidy._id}&subsidyName=${subsidy.name}&subsidyDescription=${subsidy.description}&subsidyAmount=${subsidy.amount}&subsidyStart=${subsidy.dateStart}&subsidyEnd=${subsidy.dateEnd}&subsidyType=${subsidy.typeSubsidy}&subsidyGuideline=${subsidy.guidelineId}`);
  };

  const handleDeleteSubsidy = async (subsidyId, subsidyName) => {
    try {
      const confirmed = window.confirm(
        `¿Estás seguro de eliminar el subsidio "${subsidyName}"?`
      );

      if (!confirmed) {
        // El usuario canceló la operación
        return;
      }

      // Llama a la función para eliminar el subsidio
      await deleteSubsidy(subsidyId);

      // Elimina directamente el subsidio del estado sin buscarlo
      setSubsidies((prevSubsidies) =>
        prevSubsidies.filter((subsidy) => subsidy._id !== subsidyId)
      );

      // Muestra un mensaje de tostada con el nombre del subsidio
      toast.success(`Subsidio "${subsidyName}" eliminado correctamente`, {
        autoClose: 2000,
      }); // Auto cierra la tostada después de 2000 milisegundos (opcional)

      // Puedes realizar otras acciones después de eliminar el subsidio
      getSubsidies();
    } catch (error) {
      console.error("Error deleting subsidy:", error);
      setError("Error al eliminar el subsidio. Por favor, inténtalo de nuevo.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error: {error}</div>;

  return (
    <div className="subsidy-page-container">
      <div className="subsidy-page-header">
        <h1>Subsidios y Beneficios</h1>
        <p>Estos son los subsidios con los que cuenta el municipio</p>
        <div className="button-container">
          {isAdmin ? (
            <div className="button-container">
              <button onClick={handleCreateSubsidyClick}>Crear Subsidio</button>
              
              <button
                onClick={() => setShowArchivedSubsidies(!showArchivedSubsidies)}
              >
                {showArchivedSubsidies
                  ? "Ocultar Archivados"
                  : "Mostrar Archivados"}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="card-container">
        {subsidies.map((subsidy) => (
          <Card
            key={subsidy._id}
            name={subsidy.name}
            description={subsidy.description}
            type={subsidy.typeSubsidy}
            dateEnd={subsidy.dateEnd}
            onApply={() => handleApplyClick(subsidy)}
            onViewRequirements={() => handleViewRequirementsClick(subsidy)}
            onModify={() => handleModifySubsidy(subsidy)}
            // Agrega onArchive y onDelete condicionalmente
            onDelete={() => {
              if (showArchivedSubsidies) {
                handleDeleteSubsidy(subsidy._id, subsidy.name);
              }
            }}
            onArchive={() =>
              handleArchiveSubsidy(subsidy._id, subsidy.name, subsidy.archive)
            }
            showArchivedSubsidies={showArchivedSubsidies}
            archiveState={subsidy.archive}
          ></Card>
        ))}
        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <ApplicationForm
            subsidyId={currentSubsidy?._id}
            subsidyName={currentSubsidy?.name}
            onClose={() => setIsFormOpen(false)}
          />
        </Modal>
        <RequirementsModal
          isOpen={isRequirementsOpen}
          onClose={() => setIsRequirementsOpen(false)}
          subsidy={currentSubsidy}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SubsidyPage;
