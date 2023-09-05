import { useEffect, useState } from "react";
import service from "../../services/service.config";
import { useNavigate, Link } from "react-router-dom";

function AllPoems() {
  const navigate = useNavigate();
  const [allPoems, setAllPoems] = useState();


  useEffect(() => {
    getPoems();
  }, []);

  const getPoems = async () => {
    try {
      const response = await service.get("/poem/all-poems");

      console.log("response", response);
      setAllPoems(response.data.allPoems);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (allPoems === undefined) {
    return <h3>...searching</h3>;
  }

  return (
    <div>
      <h3>All Poems</h3>
      <div>
        {allPoems.map((eachPoem) => {
          return (
            <ul key={eachPoem._id} >
                <Link to={`/poem/${eachPoem._id}/details`}> 
            
              <p>
                {eachPoem.title} by <span></span>   
                 {eachPoem.poet.firstName} {eachPoem.poet.lastName} 
              </p>
      
             </Link>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default AllPoems;
