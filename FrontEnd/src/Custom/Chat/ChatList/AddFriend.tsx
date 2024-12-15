import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import useStore from "../../../store";
interface AddProps {
  setMenuOption: any;
  setForRendering: any;
  socket: any;
}
const AddFriend: React.FC<AddProps> = ({
  setMenuOption,
  setForRendering,
  socket,
}) => {
  const [friendId, setFriendId] = useState("");
  // const [errMessage, setErrMessage] = useState("");
  const { userId } = useStore();
  const addFriend = () => {
    // api
    //   .post(`api/v1/friend`, {
    //     userId,
    //     friendId,
    //   })
    //   .then((res) => {
    //     setMenuOption(null);
    //     setForRendering((pre: number) => pre + 1);
    //     console.log("friend", res);
    //   })
    //   .catch((err) => {
    //     if (friendId == "") {
    //       setErrMessage("Please enter email of friend.");
    //     } else {
    //       setErrMessage(err.response.data.message);
    //     }
    //   })

    socket?.emit("addFriend", { userId, friendId });
    setMenuOption(null);
    setForRendering((pre: number) => pre + 1);
  };
  return (
    <div className="w-full flex flex-start flex-wrap justify-center gap-3">
      <p className="text-2xl font-semibold">Add Friend</p>
      <p className=" w-10/12">
        Enter Email of the friend you want to add in your contacts
      </p>
      <div className="flex items-center w-full text-white  bg-[#101717]  rounded-lg">
        <div className="pl-2">
          <EmailIcon />
        </div>
        <input
          type="email"
          placeholder="Enter Email..."
          className="py-2 px-4 border-none outline-none  rounded-lg w-full bg-[#101717]"
          value={friendId}
          onChange={(e) => {
            setFriendId(e.target.value);
          }}
        />
      </div>
      {/* {errMessage && <p className="text-red-500">{errMessage}</p>} */}
      <div className="flex justify-evenly items-center w-full gap-1">
        <button
          className="bg-purple-400 py-1 px-2 rounded-lg flex-1"
          onClick={addFriend}
        >
          Add
        </button>
        <button
          className="bg-purple-400 py-1 px-2 rounded-lg flex-1"
          onClick={() => setMenuOption(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddFriend;
