import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import '../style/NavBar.css'
import { FiLogOut } from "react-icons/fi";
import SERVER_URL from '../config.js'
import { useClub } from '../context/ClubContext.jsx';

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { clearClub } = useClub();

    const logout = async () => {
        try {
            await axios.post(`${SERVER_URL}/exit`, {}, { withCredentials: true });
            localStorage.removeItem('jwt');
            localStorage.removeItem('isCoach');
            localStorage.removeItem('playerId');
            clearClub();
            navigate('/');
        } catch (error) {
            console.log('Error al cerrar sesión: ', error);
        }
    }

    const navItems = [
        { label: 'INICIO', path: '/home' },
        { label: 'PARTIDOS', path: '/matches' },
        { label: 'ESTADÍSTICAS', path: '/stats' },
        { label: 'CONVOCATORIAS', path: '/calls' },
        { label: 'FORO', path: '/forum' },
        { label: 'PEDIDOS', path: '/orders' },
    ];

    return (
        <div id="navbarDiv">
            {navItems.map(item => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                    <div
                        key={item.path}
                        className={`navbarSectionDiv ${isActive ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <p className="navbarText">{item.label}</p>
                    </div>
                );
            })}
            <div className="navbarLogoutBtn" onClick={logout} title="Cerrar sesión">
                <FiLogOut size={20} />
            </div>
        </div>
    )
}
