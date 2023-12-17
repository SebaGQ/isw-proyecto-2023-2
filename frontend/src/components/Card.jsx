import React from "react";
import "../styles/Card.css";
import { useAuth } from "../context/AuthContext";

const Card = ({
  name,
  type,
  description,
  dateEnd,
  onApply,
  onViewRequirements,
  onModify,
  onArchive,
  onDelete,
  showArchivedSubsidies,
  archiveState,
}) => {
  const currentDate = new Date();
  const endDate = new Date(dateEnd);
  const isExpired = endDate < currentDate;
  const { user } = useAuth();
  const isAdmin = user.roles[0] === "admin";

  return (
    <div className="card">
      <div className="card-header">
        <h2>{name}</h2>
        <span className={isExpired ? "status expired" : "status available"}>
          {isExpired ? "Vencido" : "Disponible"}
        </span>
      </div>
      <div className="card-content">
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <p>{type}</p>
        {isExpired ? (
          <button disabled className="apply-button card-button disabled">
            Postulaciones Cerradas
          </button>
        ) : (
          <button onClick={onApply} className="apply-button card-button">
            Postular
          </button>
        )}
        <button
          onClick={onViewRequirements}
          className="view-requirements-button card-button"
        >
          Ver Requisitos
        </button>
        {isAdmin ? (
          <div>
            <button onClick={onModify} className="edit-button card-button">
              Modificar
            </button>

            {showArchivedSubsidies ? (
              <button onClick={onDelete} className="delete-button card-button">
                Eliminar
              </button>
            ) : (
              ""
            )}
            <button
              onClick={onArchive}
              className={`archive-button card-button ${
                archiveState ? "unarchive" : "archive"
              }`}
            >
              {archiveState ? "Desarchivar" : "Archivar"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Card;
