import SingleUser from "./SingleUser.jsx";
import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api.js";

const UsersList = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers(setUsers).then((usersList) => {
      setUsers(usersList);
      setIsLoading(false);
    });
  }, [setUsers]);

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center animate-pulse">
        <p className="text-bold">Loading users...</p>
      </div>
    );

  return (
    <section className="flex flex-col">
      <div className="flex-grow">
        <ul className="flex flex-row flex-wrap justify-center items-center">
          {users.map((user) => {
            return <SingleUser key={user.username} user={user} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default UsersList;
