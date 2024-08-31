import { Link } from 'react-router-dom';
import '../globals.css';
import Foot from '../Footer/Foot';
import Head from '../Header/Head';

export default function Home() {
    return (
<>
    <Head/>
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
    <Foot/>
</>
    );
}
