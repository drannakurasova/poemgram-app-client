import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { uploadImageService } from "../../services/upload.services";


function EditPoetImage() {
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
      getPoetData();
    }, []);

    const getPoetData = async () => {
      try {
        const response = await service.get(`/poet/${params.poetId}/details`);

        setImageUrl(response.data[0].image);
        console.log(response.data);

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
      await service.patch(`/poet/${params.poetId}/details`, {
        image: imageUrl
      });
      navigate(`/poet/${params.poetId}/details`);
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
       
      <h2>Edit Image</h2>
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
      <button type="submit">Update this photo</button>
      </form>
    </div>
  );
}

export default EditPoetImage;
