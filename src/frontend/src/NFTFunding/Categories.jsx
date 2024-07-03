import React from 'react';
import CardNFT from './CardNFT';
import CategoriesBar from './CategoriesBar';
import masicon from "../assets/mas.png"; // Importa el icono aquí
import useAssets from '../hooks/Nftventure/useAssets';
import { Card, Skeleton } from "@nextui-org/react";

const Categories = ({ onOpenModal }) => {
  const { startedAssets, loadingStarted, errorStarted } = useAssets();
  const collections = startedAssets.map(asset => ({
    title: asset.title,
    description: `${asset.price} ETH`,
    image: asset.mainPhoto,
  }));

  return (
    <div className="bg-[#0b0c0c] text-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-5xl font-semibold mb-4 mt-8 ml-8">Explore Projects</h2>
        <div className="flex items-center">
          <button
            onClick={onOpenModal}
            type="button"
            className="mr-28 text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-thin rounded-full text-lg px-5 py-2.5 text-center md:text-left dark:bg-secondary dark:hover:bg-secondary-ligth dark:focus:ring-blue-800 flex items-center"
          >
            <img src={masicon} className="h-4 w-4 mr-2" alt="Add Icon" /> 
            Create a Project
          </button>
        </div>
      </div>
      
      <CategoriesBar />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {loadingStarted ? (
          // Renderizar Skeletons mientras los datos están cargando
          Array.from({ length: 24 }).map((_, index) => (
            <Card key={index} className="w-[300px] h-[250px] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">  
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ))
        ) : errorStarted ? (
          <p>Error loading projects</p>
        ) : (
          collections.map((collection, index) => (
            <CardNFT
              key={index}
              title={collection.title}
              description={collection.description}
              image={collection.image}
              className="transition-opacity duration-500"
              style={{ opacity: loadingStarted ? 0 : 1 }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
