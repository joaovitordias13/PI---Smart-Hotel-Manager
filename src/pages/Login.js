import { useState } from 'react';
import './Login.css';

function Login({ setPage }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (
      email === 'admin@email.com' &&
      senha === '123456'
    ) {
      setPage('dashboard');
    } else {
      setErro('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>SmartHotel</h1>

        <p>Sign in to continue</p>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <span className="erro">{erro}</span>}

        <button onClick={handleLogin}>
          Entrar
        </button>

        <small>
          Login teste:
          <br />
          admin@email.com
          <br />
          123456
        </small>
      </div>
    </div>
  );
}

export default Login;