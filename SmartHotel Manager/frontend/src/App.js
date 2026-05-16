import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reservas from './pages/Reservas';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [reservas, setReservas] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {page === 'login' && (
        <Login setPage={setPage} setCurrentUser={setCurrentUser} />
      )}

      {page === 'dashboard' && (
        <Dashboard
          setPage={setPage}
          reservas={reservas}
          setReservas={setReservas}
          quartos={quartos}
          setQuartos={setQuartos}
          currentUser={currentUser}
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