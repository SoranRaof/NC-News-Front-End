import { fetchCommentsByArticleID } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { sqlDateFormatter } from "../utils/sql-date-formatter";
import { postComment } from "../utils/api";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../contexts/user";

const Comments = ({ article_id, comments, setComments }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPostingError, setPostingError] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [hasPosted, setHasPosted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleID(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id, setComments]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setIsCommentLoading(true);
    const newComment = {
      article_id: article_id,
      username: currentUser?.username,
      body: commentBody,
    };
    postComment(newComment)
      .then((response) => {
        setHasPosted(true);
        setComments([response.data.comment, ...comments]);
        setCurrentUser(currentUser);
        setIsCommentLoading(false);
        setCommentBody("");
      })
      .catch(() => {
        setIsCommentLoading(false);
        setHasPosted(false);
        setPostingError(true);
      });
  };

  if (isError) return <p>Unable to load comments</p>;

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center animate-pulse">
        <NewspaperIcon className="h-8 w-auto mr-2 animate-pulse" />
        <p className="">Loading comments...</p>
      </div>
    );

  return (
    <section className="flex flex-col items-center m-5 p-5 w-auto md:w-3/4 xl:w-1/2">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <form
        onSubmit={handleCommentSubmit}
        className="flex flex-col p-5 m-5 border-2 border-gray-500 shadow rounded-lg w-auto md:w-3/4 xl:w-1/2 "
      >
        <label className="text-base mb-1" htmlFor="comment-input-box"></label>
        <textarea
          required
          type="text"
          value={commentBody}
          placeholder="Write your comment here..."
          className="p-2 border rounded-lg"
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />
        <button
          className="font-semibold text-white bg-gray-500 hover:bg-gray-600 p-2 mt-2 rounded-lg"
          type="submit"
        >
          Post
        </button>
      </form>
      {isCommentLoading && currentUser ? (
        <p className="text-center font-semibold">Posting comment...</p>
      ) : null}
      {hasPosted && currentUser ? (
        <p className="text-center font-semibold">Comment added!</p>
      ) : null}{" "}
      {isPostingError && !currentUser ? (
        <p className="font-semibold text-center w-auto md:w-3/4 xl:w-1/2 text-red-600">
          Sorry, something went wrong. Please try logging in.
        </p>
      ) : null}
      <ul className="flex flex-col mt-4">
        {comments.length === 0
          ? "No comments - be the first to post one!"
          : comments.map((comment) => {
              return (
                <li
                  key={comment.comment_id}
                  className="flex flex-col p-5 self-center m-5 border-2 border-gray-700 shadow rounded-lg w-auto md:w-3/4 xl:w-1/2 "
                >
                  <p className="text-xs text-gray-600 italic ml-1">
                    by {comment.author} at{" "}
                    {sqlDateFormatter(comment.created_at)}
                  </p>
                  <p className="text-sm my-3">{comment.body}</p>
                  <p className="font-semibold text-xs flex flex-row justify-end mr-1">
                    {comment.votes} likes
                  </p>
                </li>
              );
            })}
      </ul>
    </section>
  );
};

export default Comments;
