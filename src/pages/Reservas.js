import './Reservas.css';

function Reservas({
  reservas,
  setReservas,
  setPage
}) {

  const removerReserva = (index) => {
    const novasReservas = [...reservas];
    novasReservas.splice(index, 1);
    setReservas(novasReservas);
  };

  const total = reservas.reduce(
    (acc, item) => acc + item.preco,
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

      {reservas.length === 0 ? (
        <p>Nenhuma reserva adicionada.</p>
      ) : (
        reservas.map((hotel, index) => (
          <div
            className="reserva-card"
            key={index}
          >

            <img
              src={hotel.imagem}
              alt={hotel.nome}
            />

            <div>
              <h3>{hotel.nome}</h3>
              <p>R$ {hotel.preco}</p>
            </div>

            <button
              onClick={() =>
                removerReserva(index)
              }
            >
              ❌
            </button>

          </div>
        ))
      )}

      <div className="total-box">
        <h2>Total: R$ {total}</h2>

        <button>
          Finalizar Reserva
        </button>
      </div>

    </div>
  );
}

export default Reservas;