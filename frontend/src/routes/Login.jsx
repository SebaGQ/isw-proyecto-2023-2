import LoginForm from '../components/LoginForm';

import '../styles/LoginForm.css';

function Login() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
