import SearchIcon from "@mui/icons-material/Search";
import Contact from "./Contact";
import React from "react";
interface ChatListProps {
  data: {};
}
const ChatList: React.FC<ChatListProps> = ({ data }) => {
  return (
    <div className="w-1/5 h-[95%] text-white flex flex-wrap justify-betweeen items-start overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[#363638]">
      <div className="w-full flex flex-wrap justify-start items-start  ">
        <div className="w-full flex justify-center items-start my-5 text-black ">
          <div className="flex items-center w-10/12 text-white  bg-[#101717]  rounded-lg">
            <div className="p-2 ">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 border-none outline-none  rounded-lg w-full bg-[#101717]"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center py-3 pl-2 gap-3">
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
