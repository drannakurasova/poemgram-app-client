import { useEffect, useState } from "react";
import service from "../../services/service.config";
import Spinner from "../../components/Spinner";

function AllNews() {
  const [currentNews, setCurrentNews] = useState(null);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  useEffect(() => {
    getCurrentNews();
  }, []);

  const getCurrentNews = async () => {
    try {
      const response = await service.get("/poemgram");
      console.log(response);
      setCurrentNews(response.data.slice(0, 15));
      setIsNewsLoading(false);
      console.log(response.data[4].relatedOwrd);
    } catch (error) {
      console.log(error);
    }
  };

  if (currentNews === null) {
    return <Spinner />;
  }

  return (
    <div className="all-news-body" >
      <h3>News in poems</h3>
      {currentNews.map((eachNews) => {
        return (
          <div key={eachNews.article_id} >
            <div className="card-body" id="all-news" >
            <h5 className="card-title">{eachNews.title} </h5>
            <p>{eachNews.description} </p>
            <p className="d-inline-flex gap-1">
              <button
                className="btn btn-outline-dark btn-sm"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseContent"
                aria-expanded="true"
                aria-controls="collapseContent"
              >
                See more
              </button>
            </p>
           <br />
          
            <div className="collapse" id="collapseContent">
              <div className="card card-body">{eachNews.content}</div>
            </div>
            </div>

            <div className="card-body" id="all-poems" >

            <h6 className="card-title"> Suggested poem: {eachNews.relatedPoem.title} </h6>
           <hr />
            <p className="d-inline-flex gap-1">
              <button
                className="btn btn-outline-light btn-sm"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseText"
                aria-expanded="false"
                aria-controls="collapseText"
              >
                See full poem
              </button>
            </p>
          
            <div class="collapse" id="collapseText">
              <div class="card card-body">
                <p>{eachNews.relatedPoem.text}</p></div>
            </div>
   
            </div>

      
          </div>
        );
      })}
    </div>
  );
}

export default AllNews;
