import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { uploadImageService } from "../../services/upload.services";
import defaultImage from "../../assets/default_image.jpg";

function EditImage() {
  const params = useParams();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    //   navigate("/error");
    } catch (error) {
      console.log(error);
    }
  };
 
    useEffect(() => {
      getUserData();
    }, []);

    const getUserData = async () => {
      try {
        const response = await service.get(`/user/${params.userId}/profile`);

        setImageUrl(response.data.image);

        if (response === null) {
          return <h3>...just a moment...</h3>;
        }
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
 const handleEditImage = async (e) => {
    e.preventDefault();
    try {
      await service.patch(`/user/${params.userId}/profile`, {
        image: imageUrl
      });
      navigate(`/user/${params.userId}/profile`);
      window.alert("Image successfully updated");
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } 
    //   else {
    //     navigate("/error");
    //   }
    }
  };

  return (
    <div>
       
      <h2>EditImage</h2>
 <form onSubmit={handleEditImage}>
      <label htmlFor="image">Your current photo: </label>
      <input
        type="file"
        name="image"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      {isUploading ? <h3>... uploading image</h3> : null}
      {imageUrl ? (
        <div>
          <img src={imageUrl}  alt="img" width={200} />
        </div>
      ) : null}
      <button type="submit">Update my photo</button>
      </form>
    </div>
  );
}

export default EditImage;