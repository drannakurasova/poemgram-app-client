import { useEffect, useState } from "react";
import service from "../../services/service.config";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

function AllPoets() {
  const navigate = useNavigate();
  const [allPoets, setAllPoets] = useState();
  // console.log(allPoets);

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

  const handleSortByName = () => {
    console.log("sorting by name");
    let clonedPoets = JSON.parse(JSON.stringify(allPoets));
    clonedPoets.sort((poet1, poet2) => {
      return poet1.lastName.localeCompare(poet2.lastName) > 0 ? 1 : -1;
    });
    setAllPoets(clonedPoets);
  };

  const handleSortByWhenBorn = () => {
    console.log("sorting by whenborn");
    let clonedPoets = JSON.parse(JSON.stringify(allPoets));
    clonedPoets.sort((poet1, poet2) => { 
      return poet1.bornIn > poet2.bornIn ? -1 : 1})
    setAllPoets(clonedPoets);
    console.log(clonedPoets[0].bornIn);
  };

  if (allPoets === undefined) {
    return <Spinner/>
  
  }

  return (
    <div>
      {/* <h3>All Poets</h3>  */}
      <div>
      <section className="sorting">
      <button onClick={handleSortByName} className="btn btn-outline-secondary btn-sm" >Sort by name</button>
     
      <button onClick={handleSortByWhenBorn} className="btn btn-outline-secondary btn-sm">Sort by the year of birth</button>
    
      </section>
      </div>
      <br />
    <div>
        {allPoets.map((eachPoet) => {
          return (
            <ul key={eachPoet._id} >
                <Link to={`/poet/${eachPoet._id}/details`}> 
              <img src={eachPoet.image} alt="" width="200px"/>
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
