import React from 'react';
import Creativas from '../assets/CreativasLogo2.png';

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
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.215 8.769l-1.414 6.65c-.107.481-.386.6-.785.373l-2.169-1.602-1.047 1.006c-.116.115-.214.214-.436.214l.157-2.22 4.033-3.64c.174-.157-.04-.244-.271-.086l-4.985 3.141-2.149-.671c-.468-.145-.479-.468.098-.694l8.468-3.272c.397-.145.748.086.622.637z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">Discord</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1259-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1066c.3608.698.7723 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5008-5.177-.8382-9.6739-3.5485-13.6605a.061.061 0 00-.0312-.0286zM8.0202 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.86 9.86 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.868 9.868 0 01-3.127 1.195 4.916 4.916 0 00-8.373 4.482A13.941 13.941 0 011.671 3.149a4.902 4.902 0 001.523 6.574 4.904 4.904 0 01-2.228-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.933 4.933 0 01-2.224.084c.626 1.956 2.444 3.379 4.604 3.419a9.867 9.867 0 01-6.1 2.105c-.397 0-.79-.023-1.175-.068a13.94 13.94 0 007.548 2.213c9.056 0 14.01-7.503 14.01-14.01 0-.213-.005-.426-.014-.637A10.004 10.004 0 0024 4.557z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:opacity-75">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.331 3.608 1.308.975.976 1.244 2.243 1.306 3.608.058 1.266.069 1.647.069 4.851s-.011 3.585-.069 4.851c-.062 1.366-.331 2.633-1.306 3.608-.975.975-2.242 1.244-3.608 1.306-1.266.058-1.646.069-4.85.069s-3.585-.011-4.851-.069c-1.365-.062-2.633-.331-3.608-1.306-.975-.975-1.244-2.242-1.306-3.608C2.175 15.585 2.163 15.204 2.163 12s.012-3.585.07-4.851c.062-1.365.331-2.632 1.306-3.608.975-.975 2.242-1.244 3.608-1.306C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.015 7.052.072 5.77.13 4.602.363 3.52 1.445 2.437 2.528 2.204 3.696 2.147 4.948 2.09 6.228 2.075 6.637 2.075 10s.015 3.772.072 5.052c.057 1.252.29 2.42 1.373 3.503 1.083 1.082 2.251 1.316 3.503 1.373 1.28.057 1.689.072 5.052.072s3.772-.015 5.052-.072c1.252-.057 2.42-.291 3.503-1.373 1.083-1.083 1.316-2.251 1.373-3.503.057-1.28.072-1.689.072-5.052s-.015-3.772-.072-5.052c-.057-1.252-.29-2.42-1.373-3.503-1.082-1.083-2.251-1.316-3.503-1.373C15.772.015 15.363 0 12 0zm0 5.838c-3.403 0-6.162 2.76-6.162 6.162S8.597 18.162 12 18.162s6.162-2.76 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm6.406-11.845c-.796 0-1.442.646-1.442 1.442s.646 1.442 1.442 1.442 1.442-.646 1.442-1.442-.646-1.442-1.442-1.442z" />
              </svg>
            </a>
          </li>
        </ul>

        <p className="text-xs text-gray-300 text-center lg:text-left">&copy; 2024. Creativas. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
