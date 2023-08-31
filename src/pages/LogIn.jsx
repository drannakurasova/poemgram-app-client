import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function LogIn() {
  const navigate = useNavigate();

  const { verifyToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await service.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.authToken);

      await verifyToken();

      console.log("login response", response);
      navigate("/poemgram");
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div>
      <h2> Please log in </h2>

    
      <form onSubmit={handleLogin}>
        <label>E-mail:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default LogIn;
