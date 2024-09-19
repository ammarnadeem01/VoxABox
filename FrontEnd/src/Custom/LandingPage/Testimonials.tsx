import Testimony from "./Testimony";

function Testimonials() {
  return (
    <div className="min-w-full text-white flex justify-center items-center flex-wrap">
      <div className="w-full text-center my-5">
        <p className="text-5xl font-semibold ">
          Thousand Of Users <br />
          Talk About Us
        </p>
      </div>
      <div className="w-3/4 my-3 gap-y-10 flex justify-evenly items-center flex-wrap ">
        <Testimony />
        <Testimony />
        <Testimony />
        <Testimony />
        <Testimony />
      </div>
    </div>
  );
}

export default Testimonials;
