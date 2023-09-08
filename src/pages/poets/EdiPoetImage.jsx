import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { uploadImageService } from "../../services/upload.services";
import Spinner from "../../components/Spinner";

function EditPoetImage() {
  const params = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

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

      setImageUrl(response.data.image);

      if (response === null) {
        return <Spinner />;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditImage = async (e) => {
    e.preventDefault();
    try {
      await service.patch(`/poet/${params.poetId}/details`, {
        image: imageUrl,
      });
      navigate(`/poet/${params.poetId}/details`);
      window.alert("Image successfully updated");
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400 || error.response.status === 401) {
        setErrorMessage(error.response.data.errorMessage);
      }
      //   else {
      //     navigate("/error");
      //   }
    }
  };

  return (
    <div className="imagePoetEdit">
      <h4>Edit an image</h4>
      <form onSubmit={handleEditImage}>
        <div className="input-group mb-3">
          <label htmlFor="image">Current image: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />{" "}
        </div>
        {isUploading ? <Spinner/> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <button type="submit" className="btn btn-outline-secondary btn-sm">
          Update this image
        </button>
        <br />
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default EditPoetImage;
