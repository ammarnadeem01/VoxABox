import User from "../../assets/manprvtcaht.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import Group from "./Group";
import { Switch } from "@mui/material";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import CloseIcon from "@mui/icons-material/Close";
interface ChatInfoProps {
  InfoOn: boolean;
  toggleInfo: () => void;
}
const ChatInfo: React.FC<ChatInfoProps> = ({ InfoOn, toggleInfo }) => {
  function blockFriends() {}
  function clearChat() {}
  return (
    <div
      className={`${
        InfoOn ? "w-1/5" : "hidden"
      } h-full text-white   flex flex-col flex-wrap`}
    >
      <div className="w-full max-h-full flex flex-col justify-start items-center gap-2">
        {/* menu btn */}
        <div className="w-full flex justify-start items-start text-5xl">
          <CloseIcon
            fontSize="inherit"
            className="cursor-pointer"
            onClick={toggleInfo}
          />
        </div>
        {/* avatar & name */}
        <div className="flex flex-col justify-center  items-center bg-[#2c2c2e] p-5 gap-1">
          {/* button */}
          {/* image */}
          {/* <div className=""> */}
          <img src={User} alt="" className="w-[50%] h-[50%] rounded-full" />
          {/* </div> */}
          {/* mail */}
          <p className="text-[#e5e5e7]">ammarnadeem@gmail.com</p>
        </div>
        {/* Media Links And Documents */}
        <div className=""></div>
        {/* groups in common */}
        <p className="text-[#a1a1a3]">22 roups in common</p>
        <div className=" w-full  h-[40%] ">
          <div className="bg-[#2c2c2e] w-full h-full flex flex-col justify-start items-start pl-4 gap-1 py-2 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
          </div>
        </div>
        {/*Block & Delete Chat & Mute Notifications  */}
        <div className="bg-[#2c2c2e] w-full flex flex-col justify-center  text-red-700 font-semibold items-start pl-4 gap-2 py-2">
          <p
            className="cursor-pointer"
            onClick={() => {
              clearChat();
            }}
          >
            <DeleteIcon /> Delete Chat
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              blockFriends();
            }}
          >
            <AppBlockingIcon /> Block Ammar Nadeem
          </p>
          <p>
            <VolumeMuteIcon /> Mute Notification <Switch color="error" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
