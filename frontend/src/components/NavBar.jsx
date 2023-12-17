import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado para el manejo de rutas
import '../styles/NavBar.css';
import { HomeIcon, RectangleGroupIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    // Aquí podrías usar algo similar a useRouter de Next.js para determinar la ruta activa
    const { user } = useAuth();
    const isAdmin = user.roles[0] === "admin";
    const isUser = user.roles[0] === "user";
    return (
        <div className="navbar">
            <div className="navbar-header">
                {/* Aquí deberías poner tu logo o imagen de la empresa */}
            </div>
            <div className="nav-items">
                <Link to="/" className="nav-item">
                    <HomeIcon className="nav-icon" />
                    <span>Inicio</span>
                </Link>
                <Link to="/subsidies" className="nav-item">
                    <RectangleGroupIcon className="nav-icon" />
                    <span>Subsidios y Beneficios</span>
                </Link>
                {isUser && (
                    <Link to="/applications" className="nav-item">
                        <RectangleGroupIcon className="nav-icon" />
                        <span>Mis postulaciones</span>
                    </Link>
                )}
                {isAdmin && (
                    <Link to="/reviews" className="nav-item">
                        <DocumentTextIcon className="nav-icon" />
                        <span>Revisiones</span>
                    </Link>
                )}
                {/* Agrega más elementos de navegación según sea necesario */}
            </div>
        </div>
    );
};

export default NavBar;
