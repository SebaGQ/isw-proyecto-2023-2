import React from 'react';
import '../styles/ReviewList.css';

const ReviewList = ({ reviews, onEditReview }) => {
        // Estados para los filtros
        const [filteredReviews, setFilteredReviews] = useState(reviews);
        const [subsidyNameFilter, setSubsidyNameFilter] = useState('');
        const [statusFilter, setStatusFilter] = useState('');
    
        // Efecto para aplicar filtros y ordenamiento
        useEffect(() => {
            let filtered = reviews;
    
            // Filtrar por nombre del subsidio si el filtro está activo
            if (subsidyNameFilter) {
                filtered = filtered.filter(review =>
                    review.applicationId.subsidyId.name.toLowerCase().includes(subsidyNameFilter.toLowerCase())
                );
            }
    
            // Filtrar por estado si el filtro está activo
            if (statusFilter) {
                filtered = filtered.filter(review =>
                    review.status.toLowerCase() === statusFilter.toLowerCase()
                );
            }
    
            // Ordenar por porcentaje social de menor a mayor
            filtered.sort((a, b) =>
                a.applicationId.socialPercentage - b.applicationId.socialPercentage
            );
    
            setFilteredReviews(filtered);
        }, [reviews, subsidyNameFilter, statusFilter]);
    return (
        <div className="review-list">
            {console.log (reviews)}
            {/* Inputs para los filtros */}
            <input
                type="text"
                placeholder="Filtrar por subsidio"
                value={subsidyNameFilter}
                onChange={e => setSubsidyNameFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filtrar por estado"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
            />
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <div key={review._id} className="review-item">
                        {/* Información de la postulación */}
                        <h3 className="review-title">Postulante: {review.applicationId.rut[0]}</h3>
                        {/* crear if si es que no encuentra subsidioId.name*/}
                        <p className="review-subsidyName">Subsidio: {review.applicationId.subsidyId.name != null ? review.applicationId.subsidyId.name : "No se encuentra el subsidio"}</p>
                        <p className="review-socialPercentage">Porcentaje Social: {review.applicationId.socialPercentage}% {review.statusPercentage ? '✔' : '❌'}</p>
                        <p className="review-applicationDate">Fecha de Postulación: {new Date(review.applicationId.applicationDate).toLocaleDateString() }{review.statusDate ? ' ✔' : ' ❌'}</p>
                        <p className="review-members">Número de Miembros: {review.applicationId.members} {review.statusMembers ? '✔' : '❌'}</p>

                        {/* Información del review */}
                        <p className="review-comments">Comentarios: {review.comments.join(", ")}</p>
                        <p className="review-status">Estado: {review.status}</p>
                        <p className="review-origin">Origen: {review.origin}</p>

                        <button className="edit-button" onClick={() => onEditReview(review)}> Editar</button>
                    </div>
                ))
            ) : (
                <p>No hay revisiones disponibles.</p>
            )}
        </div>
    );
};

export default ReviewList;

