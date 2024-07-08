import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import image1 from "../assets/color2.png";
import image2 from "../assets/color1.png";
import image3 from "../assets/color3.png";
import { title } from 'process';



const Card = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Define tus tarjetas y su estado inicial
  const issues = [
    { id: 1, title: "NFTVenture", image: image1, name: "Secure and transparent crowdfunding with NFTs.", description: "Our fund management system is run by a decentralized network of blockchain-secured smart contracts." },
    { id: 2, title: "Marketplace", image: image2, name: "Rewards tied to each NFT of each project.", description: "Tokenized rewards allow backers to trade and monetize their stake, while founders earn long-term income." },
    { id: 3, title: "Portfolio", image: image3, name: "AI-powered recommendations for new projects.", description: "We use AI to offer personalized project recommendations based on your tastes, capital, and the current market." },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const componentTop = document.getElementById('practica').offsetTop;

      if (scrollTop + windowHeight > componentTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// Configura las transiciones
const transitions = useTransition(isVisible ? issues : [], {
  from: { opacity: 1, transform: 'translateY(100px)' },
  enter: { opacity: 1, transform: 'translateY(0px)' },
  config: config.molasses,
});


  return (
    <section className="w-full h-full mt-[-1px] pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center bg-gradient-to-b from-primary to-customblack">
    <div className="container mx-auto">
      <div className="w-[80vw] mx-auto flex justify-start flex-col items-start">
        <h1 className="font-bold tracking-tight sm:text-4xl font-raleway text-start">
        <span className="text-white text-5xl">Why use    </span>
        <span className="text-secondary  text-5xl">Creativas?</span>
        </h1>


      </div>

      <div id="practica" className="flex flex-wrap justify-center ">
      {transitions((props, item) => (
              <animated.div
                key={item.id}
                style={props}
                className="m-6 flex flex-col relative z-10 mt-20"
              >
      <div className="absolute mt-32 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-257 blur-50 opacity-40 w-64 h-64 rounded-lg"></div>
  

                
                <div className="w-full max-w-sm">
                  <div className="flex flex-col items-start pb-10">
                    <img
                      className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 sm mb-3 -mt-8 sm:-mt-8 md:-mt-8 lg:-mt-8"
                      src={item.image}
                      alt={`${item.name} image`}
                    />
                    
                            <div className="mb-8 flex items-center justify-center min-w-[100px] text-sm bg-white text-secondary font-raleway rounded-full px-4 py-1">
                    {item.title}
                  </div>
                    <h5 className="mb-1 text-2xl font-semibold text-black dark:text-white font-raleway">{item.name}</h5>
                    <span className="text-lg text-gray-800 text-start dark:text-gray-400 mb-4 font-roboto">{item.description}</span>
                    <a className="inline-flex font-medium items-start text-sm text-secondary hover:underline">
                    Read more!
                    <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                    </svg>
                  </a>
                  </div>
                  
                  
                </div>
              </animated.div>
            ))}
            
  
      </div>

   
    </div>
  </section>
  );
}

export default Card;
