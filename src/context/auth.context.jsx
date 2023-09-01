import { createContext, useState, useEffect } from "react";
import service from "../services/service.config";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isUserActive, setIsUserActive] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    setIsPageLoading(true)
    try {
      const response = await service.get("/auth/verify");
      console.log(response);

      setIsUserActive(true);
      setActiveUserId(response.data._id);
      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
      setIsUserActive(false);
      setActiveUserId(null);
      setIsPageLoading(false);
    }
  };

  const passedContext = { verifyToken, isUserActive, activeUserId };
  // console.log("active user id in auth context", activeUserId);

  if (isPageLoading === true) {
    return <p>loading...</p>;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };