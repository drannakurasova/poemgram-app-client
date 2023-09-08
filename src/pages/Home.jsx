import { useEffect, useState } from "react";

import service from "../services/service.config";
import Spinner from "../components/Spinner";

function Home() {
  const [currentNews, setCurrentNews] = useState(null);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  useEffect(() => {
    getCurrentNews();
  }, []);

  const getCurrentNews = async () => {
    try {
      const response = await service.get("/poemgram");

      setCurrentNews(response.data.slice(0, 6));
      setIsNewsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (currentNews === null) {
    return <Spinner />;
  }
  return (
    <div className="news-cards">
      {currentNews.map((eachNews) => {
        return (
          <div key={eachNews.article_id} className="card">
            <div className="card-body">
              <h5 className="card-title">{eachNews.title} </h5>
              <br />
              <p className="card-text">Suggested poem on this topic:</p>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {eachNews.relatedPoem.title}{" "}
              </h6>
              <br />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
