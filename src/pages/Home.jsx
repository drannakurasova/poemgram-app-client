import { useEffect, useState } from "react"

import service from "../services/service.config"


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
      setCurrentNews(response.data.slice(0, 2))
      setIsNewsLoading(false)
    
    } catch (error) {
      console.log(error);
    }
  }

  if (currentNews === null) {
    return <h3>loading</h3>
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