import User from "../../assets/manprvtcaht.png";
import PrivateMessage from "./PrivateMessage";
import SendIcon from "@mui/icons-material/Send";
interface ChatContentProps {
  InfoOn: boolean;
  toggleInfo: () => void;
}
const ChatContent: React.FC<ChatContentProps> = ({ InfoOn, toggleInfo }) => {
  return (
    <div
      className={`${
        InfoOn ? "w-2/5" : "w-3/5"
      } h-[95%] bg-[#363638] text-white flex flex-col justify-start items-center`}
    >
      <div className="w-[95%] h-[95%] bg-[#262626] rounded-t-lg flex flex-col justify-start items-start">
        {/* Name */}
        <div className="w-full p-3 bg-black text-white rounded-t-xl">
          <div
            className="flex justify-start items-center gap-3 cursor-pointer"
            onClick={toggleInfo}
          >
            <div>
              <img src={User} alt="" className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold">Jacob Simmons</p>
              <p className="text-gray-500 text-xs">Click for Contact Info</p>
            </div>
          </div>
        </div>
        {/* Messages */}
        <div className="w-full flex flex-col justify-start py-2 text-gray-300 text-sm items-start  px-2 gap-1 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
          <PrivateMessage />
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-2">
        <div className="w-[95%] bg-[#101717] flex justify-between items-center rounded-md">
          <input
            type="text"
            className="flex-grow border-none outline-none text-white bg-[#101717] py-2 pl-2"
            placeholder="Type Something..."
          />
          <div className="p-2 flex-shrink-0 cursor-pointer">
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
