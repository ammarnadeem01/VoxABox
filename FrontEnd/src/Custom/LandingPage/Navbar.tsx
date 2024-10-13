import Logo from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
function Navbar() {
  const nav = useNavigate();
  const { token } = useStore();
  return (
    <div className="max-w-full min-w-full bg-black flex justify-between py-2 px-5 text-white">
      <div
        onClick={() => {
          nav("/");
        }}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <div className="w-10 h-10">
          <img src={Logo} alt="" className="rounded-full" />
        </div>
        <p className="text-4xl px-1 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 shadow-[0_0_20px_rgba(0,255,0,0.5)]">
          VoxABox
        </p>
      </div>
      <div className=" flex gap-10">
        {token && (
          <button
            onClick={() => nav("/chat")}
            className="px-5 py-0 text-sm rounded-full  outline outline-white hover:bg-white hover:text-black"
          >
            Chat
          </button>
        )}
        {!token && (
          <button
            onClick={() => nav("/signup")}
            className="px-5 py-0 text-sm rounded-full  outline outline-white hover:bg-white hover:text-black"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
