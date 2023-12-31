import React, { useEffect, useState } from 'react';
import '../styles/TopBar.css'; // Asegúrate de tener este archivo de estilos en tu proyecto.
import { Bars3CenterLeftIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopBar = ({ showNav, setShowNav }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
   

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
                    <p>Menu</p>
            </div>
            <div className="imagenlogo">
                <img src="https://concepcionparticipa.cl/img/LogoConcepcion.png" alt="logo"/>
            </div>
            <div className="topbar-user">
                <span>¡ Hola, {user.firstName} {user.lastName}!</span>
                <div className="logout" onClick={handleLogout}>
                    <LockOpenIcon className="icon" />
                    Cerrar sesión
                </div>
            </div>
        </div>
    );
};

export default TopBar;
