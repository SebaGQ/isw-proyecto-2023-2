import React from 'react';
import Modal from './Modal';

const RequirementsModal = ({ isOpen, onClose, subsidy }) => {
    if (!subsidy) return null; // No renderizar si no hay datos de subsidy

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Requisitos {subsidy.name}</h2>
            <p><strong>Porcentaje Social Máximo:</strong> {subsidy.guidelineId.maxSocialPercentage}%</p>
            <p><strong>Número Mínimo de Miembros:</strong> {subsidy.guidelineId.minMembers}</p>
        </Modal>
    );
};

export default RequirementsModal;
