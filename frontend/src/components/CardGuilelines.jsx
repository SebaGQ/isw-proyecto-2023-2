import React from "react";
import "../styles/Card.css";

const Card = ({
  name,
  maxSocialPercentage,
  minMembers,
  onModify,
  onDelete,
}) => {


  return (
    <div className="card">
      <div className="card-header">
        <h2>{name}</h2>
      </div>
      <div className="card-content">
        <p>Max Social Percentage: {maxSocialPercentage}</p>
        <p>Min Members: {minMembers}</p>
      </div>
      <div className="card-footer">

          <div>
            <button onClick={onModify} className="edit-button card-button">
              Modificar
            </button>

              <button onClick={onDelete} className="delete-button card-button">
                Eliminar
              </button>

          </div>
      </div>
    </div>
  );
};

export default Card;