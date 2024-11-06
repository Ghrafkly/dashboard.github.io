import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/anz-logo.svg';
import '../../styles/navbar.sass';
import { useEffect, useState } from "react";

const Navbar = () => {
    const [selected, setSelected] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setSelected(location.pathname)
    }, [location.pathname])

    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="Logo"/>
            </Link>
            <Link to="/backend" className={selected === '/backend' ? 'selected' : ''}>
                Backend
            </Link>
            <Link to="/release" className={selected === '/release' ? 'selected' : ''}>
                Release Management
            </Link>
            <Link to="/testing" className={selected === '/testing' ? 'selected' : ''}>
                Testing
            </Link>
        </nav>
    )
}

export default Navbar;