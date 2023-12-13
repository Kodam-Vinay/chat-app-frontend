import { useNavigate } from "react-router-dom";
import { CLOUDINARY_IMAGE_ACCESS_URL } from "../constants/constants";

const ErrorRoute = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <img
        src={CLOUDINARY_IMAGE_ACCESS_URL + "error-route"}
        alt="error"
        className="rounded-md h-40 mb-5"
      />
      <h1 className="font-bold mb-5 text-center px-5 sm:text-xl">
        Sorry, The Entered Url
        <span className="text-red-500"> Does Not Exist</span>
      </h1>
      <button
        onClick={() => navigate("/chats")}
        type="button"
        className="px-4 py-2 rounded-md outline-none bg-blue-500 font-bold hover:bg-blue-600 text-white"
      >
        Back To Home
      </button>
    </div>
  );
};

export default ErrorRoute;
