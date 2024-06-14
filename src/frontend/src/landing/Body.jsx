import Creativas from '../assets/Creativas3.gif';

const Body = () => {
    return (
        <div className="relative bg-customblack flex justify-center items-center overflow-hidden">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-[0.5px] bg-gray-600"></div>
            <img 
                className="mt-32 flex shadow-[0_0_10px_10px_rgba(12,11,11,0.8)]" 
                src={Creativas} 
                alt="Planeta" 
            />
        </div>
    );
}

export default Body;
