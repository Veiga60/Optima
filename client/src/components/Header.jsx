import '../style/Header.css'
import NavBar from '../components/NavBar.jsx'
import { useLocation } from 'react-router-dom'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { useState, useEffect } from 'react'
import { useClub } from '../context/ClubContext.jsx'
import HamburgerMenu from './HamburgerMenu.jsx'

function Header() {
    const location = useLocation();
    const { club } = useClub();

    const [width, setWidth] = useState(window.innerWidth);
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cerrar menú al cambiar de ruta
    useEffect(() => {
        setShowHamburgerMenu(false);
    }, [location.pathname]);

    const isPublicPage = location.pathname === '/' ||
        location.pathname === '/signup' ||
        location.pathname === '/error/unauthorized' ||
        location.pathname === '/select_role' ||
        location.pathname === '/select_clubTeams';

    return (
        <div id='headerDiv'>
            <div id='titleDiv'>
                <img
                    id='logo'
                    src={((club == null) || (location.pathname == '/') || (location.pathname == '/signup')) ? ('logos/logo_optima.png') : (`/logos/${club?.logo}`)}
                    alt={`${club?.name || 'Optima'}_logo`}
                />
                {
                    (width > 420 || location.pathname == '/' || location.pathname == '/signup') && (
                        <h1 id='title'>
                            {((club == null) || (location.pathname == '/') || (location.pathname == '/signup'))
                                ? 'OPTIMA'
                                : `${String(club?.name).toUpperCase()}`}
                        </h1>
                    )
                }
            </div>

            {!isPublicPage && width > 1050 && (
                <div id='navbar'>
                    <NavBar />
                </div>
            )}

            {!isPublicPage && width <= 1050 && (
                <button
                    type='button'
                    className='menuIconButton'
                    onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
                    aria-label='Toggle menu'
                >
                    {showHamburgerMenu ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
                </button>
            )}

            {!isPublicPage && width <= 1050 && (
                <HamburgerMenu
                    isOpen={showHamburgerMenu}
                    onClose={() => setShowHamburgerMenu(false)}
                />
            )}
        </div>
    )
}

export default Header
