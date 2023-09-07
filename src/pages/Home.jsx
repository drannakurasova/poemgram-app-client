import { useEffect, useState } from "react"

import service from "../services/service.config"
import Spinner from "../components/Spinner"


function Home() {
  const [currentNews, setCurrentNews] = useState(null)
  const [isNewsLoading, setIsNewsLoading] = useState (true)



  useEffect(() => {
    getCurrentNews()
  }, [] )
  
  const getCurrentNews = async () => {
    try {
      const response = await service.get("/poemgram")
      console.log(response);
      setCurrentNews(response.data.slice(0, 5))
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
      <h3>Poemgram</h3>
      {currentNews.map ( (eachNews) => {
        return (
          <div key={eachNews.article_id} width="80px" >
            <p>{eachNews.title} </p>
            <p>{eachNews.relatedPoem.title} </p>

          </div>
        )
      })}
      
      </div>
  )
}

export default Home