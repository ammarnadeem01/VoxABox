import React, { useState, useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CustomDropDownProps {
  options: string[];
}
const CustomDropdown: React.FC<CustomDropDownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    // console.log(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownRef.current) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full p-2 text-gray-400 rounded-full hover:text-gray-300 focus:outline-none"
        >
          <MoreVertIcon />
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-gray-800 text-gray-300 rounded-md shadow-lg"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-700 hover:text-white"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
