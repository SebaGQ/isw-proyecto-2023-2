import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado para el manejo de rutas
import '../styles/NavBar.css';
import { HomeIcon, RectangleGroupIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const NavBar = () => {
    // Aquí podrías usar algo similar a useRouter de Next.js para determinar la ruta activa

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
                <Link to="/applications" className="nav-item">
                    <RectangleGroupIcon className="nav-icon" />
                    <span>Mis postulaciones</span>
                </Link>
                {/* Agrega más elementos de navegación según sea necesario */}
            </div>
        </div>
    );
};

export default NavBar;
