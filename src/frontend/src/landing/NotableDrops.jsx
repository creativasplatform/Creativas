import React, { useState, useEffect } from 'react';
import Project7 from '../assets/FOTO1.png'
import Project2 from '../assets/FOTO4.png'
import Project3 from '../assets/FOTO5.png'
import Project4 from '../assets/FOTO6.png'
import Project5 from '../assets/FOTO7.png'
import Project6 from '../assets/FOTO9.png'
import Project1 from '../assets/FOTO10.png'
import LiveIcon from '../assets/LiveIcon.png'; // Asegúrate de cambiar la ruta según tu estructura de proyecto

const NotableDrops = () => {
    const images = [
        { src: Project1, title: 'Tecate Comuna', price: 0.5 },
        { src: Project2, title: 'ART', price: 0.51 },
        { src: Project3, title: 'COLLECTIBLES', price: 0.43 },
        { src: Project4, title: 'SPORT', price: 1.54 },
        { src: Project5, title: 'MOVIES', price: 1.0 },
        { src: Project6, title: 'MUSIC', price: 0.75 },
        { src: Project7, title: 'TECHNOLOGY', price: 0.9 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(5);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 1500) {
            setCardsToShow(5);
        } else if (windowWidth > 1300) {
            setCardsToShow(4);
        } else if (windowWidth > 900) {
            setCardsToShow(3);
        } else if (windowWidth > 600)   {
            setCardsToShow(2);
        } else {
            setCardsToShow(1);
        }
    }, [windowWidth]);

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
        <div className="relative w-full text-white mx-auto bg-gradient-to-b from-primary to-customblack overflow-hidden font-roboto py-16 px-8">
            <div className='mb-16'>
                <span className="text-3xl font-semibold mb-8 text-left font-raleway">
                    <span className="text-white">Top </span>
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
                            className="flex-shrink-0 px-2"
                            style={{ width: `${100 / cardsToShow}%` }}
                        >
                            <div className="relative bg-gradient-to-c-custom text-white rounded-xl p-[6px] shadow-lg w-72 h-[24rem]">
                                <div className="relative h-72">
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                      className="z-10 w-64 h-72  object-cover aspect-content rounded-md" style={{ zIndex: '100' }}
                                    />
                                    <div className="absolute top-2 right-4 flex items-center bg-black/70 text-secondary px-2 py-1 rounded-lg text-xs font-bold">
                                        <img src={LiveIcon} alt="Live" className="w-4 h-4 mr-1" />
                                        LIVE
                                    </div>
                                </div>
                                <div className="p-2 flex justify-left mt-2">
                                    <h3 className="text-[18px] font-semibold font-raleway text-center">{image.title}</h3>
                                </div>
                                <div className="text-white px-2 font-raleway rounded-lg text-[14px] font-bold">
                                    Floor Price: {image.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-12 transform -translate-y-1/2 right-8 flex space-x-2 mt-16 mr-2">
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
