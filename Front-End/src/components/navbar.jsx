import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.clear();
    navigate('/auth');
  };
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <div className="menu-items">
          <Link className="link" to={'/'}>
            About Us
          </Link>
          <Link className="link" to={'/home'}>
            Browse
          </Link>
          <Link className="link" to={'/createOpp'}>
            Add an Opportunity
          </Link>
          <Link className="link" to={'/savedOpp'}>
            Saved Opportunities
          </Link>
          {!cookies.access_token ? (
            <Link className="link" to="/auth">
              Login/Register
            </Link>
          ) : (
            <button onClick={logout}> Logout </button>
          )}
        </div>
        <h1 className="logo">Interns Tn</h1>
      </div>
    </nav>
  );
};

/*
<div className="navbar">
      <Link to={'/'}>Home</Link>
      <Link to={'/createOpp'}>Add an Opportunity</Link>
      <Link to={'/savedOpp'}>Saved Opportunities</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
*/
