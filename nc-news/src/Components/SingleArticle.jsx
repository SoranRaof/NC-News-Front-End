import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchSingleArticle, updateArticleVote } from "../utils/api";
import { sqlDateFormatter } from "../utils/sql-date-formatter";
import Comments from "../Components/Comments.jsx";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../contexts/user.js";

function SingleArticle() {
  const { article_id } = useParams();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [likeBtnDisabled, setLikeBtnDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id).then((singleArticle) => {
      setSingleArticle(singleArticle);
      setIsLoading(false);
    });
  }, [article_id]);

  const handleVoteClick = () => {
    if (currentUser) {
      setSingleArticle({
        ...singleArticle,
        votes: singleArticle.votes + 1,
      });
      setLikeBtnDisabled(true);
      updateArticleVote(article_id).catch(() => {
        setIsError(true);
        setSingleArticle({
          ...singleArticle,
          votes: singleArticle.votes - 1,
        });
      });
    }
    setLikeBtnDisabled(true);
  };

  if (isLoading)
    return (
      <div className="flex flex-col h-screen justify-center items-center animate-pulse">
        <p className="text-bold">Loading article...</p>
      </div>
    );

  if (isError)
    return <p className="text-bold">Unable to like article at this time 🙁 </p>;

  return (
    <div className="flex flex-col items-center">
      <article className="flex flex-col items-center m-5 p-5 w-auto border shadow rounded-lg md:w-3/4 xl:w-1/2">
        <section className="w-auto flex flex-col justify-center">
          <img
            src={singleArticle.article_img_url}
            alt={singleArticle.title}
            className="self-center border rounded-lg w-full"
          />
          <h2 className="text-lg md:text-xl 2xl:text-3xl font-extrabold my-2 w-full">
            {singleArticle.title}
          </h2>
          <p className="text-xs md:text-sm 2xl:text-xl italic mb-2">
            Written by {singleArticle.author} on{" "}
            {sqlDateFormatter(singleArticle.created_at)}
          </p>
          <div className="flex flex-row  items-center  font-bold text-xs py-1 w-1/3">
            <p className="text-xs 2xl:text-lg pl-1">{singleArticle.topic}</p>
          </div>
          <p className="text-sm lg:text-lg 2xl:text-2xl text-justify my-2">
            {singleArticle.body}
          </p>
          <div className="flex flex-row justify-between py-2 font-bold">
            <p className="text-xs 2xl:text-lg">{comments.length} comments</p>
            <p className="text-xs 2xl:text-lg">{singleArticle.votes} likes</p>
          </div>{" "}
          <button
            className="flex flex-row items-center  font-bold text-xs 2xl:text-lg my-2 p-1 w-1/4 bg-gray-400 shadow rounded-lg justify-center self-center  hover:bg-gray-600"
            disabled={likeBtnDisabled}
            onClick={handleVoteClick}
          >
            <p className="items-center">Like</p>
            <HandThumbUpIcon className="h-5 w-5 pl-1 fill-none" />
          </button>
          {!currentUser && likeBtnDisabled === true ? (
            <p className="text-base"> You need to login first!</p>
          ) : null}{" "}
        </section>
      </article>
      <Comments
        comments={comments}
        setComments={setComments}
        article_id={article_id}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default SingleArticle;
