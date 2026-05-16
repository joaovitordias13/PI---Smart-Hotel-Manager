import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [reservas, setReservas] = useState([]);

  const carregar = async () => {
    const res = await axios.get('http://localhost:3000/reservas');
    setReservas(res.data);
  };

  const salvar = async () => {
    await axios.post('http://localhost:3000/reservas', { nome, data });
    carregar();
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h1>Reservas</h1>

      <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input placeholder="Data" onChange={e => setData(e.target.value)} />

      <button onClick={salvar}>Salvar</button>

      <ul>
        {reservas.map((r, i) => (
          <li key={i}>{r.nome} - {r.data}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;