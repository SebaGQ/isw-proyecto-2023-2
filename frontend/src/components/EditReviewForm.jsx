import React, { useState } from 'react';

const EditReviewForm = ({ review, onSave }) => {
    const [editedReview, setEditedReview] = useState(review);

    const handleChange = (e) => {
        setEditedReview({ ...editedReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedReview);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Comentarios:
                <input 
                    type="text" 
                    name="comments" 
                    value={editedReview.comments} 
                    onChange={handleChange} 
                />
            </label>
            {/* Añade otros campos según sea necesario */}
            <button type="submit">Guardar Cambios</button>
        </form>
    );
};

export default EditReviewForm;
