import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../../services/service.config";

function NewPoem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [chosenPoet, setChosenPoet] = useState (null)
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async (e) => {
     setIsLoading(true)
    try {
       
      const poetResponse = await service.get("/poem/new-poem");
      console.log(poetResponse.data);
      setOptions(poetResponse.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handlePoetChange = (e) => {
    console.log(e.target.value);
    setChosenPoet(e.target.value)};


  const handleAddNewPoem = async (e) => {
    e.preventDefault();     
     console.log(chosenPoet);
    try {
      const response = await service.post("/poem/new-poem", {
        title,
        text,
        poet: chosenPoet,
      });


      navigate("/poem/all-poems");
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
  
  if (options === null) {
    <h3>just a moment</h3>
  }
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
        <label htmlFor="poet">Written by:</label>
        <select
          className="form-select"
          name="poet"
          multiple={true}
        onChange={handlePoetChange}
          disabled={isLoading}
        >
          {options.map((eachPoet) => {
            return (
           
              
                <option value={eachPoet._id} key={eachPoet._id}  >
                  {eachPoet.firstName} {eachPoet.lastName}
                </option>
             
            );
          })}
        </select>

        {/* <option value={handlePoetSelection}></option> */}

        <br />

        <button type="submit">Add this poem</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default NewPoem;
