import { useEffect, useState } from 'react';
import api from '../api';
import './Reservas.css';

function Reservas({
  reservas,
  setReservas,
  setPage
}) {
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchReservas = async () => {
      setErro('');
      try {
        const response = await api.get('/reservas');
        setReservas(response.data.reservas || []);
      } catch (error) {
        setErro('Não foi possível carregar as reservas.');
      }
    };

    fetchReservas();
  }, []);

  const removerReserva = async (id) => {
    setErro('');
    try {
      await api.delete(`/reservas/${id}`);
      setReservas(reservas.filter((item) => item._id !== id));
    } catch (error) {
      setErro('Não foi possível remover a reserva.');
    }
  };

  const getReservationImage = (tipo) => {
    const images = {
      suite: '/IMG/hotel1.jpg',
      apartamento: '/IMG/hotel2.jpg',
      casal: '/IMG/hotel3.jpg',
    };
    return images[tipo] || 'https://via.placeholder.com/120x90?text=Quarto';
  };

  const finalizarReservas = async () => {
    setErro('');
    if (reservas.length === 0) {
      return;
    }

    try {
      const promises = reservas.map((reserva) =>
        api.put(`/reservas/${reserva._id}`, { status: 'confirmada' })
      );
      const results = await Promise.all(promises);
      const novas = results.map((result) => result.data.reserva);
      setReservas(novas);
      alert('Reservas finalizadas com sucesso!');
    } catch (error) {
      setErro('Não foi possível finalizar as reservas.');
    }
  };

  const total = reservas.reduce(
    (acc, item) => acc + (item.precoTotal || 0),
    0
  );

  return (
    <div className="reservas-container">

      <button
        className="voltar-btn"
        onClick={() => setPage('dashboard')}
      >
        ← Voltar
      </button>

      <h1>Minhas Reservas</h1>

      {erro && <div className="erro">{erro}</div>}

      {reservas.length === 0 ? (
        <p>Nenhuma reserva adicionada.</p>
      ) : (
        reservas.map((reserva) => (
          <div
            className="reserva-card"
            key={reserva._id}
          >

            <img
              src={reserva.quarto?.imagem || getReservationImage(reserva.quarto?.tipo)}
              alt={reserva.quarto?.descricao || 'Reserva'}
            />

            <div>
              <h3>{reserva.quarto?.descricao || `Quarto ${reserva.quarto?.numero}`}</h3>
              <p>R$ {reserva.precoTotal}</p>
              <p>Check-in: {new Date(reserva.dataCheckIn).toLocaleDateString()}</p>
              <p>Check-out: {new Date(reserva.dataCheckOut).toLocaleDateString()}</p>
            </div>

            <button
              onClick={() => removerReserva(reserva._id)}
            >
              ❌
            </button>

          </div>
        ))
      )}

      <div className="total-box">
        <h2>Total: R$ {total}</h2>

        <button onClick={finalizarReservas}>
          Finalizar Reserva
        </button>
      </div>

    </div>
  );
}

export default Reservas;