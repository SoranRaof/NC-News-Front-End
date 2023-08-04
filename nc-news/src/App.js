import "./App.css";
import ArticleList from "./Components/ArticleList";
import SingleArticle from "./Components/SingleArticle";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UsersList from "./Components/UsersList";
import NavBar from "./Components/NavBar";

function App() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();

  return (
    <div className="flex flex-col items-center h-screen">
      <NavBar
        users={users}
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
      <main className="flex flex-grow">
        <Routes className="">
          <Route
            path="/"
            element={
              <>
                <ArticleList
                  articles={articles}
                  setArticles={setArticles}
                  selectedTopic={selectedTopic}
                />
              </>
            }
          />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route
            path="/users"
            element={
              <UsersList
                className="flex flex-col flex-grow"
                users={users}
                setUsers={setUsers}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
