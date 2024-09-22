import { useEffect, useState } from "react";
import User from "../../assets/manprvtcaht.png";
interface CommonGroupProps {
  data: {
    adminId: string;
    avatar: string | null;
    createdAt: string;
    description: string;
    id: number;
    name: string;
    updatedAt: string | null;
  };
}
const GroupInCommon: React.FC<CommonGroupProps> = ({ data }) => {
  const [group, setGroup] = useState<CommonGroupProps["data"]>();
  useEffect(() => {
    setGroup(data);
  }, [data]);
  return (
    <div className="flex w-full justify-start items-center gap-1">
      <div>
        <img src={User} alt="" className="w-12 h-12 rounded-full" />
      </div>
      <div>{group?.name}</div>
    </div>
  );
};

export default GroupInCommon;
