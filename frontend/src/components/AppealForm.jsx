import React, { useState, useEffect } from "react";
import { postAppeal } from "../services/appeal.service";
import "../styles/ApplicationForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateRUT } from "validar-rut";

const AppealForm = ({
  applicationId,
  subsidyName,
  onClose,
  onAppealSuccess,
}) => {
  const [newSocialPercentage, setNewSocialPercentage] = useState("");
  const [newMembers, setNewMembers] = useState("");
  const [newMemberRUTs, setNewMemberRUTs] = useState([]);

  useEffect(() => {
    setNewMemberRUTs(new Array(Number(newMembers)).fill(""));
  }, [newMembers]);

  const handleRUTChange = (index, value) => {
    // Elimina caracteres no numéricos
    const numericValue = value.replace(/\D/g, "");

    // Divide el Rut en grupos de 3 y agrega puntos
    const formattedValue = numericValue.replace(
      /^(\d{2})(\d{3})(\d{3})/,
      "$1.$2.$3-"
    );

    // Permite escribir un número después del guion
    if (formattedValue.includes("-")) {
      const [beforeDash, afterDash] = formattedValue.split("-");
      const cleanedAfterDash = afterDash.replace(/\D/g, ""); // Elimina caracteres no numéricos

      // Si después del guion hay más de un carácter, permite borrar el guion
      if (cleanedAfterDash.length > 1) {
        const updatedRUTs = [...newMemberRUTs];
        updatedRUTs[index] = `${beforeDash}-${cleanedAfterDash.slice(0, 1)}`;
        setNewMemberRUTs(updatedRUTs);
        return;
      }

      // Si después del guion hay un solo carácter, permite borrar el guion
      if (cleanedAfterDash.length === 1) {
        const updatedRUTs = [...newMemberRUTs];
        updatedRUTs[index] = `${beforeDash}-${cleanedAfterDash}`;
        setNewMemberRUTs(updatedRUTs);
        return;
      }

      // Si después del guion no hay caracteres, permite borrar el guion
      const updatedRUTs = [...newMemberRUTs];
      updatedRUTs[index] = beforeDash;
      setNewMemberRUTs(updatedRUTs);
      return;
    }

    // Si no hay guion, simplemente actualiza el RUT
    const updatedRUTs = [...newMemberRUTs];
    updatedRUTs[index] = formattedValue;
    setNewMemberRUTs(updatedRUTs);
  };

  const handleMembersChange = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    setNewMembers(numericValue);
    setNewMemberRUTs(new Array(Number(numericValue)).fill(""));
  };

  const handleSocialPercentageChange = (value) => {
    const percentage = Number(value);
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      setNewSocialPercentage(percentage);
    } else {
      toast.error(
        "Porcentaje social inválido. Ingresa un valor entre 0 y 100."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de los RUTs
    for (const rut of newMemberRUTs) {
      if (!validateRUT(rut)) {
        toast.error("Uno o más RUTs son inválidos.");
        return;
      }
    }
    const appealData = {
      postId: applicationId,
      newSocialPercentage: Number(newSocialPercentage),
      newMembers: Number(newMembers),
      newMemberRUTs,
    };

    try {
      await postAppeal(appealData);
      onClose();
      if (onAppealSuccess) {
        onAppealSuccess();
      }
      toast.success("Apelación enviada con éxito.");
    } catch (error) {
      console.error("Error al enviar la apelación:", error);
      toast.error("Error al enviar la apelación.");
    }
  };

  return (
    <div className="application-form-container">
      <h2 className="form-title">
        Apelación para la Postulación: {subsidyName}
      </h2>
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="newSocialPercentage">Nuevo Porcentaje Social</label>
          <input
            id="newSocialPercentage"
            type="number"
            value={newSocialPercentage}
            onChange={(e) => handleSocialPercentageChange(e.target.value)}
            placeholder="Ingresa el nuevo porcentaje social"
            required
            className="form-control"
            min={0}
            max={100}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newMembers">Nuevo Número de Miembros</label>
          <input
            id="newMembers"
            type="text"
            value={newMembers}
            onChange={(e) => handleMembersChange(e.target.value)}
            placeholder="Ingresa el nuevo número de miembros de tu familia"
            required
            className="form-control"
            min={0}
            max={10}
          />
        </div>
        <div className="form-group">
          {newMemberRUTs.map((_, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`newMemberRUT-${index}`}>
                RUT Miembro {index + 1}
              </label>
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
          <button type="submit" className="btn btn-primary">
            Enviar Apelación
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppealForm;
