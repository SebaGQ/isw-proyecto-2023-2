// AdminApplicationPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchApplications } from '../services/application.service';
import { fetchReviewsByApplication } from '../services/review.service';
import ApplicationDetailsModal from '../components/ApplicationDetailsModal'; // Importa tu nuevo componente
import AppealForm from '../components/AppealForm';
import Loading from '../components/Loading';

const AdminApplicationPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);

    const getApplicationsByUser = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchApplications();
            if (result && result.state === 'Success') {
                setApplications(result.data);
            } else {
                setApplications([]);
            }
        } catch (error) {
            setError('Error al cargar las aplicaciones');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getApplicationsByUser();
    }, [getApplicationsByUser]);

    const handleDetailsClick = async (applicationData) => {
        setSelectedApplication(applicationData);
        setIsDetailsOpen(true);
        setLoadingReviews(true);

        try {
            const reviewsData = await fetchReviewsByApplication(applicationData._id);
            setReviews(reviewsData.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoadingReviews(false);
        }
    };

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) return <div>Ha ocurrido un error: {error}</div>;

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="applications-page">
            <h1>Todas las postulaciones</h1>
            <table className="application-table">
                <thead>
                    <tr>
                        <th>Nombre del Subsidio</th>
                        <th>Estado</th>
                        <th>Fecha últ. modificación</th>
                        <th>Porcentaje Social</th>
                        <th>Número de Miembros</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length > 0 ? (
                        applications.map((application) => (
                            <tr key={application._id}>
                                <td>{application.subsidyId.name}</td>
                                <td>{application.status}</td>
                                <td>{formatDate(application.updatedAt)}</td>
                                <td>{application.socialPercentage}</td>
                                <td>{application.members}</td>
                                <td>
                                    <button onClick={() => handleDetailsClick(application)}>Ver Detalles</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay postulaciones disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isDetailsOpen && selectedApplication && (
                <ApplicationDetailsModal
                    isOpen={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                    application={selectedApplication}
                    reviews={reviews}
                    loadingReviews={loadingReviews}
                />
            )}
        </div>
    );
};

export default AdminApplicationPage;
