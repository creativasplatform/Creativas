import React from 'react';
import nft1 from '../assets/nft1.png';
import nft2 from '../assets/nft2.png';
import nft3 from '../assets/nft3.jpg';
import nft4 from '../assets/nft4.jpg';
import nft5 from '../assets/nft5.jpg';
import nft6 from '../assets/nft6.png';

const NFTs = () => {
    return (
        <div className="bg-primary">
            <div className="overflow-hidden pt-32 sm:pt-14">
                <div className="bg-primary">
                    <div className="mx-auto max-w-5xl px-8 sm:px-0">
                        <div className="relative pt-48 pb-16 sm:pb-24">
                            <div className='-ml-56'>
                                <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                Now you can buy rewards<br />from other participants<br /> and obtain unique benefits.
                                </h2>
                                <div className="mt-6 text-base">
                                    <a href="#" className="font-semibold text-white">
                                        Explorer our marketplace<span aria-hidden="true"> →</span>
                                    </a>
                                </div>
                    
  
                            </div>
                            <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                                <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                                    <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                        <div className="flex-shrink-0">
                                            <img className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72" src={nft1} alt="" />
                                        </div>
                                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                                            <img className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"  src={nft3} alt="" />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                        <div className="flex-shrink-0">
                                            <img className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"  src={nft2} alt="" />
                                        </div>
                                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                                            <img className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"  src={nft4} alt="" />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                        <div className="flex-shrink-0">
                                            <img className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"  src={nft5} alt="" />
                                        </div>
                                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                                            <img className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"  src={nft6} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-4/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-259 blur-70 opacity-130 w-64 h-64 rounded-lg"></div>
       
            </div>
            <div className="absolute top-4/4 left-2/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-256 blur-40 opacity-100 w-64 h-64 rounded-lg"></div>
         
        </div>
    );
}

export default NFTs;