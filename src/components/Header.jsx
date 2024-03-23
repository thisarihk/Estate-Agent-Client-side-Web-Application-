import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
    const header = {
        fontSize: '20px',
    };
    return (
        <nav style={header} className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top p-2 px-3">
            <h2><Link className="navbar-brand" to="/">LUXURIOUS</Link></h2>
            <div className="navbar-brand d-lg-none">
                <img src="assets/images/logo/logo.png" alt="logo" style={{ width: "50px" }} />
            </div>
            {/* Navbar toggler for mobile */}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* Navbar links */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/" style={location.pathname === '/' ? { color: '#ccc', fontWeight: 'bold' } : { color: '#fff' }}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about" style={location.pathname === '/about' ? { color: '#ccc', fontWeight: 'bold' } : { color: '#fff' }}>About</Link>
                    </li>
                </ul>
            </div>
            {/* Logo on the right side */}
            <div className="navbar-brand d-none d-lg-block">
                <img src="assets/images/logo/logo.png" alt="logo" style={{ width: "50px" }} />
            </div>
        </nav>
    );
}

export default Header;
