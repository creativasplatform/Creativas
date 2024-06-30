// src/components/Carousel.js
import React, { useState } from 'react';
import Game from '../assets/Game.png'
import Art from '../assets/Art.png'
import Collectibles from '../assets/Collectibles.png'
import Sport from '../assets/Sport.png'
import Movies from '../assets/Movies.png'
import Music from '../assets/Music.jpg'
import Technology from '../assets/Technology.png'


const Carousel = () => {
    const images = [
        { src: Game, title: 'GAME' },
        { src: Art, title: 'ART' },
        { src: Collectibles, title: 'COLLECTIBLES' },
        { src: Sport, title: 'SPORT' },
        { src: Movies, title: 'MOVIES' },
        { src: Music, title: 'MUSIC' },
        { src: Technology, title: 'TECHNOLOGY' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = 4; 

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
                    <span className="text-white">Browse    </span>
                    <span className="text-secondary">by Category</span>
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
                            <div className="bg-gradient-to-c-custom text-white rounded-xl p-2 shadow-lg w-96 h-[19rem]">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-[360px] mt-2 h-56 object-cover rounded-t-xl "
                                />
                                <div className="p-2 flex justify-center items-center mt-2">
                                    <h3 className="text-[18px] font-semibold mb-2 font-raleway text-center">{image.title}</h3>
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

export default Carousel;
