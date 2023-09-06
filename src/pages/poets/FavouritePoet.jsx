import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

function FavouritePoet() {
  const navigate = useNavigate;
  const params = useParams;

  const [addedToFavourite, setAddedToFavourite] = useState(false);
  const [addToFavourite, setAddToFavourite] = useState(null)

  const handleAddToFavouriteChange = async () => {
    try {
        const response = await service.patch (`/poet/${params.poetId}/add-to-favourite`)
        
    } catch (error) {
        console.log(error);
    }
  };

  return <div>
    <button onClick={handleAddToFavouriteChange} >Add to Favourite</button>

    </div>;
}

export default FavouritePoet;
