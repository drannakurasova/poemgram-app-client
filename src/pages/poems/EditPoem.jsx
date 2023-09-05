import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

function EditPoem() {
  const params = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [bornIn, setBornIn] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  // const handlePhotoChange = (e) => setPhoto(URL.createObjectURL(e.target.files[0]));
  const handleBornInChange = (e) => setBornIn(e.target.value);

  useEffect(() => {
    getPoetData();
  }, []);

  const getPoetData = async () => {
    try {
      const response = await service.get(`/poet/${params.poetId}/details`);
      setFirstName(response.data[0].firstName);
      setLastName(response.data[0].lastName);
      setImageUrl(response.data[0].image);
      setBornIn(response.data[0].bornIn);
      if (response === null) {
        return <h3>...just a moment...</h3>;
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPoet = async (e) => {
    e.preventDefault();

    try {
      const updatedPoet = await service.put(`/poet/${params.poetId}/details`, {
        firstName,
        lastName,
        bornIn,
      });
      navigate(`/poet/${params.poetId}/details`);
      window.alert(
     "Successfully updated"
      );
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      // else {
      //   navigate("/error");
      // }
    }
  };

  const navigateToEditImage = () => {
    navigate(`/poet/${params.poetId}/details/edit-image`);
  };

  return (
    <div>
      <h2>EDIT INFORMATION</h2>
      <form onSubmit={handleEditPoet}>
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
        <label htmlFor="bornIn">Born in: </label>
        <input
          type="text"
          name="bornIn"
          value={bornIn}
          onChange={handleBornInChange}
        />
        <br />

        <button type="submit">Update information</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
        <label htmlFor="">Photo: </label>
        <br />
        <img src={imageUrl} alt="img" width={200} />
        <button onClick={navigateToEditImage}>Edit this photo</button>
      </form>
    </div>
  );
}

export default EditPoem;
