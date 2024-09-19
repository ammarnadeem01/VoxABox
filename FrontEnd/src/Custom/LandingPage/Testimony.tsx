import avatar from "../../assets/cover.png";

function Testimony() {
  return (
    <div className="w-full max-w-xs bg-[#363638] text-white p-4 rounded-md shadow-md ">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt="Avatar"
          className="rounded-full h-10 w-10 mr-3"
        />
        <div className="text-lg font-semibold">Ammar Nadeem</div>
      </div>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, placeat
        repellat dolor nulla corporis explicabo modi, odit accusantium veniam
        sequi dolorem! Perspiciatis, a voluptas facere libero laborum natus
        delectus at.
      </p>
    </div>
  );
}

export default Testimony;
