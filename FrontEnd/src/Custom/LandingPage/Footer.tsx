import { SocialIcon } from "react-social-icons";
import Logo from "../../assets/logo1.png";
function Footer() {
  return (
    <div className="min-w-full bg-[#363638] flex text-gray-200 text-sm justify-center ">
      <div className="w-10/12 flex justify-center items-center flex-wrap">
        <div className="w-full flex  py-5">
          <div className="w-1/4 ">
            <img src={Logo} alt="" className="w-10 h-10 rounded-full" />
          </div>
          <div className="w-1/2  flex justify-evenly items-center">
            <div>Price</div>
            <div>About</div>
            <div>Support</div>
            <div>Features</div>
            <div>Contacts</div>
          </div>
          <div className="w-1/4  flex justify-end gap-2 items-center">
            <div>
              <SocialIcon
                url="www.linkedin.com"
                style={{ height: "25px", width: "25px" }}
              />
            </div>
            <div>
              <SocialIcon
                url="www.x.com"
                style={{ height: "25px", width: "25px" }}
              />
            </div>
          </div>
        </div>
        <hr className="text-gray-500 mx-auto w-10/12" />
        <div className="flex w-full justify-between text-xs text-gray-500 py-5">
          <div className="w-1/5">@2023 All Rights Reserved</div>
          <div className="w-1/5 flex justify-end gap-4">
            <div>Terms & Conditions</div>
            <div>Privacy Statement</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
