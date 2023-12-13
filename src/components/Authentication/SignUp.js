import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BACKEND_API,
  CLOUDINARY_IMAGE_UPLOAD_URL,
} from "../../constants/constants";
import { ColorRing } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { postAuthRequest } from "../../utils/apiRequests";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginFail, setLoginFail] = useState(false);
  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileUpload = async (image) => {
    setLoading(true);
    if (image === undefined) {
      toast("Please Select A Image!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
      return;
    }
    if (image.type === "image/png" || image.type === "image/jpeg") {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );
      try {
        const response = await fetch(CLOUDINARY_IMAGE_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const res = await response.json();
        setImageId(res.public_id);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const onSignUpDetails = async () => {
    if (!name | !email | !userId | !password | !confirmPassword) return;
    const userDetails = {
      name,
      email,
      user_id: userId,
      password,
      confirm_password: confirmPassword,
      image:
        imageId !== undefined ? imageId.slice(9) : "DUMMY_PROFILE_LOGO.png",
    };
    const url = BACKEND_API + "users/register";
    setIsProcessLoading(true);
    postAuthRequest({
      userDetails,
      url,
      setIsProcessLoading,
      setLoginFail,
      navigate,
      setErrorMessage,
      dispatch,
    });
  };
  const userData = JSON.parse(localStorage.getItem("user_data"));
  if (userData?.jsonToken !== undefined && userData?.jsonToken !== null)
    return <Navigate to="/chats" />;
  return (
    <form
      className="flex flex-col space-y-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <ToastContainer />
      <input
        placeholder="Please Enter Your Name"
        className="px-4 py-2 rounded-md outline-none"
        type="text"
        value={name}
        required={true}
        onChange={(e) => {
          setName(e.target.value);
          setLoginFail(false);
        }}
      />
      <input
        placeholder="Create your User Id"
        className="px-4 py-2 rounded-md outline-none"
        type="text"
        value={userId}
        required={true}
        onChange={(e) => {
          setUserId(e.target.value);
          setLoginFail(false);
        }}
      />
      <input
        placeholder="Please Enter Your Email"
        className="px-4 py-2 rounded-md outline-none"
        type="email"
        value={email}
        required={true}
        onChange={(e) => {
          setEmail(e.target.value);
          setLoginFail(false);
        }}
      />
      <div className="rounded-md bg-white outline-black flex items-center">
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
      <div className="rounded-md bg-white outline-black flex items-center">
        <input
          className="px-4 py-2 rounded-md outline-none w-[90%]"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          required={true}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setLoginFail(false);
          }}
          placeholder="Confirm Password"
        />
        <button
          type="button"
          className="w-[10%]"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <label htmlFor="image">Upload Your Image:</label>
      <input
        type="file"
        id="image"
        onChange={(e) => handleFileUpload(e.target.files[0])}
        accept="image/*"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-500 font-bold hover:bg-blue-600 text-white flex flex-col items-center justify-center"
        onClick={onSignUpDetails}
      >
        {loading && !isProcessLoading ? (
          <ColorRing
            visible={true}
            height="30"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : "Sign Up" ? (
          isProcessLoading ? (
            "Getting You In ....."
          ) : (
            "Sign Up"
          )
        ) : (
          "Sign Up"
        )}
      </button>
      <p className="text-red-600">{isLoginFail && errorMessage + "*"}</p>
    </form>
  );
};

export default SignUp;
