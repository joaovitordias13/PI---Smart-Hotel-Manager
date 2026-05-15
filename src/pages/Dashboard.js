import './Dashboard.css';

function Dashboard({
  setPage,
  reservas,
  setReservas
}) {

  const hotels = [
    {
      id: 1,
      nome: 'Hotel Paradise',
      preco: 320,
      imagem: '/IMG/hotel1.jpg'
    },
    {
      id: 2,
      nome: 'Luxury Resort',
      preco: 450,
      imagem: '/IMG/hotel2.jpg'
    },
    {
      id: 3,
      nome: 'Smart Inn',
      preco: 280,
      imagem: '/IMG/hotel3.jpg'
    }
  ];

  const adicionarReserva = (hotel) => {
    setReservas([...reservas, hotel]);
    alert('Reserva adicionada!');
  };

  return (
    <div className="dashboard-container">

      <header className="header">
        <div>
          <h2>Olá, Usuário 👋</h2>
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
        placeholder="Buscar hotéis..."
      />

      <div className="hotel-list">
        {hotels.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>

            <img
              src={hotel.imagem}
              alt={hotel.nome}
            />

            <div className="hotel-info">
              <h3>{hotel.nome}</h3>

              <p>R$ {hotel.preco}/noite</p>

              <button
                onClick={() =>
                  adicionarReserva(hotel)
                }
              >
                Reservar
              </button>
            </div>

          </div>
        ))}
      </div>

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