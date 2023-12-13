import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { removeUser } from "../store/slices/userSlice";
import "reactjs-popup/dist/index.css";
import "../css/logoutPopup.css";

const LogoutPopup = () => {
  const dispatch = useDispatch();
  const contentStyle = { background: "white" };
  const arrowStyle = { color: "white" };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user_data");
    dispatch(removeUser());
    navigate("/auth");
  };

  return (
    <Popup
      modal
      className="logout-popup-content"
      trigger={
        <button
          type="submit"
          className="px-4 py-2 rounded-md outline-none bg-blue-500 font-bold hover:bg-red-600 text-white"
        >
          Logout
        </button>
      }
      {...{
        contentStyle,
        arrowStyle,
      }}
    >
      {(close) => (
        <div>
          <p className="text-center font-bold mb-5">
            Are you sure, you want to logout ?
          </p>
          <div className="flex items-center justify-around">
            <button
              onClick={handleLogout}
              type="submit"
              className="px-4 py-2 rounded-md outline-none bg-blue-500 font-bold hover:bg-green-600 text-white"
            >
              Confirm
            </button>
            <button
              onClick={() => close()}
              type="submit"
              className="px-4 py-2 rounded-md outline-none bg-blue-500 font-bold hover:bg-red-600 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default LogoutPopup;
