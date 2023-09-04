import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";



function Navbar() {
  const { isUserActive, verifyToken, activeUserId } = useContext(AuthContext);
  console.log("active user id", activeUserId);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    verifyToken();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
   
        <div className="navbar-nav">
          {console.log("is user active", isUserActive)}
          {isUserActive === true ? (
            <>
              <NavLink to="/poemgram" className="navbar-brand">
           
                {/* <img
                  src={"../assets/logo.png"}
                  alt="Logo"
                  width="30"
                  height="24"
                  className="d-inline-block align-text-top"
                /> */}
                Poemgram
              </NavLink>

              <NavLink
                to={`/user/${activeUserId}/profile`}
                className="nav-link"
              >
                Profile
              </NavLink>
              <button onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <NavLink to="/login"className="nav-link">Log in</NavLink>
          )}
        </div>
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
