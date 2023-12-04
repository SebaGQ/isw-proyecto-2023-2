import React, { useState } from 'react';

const ReviewForm = ({ onSubmit, initialData }) => {
    const [comments, setComments] = useState(initialData?.comments || '');
    const [status, setStatus] = useState(initialData?.status || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ comments, status });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Comentarios:</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </div>
            <div>
                <label>Estado:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {/* Opciones de estado aquí, basadas en tu constante AVAILABILITY */}
                </select>
            </div>
            <button type="submit">Guardar Revisión</button>
        </form>
    );
};

export default ReviewForm;
