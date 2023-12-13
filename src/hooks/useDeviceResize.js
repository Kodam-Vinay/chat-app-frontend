import { useEffect, useState } from "react";

const useDeviceResize = () => {
  const [size, setSize] = useState({
    height: window.screen.height,
    width: window.screen.width,
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize({
        height: window.screen.height,
        width: window.screen.width,
      });
    });
  }, []);
  return size;
};

export default useDeviceResize;
