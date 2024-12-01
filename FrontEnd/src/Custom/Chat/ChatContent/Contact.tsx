import { useEffect, useState } from "react";
import User from "../../../assets/manprvtcaht.png";
import api from "../../../axiosConfig";
import { ContactProps, User as U } from "../../../Types";

const Contact: React.FC<ContactProps> = ({ data, onClick }) => {
  const [friend, setFriend] = useState<U | null>();
  const [status, setStatus] = useState<"online" | "offline">();
  const checkStatus = () => {
    api
      .get(`api/v1/user/status/checkStatus`, {
        params: { userId: data?.email },
        headers: { "Cache-Control": "no-cache" },
      })
      .then((res) => {
        setStatus(res.data.data.status.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setFriend(data);
    checkStatus();
  }, [data]);
  return (
    <div
      className="w-full flex flex-wrap justify-start cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex justify-between items-center p-1 rounded-xl">
        <div className="w-4/5 flex justify-start items-center">
          <div className="w-1/4 ">
            <img
              src={friend?.avatar ? friend.avatar : User}
              alt=""
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="w-3/5 flex flex-wrap justify-start items-center">
            <p className="w-full font-semibold">
              {friend?.fname + " " + friend?.lname}
            </p>
            <p className="w-full flex  items-center gap-3 text-xs">
              {friend?.email}
            </p>
          </div>
        </div>
        {/* {status === "online" && (
          <div className="w-1/6  flex justify-center items-center ">
            <p className="bg-green-500 w-2 h-2 rounded-full"></p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Contact;
