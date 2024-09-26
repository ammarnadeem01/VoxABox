import User from "../../../assets/manprvtcaht.png";
import { CommonGroupProps } from "../../../Types";

const GroupInCommon: React.FC<CommonGroupProps> = ({ data }) => {
  return (
    <div className="flex w-full justify-start items-center gap-1">
      <div>
        <img src={User} alt="" className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex flex-col flex-wrap w-full">
        <p>{data.name}</p>
        <p className="text-xs text-gray-300">Admin:{data.adminId}</p>
      </div>
    </div>
  );
};

export default GroupInCommon;
