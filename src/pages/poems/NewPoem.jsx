import { useNavigate } from "react-router-dom"
import { useState } from "react";
import service from "../../services/service.config";


function NewPoem() {
    const navigate = useNavigate()

const [title, setTitle] = useState("");
const [text, setText] = useState("");
const [poet, setPoet] =useState(null)
const [errorMessage, setErrorMessage] = useState("");

const handleTitleChange = (e) => setTitle(e.target.value);
const handleTextChange = (e) => setText(e.target.value);
const handlePoetChange = (e) => setPoet(e.target.value);

const handleAddNewPoem = async (e) => {
    e.preventDefault();
    try {
       const response = await service.post("/poem/new-poem", {
          title,
          text,
          poet
        });
   setPoet (response.data)
    
        navigate("/poet/all-poets");
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
        <h2>Add a new poem</h2>

    <form onSubmit={handleAddNewPoem}>
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <label htmlFor="text">Text: </label>
      <input
        type="text"
        name="text"
        width="100"
        height="300"
        value={text}
        onChange={handleTextChange}
        
      />
      <br />
      <label htmlFor="poet">Written by: </label>
     <select className="form-select" name="poet"multiple  onChange={handlePoetChange}> 
     <option value=""></option>
      </select>
      <br />
   
      <button type="submit">Add this poem</button>

      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
    </div>
  )
}

export default NewPoem