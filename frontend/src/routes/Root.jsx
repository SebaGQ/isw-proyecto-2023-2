import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();

  return (
    <div className="app-layout">
      <TopBar user={user} />
      <div className="app-content">
        <NavBar />
        <main className="main-content">
          <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
        </main>
      </div>
    </div>
  );
}

export default Root;
