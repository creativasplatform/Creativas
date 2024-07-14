import React from 'react';

const Video = () => {
    return (
        <section className="w-full h-full mt-[-1px] pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center items-center bg-gradient-to-b from-primary to-customblack">
            <div className="container mx-auto">
                <div className="w-[80vw] mx-auto flex justify-center flex-col items-center -mt-16 mb-8">
                    <h1 className="font-roboto font-bold text-6xl tracking-tight text-white font-popping text-center">
                        What is Creativas?
                    </h1>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center mb-32 mt-24 gap-8 px-4">
                    <video width="1024" height="694" controls>
                        <source src="https://gateway.pinata.cloud/ipfs/QmQw9A3e7xdtaJTRyMCaw2udpVL7bQSKjH66HWnwptm8PT" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
}

export default Video;
