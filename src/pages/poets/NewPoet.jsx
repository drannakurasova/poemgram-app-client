import { useNavigate } from "react-router-dom"
import { uploadImageService } from "../../services/upload.services";
import { useState } from "react";
import service from "../../services/service.config";
import Spinner from "../../components/Spinner";



function NewPoet() {
const navigate = useNavigate()

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const [imageUrl, setImageUrl] = useState(null);
const [isUploading, setIsUploading] = useState(false);

const [bornIn, setBornIn] =useState("")
const [errorMessage, setErrorMessage] = useState("");

const handleFirstNameChange = (e) => setFirstName(e.target.value);
const handleLastNameChange = (e) => setLastName(e.target.value);

const handleFileUpload = async (e) => {
  if (!e.target.files[0]) {
   setErrorMessage(error.response.data.errorMessage);
    return;
  }

  setIsUploading(true); 

  const uploadData = new FormData(); 
  uploadData.append("image", e.target.files[0]);

  try {
    const response = await uploadImageService(uploadData);

    setImageUrl(response.data.imageUrl);           
    setIsUploading(false); 
    // navigate("/error");
  } catch (error) {
    console.log(error);
  }
 }
const handleBornInChange = (e) => setBornIn(e.target.value)


const handleAddNewPoet = async (e) => {
  e.preventDefault();
  console.log(imageUrl);

  try {
    await service.post("/poet/new-poet", {
      firstName,
      lastName,
      image: imageUrl,
      bornIn
    });

    navigate("/poet/all-poets");
  } catch (error) {
    console.log(error);

    if (error.response && (error.response.status === 400 || error.response.status === 401)) {
      setErrorMessage(error.response.data.errorMessage);
    } 
  //   else {
  //     navigate("/error");
  //   }
  }
};

  return (
    <div>
    <h2>ADD A NEW POET</h2>
    <form onSubmit={handleAddNewPoet}>
      <label htmlFor="firstName">First name: </label>
      <input
        type="text"
        name="firstName"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <br />
      <label htmlFor="lastName">Last name: </label>
      <input
        type="text"
        name="lastName"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <br />

      <label htmlFor="image">Photo: </label>
      <input
        type="file"
        name="image"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      {isUploading ? <Spinner/> : null}
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="img" width={200} />
        </div>
      ) : null}

      <br />

      <label htmlFor="bornIn">Born in: </label>
      <input
        type="number"
        name="bornIn"
        value={bornIn}
        onChange={handleBornInChange}
      />
      <br />
   
      <button type="submit">Add this poet</button>

      {errorMessage ? <p> {errorMessage}</p> : null}
    </form>
  </div>
  )
}

export default NewPoet