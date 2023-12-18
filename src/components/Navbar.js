import LogoutPopup from "./LogoutPopup";
import NotificationContainer from "./NotificationContainer";

const Navbar = () => {
  return (
    <nav className="h-[8vh] w-full p-2 flex items-center justify-between bg-blue-700 flex-shrink-0">
      <p className="text-white font-bold">Chat-Logo</p>
      <div className="flex items-center">
        <NotificationContainer />
        <LogoutPopup />
      </div>
    </nav>
  );
};

export default Navbar;
