import React from 'react';
import '../styles/Card.css';

const Card = ({ name, type, description, dateEnd, onApply, onViewRequirements }) => {
  const currentDate = new Date();
  const endDate = new Date(dateEnd);
  const isExpired = endDate < currentDate;

  return (
    <div className="card">
      <div className="card-header">
        <h2>{name}</h2>
        <span className={isExpired ? 'status expired' : 'status available'}>
          {isExpired ? 'Vencido' : 'Disponible'}
        </span>
      </div>
      <div className="card-content">
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <p>{type}</p>
        {isExpired ? (
          <button disabled className="apply-button card-button disabled">Postulaciones Cerradas</button>
        ) : (
          <button onClick={onApply} className="apply-button card-button">Postular</button>
        )}
        <button onClick={onViewRequirements} className="view-requirements-button card-button">Ver Requisitos</button>
      </div>
    </div>
  );
};

export default Card;
