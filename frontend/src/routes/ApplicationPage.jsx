import React, { useState, useEffect } from 'react';
import { fetchApplicationsByUser } from '../services/application.service';
import DetailsModal from '../components/DetailsModal';
import Modal from '../components/Modal';
import AppealForm from '../components/AppealForm'; // Asegúrate de importar AppealForm
import '../styles/ApplicationPage.css';
import Loading from '../components/Loading';

const ApplicationPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isAppealOpen, setIsAppealOpen] = useState(false); // Nuevo estado para el modal de apelación
    const [selectedApplicationData, setSelectedApplicationData] = useState(null);

    const handleDetailsClick = (applicationData) => {
        setSelectedApplicationData(applicationData);
        setIsDetailsOpen(true);
    };

    const handleAppealClick = (applicationData) => {
        setSelectedApplicationData(applicationData);
        setIsAppealOpen(true); // Abrir el modal de apelación
    };
    
    useEffect(() => {
        const getApplicationsByUser = async () => {
            try {
                const result = await fetchApplicationsByUser();
    
                // Si la API devuelve un estado de éxito y contiene datos
                if (result && result.state === 'Success') {
                    setApplications(result.data);
                } else {
                    // Si la API devuelve un array vacío (en caso de 204 No Content)
                    setApplications([]);
                }
            } catch (error) {
                setError('Error al cargar las aplicaciones');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        getApplicationsByUser();
    }, []);

        if (loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Loading />
                </div>
            );
        }
        if (error) return <div>Ha ocurrido un error: {error}</div>;

        return (
            <div className="applications-page">
                <h1>Mis Postulaciones</h1>
                <table className="application-table">
                    <thead>
                        <tr>
                            <th>Nombre del Subsidio</th>
                            <th>Estado</th>
                            <th>Porcentaje Social</th>
                            <th>Número de Miembros</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {applications.length > 0 ? (
                        applications.map(({ application, review }) => (
                            <tr key={application._id}>
                                <td>{application.subsidyId.name}</td>
                                <td>{application.status}</td>
                                <td>{application.socialPercentage}%</td>
                                <td>{application.members}</td>
                                <td>
                                    <button onClick={() => handleDetailsClick({ application, review })}>Ver Detalles</button>
                                    {application.status === 'Rechazado' && (
                                        <button className="btn-appeal" onClick={() => handleAppealClick({ application, review })}>Apelar</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay postulaciones disponibles.</td>
                        </tr>
                    )}
                </tbody>
                </table>
                {isDetailsOpen && selectedApplicationData && (
                    <DetailsModal
                        isOpen={isDetailsOpen}
                        onClose={() => setIsDetailsOpen(false)}
                        application={selectedApplicationData.application}
                        review={selectedApplicationData.review}
                    />
                )}
                {isAppealOpen && selectedApplicationData && (
                    <Modal isOpen={isAppealOpen} onClose={() => setIsAppealOpen(false)}>
                        <AppealForm 
                            applicationId={selectedApplicationData.application._id} 
                            onClose={() => setIsAppealOpen(false)} 
                        />
                    </Modal>
                )}
            </div>
        );    };

    export default ApplicationPage;
