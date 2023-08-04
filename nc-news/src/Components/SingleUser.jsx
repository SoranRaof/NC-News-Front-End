import { useState, useContext } from "react";
import LoggedInModal from "./LoggedInModal";
import { UserContext } from "../contexts/user";

const SingleUser = ({ user }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = (user) => {
    setIsLoading(true);
    setCurrentUser(user);
    setIsLoading(false);
  };

  if (isLoading) return <p>Logging in...</p>;

  return (
    <section>
      <div className="border-2 border-light-gray-700 shadow rounded-lg hover:border-gray-700 m-1 p-1 w-32 md:w-48 lg:m-2 xl:w-120">
        <button
          type="submit"
          onClick={() => handleLoginClick(user)}
          disabled={user.username === currentUser?.username}
        >
          <li className="flex flex-col items-center mx-1 my-2 ">
            <p className="text-center text-xs md:text-sm lg:text-base xl:text-lg mt-2">
              {user.name} as {user.username}
            </p>
            <img
              className="p-1 w-fit h-20 self-center"
              src={user.avatar_url}
              alt={user.username}
            />
          </li>
        </button>
      </div>
      {currentUser === user ? <LoggedInModal user={user} /> : null}
    </section>
  );
};
export default SingleUser;
