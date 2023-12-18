import React, { useState, useEffect } from "react";
import { postApplication } from "../services/application.service";
import "../styles/ApplicationForm.css";
import { validateRUT } from "validar-rut";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ApplicationForm = ({ subsidyId, subsidyName, onClose }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName1, setlastName1] = useState("");
  const [lastName2, setlastName2] = useState("");
  const [rutUser, setRutUser] = useState("");
  const [socialPercentage, setSocialPercentage] = useState("");
  const [members, setMembers] = useState("");
  const [memberRUTs, setMemberRUTs] = useState(Array(0).fill(""));
  const [rutErrors, setRutErrors] = useState(
    Array(memberRUTs.length).fill(false)
  );

  const handlefirstNameChange = (value) => {
    // Expresión regular para validar que el nombre solo contenga letras y espacios
    const validNameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/;
    // value === "" -> permite borrar sin que se envie el error.
    if (value === "" || validNameRegex.test(value)) {
      // El nombre es válido, actualiza el estado
      setfirstName(value);
    } else {
      // El nombre es inválido, muestra una notificación de error
      toast.error(
        "Nombre inválido. Por favor, ingresa solo letras y espacios."
      );
    }
  };
  const handlelastName1Change = (value) => {
    const validNameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/;
    if (value === "" || validNameRegex.test(value)) {
      setlastName1(value);
    } else {
      toast.error(
        "Apellido inválido. Por favor, ingresa solo letras y espacios."
      );
    }
  };
  const handlelastName2Change = (value) => {
    const validNameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/;
    if (value === "" || validNameRegex.test(value)) {
      setlastName2(value);
    } else {
      toast.error(
        "Apellido inválido. Por favor, ingresa solo letras y espacios."
      );
    }
  };

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

  // Rut Usuario
  const handleRutChange = (e) => {
    const formattedRut = formatRut(e.target.value);
    setRutUser(formattedRut);
  };

  // Actualiza los RUTs cuando cambia la cantidad de miembros
  useEffect(() => {
    setMemberRUTs(new Array(Number(members)).fill(""));
  }, [members]);

  // Maneja el cambio en los campos de RUT
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
        const updatedRUTs = [...memberRUTs];
        updatedRUTs[index] = `${beforeDash}-${cleanedAfterDash.slice(0, 1)}`;
        setMemberRUTs(updatedRUTs);
        return;
      }

      // Si después del guion hay un solo carácter, permite borrar el guion
      if (cleanedAfterDash.length === 1) {
        const updatedRUTs = [...memberRUTs];
        updatedRUTs[index] = `${beforeDash}-${cleanedAfterDash}`;
        setMemberRUTs(updatedRUTs);
        return;
      }

      // Si después del guion no hay caracteres, permite borrar el guion
      const updatedRUTs = [...memberRUTs];
      updatedRUTs[index] = beforeDash;
      setMemberRUTs(updatedRUTs);
      return;
    }

    // Si no hay guion, simplemente actualiza el RUT
    const updatedRUTs = [...memberRUTs];
    updatedRUTs[index] = formattedValue;
    setMemberRUTs(updatedRUTs);
  };

  // handle de percentage
  const handleSocialPercentageChange = (value) => {
    const percentage = Number(value);
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      setSocialPercentage(percentage);
    } else {
      toast.error(
        "Porcentaje social inválido. Ingresa un valor entre 0 y 100."
      );
    }
  };

  const handleMembersChange = (value) => {
    const numMembers = Number(value);
    if (!isNaN(numMembers) && numMembers >= 0) {
      setMembers(numMembers);
    } else {
      toast.error(
        "Número de miembros inválido. Ingresa un valor mayor o igual a 0."
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    memberRUTs.forEach((memberRUT, index) => {
      const isValidRUT = validateRUT(memberRUT);
      if (!isValidRUT) {
        // Mostrar un mensaje de error utilizando react-toastify
        toast.error(`Error con el RUT del miembro ${index + 1}!`);
        // Marcar el campo del RUT como inválido
        setRutErrors((prevErrors) => {
          const updatedErrors = [...prevErrors];
          updatedErrors[index] = true;
          return updatedErrors;
        });
      }
    });
    //Tiene que ser igual al backend.
    const applicationData = {
      firstName,
      lastName1,
      lastName2,
      rutUser,
      subsidyId,
      socialPercentage: Number(socialPercentage),
      members: Number(members),
      rutsMembers: memberRUTs,
    };

    try {
      await postApplication(applicationData);
      toast.success("Postulacion Enviada");
      onClose(); // Cierra el formulario después de enviar la postulación
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Hubo un error al procesar la postulación. Por favor, inténtalo nuevamente.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="application-form-container">
      <h2 className="form-title">Postulación para: {subsidyName}</h2>{" "}
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => handlefirstNameChange(e.target.value)}
            placeholder="Juan"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName1">Apellido Paterno</label>
          <input
            id="lastName1"
            type="text"
            value={lastName1}
            onChange={(e) => handlelastName1Change(e.target.value)}
            placeholder="Tiznado"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName2">Apellido Materno</label>
          <input
            id="lastName2"
            type="text"
            value={lastName2}
            onChange={(e) => handlelastName2Change(e.target.value)}
            placeholder="Rodriguez"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rut">Rut</label>
          <input
            id="rutUser"
            type="text"
            value={rutUser}
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
            onChange={(e) => handleSocialPercentageChange(e.target.value)}
            placeholder="Ingresa tu porcentaje social"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="members">Número de Miembros adicionales</label>
          <input
            id="members"
            type="number"
            value={members}
            onChange={(e) => handleMembersChange(e.target.value)}
            placeholder="Ingresa el número de miembros de tu familia"
            required
            className="form-control"
            min={1}
          />
        </div>
        {/* Renderizar dinámicamente los campos de entrada para los miembros de la familia */}
        {memberRUTs.map((_, index) => (
          <div
            className={`form-group ${rutErrors[index] ? "invalid-rut" : ""}`}
            key={index}
          >
            <label htmlFor={`memberRUT-${index}`}>
              RUT Miembro {index + 1}
            </label>
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
          <button type="submit" className="btn btn-primary">
            Postular
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
