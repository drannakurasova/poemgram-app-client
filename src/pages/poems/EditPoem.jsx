import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

function EditPoem() {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [chosenPoet, setChosenPoet] = useState (null)
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getOptions();
    getPoemData()
  }, []);

  const getOptions = async (e) => {
     setIsLoading(true)
    try {
       
      const poetResponse = await service.get(`/poem/new-poem`);
      console.log(poetResponse.data);
      setOptions(poetResponse.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const getPoemData = async () => {
    try {
      const response = await service.get(`/poem/${params.poemId}/details`);
      setTitle(response.data[0].title);
      setText(response.data[0].text);
      setChosenPoet(response.data[0].poet);
  
      if (response === null) {
        return <h3>...just a moment...</h3>;
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handlePoetChange = (e) => setChosenPoet(e.target.value);


  const handleEditPoem = async (e) => {
    e.preventDefault();

    try {
      const updatedPoem = await service.put(`/poem/${params.poemId}/details`, {
        title,
        text,
        poet:chosenPoet,
      });
      navigate(`/poem/${params.poemId}/details`);
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


  return (
    <div>
      <h2>EDIT A POEM</h2>
      <form onSubmit={handleEditPoem}>
        <label htmlFor="">Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <label htmlFor="">Text: </label>
        <input
          type="text"
          name="text"
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

        <br />

        <button type="submit">Update information</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
      

      </form>
    </div>
  );
}

export default EditPoem;
