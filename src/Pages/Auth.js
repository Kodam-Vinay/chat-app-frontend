import { useState } from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col pt-10 items-center m-auto max-w-md">
      <div className="w-full flex justify-around">
        <button
          className={`text-2xl rounded-md px-4 py-2 ${
            isLogin && "bg-blue-500 font-bold hover:bg-blue-600 text-white"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`text-2xl rounded-md px-4 py-2 ${
            !isLogin && "bg-blue-500 font-bold hover:bg-blue-600 text-white"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
      <div className="w-full p-2">{isLogin ? <Login /> : <SignUp />}</div>
    </div>
  );
};

export default Auth;
