import color1 from "../assets/color1.png"
import color2 from "../assets/color2.png"
import color3 from "../assets/color3.png"
const Card = () => {
  return (


    <div className="flex flex-col items-center mb-16 bg-[#0b0c0c] h-[450px]">
      <div className="flex justify-center space-x-16 w-full bg-[#0b0c0c]">
        <div className="relative">
          <img className="rounded-t-lg h-[350px] w-full" src={color1} alt="" />
          <button className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
            Botón
          </button>
        </div>


        <div className="relative">
          <img className="rounded-t-lg h-[350px] w-full" src={color2} alt="" />
          <button className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
            Botón
          </button>
        </div>
        <div className="relative">
          <img className="rounded-t-lg h-[350px] w-full" src={color3} alt="" />
          <button className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
            Botón
          </button>
        </div>


      </div>
    </div>

  )
}
export default Card 