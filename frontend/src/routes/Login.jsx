import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <div className="login-form-container">
        <h2>Ya estás logueado!</h2>
        <button onClick={() => navigate('/')}>Ir a home</button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
