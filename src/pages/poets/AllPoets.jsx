import { useEffect, useState } from "react"
import service from "../../services/service.config";
import { useNavigate } from "react-router-dom";


function AllPoets() {
    const navigate = useNavigate()
    const [allPoets, setAllPoets] = useState();
    console.log(allPoets);

    useEffect (() => {
        getPoets()
       }, [] )
      
       const getPoets = async () => {
        try {

          const response = await service.get("/poet/all-poets")
    // if (allPoets === undefined) {
    //     return <h3>...searching</h3>
    //  }
          console.log (response)
          setAllPoets(response.data)
        } catch (error) {
          console.log (error)
          navigate("/error")
        }
       }

   
  return (
    <div>
        <h3>All Poets</h3>
        <div>
            {allPoets.map((eachPoet) => {
                return ( 
                    <ul>
                <img src={eachPoet.image} alt="" />
                <p>{eachPoet.firstName} {eachPoet.lastName} </p>
                {/* <p>Born in {eachPoet.bornIn} </p> */}
                <br />
                </ul>
)
            } )}
        </div>
        
        </div>
  )
}

export default AllPoets