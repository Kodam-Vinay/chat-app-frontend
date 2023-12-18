import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllUsers, addTotalUsers } from "../store/slices/chatSlice";

const useGetAllUsers = ({ url, setError, setIsError }) => {
  const dispatch = useDispatch();

  const userChats = useSelector((store) => store?.chat?.userChats);
  const user = useSelector((store) => store?.persistedReducer?.user?.user);
  const allUsers = useSelector((store) => store?.chat?.totalUsers);

  useEffect(() => {
    if (!allUsers.length > 0) getData();
  }, [userChats]);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        setIsError(true);
        const message = "An Error Occured";
        if (data?.message) {
          setError(data?.message);
        }
        setIsError(true);
        return message;
      } else {
        setIsError(false);
        if (userChats) {
          const filterUsers = data?.filter((eachUser) => {
            let isChatCreated = false;
            if (eachUser?._id === user?._id) return false;

            isChatCreated = userChats?.some((eachChat) => {
              return (
                eachChat?.members[0] === eachUser?._id ||
                eachChat?.members[1] === eachUser?._id
              );
            });

            return !isChatCreated; //we need to return when a chat is not created
          });
          dispatch(addAllUsers(filterUsers));
        }
        dispatch(addTotalUsers(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGetAllUsers;
