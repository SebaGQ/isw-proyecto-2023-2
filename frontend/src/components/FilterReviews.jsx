import React from 'react';

const FilterReviews = ({ onFilterChange }) => {
    return (
        <select onChange={(e) => onFilterChange(e.target.value)}>
            <option value="">Todos los Estados</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Aceptado">Aceptado</option>
            <option value="Rechazado">Rechazado</option>
            {/* Agrega más opciones según tus estados */}
        </select>
    );
};

export default FilterReviews;
