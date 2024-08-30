import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateMatricula() {
  const [id, setId] = useState('');
  const [musicas, setMusicas] = useState('');
  const [album, setAlbum] = useState('');
  const [autor, setAutor] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { musicas, album, autor };

    try {
      const response = await fetch(`http://localhost:5000/musicas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('Música atualizada com sucesso!');
        navigate("/matriculas");
      } else {
        alert('Erro ao atualizar música.');
      }
    } catch (error) {
      console.error('Erro ao atualizar música:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar Música</h2>
      <input
        type="text"
        placeholder="ID da Música"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome da(s) música(s)"
        value={musicas}
        onChange={(e) => setMusicas(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />
      <button type="submit">Atualizar Música</button>
    </form>
    </div>
  );
}
