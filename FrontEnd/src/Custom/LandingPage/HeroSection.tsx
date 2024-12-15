import AppleIcon from "@mui/icons-material/Apple";
import ShopIcon from "@mui/icons-material/Shop";
import Mobile from "../../assets/mobilepic-removebg-preview.png";
import vocieWave from "../../assets/voicewave.png";
import VoiceNote from "../../assets/voicemsg.png";
import User from "../../assets/manprvtcaht.png";
import { US, PK, IN, DE } from "country-flag-icons/react/3x2";
function HeroSection() {
  return (
    <div className="max-w-full h-[100vh] text-white">
      <div className="flex w-full justify-center items-center flex-wrap h-[80vh] ">
        <p className="font-semibold text-5xl w-full text-center flex-wrap ">
          Connect with your <br />
          friends easily
        </p>
        <p className="text-sm text-center w-full py-3">
          The best app for your communication
        </p>
        <div className="text-black w-full flex justify-center pb-6 gap-4 pl-5 text-sm ">
          <button className="bg-white  px-3 py-1 rounded-3xl">
            <AppleIcon /> App Store
          </button>
          <button className="bg-white  px-3 py-1 rounded-3xl">
            <ShopIcon /> Google Play
          </button>
        </div>
        {/*1  */}
        {/* i */}
        <div className="w-1/3  h-[75%]  ">
          <div className="flex justify-end pr-5">
            <div className="w-1/2 flex justify-center items-center flex-wrap p-5 rounded-xl bg-[#363638]">
              <p className="w-full ">Translation</p>
              <div className="w-1/2">
                <DE title="United States" className="w-10 h-10" />
                German
              </div>
              <div className="w-1/2">
                <US title="United States" className="w-10 h-10 " />
                English
              </div>
              <div className="w-1/2">
                <IN title="United States" className="w-10 h-10 " />
                Hindi
              </div>
              <div className="w-1/2">
                <PK title="United States" className="w-10 h-10 " />
                Urdu
              </div>
            </div>
          </div>
          {/* ii */}
          <div className="w-full flex justify-start h-36 ">
            <img src={VoiceNote} alt="" className="h-1/12" />
          </div>
          {/* iii */}
          <div className="w-full flex justify-center items-center ">
            <div className="w-1/2 flex justify-end items-center p-1  bg-blue-500 rounded-xl">
              <div className="w-1/3">
                <img src={User} alt="" className="w-12 h-12 rounded-full" />
              </div>
              <div className="w-2/3 flex flex-wrap justify-start items-center">
                <p className="w-full font-semibold">Ammar</p>
                <p className="w-full text-xs">Let's discuss a new project?</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="w-1/3 flex flex-end  h-[75%] ">
          <img src={Mobile} alt="" />
        </div>
        {/* 3 */}
        <div className="w-1/3  h-[75%]   flex flex-wrap ">
          <div className="  w-full flex flex-wrap justify-center items-center">
            {/* i */}
            <div className="w-full flex justify-start items-center ">
              <div className="w-1/2 flex justify-end items-center p-1  bg-blue-500 rounded-xl">
                <div className="w-1/3">
                  <img src={User} alt="" className="w-12 h-12 rounded-full" />
                </div>
                <div className="w-2/3 flex flex-wrap justify-start items-center">
                  <p className="w-full font-semibold">Jacob Simmons</p>
                </div>
              </div>
            </div>
            {/* ii */}
            <div className="w-full flex justify-end items-center pr-3">
              <div className="w-1/2 flex justify-end items-center p-1  bg-blue-500 rounded-xl">
                <div className="w-1/3">
                  <img src={User} alt="" className="w-12 h-12 rounded-full" />
                </div>
                <div className="w-2/3 flex flex-wrap justify-start items-center">
                  <p className="w-full font-semibold">Alex</p>
                  <p className="w-full text-xs">Hello, How are you?</p>
                </div>
              </div>
            </div>
            {/* iii */}
            <div className="w-full  flex justify-center items-center ">
              <div className="w-1/3 bg-[#363638] flex flex-wrap p-5 rounded-xl">
                <img src={vocieWave} alt="" />
                <p className="text-sm w-full text-gray-500 text-center">
                  Speak
                </p>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
