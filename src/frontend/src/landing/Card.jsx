import color1 from "../assets/color1.png";
import color2 from "../assets/color2.png";
import color3 from "../assets/color3.png";

const Card = () => {
  return (
    <div className="flex flex-col items-center mb-0 bg-gradient-to-b-custom h-[450px]">
      <div className="flex justify-center space-x-16 w-full mt-24">
        <div className="relative">
          <img
            className="rounded-t-lg h-[350px] w-full transform transition duration-500 ease-in-out hover:scale-105"
            src={color3}
            alt=""
          />
          <button
            type="button"
            className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-white bg-secondary hover:bg-secondary-ligth focus:outline-none  font-medium rounded-full text-lg px-5 py-2.5 text-center mb-2 w-[150px] h-[60px] flex items-center justify-center"
          >
            <span className="leading-tight">
              NFTs<br />Funding
            </span>
          </button>
        </div>

        <div className="relative">
          <img
            className="rounded-t-lg h-[350px] w-full transform transition duration-500 ease-in-out hover:scale-105"
            src={color2}
            alt=""
          />
          <button
            type="button"
            className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-white bg-secondary hover:bg-secondary-ligth focus:outline-none  font-medium rounded-full text-lg px-5 py-2.5 text-center mb-2 w-[150px] h-[60px] flex items-center justify-center"
          >
            <span className="leading-tight">
              Investment<br />Portfolio
            </span>
          </button>
        </div>

        <div className="relative">
          <img
            className="rounded-t-lg h-[350px] w-full transform transition duration-500 ease-in-out hover:scale-105"
            src={color1}
            alt=""
          />
          <button
            type="button"
            className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-white bg-secondary hover:bg-secondary-ligth focus:outline-none  font-medium rounded-full text-lg px-5 py-2.5 text-center mb-2 w-[150px] h-[60px] flex items-center justify-center"
          >
            <span className="leading-tight">
              Marketplace
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
