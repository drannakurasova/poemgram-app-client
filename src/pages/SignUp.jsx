import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/upload.services";
import defaultImage from "../assets/default_image.jpg"

function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleFileUpload = async (e) => {
    // if (!e.target.files[0]) {
    //   // to prevent accidentally clicking the choose file button and not selecting a file
    //   return;
    // }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); 
    uploadData.append("image", e.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };
  // const handleBornInChange = (e) => setBornIn(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(imageUrl);

    try {
      await service.post("/auth/signup", {
        firstName,
        lastName,
        image: imageUrl,
        email,
        password,
      });

    // if (!imageUrl) {
    // imageUrl = defaultImage
    // }

      navigate("/login");
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
      <h2>SIGN UP</h2>
      <form onSubmit={handleSignUp}>
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
        {isUploading ? <h3>... uploading image</h3> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} onError={defaultImage} alt="img" width={200} />
          </div>
        ) : null}

        <br />

        <label htmlFor="email">E-mail: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button type="submit">Take me in</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default SignUp;
