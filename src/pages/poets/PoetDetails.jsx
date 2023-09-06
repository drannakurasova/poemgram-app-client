import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams, Link } from "react-router-dom";
import service from "../../services/service.config";


function PoetDetails() {
  const [poetDetails, setPoetDetails] = useState(null);
  const [addToFavourite, setAddToFavourite] = useState("")
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPoetDetails();
  }, [params.poetId]);

  const getPoetDetails = async () => { 
    try {
      const response = await service.get(`/poet/${params.poetId}/details`)
      console.log(response);
      setPoetDetails(response.data[0]);
      console.log(response.data[0]);
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
    return <h3>...just a moment...</h3>;
  }
  const handleAddToFavouriteChange = async () => {
    try {
        const response = await service.patch (`/poet/${params.poetId}/add-to-favourite`)
        if (response.data.favouritePoet.includes(params.poetId)){
          setAddToFavourite(true)
        }else {
          setAddToFavourite(false)
        }
        console.log(addToFavourite);
        
    } catch (error) {
        console.log(error);
    }
  };
 
  return (
    <div>
      <nav>
        <NavLink to="/poet/all-poets" className="nav-link">
      
          Back to all poets
        </NavLink>
      </nav>
      <h2>
      
        {poetDetails.firstName} <span></span> {poetDetails.lastName} 
      </h2>

      <img src={poetDetails.image} alt="image" width="250px" />
      <p>Born in {poetDetails.bornIn}</p>
      <br />
      <button type="button" onClick={handleAddToFavouriteChange}>
      {addToFavourite === false
         ? "💜" 
        :  "♡"} 
        </button>

        {/* <h5>Poems by this author:</h5> 
     { poetDetails.favouritePoet == [] ? "..." : 
      userDetails.favouritePoet.map((eachPoet) => {
        return ( 
           <ul key={eachPoet._id}> 
       <Link to = {`/poet/${eachPoet._id}/details`}> <p  >{eachPoet.firstName} {eachPoet.lastName}  </p></Link>
     </ul> )   
    })} 
     <br />  */}

      <Link to={`/poet/${poetDetails._id}/edit-details`}>Edit {poetDetails.firstName} {poetDetails.lastName}´s info</Link>
      <button onClick={handleDeletePoet} >Delete this poet</button>

      <Link to={`/user/${poetDetails.createdBy._id}/profile`}>
      <p>Added by: {poetDetails.createdBy.firstName} {poetDetails.createdBy.lastName}</p>
      </Link>
    </div>
  );
}

export default PoetDetails;
