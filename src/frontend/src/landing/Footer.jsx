import React from 'react';
import Creativas from '../assets/CreativasLogo2.png';
import instagram from "../assets/instagram2.png";
import discord from "../assets/discord.png";
import github from "../assets/github.png";
import telegram from "../assets/telegram2.png";
import twitter from "../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="bg-customblack">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="space-y-8 lg:space-y-0 lg:flex lg:justify-between">
          <div>
            <a className="flex space-x-3 rtl:space-x-reverse mt-4 mb-8">
              <img src={Creativas} className="h-8 ml-2" alt="Creativas Logo" />
            </a>

            <p className="mt-4 max-w-xs text-gray-400 text-lg mb-4">
              Join by sending your email to stay informed about our updates, launches of projects of interest and notices of possible investments in our application.
            </p>

            <div className="flex items-center font-semibold font-roboto text-[18px]">
              <input
                type="email"
                placeholder="Enter email address"
                className="p-2 bg-gray-800 text-white border-none rounded-l-md focus:outline-none"
              />
              <button className="p-2 bg-secondary text-white rounded-r-md">
                SEND
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            <div>
              <p className="font-medium text-white">Marketplace</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">NFTs</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Marketplace</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Token Rewards</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">NFTFunding</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">IA</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Categories</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Investment Portfolio</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Trade Rewards</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">My Account</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Profile</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Settings</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Orders</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Resources</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Blog</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Documentation</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Community</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">About Us</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Careers</a></li>
                <li><a href="#" className="text-gray-400 transition hover:opacity-75">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <ul className="mt-8 flex justify-center gap-6 lg:justify-start">
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">Telegram</span>
              <img src={telegram} alt="Telegram" className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">Discord</span>
              <img src={discord} alt="Discord" className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">Twitter</span>
              <img src={twitter} alt="Twitter" className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">Instagram</span>
              <img src={instagram} alt="Instagram" className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">GitHub</span>
              <img src={github} alt="GitHub" className="h-6 w-6" />
            </a>
          </li>
        </ul>

        <p className="text-xs text-gray-300 text-center lg:text-left">&copy; 2024. Creativas. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
