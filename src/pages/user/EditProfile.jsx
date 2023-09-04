import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import defaultImage from "../../assets/default_image.jpg";

function EditProfile() {
  const params = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);


  // const handlePhotoChange = (e) => setPhoto(URL.createObjectURL(e.target.files[0]));

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await service.get(`/user/${params.userId}/profile`);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setImageUrl(response.data.image);
      setEmail(response.data.email);
      if (response === null) {
        return <h3>...just a moment...</h3>;
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    try {
      await service.put(`/user/${params.userId}/profile`, {
        firstName,
        lastName,
      });
      navigate(`/user/${params.userId}/profile`);
      window.alert("Successfully updated");
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      //  else {
      //   navigate("/error");
      // }
    }
  };

  const navigateToEditImage = () => {
    navigate (`/user/${params.userId}/profile/edit-image`)
  }

  return (
    <div>
      <h2>EDIT YOUR INFO</h2>
      <form onSubmit={handleEditProfile}>
        <label htmlFor="">First name: </label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <br />
        <label htmlFor="">Last name: </label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />

    


        <br />
        <label htmlFor="">E-mail: </label>
        <input type="text" name="email" value={email} />
        <br />

        <button type="submit">Update my info</button>

        {errorMessage ? <p>{errorMessage}</p> : null} 
         <label htmlFor="">Photo: </label>
      <br />
         <img src={imageUrl} onError={defaultImage} alt="img" width={200} />
         <button onClick= {navigateToEditImage}>Edit my photo</button>
      </form>
    </div>
  );
}

export default EditProfile;
