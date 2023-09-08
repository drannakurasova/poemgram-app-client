import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams, Link } from "react-router-dom";
import service from "../../services/service.config";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../context/auth.context";

function PoetDetails() {
  const [poetDetails, setPoetDetails] = useState(null);

  const { userRole, activeUserId } = useContext(AuthContext);
 
  const [addToFavourite, setAddToFavourite] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params)

  useEffect(() => {
    getDetails();
  }, [params.poetId]);

  const getDetails = async () => {
    try {
      const response = await service.get(`/poet/${params.poetId}/details`);
      console.log(response.data)
      setPoetDetails(response.data);
      const userResponse = await service.get(`/user/${activeUserId}/profile`);
      console.log(userResponse.data);
      
      if (userResponse.data.favouritePoet !== null) {
        userResponse.data.favouritePoet.map((eachFavourite) => {
          if (eachFavourite._id === params.poetId) {
            setAddToFavourite(true);
          } else {
            setAddToFavourite(false);
          }
        });
      } 

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePoet = async () => {
    try {
      await service.delete(`/poet/${params.poetId}/details`);

      navigate("/poet/all-poets");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (poetDetails === null) {
    return <Spinner />;
  }

  const handleAddToFavouriteChange = async () => {
    try {
      const response = await service.patch(
        `/poet/${params.poetId}/add-to-favourite`
      );
      //getDetails()
      setAddToFavourite(!addToFavourite)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="poetDetails">
      <nav>
        <NavLink to="/poet/all-poets" className="nav-link">
          Back to all poets
        </NavLink>
      </nav>
      <div className="input-group mb-3"></div>
      <h2>
        {poetDetails.firstName} <span></span> {poetDetails.lastName}
      </h2>

      <img src={poetDetails.image} alt="image" width="250px" />
      <p>Born in {poetDetails.bornIn}</p>
      <br />
      <button
        type="button"
        onClick={handleAddToFavouriteChange}
        className="btn btn-outline-light btn-lg"
      >
        {addToFavourite === false ? "♡" : "💜" }
      </button>
      <br />



      <button type="button" className="btn btn-outline-secondary btn-sm">
        <Link to={`/poet/${poetDetails._id}/edit-details`}>
          Edit {poetDetails.firstName} {poetDetails.lastName}´s info
        </Link>
      </button>

      {userRole === "admin" ? (
        <button
          onClick={handleDeletePoet}
          className="btn btn-outline-secondary btn-sm"
        >
          Delete this poet
        </button>
      ) : null}

      <Link to={`/user/${poetDetails.createdBy._id}/profile`}>
        <p>
          <br />
          Added by: {poetDetails.createdBy.firstName}{" "}
          {poetDetails.createdBy.lastName}
        </p>
      </Link>
    </div>
  );
}

export default PoetDetails;
