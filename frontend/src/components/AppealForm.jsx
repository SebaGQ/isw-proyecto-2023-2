import React, { useState, useEffect } from 'react';
import { postAppeal } from '../services/appeal.service';
import '../styles/ApplicationForm.css';

const AppealForm = ({ applicationId, onClose, onAppealSuccess }) => {
    const [newSocialPercentage, setNewSocialPercentage] = useState('');
    const [newMembers, setNewMembers] = useState('');
    const [newMemberRUTs, setNewMemberRUTs] = useState([]);

    // Actualiza los RUTs cuando cambia la cantidad de nuevos miembros
    useEffect(() => {
        setNewMemberRUTs(new Array(Number(newMembers)).fill(''));
    }, [newMembers]);

    // Maneja el cambio en los campos de RUT
    const handleRUTChange = (index, value) => {
        const updatedRUTs = [...newMemberRUTs];
        updatedRUTs[index] = value;
        setNewMemberRUTs(updatedRUTs);
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const appealData = {
            postId: applicationId,
            newSocialPercentage: Number(newSocialPercentage),
            newMembers: Number(newMembers),
            newMemberRUTs
        };

        try {
            await postAppeal(appealData);
            onClose();
            if (onAppealSuccess) {
                onAppealSuccess();
            }
        } catch (error) {
            console.error('Error al enviar la apelación:', error);
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
                <div className="form-group">
                    {newMemberRUTs.map((_, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={`newMemberRUT-${index}`}>RUT Miembro {index + 1}</label>
                            <input
                                id={`newMemberRUT-${index}`}
                                type="text"
                                value={newMemberRUTs[index]}
                                onChange={(e) => handleRUTChange(index, e.target.value)}
                                placeholder="Ingresa el nuevo RUT"
                                required
                                className="form-control"
                            />
                        </div>
                    ))}
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Enviar Apelación</button>
                </div>
            </form>
        </div>
    );
};

export default AppealForm;





