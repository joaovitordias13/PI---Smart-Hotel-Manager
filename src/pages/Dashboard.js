import './Dashboard.css';

function Dashboard({ setPage }) {
  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="header">
        <p>📍 São Paulo, SP</p>
        <button onClick={() => setPage('reservas')}>
          Minhas Reservas
        </button>
      </div>

      {/* CUPOM */}
      <div className="cupom">
        🎟️ 10% OFF na sua primeira reserva
      </div>

      {/* BUSCA */}
      <input
        className="search"
        placeholder="Para onde você deseja viajar?"
      />

      {/* CARDS */}
      <div className="cards">

        <div className="card">
          <img src="/IMG/hotel1.jpg" alt="hotel" />
          <p>Hotel Luxo</p>
          <span>R$ 250</span>
        </div>

        <div className="card">
          <img src="/IMG/hotel2.jpg" alt="hotel" />
          <p>Resort Praia</p>
          <span>R$ 400</span>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;