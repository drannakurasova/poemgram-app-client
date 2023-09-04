import { useEffect, useState } from "react";
import service from "../../services/service.config";
import { useNavigate, Link } from "react-router-dom";

function AllPoets() {
  const navigate = useNavigate();
  const [allPoets, setAllPoets] = useState();
  console.log(allPoets);

  useEffect(() => {
    getPoets();
  }, []);

  const getPoets = async () => {
    try {
      const response = await service.get("/poet/all-poets");

      console.log("response", response);
      setAllPoets(response.data.allPoets);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (allPoets === undefined) {
    return <h3>...searching</h3>;
  }

  return (
    <div>
      <h3>All Poets</h3>
      <div>
        {allPoets.map((eachPoet) => {
          return (
            <ul key={eachPoet._id} >
                <Link to={`/poet/${eachPoet._id}/details`}> 
              <img src={eachPoet.image} alt="" />
              <p>
                {eachPoet.firstName} {eachPoet.lastName}
              </p>
         
             </Link>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default AllPoets;
