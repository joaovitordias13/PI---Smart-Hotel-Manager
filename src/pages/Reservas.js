import './Reservas.css';

function Reservas({ setPage }) {
  return (
    <div className="reservas">

      {/* TOPO */}
      <div className="topo">
        <button onClick={() => setPage('dashboard')}>⬅</button>
        <h2>Minhas Reservas</h2>
      </div>

      {/* CARD */}
      <div className="reserva-card">
        <img src="/IMG/hotel1.jpg" alt="hotel" />
        <div>
          <p>Hotel Luxo</p>
          <span>01/01/2026</span>
        </div>
        <button>🗑️</button>
      </div>

      {/* RESUMO */}
      <div className="resumo">
        <p>Subtotal: R$ 250</p>
        <p>Taxas: R$ 20</p>
        <p>Total: R$ 270</p>
      </div>

      <button className="reservar">Reservar</button>

    </div>
  );
}

export default Reservas;