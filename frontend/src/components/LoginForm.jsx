import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../styles/LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      // Manejo de errores, como credenciales incorrectas
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-form-container">
      <h3>Bienvenido, inicia sesión</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          {...register('email', { required: true })}
        />
        <label htmlFor="password">Contraseña</label>  
        <input
          id="password"
          type="password"
          name="password"
          {...register('password', { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}


export default LoginForm;
