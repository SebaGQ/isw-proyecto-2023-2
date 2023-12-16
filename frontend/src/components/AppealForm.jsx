import React, { useState } from 'react';
import { postAppeal } from '../services/appeal.service'; 
import '../styles/ApplicationForm.css';

const AppealForm = ({ applicationId, onClose, onAppealSuccess }) => {
    const [newSocialPercentage, setNewSocialPercentage] = useState('');
    const [newMembers, setNewMembers] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appealData = {
            postId: applicationId,
            newSocialPercentage: Number(newSocialPercentage),
            newMembers: Number(newMembers),
        };

        try {
            await postAppeal(appealData);
            onClose(); // Cierra el formulario después de enviar la apelación
            if (onAppealSuccess) {
                onAppealSuccess(); // Llama a la función para refrescar la lista de postulaciones
            }
        } catch (error) {
            console.error('Error al enviar la apelación:', error);
            // Manejar el error mostrando un mensaje al usuario si es necesario
        }
    };

    return (
        <div className="application-form-container">
            <h2 className="form-title">Apelación para la Postulación: {applicationId}</h2>
            <form onSubmit={handleSubmit} className="application-form">
                <div className="form-group">
                    <label htmlFor="newSocialPercentage">Nuevo Porcentaje Social</label>
                    <input
                        id="newSocialPercentage"
                        type="number"
                        value={newSocialPercentage}
                        onChange={(e) => setNewSocialPercentage(e.target.value)}
                        placeholder="Ingresa el nuevo porcentaje social"
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newMembers">Nuevo Número de Miembros</label>
                    <input
                        id="newMembers"
                        type="number"
                        value={newMembers}
                        onChange={(e) => setNewMembers(e.target.value)}
                        placeholder="Ingresa el nuevo número de miembros de tu familia"
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Enviar Apelación</button>
                </div>
            </form>
        </div>
    );
};

export default AppealForm;
