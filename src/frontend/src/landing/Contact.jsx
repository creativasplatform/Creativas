import React from 'react';


const Contact = () => {
    return (
        <section className="w-full h-full mt-[-1px] pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center bg-customblack">
            <div className="container mx-auto">
                <div className="w-[80vw] mx-auto flex justify-center flex-col items-center -mt-16 mb-8">
                    <h1 className="font-roboto font-bold text-6xl tracking-tight text-white font-popping text-center mb-4">
                        Crowfund the projects <br />on multiples <br />networks
                    </h1>
                </div>
                <div className="flex items-center flex-wrap justify-around gap-12">
                    <div className="flex flex-col items-center w-11">
                        <div className="relative w-20 h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src="https://1inch.io/img/main/eth.webp" />
                        </div>
                        <p className="text-white text-opacity-60 text-base font-normal leading-7 mb-4">Etherum</p>
                    </div>
                    <div className="flex flex-col items-center w-11">
                        <div className="relative w-20 h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src="https://1inch.io/img/main/bsc.webp" />
                        </div>
                        <p className="text-white text-opacity-60 text-base font-normal leading-7 mb-4">BNB Chain</p>
                    </div>
                    <div className="flex flex-col items-center w-11">
                        <div className="relative w-20 h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src="https://1inch.io/img/main/polygon.webp" />
                        </div>
                        <p className="text-white text-opacity-60 text-base font-normal leading-7 mb-4">Polygon</p>
                    </div>
                    <div className="flex flex-col items-center w-11">
                        <div className="relative w-20 h-20">
                            <img alt="eth" fetchpriority="high" decoding="async" data-nimg="fill" style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }} src="https://dev.rootstock.io/assets/img/rootstock-icon.png" />
                        </div>
                        <p className="text-white text-opacity-60 text-base font-normal leading-7 mb-4">Etherum</p>
                    </div>
                 
                </div>
            </div>
        </section>
    );
}

export default Contact;
