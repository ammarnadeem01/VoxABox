import { useState } from "react";
import useStore from "../../../store";
import api from "../../../axiosConfig";
import * as React from "react";
import AddGroupMembers from "./AddGroupMembers";
import { useNavigate } from "react-router-dom";

interface AddGroupProps {
  setMenuOption: any;
}
const AddGroup: React.FC<AddGroupProps> = ({ setMenuOption }) => {
  const nav = useNavigate();
  const createGroup = (e: any) => {
    e.preventDefault();
    setMenuOption("addGroupMembers");
    // api
    //   .post(`api/v1/group`, groupFormData)
    //   .then((res) => {
    // console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };
  function handleChange(e: any) {
    console.log(e);
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setGroupFormData({ ...groupFormData, [name]: files[0] });
    } else {
      setGroupFormData({ ...groupFormData, [name]: value });
    }
  }

  const { userId } = useStore();
  const [groupFormData, setGroupFormData] = useState({
    name: "",
    description: "",
    avatar: "",
    adminId: userId,
  });
  return (
    <div className="w-full flex flex-start flex-wrap justify-center gap-3">
      <form
        onSubmit={handleChange}
        className="w-full flex flex-col items-center space-y-6  rounded-lg shadow-lg"
      >
        {/* Form Heading */}
        <h2 className="text-3xl font-bold text-white text-center">
          Create a New Group
        </h2>

        {/* Name Field */}
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="name" className="text-gray-400">
            Group Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter group name"
            name="name"
            value={groupFormData.name}
            className="w-full py-2 px-4 rounded-lg text-white  placeholder-gray-500 outline-none bg-[#101717] transition-all duration-300"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* Description Field */}
        <div className="w-full  flex flex-col space-y-2">
          <label htmlFor="description" className="text-gray-400">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter group description"
            name="description"
            value={groupFormData.description}
            className="w-full py-2 px-4 rounded-lg text-white  placeholder-gray-500 outline-none bg-[#101717] transition-all duration-300"
            rows={4}
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* Avatar Field */}
        <div className="w-full  flex flex-col space-y-2">
          <label
            htmlFor="avatar"
            className=" w-full h-10 py-2 px-4 rounded-lg bg-purple-400 text-center"
          >
            Select Avatar
            <input
              id="avatar"
              type="file"
              name="avatar"
              onChange={(e) => handleChange(e)}
              className=" hidden w-full py-2 px-4 rounded-lg text-white  placeholder-gray-500 outline-none bg-[#101717] transition-all duration-300"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-evenly items-center w-full gap-1">
          <button
            className="bg-purple-400 py-1 px-2 rounded-lg flex-1"
            onClick={(e) => createGroup(e)}
          >
            Create
          </button>
          <button
            className="bg-purple-400 py-1 px-2 rounded-lg flex-1"
            onClick={() => setMenuOption(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroup;
