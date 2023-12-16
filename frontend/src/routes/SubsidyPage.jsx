import React, { useState, useEffect } from "react";
import {
  fetchSubsidies,
  deleteSubsidy,
  modifySubsidy,
} from "../services/subsidy.service";
import Card from "../components/Card";
import ApplicationForm from "../components/ApplicationForm";
import Modal from "../components/Modal";
import RequirementsModal from "../components/RequirementsModal";
import "../styles/subsidyPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const SubsidyPage = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const isAdmin = user.roles[0] === "admin";
  console.log(isAdmin)

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSubsidyId, setCurrentSubsidyId] = useState(null);

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
    navigate('/createSubsidy');
  };

  useEffect(() => {
    const getSubsidies = async () => {
      try {
        const data = await fetchSubsidies();
        setSubsidies(data);
      } catch (error) {
        setError("Error al cargar los subsidios");
        // Aquí podrías registrar el error o enviarlo a un servicio de monitoreo de errores
      } finally {
        setLoading(false);
      }
    };

    getSubsidies();
  }, []);

  const handleDeleteSubsidy = async (subsidyId, subsidyName) => {
    try {
      // Llama a la función para eliminar el subsidio
      await deleteSubsidy(subsidyId);
  
      // Elimina directamente el subsidio del estado sin buscarlo
      setSubsidies((prevSubsidies) => prevSubsidies.filter((subsidy) => subsidy._id !== subsidyId));
  
      // Muestra un mensaje de tostada con el nombre del subsidio
      toast.success(`Subsidio "${subsidyName}" eliminado correctamente`, { autoClose: 2000 }); // Auto cierra la tostada después de 2000 milisegundos (opcional)
  
      // Puedes realizar otras acciones después de eliminar el subsidio
  
    } catch (error) {
      console.error("Error deleting subsidy:", error);
      setError("Error al eliminar el subsidio. Por favor, inténtalo de nuevo.");
    }
  };

  const handleModifySubsidy = async (subsidyId) => {
    try {
      // Aquí debes proporcionar los datos actualizados del subsidio en el segundo parámetro
      const updatedData = {
        /* ... */
      };
      await modifySubsidy(subsidyId, updatedData);
      // Puedes recargar la lista de subsidios después de la modificación si es necesario
      const updatedSubsidies = await fetchSubsidies();
      setSubsidies(updatedSubsidies);
    } catch (error) {
      console.error("Error modifying subsidy:", error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Ha ocurrido un error: {error}</div>;

  return (
    <div className="subsidy-page-container">
      <div className="subsidy-page-header">
        <h1>Subsidios y Beneficios</h1>
        <p>Estos son los subsidios con los que cuenta el municipio</p>
        { isAdmin? ( <div>
        <button onClick={handleCreateSubsidyClick}>Crear Subsidio</button>
        </div>
        ): ""}
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
            onDelete={() => handleDeleteSubsidy(subsidy._id,subsidy.name)}
            onModify={() => handleModifySubsidy(subsidy._id)}
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
