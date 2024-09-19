// import Man from "../../assets/manprvtcaht.png";
import Man from "../../assets/manprvtcahtblur.png";
// import Woman from "../../assets/manprvtchat.png";
import Woman from "../../assets/manprvtchatblur.png";
function PrivateMessages() {
  return (
    <div className="min-w-full text-white flex justify-center items-center flex-wrap py-24">
      <div className="flex px-5  py-5 w-3/4 flex-wrap">
        <div className="text-left w-full pl-100 pl-[110px]">
          <p className="font-semibold text-3xl">Send private messages</p>
        </div>
        <div className="w-full flex justify-around py-5">
          <div className="w-1/4 h-[50vh] ">
            <p className="text-sm py-7">
              Simple, secure and private messaging <br /> and calling free
              worldwide
            </p>
            <button className="outline outline-white rounded-2xl px-3 py-1 hover:bg-white hover:text-black ">
              Download
            </button>
            <div className=" py-5">
              <img src={Woman} alt="" />
            </div>
          </div>
          <div className="w-1/3">
            <img src={Man} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateMessages;
