import React, { useState, useEffect } from 'react';
import { createReview } from '../services/review.service';
import { useNavigate } from 'react-router-dom';
import "../styles/CreateReviewPage.css";
import { fetchApplications } from '../services/application.service';
import { ToastContainer, toast } from 'react-toastify';

const CreateReviewPage = () => {
    const [reviewData, setReviewData] = useState({
        applicationId: '',
        comments: [],
        status: '', // Puedes dejarlo vacío para forzar al usuario a elegir
        origin: 'Postulación'
    });

    const handleCommentChange = (e, index) => {
        const newComments = [...reviewData.comments];
        newComments[index] = e.target.value;
        setReviewData({ ...reviewData, comments: newComments });
    };
    
    const handleAddComment = () => {
        setReviewData({ ...reviewData, comments: [...reviewData.comments, ''] });
    };
    
    const handleRemoveComment = (index) => {
        const newComments = [...reviewData.comments];
        newComments.splice(index, 1);
        setReviewData({ ...reviewData, comments: newComments });
    };
    

    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Carga solo las aplicaciones que el usuario tiene permitido revisar
        const loadApplications = async () => {
            try {
                // Ajusta la función fetchApplications si es necesario para filtrar las aplicaciones
                const fetchedApplications = await fetchApplications();
                setApplications(fetchedApplications.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
                toast.error('Error al cargar las aplicaciones.');
            }
        };

        loadApplications();
    }, []);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createReview(reviewData);
            toast.success('¡Revisión creada correctamente!');
            navigate('/reviews'); // O la ruta que quieras después de crear la revisión
        } catch (error) {
            console.error('Error creating review:', error);
            toast.error('Error al crear la revisión');
        }
    };

    return (
        <div className="create-review-container">
            <h2>Crear Nueva Revisión</h2>
            <form onSubmit={handleSubmit} className="create-review-form">
            <div className="form-group">
                    <label htmlFor="applicationId">Postulación</label>
                    <select
                        name="applicationId"
                        id="applicationId"
                        value={reviewData.applicationId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una postulación</option>
                        {applications.map(application => (
                            <option key={application._id} value={application._id}>
                                {application.rut[0]} - {application.subsidyId}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
        <label htmlFor="comments">Comentarios</label>
        {reviewData.comments.map((comment, index) => (
            <div key={index}>
                <input
                    type="text"
                    name="comments"
                    value={comment}
                    onChange={(e) => handleCommentChange(e, index)}
                    required
                />
                <button className="btn-remove" type="button" onClick={() => handleRemoveComment(index)}>
                    Eliminar
                </button>
            </div>
            ))}
        <button className="btn-comment" type="button" onClick={handleAddComment}>
                Agregar Comentario
            </button>
        </div>

                <div className="form-group">
                    <label htmlFor="status">Estado</label>
                    <select
                    name="status"
                    id="status"
                    value={reviewData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione el estado de la revisión</option>
                    <option value="En Revisión">En Revisión</option>
                    <option value="Aceptado">Aceptado</option>
                    <option value="Rechazado">Rechazado</option>
                    <option value="Apelacion">Apelación</option>
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="origin">Origen</label>
                    <select
                        type="text"
                        name="origin"
                        id="origin"
                        value={reviewData.origin}
                        onChange={handleChange}
                        required
                    >
                        <option value="Postulación">Postulación</option>
                        <option value="Apelación">Apelación</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Crear Revisión</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateReviewPage;
