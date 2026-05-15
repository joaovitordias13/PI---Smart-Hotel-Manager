import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reservas from './pages/Reservas';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [reservas, setReservas] = useState([]);

  return (
    <>
      {page === 'login' && (
        <Login setPage={setPage} />
      )}

      {page === 'dashboard' && (
        <Dashboard
          setPage={setPage}
          reservas={reservas}
          setReservas={setReservas}
        />
      )}

      {page === 'reservas' && (
        <Reservas
          setPage={setPage}
          reservas={reservas}
          setReservas={setReservas}
        />
      )}
    </>
  );
}

export default App;