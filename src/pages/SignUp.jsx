

import { useState } from "react"
import {useNavigate} from "react-router-dom"
import service from "../services/service.config"
import axios from "axios"

function SignUp() {
    const navigate = useNavigate ()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [photo, setPhoto] = useState("")
    // const [bornIn, setBornIn] = useState ("")
    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState ("")

    const [errorMessage, setErrorMessage] = useState("")

    const handleFirstNameChange =(e) => setFirstName (e.target.value)
    const handleLastNameChange =(e) => setLastName (e.target.value)
    const handlePhotoChange = (e) => setPhoto (URL.createObjectURL(e.target.files[0]))
    // const handleBornInChange = (e) => setBornIn(e.target.value)
    const handleEmailChange = (e) => setEmail (e.target.value)
    const handlePasswordChange = (e) => setPassword (e.target.value)

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await service.post ("/auth/signup", {
                firstName, lastName, photo, 
                // bornIn,
                 email, password 
            })


            navigate ("/login")
            
        } catch (error) {
            console.log(error);

            if (error.response && error.response.status === 400) {
                setErrorMessage (error.response.data.errorMessage)
            } else { 
            navigate ("/error")
        }
        }
    }




  return (
    <div>
        <h2>SIGN UP</h2>
        <form onSubmit={handleSignUp} encType="multipart/form-data">
        <label htmlFor="firstName">First name: </label>
        <input type="text" name="firstName" value={firstName} onChange={handleFirstNameChange} />
        <br />
        <label htmlFor="lastName">Last name: </label>
        <input type="text" name="lastName" value={lastName} onChange={handleLastNameChange}/>
        <br />
        <label htmlFor="photo">Photo: </label>
        <input type="file" name="photo"  onChange={handlePhotoChange}/>
         <output></output>
        <br />
        {/* <label htmlFor="">Born in: </label>
        <input type="number" name="bornIn" value={bornIn} onChange={handleBornInChange}/>
        <br /> */}
        <label htmlFor="email">E-mail: </label>
        <input type="text" name="email" value={email} onChange={handleEmailChange}/>
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        <br />
        <button type="submit">Take me in</button>

        {errorMessage?<p>{errorMessage}</p>:null }

        </form>


    </div>
  )
}

export default SignUp