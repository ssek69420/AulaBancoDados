import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreateMatricula() {
  const [musicas, setMusicas] = useState('');
  const [album, setAlbum] = useState('');
  const [autor, setAutor] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaMusica = { musicas, album, autor };

    try {
      const response = await fetch('http://localhost:5000/musicas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaMusica),
      });
      if (response.ok) {
        alert('Música criada com sucesso!');
        setMusicas('');
        setAlbum('');
        setAutor('');
        navigate("/matriculas");
      } else {
        alert('Erro ao criar Música.');
      }
    } catch (error) {
      console.error('Erro ao criar Música:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Criar Música</h2>
      <input
        type="text"
        placeholder="Nome da Música"
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
      <button type="submit">Criar Música</button>
    </form>
    </div>
  );
}
