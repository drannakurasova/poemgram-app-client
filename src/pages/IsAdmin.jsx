import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function isAdmin() {

    const {userRole} = useContext (AuthContext)

    if (userRole==="admin") {
        return  (
            <div>{props.children}</div>
          )
    } else { 
  return null
}
}

export default isAdmin