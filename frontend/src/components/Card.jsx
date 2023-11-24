import React from 'react';
import '../styles/Card.css'; // Asegúrate de crear y enlazar un archivo de estilos para Card

const Card = ({ title, description }) => {
    return (
      <div className="card">
        <div className="card-header">
          {title}
        </div>
        <div className="card-content">
          <p>{description}</p>
        </div>
        <div className="card-footer">
          {/* Puedes agregar botones o acciones aquí */}
        </div>
      </div>
    );
};

export default Card;