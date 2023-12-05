import React, { useState, useEffect } from "react";
import {
  fetchSubsidies,
  deleteSubsidy,
  modifySubsidy,
} from "../services/subsidy.service";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import ApplicationForm from "../components/ApplicationForm";
import Modal from "../components/Modal";
import RequirementsModal from "../components/RequirementsModal";
import "../styles/subsidyPage.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SubsidyPage = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Asumiendo que tu contexto de autenticación tiene la información del usuario con un campo "role"
  const {user} = useAuth();
  const isAdmin = user.roles.some(role => role.name === 'admin');
  console.log('isAdmin:', isAdmin);

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
      await deleteSubsidy(subsidyId);
      // Puedes recargar la lista de subsidios después de la eliminación si es necesario
      const updatedSubsidies = subsidies.filter(
        (subsidy) => subsidy._id !== subsidyId
      );
      setSubsidies(updatedSubsidies);

      // Mostrar notificación de éxito
      toast.success(`Subsidio "${subsidyName}" eliminado exitosamente`);
    } catch (error) {
      console.error("Error deleting subsidy:", error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
      toast.error('Error al eliminar el subsidio');
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
            onDelete={() => isAdmin==true && handleDeleteSubsidy(subsidy._id)}
            onModify={() => isAdmin==true && handleModifySubsidy(subsidy._id)}
          >
            {/* Botones para eliminar y modificar */}
            {user.roles[0].name=== 'admin' ? (
              <div>
                <button onClick={() => handleDeleteSubsidy(subsidy._id, subsidy.name)}>
                  Eliminar
                </button>
                <button onClick={() => handleModifySubsidy(subsidy._id)}>
                  Modificar
                </button>
              </div>
            ):""}
          </Card>
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
