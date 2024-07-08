import React, { useState, useEffect } from 'react';
import CardNFT from './CardNFT';
import CategoriesBar from './CategoriesBar';
import masicon from "../assets/mas.png";
import useAssets from '../hooks/Nftventure/useAssets';
import { Card, Skeleton } from "@nextui-org/react";
import { ProjectStatus } from '../helpers/AssetsHelpers.js';
import Navbar from './NavbarMarketplace.jsx';
import { getAllAssetsByCategory } from '../views/Nftventure/Assets';
import { Category } from '../helpers/AssetsHelpers.js';

const Categories = ({ onOpenModal }) => {
  const { startedAssets, startedInvestmentAmounts, startedInvestorCounts, loadingStarted, errorStarted } = useAssets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const assets = await getAllAssetsByCategory(ProjectStatus.Started, Category[selectedCategory]);
        setFilteredAssets(assets);
        setError(null);
      } catch (err) {
        setError('Error loading projects');
        setFilteredAssets([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory === 'All') {
      setFilteredAssets(startedAssets);
      setLoading(false);
    } else {
      fetchAssets();
    }
  }, [selectedCategory, startedAssets]);

  useEffect(() => {
    let currentAssets = selectedCategory === 'All' ? startedAssets : filteredAssets;
    
    if (searchTerm) {
      currentAssets = currentAssets.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const collections = currentAssets
      .filter(asset => asset.assetId && asset.title && asset.price && asset.mainPhoto)
      .slice()
      .reverse()
      .map((asset, index) => ({
        id: asset.assetId,
        title: asset.title,
        objective: `${asset.price} USD`,
        image: asset.mainPhoto,
        investmentAmount: startedInvestmentAmounts[index],
        investorCount: startedInvestorCounts[index],
      }));

    setCollections(collections);
  }, [selectedCategory, filteredAssets, startedAssets, startedInvestmentAmounts, startedInvestorCounts, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-[#0b0c0c] text-white p-4">
      <Navbar onSearch={handleSearch} Search={searchTerm} />
      <div className="flex items-center justify-between">
        <h2 className="text-5xl font-semibold mb-4 mt-8 ml-8">Explore Projects</h2>
        <div className="flex items-center">
          <button
            onClick={onOpenModal}
            type="button"
            className="mr-28 text-white bg-secondary hover:bg-secondary-light focus:outline-none font-thin rounded-full text-lg px-5 py-2.5 text-center md:text-left dark:bg-secondary dark:hover:bg-secondary-light dark:focus:ring-blue-800 flex items-center"
          >
            <img src={masicon} className="h-4 w-4 mr-2" alt="Add Icon" />
            Create a Project
          </button>
        </div>
      </div>

      <CategoriesBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {loading || loadingStarted ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {Array.from({ length: 24 }).map((_, index) => (
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
          ))}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : collections.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-gray-400 mb-2">
            <svg width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M106.673 12.4027C110.616 13.5333 112.895 17.6462 111.765 21.5891L97.7533 70.4529C96.8931 73.4525 94.307 75.4896 91.3828 75.7948C91.4046 75.5034 91.4157 75.2091 91.4157 74.9121V27.1674C91.4157 20.7217 86.1904 15.4965 79.7447 15.4965H56.1167L58.7303 6.38172C59.8609 2.43883 63.9738 0.159015 67.9167 1.28962L106.673 12.4027Z" fill="#D2D9EE"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M32 27.7402C32 23.322 35.5817 19.7402 40 19.7402H79.1717C83.59 19.7402 87.1717 23.322 87.1717 27.7402V74.3389C87.1717 78.7572 83.59 82.3389 79.1717 82.3389H40C35.5817 82.3389 32 78.7572 32 74.3389V27.7402ZM57.1717 42.7402C57.1717 46.6062 53.8138 49.7402 49.6717 49.7402C45.5296 49.7402 42.1717 46.6062 42.1717 42.7402C42.1717 38.8742 45.5296 35.7402 49.6717 35.7402C53.8138 35.7402 57.1717 38.8742 57.1717 42.7402ZM36.1717 60.8153C37.2808 58.3975 40.7688 54.8201 45.7381 54.3677C51.977 53.7997 55.3044 57.8295 56.5522 60.0094C59.8797 55.4423 67.0336 46.8724 72.3575 45.9053C77.6814 44.9381 81.7853 48.4574 83.1717 50.338V72.6975C83.1717 75.4825 80.914 77.7402 78.1289 77.7402H41.2144C38.4294 77.7402 36.1717 75.4825 36.1717 72.6975V60.8153Z" fill="#D2D9EE"></path>
            </svg>
          </div>
          <p className="text-gray-500">No Projects yet</p>
          <p className="text-gray-400 text-sm mb-4 text-center">Start a new project with this wallet to get started.</p>
          <button className="bg-secondary-bright text-white text-sm p-2 rounded-lg">Start Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {collections.map((collection) => (
            <CardNFT
              key={collection.id}
              id={collection.id}
              assetName={collection.title}
              imageSrc={collection.image}
              objective={collection.objective}
              investmentAmount={collection.investmentAmount}
              investorCount={collection.investorCount}
              className="transition-opacity duration-800"
              style={{ opacity: loadingStarted ? 0 : 1 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
