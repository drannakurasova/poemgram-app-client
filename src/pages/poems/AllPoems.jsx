import { useEffect, useState } from "react";
import service from "../../services/service.config";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

function AllPoems() {
  const navigate = useNavigate();
  const [allPoems, setAllPoems] = useState();

  useEffect(() => {
    getPoems();
  }, []);

  const getPoems = async () => {
    try {
      const response = await service.get("/poem/all-poems");

      setAllPoems(response.data.allPoems);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSortByTitle = () => {
    let clonedPoems = JSON.parse(JSON.stringify(allPoems));
    clonedPoems.sort((poem1, poem2) => {
      return poem1.title.localeCompare(poem2.title) > 0 ? 1 : -1;
    });
    setAllPoems(clonedPoems);
  };

  const handleSortByWhenAdded = () => {
    console.log("sorting by when added");
    let clonedPoems = JSON.parse(JSON.stringify(allPoems));
    clonedPoems.sort((poem1, poem2) => {
      return poem1.createdAt > poem2.createdAt ? -1 : 1;
    });
    setAllPoems(clonedPoems);
  };

  if (allPoems === undefined) {
    return <Spinner />;
  }

  return (
    <div className="genAllPoems">
      <h3>All Poems</h3>
      <br />
      <section className="sorting">
        <button
          onClick={handleSortByTitle}
          className="btn btn-outline-secondary btn-sm"
        >
          Sort by title
        </button>
  
        <button
          onClick={handleSortByWhenAdded}
          className="btn btn-outline-secondary btn-sm"
        >
          Show most recent first
        </button>
      </section>
      <br />
      <div className="allPoems">
        <ul className="list-group">
          {allPoems.map((eachPoem) => {
            return (
              <li key={eachPoem._id} className="list-group-item">
                <Link to={`/poem/${eachPoem._id}/details`}>
                  {eachPoem.title} by <span></span>
                  {eachPoem.poet.firstName} {eachPoem.poet.lastName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AllPoems;
