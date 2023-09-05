import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate(props) {

    const {isUserActive} = useContext (AuthContext)

    if (isUserActive===true) {
        return  (
            <div>{props.children}</div>
          )
    } else { 
  return <Navigate to="/login"/>
}
}

export default IsPrivate