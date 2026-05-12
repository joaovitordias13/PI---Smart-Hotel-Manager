import './Login.css';

function Login({ setPage }) {

  const handleLogin = () => {
    const user = document.querySelector('input[type="text"]').value;
    const pass = document.querySelector('input[type="password"]').value;

    if (user === 'admin' && pass === '123') {
      setPage('dashboard');
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="logo">🏨</div>

        <h1>Login</h1>
        <p className="subtitle">Sign in to continue</p>

        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />

        <button onClick={handleLogin}>Entrar</button>

      </div>
    </div>
  );
}

export default Login;