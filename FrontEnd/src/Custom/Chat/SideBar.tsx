import Graph from "../../assets/premium-removebg-preview.png";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Logo from "../../assets/logo1.png";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useNavigate } from "react-router-dom";
interface SideBarProps {
  data: {
    friendsCount: number;
    groupsCount: number;
    privateChatCount: number;
    groupChatCount: number;
    blockedFriendsCount: number;
    unreadGroupMessagesCount: number;
    unreadPrivateMessagesCount: number;
  };
  option: any;
}
const SideBar: React.FC<SideBarProps> = ({ data, option }) => {
  const nav = useNavigate();
  return (
    <div className="w-1/5 h-full bg-[#202020] text-white flex flex-wrap justify-betweeen items-center">
      <div className="flex justify-center w-full  flex-wrap items-center">
        <div className="flex w-full items-center  flex-col flex-wrap">
          <p
            className="px-5 py-3 rounded cursor-pointer"
            onClick={() => {
              nav("/");
            }}
          >
            <img src={Logo} alt="" className="w-20 h-20 rounded-full flex" />
          </p>
          <div
            onClick={() => {
              option("Groups");
            }}
            className="flex w-full gap-2 pl-10  py-3 rounded cursor-pointer active:bg-gray-300 active:text-black"
          >
            <GroupIcon /> Groups
            <div className="w-1/6   text-black text-xs flex justify-center items-center ">
              <p className="bg-white rounded-full px-1">
                {data.unreadGroupMessagesCount}
              </p>
            </div>
          </div>
          <div
            onClick={() => {
              option("Direct Messages");
            }}
            className="flex py-3 gap-2 pl-10 w-full rounded  cursor-pointer active:bg-gray-300 active:text-black"
          >
            <TextsmsIcon /> Direct Messages
            <div className="w-1/6   text-black text-xs flex justify-center items-center ">
              <p className="bg-white rounded-full px-1">
                {data.unreadPrivateMessagesCount}
              </p>
            </div>
          </div>

          <div
            className="flex w-full gap-2 pl-10  py-3 rounded cursor-pointer active:bg-gray-300 active:text-black"
            onClick={() => {
              option("Blocked");
            }}
          >
            <DoNotDisturbAltIcon /> Blocked
            <div className="w-1/6   text-black text-xs flex justify-center items-center ">
              <p className="bg-white rounded-full px-1">
                {data.blockedFriendsCount}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center m-2 flex">
        <div className="w-3/4 rounded bg-purple-400 flex justify-center space-y-9 flex-wrap py-4">
          <img
            src={Graph}
            alt=""
            className="absolute w-28 h-28 -translate-y-12"
          />
          <p className="font-semibold text-xl">Get Premium</p>
          <p className="text-sm text-center">
            Unlock exclusive features, ad-free experience, and priority support.
          </p>
          <button className="bg-gray-950 hover:bg-gray-800 px-4 py-2 rounded text-sm">
            <WorkspacePremiumIcon /> Buy Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
