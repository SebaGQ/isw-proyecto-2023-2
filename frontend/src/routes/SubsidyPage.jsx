import React, { useState, useEffect } from "react";
import {
  fetchSubsidies,
  deleteSubsidy,
  archiveSubsidy,
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

// Modifica tu función para manejar la eliminación/archivado en el componente
const handleDeleteSubsidy = async (subsidyId, subsidyName) => {
  try {
    const confirmed = window.confirm(`¿Estás seguro de archivar el subsidio "${subsidyName}"?`);
    
    if (!confirmed) {
      // El usuario canceló la operación
      return;
    }

    // Llama a una función que actualiza el subsidio a archivado
    await archiveSubsidy(subsidyId);

    // Puedes mostrar un mensaje de éxito o manejarlo de alguna otra manera
    toast.success(`Subsidio "${subsidyName}" archivado correctamente.`);

  } catch (error) {

    toast.error("Error archiving subsidy:", error);
    // Maneja el error, posiblemente mostrando un mensaje al usuario
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
