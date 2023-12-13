import React from "react";
import { useNavigate } from "react-router-dom";

const ChatError = ({ error }) => {
  const navigate = useNavigate();
  console.log(error);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="font-bold text-white mb-10">An Error Occured</p>
      <button
        type="submit"
        onClick={() => navigate("/chats")}
        className="px-4 py-2 rounded-md outline-none bg-blue-500 font-bold hover:bg-blue-600 text-white"
      >
        GOTO BACK
      </button>
    </div>
  );
};

export default ChatError;
