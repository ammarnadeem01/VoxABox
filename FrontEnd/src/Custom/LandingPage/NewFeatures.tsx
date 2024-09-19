import Mobile from "../../assets/mobilepic-removebg-preview.png";
import vocieWave from "../../assets/voicewave.png";
import { US, PK, IN, DE } from "country-flag-icons/react/3x2";
function NewFeatures() {
  return (
    <div className="min-w-full flex justify-center items-center text-white my-10 py-10">
      <div className="w-10/12 flex flex-wrap justify-center items-center">
        <div className="w-full flex flex-wrap justify-center items-center  py-10">
          <p className="w-full text-center text-3xl">Our New Features</p>
          <p className="w-full text-center">
            Save every minute with our new feature. We will <br />
            help you feel your interlocutor next to you
          </p>
        </div>
        <div className="flex w-full flex-col flex-wrap h-[70vh] justify-between items-center">
          <div className="bg-[#9292e8] h-full w-5/12 rounded-xl flex justify-center items-end flex-wrap">
            <div className="w-full text-center">
              <p className="font-semibold text-3xl mb-8">Create Your Team</p>
              <p className="text-lg mb-4">
                Build and manage your team effortlessly with our app -
                collaborate, communicate, and succeed together.
              </p>
              <button className="px-5 py-1 text-sm rounded-full  outline outline-white hover:bg-white hover:text-black">
                Get the App
              </button>
            </div>
            <div>
              <img src={Mobile} alt="" />
            </div>
          </div>
          <div className=" h-1/3 w-5/12 rounded-xl flex justify-evenly items-center bg-gray-700">
            <div className="w-2/3 pl-5">
              <p className="font-semibold text-xl">Voice Transcription</p>
              <p className="text-sm">
                The new voice transcription feature helps you record messages
                while you're on the move
              </p>
            </div>
            <div className="w-1/3">
              <img src={vocieWave} alt="" />
            </div>
          </div>
          <div className="bg-blue-600 h-3/5 w-5/12 rounded-xl  flex justify-evenly items-center">
            {" "}
            <div className="w-1/2 pl-5">
              <p className="font-semibold text-xl my-5">Translation</p>
              <p className="text-sm">
                No language barrier! Translate your messages into any language
              </p>
              <button className="px-5 py-1 text-sm my-5 rounded-full mx-1  outline outline-white hover:bg-white hover:text-black">
                Get the App
              </button>
            </div>
            <div className="w-1/2  flex justify-center items-center">
              <div className="w-10/12 flex justify-between items-center flex-wrap p-5 rounded-xl bg-[#363638]">
                <p className="w-full ">Translation</p>
                <div>
                  <div className="w-1/3">
                    <DE title="United States" className="w-10 h-10" />
                    German
                  </div>
                  <div className="w-1/3">
                    <PK title="United States" className="w-10 h-10 " />
                    Urdu
                  </div>
                </div>
                <div>
                  <div className="w-1/3">
                    <IN title="United States" className="w-10 h-10 " />
                    Hindi
                  </div>

                  <div className="w-1/3">
                    <US title="United States" className="w-10 h-10 " />
                    English
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFeatures;
