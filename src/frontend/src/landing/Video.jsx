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
                    <iframe
                        className="h-[20rem] md:h-[25rem] lg:h-[40rem] max-w-full lg:w-[800px] xl:w-[1200px] border border-gray-200 rounded-lg dark:border-gray-700"
                        src="https://www.youtube.com/embed/GvBeyPaa8SY"  // Reemplaza {VIDEO_ID} con el ID del video de YouTube
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video player"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}

export default Video;
