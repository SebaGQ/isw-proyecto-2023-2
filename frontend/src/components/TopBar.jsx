import React, { useEffect, useState } from 'react';
import '../styles/TopBar.css'; // Asegúrate de tener este archivo de estilos en tu proyecto.
import { Bars3CenterLeftIcon, ChevronDownIcon, PencilIcon } from "@heroicons/react/24/solid";
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ showNav, setShowNav }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "nombre" }); // Asumiendo un estado inicial

    // Simulando la función fetchProfile
    useEffect(() => {
        // Simular la carga del perfil del usuario
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/auth');
      };

    return (
        <div className="topbar">
            <div className="topbar-brand">
                <Bars3CenterLeftIcon
                    className="icon"
                    onClick={() => setShowNav(!showNav)}
                />
                Menu
            </div>
            <div className="topbar-user">
                <span>{user.name}</span>
                <ChevronDownIcon className="icon" />
                <div className="logout" onClick={handleLogout}>
                    <PencilIcon className="icon" />
                    Cerrar sesión
                </div>
            </div>
        </div>
    );
};

export default TopBar;
