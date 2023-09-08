import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import logo from "../assets/logoP.png";
import userLogo from "../assets/user.png";

function Navbar() {
  const { isUserActive, verifyToken, activeUserId } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    verifyToken();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {isUserActive === true ? (
              <>
                <NavLink to="/poemgram" className="navbar-brand">
                  <img
                    src={logo}
                    alt="Logo"
                    width="20"
                    height="24"
                    className="d-inline-block align-text-top"
                  />
                  oemgram
                </NavLink>

                <NavLink to="/news-in-poems" className="nav-link">
                  News in poems
                </NavLink>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Poets
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/poet/all-poets" className="dropdown-item">
                        All Poets
                      </NavLink>{" "}
                    </li>
                    <li>
                      <NavLink to="/poet/new-poet" className="dropdown-item">
                        Add a new poet
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Poems
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/poem/all-poems" className="dropdown-item">
                        All Poems
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/poem/new-poem" className="dropdown-item">
                        Add a new poem
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    <img src={userLogo} alt="" width="30px" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/user/${activeUserId}/profile`}
                        className="dropdown-item"
                      >
                        Your Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Log in
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
