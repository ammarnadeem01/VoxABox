import { useEffect, useState } from "react";
import User from "../../../assets/manprvtcaht.png";
import type { Group as G, GroupProps } from "../../../Types";

const Group: React.FC<GroupProps> = ({ data, onClick }) => {
  const [group, setGroup] = useState<G>();

  useEffect(() => {
    setGroup(data);
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
              src={group?.avatar ? group.avatar : User}
              alt=""
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="w-3/5 flex flex-wrap justify-start items-center">
            <p className="w-full font-semibold">{group?.name}</p>

            <p className="w-full text-xs line-clamp-1 ">{group?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
