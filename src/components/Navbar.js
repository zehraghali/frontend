import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

  const handleClick = (e) => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

  };
  const userEmail = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).email : '';
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>welcome</h1>
        </Link>
        <nav>
          {isAuthenticated && (
            <div>
              <span>{userEmail()}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;