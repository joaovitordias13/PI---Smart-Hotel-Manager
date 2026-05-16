import { useEffect, useState } from 'react';
import api from '../api';
import './Dashboard.css';

function Dashboard({
  setPage,
  reservas,
  setReservas,
  quartos,
  setQuartos,
  currentUser,
}) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchQuartos = async () => {
      setLoading(true);
      setErro('');
      try {
        const response = await api.get('/quartos');
        setQuartos(response.data.quartos || []);
      } catch (error) {
        setErro('Erro ao carregar quartos do backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuartos();
  }, [setQuartos]);

  const adicionarReserva = async (hotel) => {
    if (!currentUser) {
      setErro('Faça login novamente antes de reservar.');
      return;
    }

    try {
      const payload = {
        hospede: currentUser,
        quarto: hotel._id,
        dataCheckIn: new Date().toISOString(),
        dataCheckOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        precoTotal: hotel.precoPorNoite,
        numeroHospedes: 1,
      };

      const response = await api.post('/reservas', payload);
      setReservas([...reservas, response.data.reserva]);
      alert('Reserva criada com sucesso no backend!');
    } catch (error) {
      setErro('Não foi possível criar a reserva.');
    }
  };

  const renderImage = (hotel) => {
    if (hotel.imagem) return hotel.imagem;

    const defaults = {
      suite: '/IMG/hotel1.jpg',
      apartamento: '/IMG/hotel2.jpg',
      casal: '/IMG/hotel3.jpg',
    };

    return defaults[hotel.tipo] || `https://via.placeholder.com/320x180?text=${encodeURIComponent(
      hotel.tipo || hotel.numero || 'Quarto'
    )}`;
  };

  return (
    <div className="dashboard-container">

      <header className="header">
        <div>
          <h2>Olá, {currentUser?.nome || 'Usuário'} 👋</h2>
          <p>São Paulo - SP</p>
        </div>

        <button onClick={() => setPage('login')}>
          Sair
        </button>
      </header>

      <div className="banner">
        <h3>20% OFF em reservas premium</h3>
      </div>

      <input
        className="search"
        placeholder="Buscar quartos..."
        readOnly
      />

      {erro && <div className="erro">{erro}</div>}

      {loading ? (
        <p>Carregando quartos...</p>
      ) : (
        <div className="hotel-list">
          {quartos.map((hotel) => (
            <div className="hotel-card" key={hotel._id || hotel.numero}>

              <img
                src={renderImage(hotel)}
                alt={hotel.tipo || hotel.numero}
              />

              <div className="hotel-info">
                <h3>{hotel.descricao || `Quarto ${hotel.numero}`}</h3>
                <p>Tipo: {hotel.tipo}</p>
                <p>R$ {hotel.precoPorNoite}/noite</p>

                <button
                  onClick={() => adicionarReserva(hotel)}
                >
                  Reservar
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      <button
        className="reservas-btn"
        onClick={() => setPage('reservas')}
      >
        Ver Reservas
      </button>

    </div>
  );
}

export default Dashboard;