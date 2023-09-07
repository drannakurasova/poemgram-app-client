import { useEffect, useState } from "react"
import service from "../../services/service.config"
import Spinner from "../../components/Spinner"


function AllNews() {
    const [currentNews, setCurrentNews] = useState(null)
    const [isNewsLoading, setIsNewsLoading] = useState (true)
  
    useEffect(() => {
      getCurrentNews()
    }, [] )
    
    const getCurrentNews = async () => {
      try {
        const response = await service.get("/poemgram")
        console.log(response);
        setCurrentNews(response.data.slice(0, 15))
        setIsNewsLoading(false)
        console.log(response.data[4].relatedOwrd);
      
      } catch (error) {
        console.log(error);
      }
    }
  
    if (currentNews === null) {
        return <Spinner/>
    }
 
    return (
      <div>
        <h3>News in poems</h3>
        {currentNews.map ( (eachNews) => {
          return (
            <div key={eachNews.article_id} width="80px" >
              <h5>{eachNews.title} </h5>
              <p>{eachNews.description} </p>
              <button type="button" >See more</button>
              <p>{eachNews.content} </p>
            <br />
            {eachNews.relatedPoem !== undefined ?
              <h6>  {eachNews.relatedPoem.title} </h6>
             
              : null   }
             
              <br />
              {eachNews.relatedPoem !== undefined ?
             <button type="button" >See full poem</button>
             : null   }
              {eachNews.relatedPoem !== undefined ?
             <p>{eachNews.relatedPoem.text} </p>
             : null   }

             <hr />
            </div>
          )
        })}
        
        </div>
    )
  }
  

export default AllNews