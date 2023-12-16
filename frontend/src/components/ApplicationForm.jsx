import React, { useState } from "react";
import { postApplication } from "../services/application.service";
import "../styles/ApplicationForm.css";
import { validateRUT } from "validar-rut";
const ApplicationForm = ({ subsidyId, subsidyName, onClose }) => {
  const [rut, setRut] = useState("");
  const [socialPercentage, setSocialPercentage] = useState("");
  const [members, setMembers] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  const formatRut = (value) => {
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
        return `${beforeDash}-${cleanedAfterDash.slice(0, 1)}`;
      }

      // Si después del guion hay un solo carácter, permite borrar el guion
      if (cleanedAfterDash.length === 1) {
        return `${beforeDash}-${cleanedAfterDash}`;
      }

      // Si después del guion no hay caracteres, permite borrar el guion
      return `${beforeDash}`;
    }

    return formattedValue.replace(/-$/, "");
  };

  const handleRutChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setRut(formattedRut);
  };

  const handleAddMember = () => {
    if (members && familyMembers.length < members) {
      setFamilyMembers([...familyMembers, { rut: "", socialPercentage: "" }]);
      /* Ahora se conserva el numero de miembro, el problema era el setMembers("") que agrebaba un vacio. */
      //setMembers("");
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };

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
      console.error("Error al postular:", error);
      // Manejar el error mostrando un mensaje al usuario si es necesario
    }
  };

  return (
    <div className="application-form-container">
      <h2 className="form-title">Postulación para: {subsidyName}</h2>{" "}
      {/* Título del formulario */}
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="rut">Rut</label>
          <input
            id="rut"
            type="text"
            value={rut}
            onChange={handleRutChange}
            placeholder="10.123.123-4"
            required
            className="form-control"
          />
        </div>
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
            min={0}
            max={100}
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
            min={0}
          />
        </div>
        {/* Renderizar dinámicamente los campos de entrada para los miembros de la familia */}
        {familyMembers.map((member, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`rut-${index}`}>Rut del Miembro</label>
            <input
              id={`rut-${index}`}
              type="text"
              value={member.rut}
              onChange={(e) =>
                handleMemberChange(index, "rut", formatRut(e.target.value))
              }
              placeholder="10.123.123-4"
              required
              className="form-control"
            />
          </div>
        ))}

        {/* Botón para agregar más miembros */}
        <button
          type="button"
          onClick={handleAddMember}
          disabled={familyMembers.length >= members || !members}
          className="btn btn-secondary"
        >
          Agregar Miembro
        </button>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Postular
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
