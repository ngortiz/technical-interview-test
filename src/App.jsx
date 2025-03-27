import React, { useEffect, useState } from 'react';

export default function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const searchPeople = async () => {
    const url = `${import.meta.env.VITE_API_URL}?page=${page}&search=${search}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setPeople(data.results);
    } else {
      setError('Error al obtener los datos');
    }
    setLoading(false);
  };

  useEffect(() => {
    searchPeople();
  }, [page, search]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Personajes de Star Wars</h1>

      <input
        type='text'
        placeholder='Buscar personaje...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {people.map((person) => (
          <li key={person.name}>
            <strong>{person.name}</strong> - Altura: {person.height} cm - Peso:{' '}
            {person.mass} kg
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span>Página {page}</span>
      <button onClick={() => setPage(page + 1)}>Siguiente</button>
    </div>
  );
}
