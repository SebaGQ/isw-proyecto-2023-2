import React, { useState, useEffect } from 'react';
import { fetchApplicationsByUser } from '../services/application.service';
import DetailsModal from '../components/DetailsModal'; // Importa el componente del modal
import '../styles/ApplicationPage.css';

const ApplicationPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const handleDetailsClick = (application) => {
        setSelectedApplication(application);
        setIsDetailsOpen(true);
    };

    useEffect(() => {
        const getApplicationsByUser = async () => {
            try {
                const result = await fetchApplicationsByUser();
                if (result.state === 'Success') {
                    setApplications(result.data.map(item => item.application)); // Extraer solo el objeto de aplicación
                } else {
                    throw new Error('Failed to fetch applications');
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


    if (loading) return <div>Cargando aplicaciones...</div>;
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
                    {applications.map((application) => (
                        <tr key={application._id}>
                            <td>{application.subsidyName}</td>
                            <td>{application.status}</td>
                            <td>{application.socialPercentage}%</td>
                            <td>{application.members}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(application)}>Ver Detalles</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDetailsOpen && selectedApplication && (
                <DetailsModal
                    isOpen={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                    application={selectedApplication}
                />
            )}
        </div>
    );
};

export default ApplicationPage;