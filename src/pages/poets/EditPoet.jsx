import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditPoet() {
    const params = useParams();
    const navigate = useNavigate();
  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState("");
    const [bornIn, setBornIn] = useState ("")
  
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handlePhotoChange = (e) => setPhoto(URL.createObjectURL(e.target.files[0]));
    // const handleBornInChange = (e) => setBornIn(e.target.value)
  
    useEffect(() => {
      getUserData();
    }, []);
  
    const getUserData = async () => {
      try {
        const response = await service.get(`/user/${params.userId}/profile`);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoto(response.data.photo);
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
          photo,
    
        });
        navigate(`/user/${params.userId}/profile`);
        window.alert("Successfully updated")
      } catch (error) {
        console.log(error);
  
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.errorMessage);
        } else {
          navigate("/error");
        }
      }
    };
  
  return (
    <div>EditPoet</div>
  )
}

export default EditPoet