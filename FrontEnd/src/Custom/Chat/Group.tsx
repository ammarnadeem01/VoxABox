import User from "../../assets/manprvtcaht.png";
function Group() {
  return (
    <div className="w-full flex flex-wrap justify-start ">
      <div className="w-full flex justify-start items-center p-1 rounded-xl">
        <div className="w-1/4">
          <img src={User} alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="w-2/4 flex flex-wrap justify-start items-center">
          <p className="w-full font-semibold">Alex</p>
          <p className="w-full text-xs">Hello, How are you?</p>
        </div>
      </div>
    </div>
  );
}

export default Group;
