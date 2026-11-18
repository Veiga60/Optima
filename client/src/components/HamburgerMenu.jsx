import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BiSolidHome, BiSolidMessageDetail } from "react-icons/bi";
import { GiHockey } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { FaCalendarDays, FaBox } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import '../style/HamburgerMenu.css'
import SERVER_URL from '../config.js'
import { useClub } from '../context/ClubContext.jsx';

export default function HamburgerMenu({ isOpen, onClose }) {
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
            if (onClose) onClose();
            navigate('/');
        } catch (error) {
            console.log('Error al cerrar sesión: ', error);
        }
    }

    const handleNavigate = (path) => {
        if (onClose) onClose();
        navigate(path);
    }

    const menuItems = [
        { label: 'INICIO', path: '/home', icon: BiSolidHome },
        { label: 'PARTIDOS', path: '/matches', icon: GiHockey },
        { label: 'ESTADÍSTICAS', path: '/stats', icon: IoStatsChart },
        { label: 'CONVOCATORIAS', path: '/calls', icon: FaCalendarDays },
        { label: 'FORO', path: '/forum', icon: BiSolidMessageDetail },
        { label: 'PEDIDOS', path: '/orders', icon: FaBox },
    ];

    return (
        <>
            <div
                id='hamburgerMenuBackdrop'
                className={isOpen ? 'backdropIsOpen' : ''}
                onClick={onClose}
            />
            <div id='hamburgerMenuDiv' className={isOpen ? 'menuIsOpen' : 'menuIsClosed'}>
                <div id='navMenuDiv'>
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <div
                                key={item.path}
                                className={`menuDiv ${isActive ? 'menuDivActive' : ''}`}
                                onClick={() => handleNavigate(item.path)}
                            >
                                <Icon className='hamburgerMenuIcon' size={22} />
                                <p className='menuText'>{item.label}</p>
                            </div>
                        );
                    })}
                    <div id='menuLogoutDiv' className='menuDiv' onClick={logout}>
                        <FiLogOut className='hamburgerMenuIcon' size={22} />
                        <p className='menuText'>CERRAR SESIÓN</p>
                    </div>
                </div>
            </div>
        </>
    )
}
