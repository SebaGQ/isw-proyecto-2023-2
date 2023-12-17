import React, { useState, useEffect } from 'react';
import { postApplication } from '../services/application.service';
import '../styles/ApplicationForm.css';

const ApplicationForm = ({ subsidyId, subsidyName, onClose }) => {
    const [socialPercentage, setSocialPercentage] = useState('');
    const [members, setMembers] = useState('');
    const [memberRUTs, setMemberRUTs] = useState([]);

    // Actualiza los RUTs cuando cambia la cantidad de miembros
    useEffect(() => {
        setMemberRUTs(new Array(Number(members)).fill(''));
    }, [members]);

    // Maneja el cambio en los campos de RUT
    const handleRUTChange = (index, value) => {
        const updatedRUTs = [...memberRUTs];
        updatedRUTs[index] = value;
        setMemberRUTs(updatedRUTs);
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const applicationData = {
            subsidyId,
            socialPercentage: Number(socialPercentage),
            members: Number(members),
            rut: memberRUTs,
        };

        try {
            await postApplication(applicationData);
            onClose(); // Cierra el formulario después de enviar la postulación
        } catch (error) {
            console.error('Error al postular:', error);
        }
    };

    return (
        <div className="application-form-container">
            <h2 className="form-title">Postulación para: {subsidyName}</h2>
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
                        placeholder="Ingresa el número de miembros de tu familia"
                        required
                        className="form-control"
                    />
                </div>
                {memberRUTs.map((_, index) => (
                    <div className="form-group" key={index}>
                        <label htmlFor={`memberRUT-${index}`}>RUT Miembro {index + 1}</label>
                        <input
                            id={`memberRUT-${index}`}
                            type="text"
                            value={memberRUTs[index]}
                            onChange={(e) => handleRUTChange(index, e.target.value)}
                            placeholder="Ingresa el RUT"
                            required
                            className="form-control"
                        />
                    </div>
                ))}
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Postular</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;
