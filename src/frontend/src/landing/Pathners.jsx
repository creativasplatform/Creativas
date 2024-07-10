import React, {useState, useEffect} from 'react';


const Pathners = () => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 550);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 550);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
        <section className="w-full h-full -mt-32 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center  bg-gradient-to-b from-customblack to-primary">
            <div className="container mx-auto">
                <div className="w-[80vw] mx-auto flex justify-center flex-col items-center mb-8">
                    <h1 className="font-roboto font-bold text-6xl tracking-tight text-white font-popping text-center mb-4">
                        Finance projects <br />on multiples networks
                    </h1>
                </div>
                {isWideScreen ? (
                        <>
                             <div className="absolute top-4/4 right-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-259 blur-70 opacity-20 w-64 h-64 rounded-lg"></div>
                            <div className="absolute top-4/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-257 blur-50 opacity-40 w-64 h-64 rounded-lg"></div>
                            <div className="absolute top-4/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-259 blur-70 opacity-40 w-64 h-64 rounded-lg"></div>
                            <div className="absolute top-4/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-257 blur-50 opacity-20 w-64 h-64 rounded-lg"></div>
                 </>
                    ) : (
                        <>
                               <div className="absolute top-4/4 right-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-259 blur-70 opacity-20 w-64 h-64 rounded-lg"></div>
                            <div className="absolute top-4/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-257 blur-50 opacity-40 w-64 h-64 rounded-lg"></div>
                                       </>
                    )}
                <div className="flex items-center flex-wrap justify-center gap-36">
                    <div className="flex flex-col items-center w-11">
                        <div className="relative">
                            <img alt="eth" className='w-10 h-10 lg:w-20 lg:h-20 z-40' fetchpriority="high" decoding="async" data-nimg="fill"  src="https://dev.rootstock.io/assets/img/rsk/RBTC-logo.png" />
                         
                        </div>
                        <p className="text-white mt-6 text-opacity-60 text-base font-roboto leading-7 mb-4">Roostock</p>
                    </div>
                    <div className="flex flex-col items-center w-11">
                        <div className="relative">
                            <img alt="eth"  className='w-10 h-10 lg:w-20 lg:h-20 z-40' fetchpriority="high" decoding="async" data-nimg="fill"  src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=032" />
                        </div>
                        <p className="text-white mt-6 text-opacity-60 text-base font-roboto leading-7 mb-4">Etherum</p>
                    </div>
                    <div className="flex flex-col items-center w-11">
                        <div className="relative">
                            <img alt="eth" className='w-10 h-10 lg:w-20 lg:h-20 z-40' fetchpriority="high" decoding="async" data-nimg="fill"  src="https://cryptologos.cc/logos/polygon-matic-logo.png" />
                        </div>
                        <p className="text-white mt-6 ml-2 text-opacity-60 text-base font-roboto leading-7 mb-4">Polygon</p>
                    </div>

                    <div className="flex flex-col items-center w-11">
                        <div className="relative">
                            <img alt="eth" className='w-10 h-10 lg:w-20 lg:h-20 z-40'  fetchpriority="high" decoding="async" data-nimg="fill"  src="https://cryptologos.cc/logos/internet-computer-icp-logo.svg?v=032" />
                        </div>
                        <p className="text-white mt-6 text-opacity-60 text-base font-roboto leading-7 mb-4">ICP</p>
                        
                    </div>
                    
                    
                </div>
            </div>
      
        </section>


   
        </div>
    );
}

export default Pathners;
