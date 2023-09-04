import { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import service from "../../services/service.config"
import { AuthContext } from "../../context/auth.context"

function Profile() {

  const [userDetails, setUserDetails] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  const {verifyToken} = useContext(AuthContext);
  // console.log("params", params);

  useEffect ( ()=> {
     getUserData()
  }, [params.userId])

  const getUserData = async () => {
    try {
      const response = await service.get(`/user/${params.userId}/profile`)
      setUserDetails(response.data)
      // console.log(response.data);
    } catch (error) {
      console.log(error);
  }
  }
  const handleDeleteUser = async () => {
    try {
      await service.delete(`/user/${params.userId}/profile`);
      localStorage.removeItem("authToken");
      verifyToken()
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };


  if (userDetails === null) {
    return <h3>...just a moment...</h3>
  }
  return (
    <div>
      <h2>Hello, {userDetails.firstName} </h2>
      <p>Your full name is {userDetails.firstName} {userDetails.lastName} </p>
      <p>Your photo is:</p>
      <img src={userDetails.image} alt="image" width="200px" />
      <p>Your email is {userDetails.email}</p>
     
      <Link to={`/user/${params.userId}/edit-profile`}>Edit your info</Link>
       <button onClick={handleDeleteUser} >Delete this account</button>
  



    </div>
  )
}

export default Profile