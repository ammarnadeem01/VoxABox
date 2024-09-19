import AppleIcon from "@mui/icons-material/Apple";
import ShopIcon from "@mui/icons-material/Shop";
import MobileChat from "../../assets/lastmobimg-removebg-preview.png";
function DownloadAd() {
  return (
    <div className="min-w-full flex justify-center items-center my-10">
      <div className="w-2/3 flex bg-blue-500 justify-center items-center pl-5 rounded-2xl">
        <div className="w-1/2">
          <div className="text-5xl text-white">
            Download the <br /> app and chat <br />
            with Pleasure!
          </div>
          <div className="text-black flex gap-4 pl-5 text-sm py-5">
            <button className="bg-white  px-3 py-1 rounded-3xl">
              <AppleIcon /> App Store
            </button>
            <button className="bg-white  px-3 py-1 rounded-3xl">
              <ShopIcon /> Google Play
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <img src={MobileChat} alt="" />
        </div>
      </div>
    </div>
  );
}

export default DownloadAd;
