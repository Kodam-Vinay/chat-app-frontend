import { addUser } from "../store/slices/userSlice";

export const postAuthRequest = async ({
  userDetails,
  url,
  setErrorMessage,
  setIsProcessLoading,
  setLoginFail,
  navigate,
  dispatch,
}) => {
  try {
    const options = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      setErrorMessage(data?.message);
      setIsProcessLoading(false);
      setLoginFail(true);
    } else {
      setErrorMessage("");
      setLoginFail(false);
      localStorage.setItem("user_data", JSON.stringify(data));
      dispatch(addUser(data));
      setIsProcessLoading(false);
      navigate("/chats");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRequest = async ({
  url,
  setError,
  setIsError,
  setIsLoading,
}) => {
  try {
    setIsLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setIsLoading(false);
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
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = async ({
  setIsLoading,
  url,
  setIsError,
  setError,
  requestBody,
}) => {
  try {
    const options = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    setIsLoading(true);
    const response = await fetch(url, options);
    const data = await response.json();
    setIsLoading(false);
    if (!response.ok) {
      setIsError(true);
      const message = "An Error Occured";
      if (data?.message) {
        setError(data?.message);
      }
      setIsError(true);
      return message;
    }
    setIsError(false);
    return data;
  } catch (error) {
    console.log(error);
  }
};
