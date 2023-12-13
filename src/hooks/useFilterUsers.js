import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFilterUsers = ({ searchInput }) => {
  const [users, setUsers] = useState(null);
  const allUsers = useSelector((store) => store?.chat?.allUsers);

  useEffect(() => {
    allUsers && getData();
  }, [searchInput, allUsers]);

  const getData = () => {
    const users = allUsers?.filter(
      (each) =>
        each?.user_id?.includes(searchInput) ||
        each?.email?.toLowerCase() === searchInput.toLowerCase()
    );
    setUsers(users);
  };
  return users;
};
export default useFilterUsers;
