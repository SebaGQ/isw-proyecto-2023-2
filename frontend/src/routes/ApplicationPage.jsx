import React, { useState, useEffect, useCallback } from "react";
import { fetchApplicationsByUser } from "../services/application.service";
import { fetchReviewsByApplication } from "../services/review.service";
import DetailsModal from "../components/DetailsModal";
import Modal from "../components/Modal";
import AppealForm from "../components/AppealForm";
import "../styles/ApplicationPage.css";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faGavel } from '@fortawesome/free-solid-svg-icons';

const ApplicationPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isAppealOpen, setIsAppealOpen] = useState(false);
    const [selectedApplicationData, setSelectedApplicationData] = useState(null);
    const [loadingReviews, setLoadingReviews] = useState(false);

    const getApplicationsByUser = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchApplicationsByUser();
            if (result && result.state === "Success") {
                setApplications(result.data);
            } else {
                setApplications([]);
            }
        } catch (error) {
            setError("Error al cargar las aplicaciones");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);


    const handleDetailsClick = async (applicationData) => {
        setSelectedApplicationData(applicationData);
        setIsDetailsOpen(true);
        setLoadingReviews(true); // Inicia la carga

        try {
            const reviewsData = await fetchReviewsByApplication(applicationData.application._id);
            setSelectedApplicationData({ ...applicationData, reviews: reviewsData.data });
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoadingReviews(false); // Finaliza la carga
        }
    };


    const refetchApplications = () => {
        getApplicationsByUser();
    };

    useEffect(() => {
        getApplicationsByUser();
    }, [getApplicationsByUser]);


    const handleAppealClick = (applicationData) => {
        setSelectedApplicationData(applicationData);
        setIsAppealOpen(true);
    };

    return (
        <div className="applications-page">
            {loading ? (
                // Muestra el componente Loading cuando está cargando
                <Loading />
            ) : (
                <>
                    <h1>Mis Postulaciones</h1>
                    <table className="application-table">
                        <thead>
                            <tr>
                                <th>Nombre del Subsidio</th>
                                <th>Estado</th>
                                <th>Porcentaje Social</th>
                                <th>Número de Miembros</th>
                                <th>Ver Detalles</th>
                                <th>Apelar</th>
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
                                            <button onClick={() => handleDetailsClick({ application, review })}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </td>
                                        {application.status === 'Rechazado' && (
                                            <td>
                                                <button className="btn-appeal" onClick={() => handleAppealClick({ application, review })}>
                                                    <FontAwesomeIcon icon={faGavel} />
                                                </button>
                                            </td>
                                        )}
                                        <td>
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
                            reviews={selectedApplicationData.reviews}
                            loadingReviews={loadingReviews} // Pasas el estado de carga al modal
                        />
                    )}
                    {isAppealOpen && selectedApplicationData && (
                        <Modal isOpen={isAppealOpen} onClose={() => setIsAppealOpen(false)}>
                            <AppealForm
                                applicationId={selectedApplicationData.application._id}
                                subsidyName={selectedApplicationData.application.subsidyId.name}
                                onClose={() => setIsAppealOpen(false)}
                                onAppealSuccess={refetchApplications}
                            />
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
}



export default ApplicationPage;
