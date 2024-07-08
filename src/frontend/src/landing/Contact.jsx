import React from 'react';
import instagram from '../assets/instagram.png'
import telegram from '../assets/telegram.png'
const Contact = () => {
    return (
        <section className="w-full h-full mt-[-1px] pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center bg-gradient-to-b from-primary to-customblack">
            <div className="container mx-auto">
                <div className="w-[80vw] mx-auto flex justify-center flex-col items-center mt-8 mb-8">
                    <h1 className="font-roboto font-bold text-6xl tracking-tight text-white font-popping text-center mb-4">
                    Join us
                    </h1>
                </div>
                <div className="flex items-center flex-wrap justify-center gap-36">
                    <div className="flex flex-col items-center w-11">
                    <div className="relative w-10 h-10 lg:w-20 lg:h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src={instagram} />
                         
                        </div>
                        <p className="text-white mt-6 text-opacity-60 text-base font-roboto leading-7 mb-4">Instagram</p>
                    </div>
                    <div className="flex flex-col items-center w-11">
                    <div className="relative w-10 h-10 lg:w-20 lg:h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '150%', width: '150%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src="https://static.vecteezy.com/system/resources/previews/031/737/215/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png" />
                        </div>
                        <p className="text-white mt-6 ml-6 lg:ml-8 text-opacity-60 text-base font-roboto leading-7 mb-4">Twitter</p>
                    </div>
                    <div className="flex flex-col items-center w-11">
                    <div className="relative w-10 h-10 lg:w-20 lg:h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '150%', width: '150%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" />
                        </div>
                        <p className="text-white mt-6 ml-6 lg:ml-8  text-opacity-60 text-base font-roboto leading-7 mb-4">Facebook</p>
                    </div>

                    <div className="flex flex-col items-center w-11">
                        <div className="relative w-10 h-10 lg:w-20 lg:h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src={telegram} />
                        </div>
                        <p className="text-white mt-6  text-opacity-60 text-base font-roboto leading-7 mb-4">Telegram</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
