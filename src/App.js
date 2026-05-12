import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reservas from './pages/Reservas';

function App() {
  const [page, setPage] = useState('login');

  if (page === 'login') return <Login setPage={setPage} />;
  if (page === 'dashboard') return <Dashboard setPage={setPage} />;
  if (page === 'reservas') return <Reservas setPage={setPage} />;

  return null;
}

export default App;