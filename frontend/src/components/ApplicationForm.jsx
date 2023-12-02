import React, { useState } from 'react';
import { postApplication } from '../services/application.service';
import '../styles/ApplicationForm.css';

const ApplicationForm = ({ subsidyId, subsidyName, onClose }) => {
    const [socialPercentage, setSocialPercentage] = useState('');
    const [members, setMembers] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const applicationData = {
            subsidyId,
            socialPercentage: Number(socialPercentage),
            members: Number(members),
        };

        try {
            await postApplication(applicationData);
            onClose(); // Cierra el formulario después de enviar la postulación
        } catch (error) {
            console.error('Error al postular:', error);
            // Manejar el error mostrando un mensaje al usuario si es necesario
        }
    };

    return (
        <div className="application-form-container">
            <h2 className="form-title">Postulación para: {subsidyName}</h2> {/* Título del formulario */}
            <form onSubmit={handleSubmit} className="application-form">
                <div className="form-group">
                    <label htmlFor="socialPercentage">Porcentaje Social</label>
                    <input
                        id="socialPercentage"
                        type="number"
                        value={socialPercentage}
                        onChange={(e) => setSocialPercentage(e.target.value)}
                        placeholder="Ingresa tu porcentaje social"
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="members">Número de Miembros</label>
                    <input
                        id="members"
                        type="number"
                        value={members}
                        onChange={(e) => setMembers(e.target.value)}
                        placeholder="Ingresa el número de miembros de tu familia."
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Postular</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;
