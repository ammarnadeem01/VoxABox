import User from "../../assets/manprvtcaht.png";

function Contact() {
  return (
    <div className="w-full flex flex-wrap justify-start cursor-pointer">
      <div className="w-full flex justify-between items-center p-1 rounded-xl">
        <div className="w-4/5 flex justify-start items-center">
          <div className="w-1/4 ">
            <img src={User} alt="" className="w-12 h-12 rounded-full" />
          </div>
          <div className="w-3/5 flex flex-wrap justify-start items-center">
            <p className="w-full font-semibold">Alex</p>
            <p className="w-full text-xs">Hello, How are you?</p>
          </div>
        </div>
        <div className="w-1/6   text-black text-xs flex justify-center items-center ">
          <p className="bg-white rounded-full px-1">5</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
