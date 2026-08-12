import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          Movie Explorer
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/movies">Movies</NavLink>

          <NavLink to="/favorites">Favorites</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
