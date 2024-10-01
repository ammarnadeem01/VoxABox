import DummyImage from "../../../assets/unknown (1).png";
function DummyElement() {
  return (
    <div className={`w-3/5 h-[100vh] max-h-full `}>
      <img src={DummyImage} alt="" className="h-[100vh] w-full" />
    </div>
  );
}

export default DummyElement;
