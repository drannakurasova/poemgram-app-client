import { createContext, useState, useEffect } from "react";
import service from "../services/service.config";
import Spinner from "../components/Spinner";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isUserActive, setIsUserActive] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const [userLike, setUserLike] = useState ([])
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userRole, setUserRole] = useState(null)

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
      setUserRole(response.data.role )
      setUserLike (response.data.likePoem)
      setIsPageLoading(false);
    } catch (error) {
      console.log(error);
      setIsUserActive(false);
      setActiveUserId(null);
      setIsPageLoading(false);
      setUserRole(null )
   
    }
  };

  const passedContext = { verifyToken, isUserActive, activeUserId, userRole, userLike };
  // console.log("active user id in auth context", activeUserId);

  if (isPageLoading === true) {
    return <Spinner/>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
