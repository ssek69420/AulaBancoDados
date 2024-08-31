import { useEffect, useState } from 'react';
import '../globals.css';
import Head from '../Header/Head';

export default function ReadMatriculas() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const response = await fetch('http://localhost:5000/musicas');
        const data = await response.json();
        setMusicas(data);
      } catch (error) {
        console.error('Erro ao buscar as matrículas:', error);
      }
    };

    fetchMatriculas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/musicas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMusicas(musicas.filter((musicas) => musicas._id !== id));
        alert('Matrícula excluída com sucesso!');
      } else {
        alert('Erro ao excluir matrícula.');
      }
    } catch (error) {
      console.error('Erro ao excluir matrícula:', error);
    }
  };

  return (
    <>
    <Head text={'LISTA DE MUSICAS'}/>
    <div className='container'>
      <h2>Lista de Músicas</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código Músicas</th>
            <th>Nome da Música</th>
            <th>Album</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {musicas.map((musicas) => (
            <tr key={musicas._id}>
              <td>{musicas._id}</td>
              <td>{musicas.musicas}</td>
              <td>{musicas.album}</td>
              <td>{musicas.autor}</td>
              <td>
                <button onClick={() => handleDelete(musicas._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
}
