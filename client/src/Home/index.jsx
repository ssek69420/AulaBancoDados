import { Link } from 'react-router-dom';
import '../globals.css';

export default function Home() {
    return (
<div className="container-everything">
        <div className="container-musicsystem">
            <h2 className='musicSystem'>SISTEMA DE MUSICAS</h2>
            </div>
        <div className='container'>
            <div className="card-container">
                <Link to="/matricula/cadastrar" className="card">
                    <div>Registrar Musica</div>
                </Link>
                <Link to="/matriculas" className="card">
                    <div>Lista de Musicas</div>
                </Link>
                <Link to="/matriculas/alterar" className="card">
                    <div>Editar Musica</div>
                </Link>
            </div>
        </div>
</div>
    );
}
