import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { BACKEND_API } from "../../constants/constants";
import { Navigate, useNavigate } from "react-router-dom";
import { postAuthRequest } from "../../utils/apiRequests";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginFail, setLoginFail] = useState(false);
  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (!email || !password) return;
    const userDetails = {
      email,
      password,
    };
    const url = BACKEND_API + "users/login";
    setIsProcessLoading(true);
    postAuthRequest({
      userDetails,
      url,
      navigate,
      setErrorMessage,
      setIsProcessLoading,
      setLoginFail,
      dispatch,
    });
  };

  const userData = JSON.parse(localStorage.getItem("user_data"));
  if (userData?.jsonToken !== undefined && userData?.jsonToken !== null)
    return <Navigate to="/chats" />;
  return (
    <form
      className="pt-10 flex flex-col space-y-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="px-4 py-2 outline-none rounded-md"
        type="text"
        value={email}
        required={true}
        onChange={(e) => {
          setEmail(e.target.value);
          setLoginFail(false);
        }}
        placeholder="Enter Your Email or User Id"
      />
      <div className="rounded-md bg-white outline-none flex items-center">
        <input
          className="px-4 py-2 rounded-md outline-none w-[90%]"
          type={showPassword ? "text" : "password"}
          value={password}
          required={true}
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginFail(false);
          }}
          placeholder="Please Enter Your Password"
        />
        <button
          type="button"
          className="w-[10%]"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button
        onClick={handleLogin}
        type="submit"
        className="px-4 py-2 rounded-md outline-none bg-blue-500 font-bold hover:bg-blue-600 text-white"
      >
        {isProcessLoading ? "Getting You In ....." : "Log In"}
      </button>
      <p className="text-red-600">{isLoginFail && errorMessage + "*"}</p>
    </form>
  );
};

export default Login;
