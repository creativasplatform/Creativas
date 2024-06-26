import React, { useState } from 'react';
import Game from '../assets/Game.png'
import Art from '../assets/Art.png'
import Collectibles from '../assets/Collectibles.png'
import Sport from '../assets/Sport.png'
import Movies from '../assets/Movies.png'
import Music from '../assets/Music.jpg'
import Technology from '../assets/Technology.png'
import LiveIcon from '../assets/LiveIcon.png'; // Asegúrate de cambiar la ruta según tu estructura de proyecto



const NotableDrops = () => {
    const images = [
        { src: Game, title: 'GAME', price: 0.5 },
        { src: Art, title: 'ART', price: 0.51 },
        { src: Collectibles, title: 'COLLECTIBLES', price: 0.43 },
        { src: Sport, title: 'SPORT', price: 1.54 },
        { src: Movies, title: 'MOVIES', price: 1.0 },
        { src: Music, title: 'MUSIC', price: 0.75 },
        { src: Technology, title: 'TECHNOLOGY', price: 0.9 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = 5; // Número de tarjetas a mostrar a la vez

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - cardsToShow ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - cardsToShow : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full text-white  mx-auto bg-gradient-to-b from-primary to-customblack overflow-hidden font-roboto py-16 px-8">
            <div className='mb-16'>
                <span className="text-3xl font-semibold mb-8 text-left font-raleway">
                    <span className="text-white">Top    </span>
                    <span className="text-secondary">Projects</span>
                </span>
            </div>
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-1/4 px-2"
                            style={{ flex: `0 0 ${100 / cardsToShow}%` }}
                        >
                            <div className="relative bg-gradient-to-c-custom text-white rounded-xl p-[6px] shadow-lg w-72 h-[24rem]">
                                <div className="relative">
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="w-[250px] mt-2 h-72 object-cover rounded-t-xl "
                                    />
                                    <div className="absolute top-2 right-4 flex items-center bg-black/70 text-secondary px-2 py-1 rounded-lg text-xs font-bold">
                                        <img  src={LiveIcon} alt="Live" className="w-4 h-4 mr-1" />
                                        LIVE
                                    </div>
                                </div>
                                <div className="p-2 flex justify-left mt-2">
                                    <h3 className="text-[18px] font-semibold  font-raleway text-center">{image.title}</h3>
                                </div>
                                <div className=" text-white px-2  font-raleway rounded-lg text-[14px] font-bold">
                                    Floor Price: {image.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-2 right-8 flex space-x-2 mt-16 mr-2">
                <button
                    onClick={prevSlide}
                    className="bg-[#1C2533] text-white p-2 rounded-[8px] shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="bg-[#1C2533] text-white p-2 rounded-[8px] shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NotableDrops;
