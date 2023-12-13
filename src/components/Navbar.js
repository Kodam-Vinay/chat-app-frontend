import LogoutPopup from "./LogoutPopup";

const Navbar = () => {
  return (
    <nav className="h-[8vh] p-2 flex items-center justify-between bg-blue-700">
      <p className="text-white font-bold">Chat-Logo</p>
      <LogoutPopup />
    </nav>
  );
};

export default Navbar;
