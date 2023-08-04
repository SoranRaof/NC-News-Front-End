import axios from "axios";

export const fetchArticles = () => {
  return axios
    .get("https://sorans-backend-project.onrender.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchSingleArticle = (article_id) => {
  return axios
    .get(
      `https://sorans-backend-project.onrender.com/api/articles/${article_id}`
    )
    .then(({ data }) => {
      return data.article;
    });
};

export const fetchCommentsByArticleID = (article_id) => {
  return axios
    .get(
      `https://sorans-backend-project.onrender.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      return data.comments;
    });
};

export const updateArticleVote = (article_id) => {
  return axios
    .patch(
      `https://sorans-backend-project.onrender.com/api/articles/${article_id}`,
      { inc_votes: 1 }
    )
    .then(({ data }) => {
      return data.article;
    });
};

export const postComment = (comment) => {
  return axios
    .post(
      `https://sorans-backend-project.onrender.com/api/articles/${comment.article_id}/comments`,
      comment
    )
    .then((response) => {
      return response;
    });
};

export const fetchUsers = () => {
  return axios
    .get("https://sorans-backend-project.onrender.com/api/users")
    .then(({ data }) => {
      return data.users;
    });
};

export const fetchTopics = () => {
  return axios
    .get("https://sorans-backend-project.onrender.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};
