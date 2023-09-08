import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import service from "../../services/service.config";
import { AuthContext } from "../../context/auth.context";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const { verifyToken } = useContext(AuthContext);

  useEffect(() => {
    getUserData();
  }, [params.userId]);

  const getUserData = async () => {
    try {
      const response = await service.get(`/user/${params.userId}/profile`);
      setUserDetails(response.data);
    
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await service.delete(`/user/${params.userId}/profile`);
      localStorage.removeItem("authToken");
      verifyToken();
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (userDetails === null) {
    return <h3>...just a moment...</h3>;
  }
  return (
    <div className="profile">
      <h2>Hello, {userDetails.firstName} </h2>
      <p>Your photo is:</p>
      <img src={userDetails.image} alt="image" width="200px" />
      <br />
      <p>
        Your full name is {userDetails.firstName} {userDetails.lastName}{" "}
      </p>

      <p>Your email is {userDetails.email}</p>

      <h5>Poems you like:</h5>
      {userDetails.likePoem == []
        ? "..."
        : userDetails.likePoem.map((eachLike) => {
            return (
              <ul key={eachLike._id}>
                <Link to={`/poem/${eachLike._id}/details`}>
                  {" "}
                  <p>{eachLike.title} </p>
                </Link>
              </ul>
            );
          })}
      <br />

      <h5>Poets you like:</h5>
      {userDetails.favouritePoet == []
        ? "..."
        : userDetails.favouritePoet.map((eachPoet) => {
            return (
              <ul key={eachPoet._id}>
                <Link to={`/poet/${eachPoet._id}/details`}>
                  {" "}
                  <p>
                    {eachPoet.firstName} {eachPoet.lastName}{" "}
                  </p>
                </Link>
              </ul>
            );
          })}
      <br />

      <button type="button" className="btn btn-outline-secondary btn-sm">
        <Link to={`/user/${params.userId}/edit-profile`}>Edit your info</Link>
      </button>
      <br />
      <button
        onClick={handleDeleteUser}
        className="btn btn-outline-secondary btn-sm"
      >
        Delete this account
      </button>
    </div>
  );
}

export default Profile;
