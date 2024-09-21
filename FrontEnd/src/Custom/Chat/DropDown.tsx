import { useState, useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CustomDropDownProps {
  table: {
    option: string;
    action: () => void;
  }[];
}

const CustomDropdown: React.FC<CustomDropDownProps> = ({ table }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string, action: () => void) => {
    setIsOpen(false);
    action();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full p-2 text-gray-400 rounded-full hover:text-gray-300 focus:outline-none"
        >
          <MoreVertIcon />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-[#424246] text-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {table.map(({ option, action }) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option, action)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-700 hover:text-white"
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
