import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams, Link } from "react-router-dom";
import service from "../../services/service.config";

function PoemDetails() {
  const [poemDetails, setPoemDetails] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPoemDetails();
  }, [params.poemId]);

  const getPoemDetails = async () => {
    try {
      const response = await service.get(`/poem/${params.poemId}/details`);

      setPoemDetails(response.data[0]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePoem = async () => {
    try {
      await service.delete(`/poem/${params.poemId}/details`);

      navigate("/poem/all-poems");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  if (poemDetails === null) {
    return <h3>...just a moment...</h3>;
  }

  return (
    <div>
      <nav>
        <NavLink to="/poem/all-poems" className="nav-link">
          Back to all poems
        </NavLink>
      </nav>
      <h4>{poemDetails.title}</h4>

      <p> {poemDetails.text}</p>

      <Link to={`/poem/${poemDetails._id}/edit-details`}>Edit this poem</Link>
      <button onClick={handleDeletePoem}>Delete this poem</button>
      <p>
        Written by:
        <Link to={`/poet/${poemDetails.poet._id}/details`}>
          {poemDetails.poet.firstName} {poemDetails.poet.lastName}
        </Link>
      </p>
    </div>
  );
}

export default PoemDetails;
