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

  const handleSortByTitle = () => {
    console.log("sorting by title");
    let clonedPoems = JSON.parse(JSON.stringify(allPoems));
    clonedPoems.sort((poem1, poem2) => {
      return poem1.title.localeCompare(poem2.title) > 0 ? 1 : -1;
    });
    setAllPoems(clonedPoems);
  };

  if (allPoems === undefined) {
    return <h3>...searching</h3>;
  }

  return (
    <div>
      <h3>All Poems</h3>
      <section className="sorting">
      <button onClick={handleSortByTitle} >Sort by title</button>
      <button type="button">Sort by popularity</button>
      <button type="button">Sort by ??</button>
      </section>
      <br />
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
