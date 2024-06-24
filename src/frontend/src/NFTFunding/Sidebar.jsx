import React, { useState } from 'react';
import imagen from '../assets/imagen.png'
import Tarjeta from '../assets/Tarjeta.png'
import useUser from '../hooks/user/useuser.jsx';
import { useSpring, useTransition, animated } from '@react-spring/web';
const Sidebar = ({ onClose, isSidebarOpen, setIsSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState('NFT');
  const {
    address,
    logout
  } = useUser();

  const handlelogout = async () => {
    await logout();
    setIsSidebarOpen(false)
    onClose;
  } 

  const transitions = useSpring({
    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
    opacity: isSidebarOpen ? 1 : 0,
    config: { duration: 300 }, // Ajusta la duración según sea necesario
    from: {
      transform: 'translateX(100%)',
      opacity: 0,
    },
  });
  

  const renderContent = () => {
    switch (activeTab) {
      case 'NFT':
        return (
          <div>
            {/* Contenido de NFT */}
            <div className="flex flex-col items-center mb-6">
              <div className="text-gray-400 mb-2">
                <svg width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M106.673 12.4027C110.616 13.5333 112.895 17.6462 111.765 21.5891L97.7533 70.4529C96.8931 73.4525 94.307 75.4896 91.3828 75.7948C91.4046 75.5034 91.4157 75.2091 91.4157 74.9121V27.1674C91.4157 20.7217 86.1904 15.4965 79.7447 15.4965H56.1167L58.7303 6.38172C59.8609 2.43883 63.9738 0.159015 67.9167 1.28962L106.673 12.4027Z" fill="#D2D9EE"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M32 27.7402C32 23.322 35.5817 19.7402 40 19.7402H79.1717C83.59 19.7402 87.1717 23.322 87.1717 27.7402V74.3389C87.1717 78.7572 83.59 82.3389 79.1717 82.3389H40C35.5817 82.3389 32 78.7572 32 74.3389V27.7402ZM57.1717 42.7402C57.1717 46.6062 53.8138 49.7402 49.6717 49.7402C45.5296 49.7402 42.1717 46.6062 42.1717 42.7402C42.1717 38.8742 45.5296 35.7402 49.6717 35.7402C53.8138 35.7402 57.1717 38.8742 57.1717 42.7402ZM36.1717 60.8153C37.2808 58.3975 40.7688 54.8201 45.7381 54.3677C51.977 53.7997 55.3044 57.8295 56.5522 60.0094C59.8797 55.4423 67.0336 46.8724 72.3575 45.9053C77.6814 44.9381 81.7853 48.4574 83.1717 50.338V72.6975C83.1717 75.4825 80.914 77.7402 78.1289 77.7402H41.2144C38.4294 77.7402 36.1717 75.4825 36.1717 72.6975V60.8153Z" fill="#D2D9EE"></path></svg>
              </div>
              <p className="text-gray-500">No NFTs yet</p>
              <p className="text-gray-400 text-sm mb-4 text-center">Start a new project with this wallet to get started.</p>
              <button className="bg-secondary-bright text-white text-sm p-2 rounded-lg">Start Project</button>
            </div>
          </div>
        );
      case 'Rewards':
        return (
          <div>
            <div className="flex flex-col items-center mb-6">
              {/* Contenido de Rewards */}
              <svg width="91" height="80" viewBox="0 0 91 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.61929 0 0.5 1.11929 0.5 2.5C0.5 3.88071 1.61929 5 3 5L57 5C58.3807 5.00001 59.5 3.88072 59.5 2.50001C59.5 1.11929 58.3807 5.06009e-06 57 4.93939e-06L3 0ZM7.51953 11.1055H10.5143C13.5091 11.1055 15.0065 12.6029 15.0065 15.5977V18.5924C15.0065 21.5872 13.5091 23.0846 10.5143 23.0846H7.51953C4.52474 23.0846 3.02734 21.5872 3.02734 18.5924V15.5977C3.02734 12.6029 4.52474 11.1055 7.51953 11.1055ZM31.4779 11.1055H28.4831C25.4883 11.1055 23.9909 12.6029 23.9909 15.5977V18.5924C23.9909 21.5872 25.4883 23.0846 28.4831 23.0846H31.4779C34.4726 23.0846 35.97 21.5872 35.97 18.5924V15.5977C35.97 12.6029 34.4726 11.1055 31.4779 11.1055ZM49.4466 11.1055H52.4414C55.4362 11.1055 56.9336 12.6029 56.9336 15.5977V18.5924C56.9336 21.5872 55.4362 23.0846 52.4414 23.0846H49.4466C46.4518 23.0846 44.9544 21.5872 44.9544 18.5924V15.5977C44.9544 12.6029 46.4518 11.1055 49.4466 11.1055ZM10.5143 31.47H7.51953C4.52474 31.47 3.02734 32.9674 3.02734 35.9622V38.957C3.02734 41.9518 4.52474 43.4492 7.51953 43.4492H10.5143C13.5091 43.4492 15.0065 41.9518 15.0065 38.957V35.9622C15.0065 32.9674 13.5091 31.47 10.5143 31.47ZM28.4831 31.47H31.4779C34.4726 31.47 35.97 32.9674 35.97 35.9622V38.957C35.97 41.9518 34.4726 43.4492 31.4779 43.4492H28.4831C25.4883 43.4492 23.9909 41.9518 23.9909 38.957V35.9622C23.9909 32.9674 25.4883 31.47 28.4831 31.47ZM52.4414 31.47H49.4466C46.4518 31.47 44.9544 32.9674 44.9544 35.9622V38.957C44.9544 41.1067 45.726 42.4849 47.2691 43.0915C49.7015 39.5566 52.9858 36.6532 56.8257 34.6779C56.4335 32.5393 54.9721 31.47 52.4414 31.47Z" fill="#404A67"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M68.7031 79.8125C80.8534 79.8125 90.7031 69.9628 90.7031 57.8125C90.7031 45.6622 80.8534 35.8125 68.7031 35.8125C56.5529 35.8125 46.7031 45.6622 46.7031 57.8125C46.7031 69.9628 56.5529 79.8125 68.7031 79.8125ZM76.9524 57.8122L68.7027 49.5625L60.4531 57.8122L68.7027 66.0619L76.9524 57.8122Z" fill="#D2D9EE"></path></svg>
              <p className="text-gray-500">No rewards yet</p>
              <p className="text-gray-400 text-sm mb-4 text-center">Buy rewards and contribute to projects with this wallet to get started.</p>
              <button className="bg-secondary-bright text-white text-sm p-2 rounded-lg">Explore Projects</button>
            </div>
          </div>
        );
      case 'Activity':
        return (
          <div>
            <div className="flex flex-col items-center mb-6">
              {/* Contenido de Activity */}
              <svg width="102" height="94" viewBox="0 0 102 94" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.4998 9.00098L5.22859 13.3799C1.51236 14.4455 -0.636389 18.322 0.429224 22.0382L13.6352 68.093C14.7008 71.8092 18.5773 73.958 22.2935 72.8924L56.7921 63H31.4998C25.4246 63 20.4998 58.0752 20.4998 52V9.00098Z" fill="#404A67"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M31.5 0C27.634 0 24.5 3.13401 24.5 7V52C24.5 55.866 27.634 59 31.5 59H56.7364C60.5936 51.6192 67.8907 46.3207 76.5 45.2321V7C76.5 3.13401 73.366 0 69.5 0H31.5ZM37 19C38.3807 19 39.5 17.8807 39.5 16.5C39.5 15.1193 38.3807 14 37 14C35.6193 14 34.5 15.1193 34.5 16.5C34.5 17.8807 35.6193 19 37 19ZM39.5 29.5C39.5 30.8807 38.3807 32 37 32C35.6193 32 34.5 30.8807 34.5 29.5C34.5 28.1193 35.6193 27 37 27C38.3807 27 39.5 28.1193 39.5 29.5ZM37 45C38.3807 45 39.5 43.8807 39.5 42.5C39.5 41.1193 38.3807 40 37 40C35.6193 40 34.5 41.1193 34.5 42.5C34.5 43.8807 35.6193 45 37 45ZM44.5 16.5C44.5 15.1193 45.6193 14 47 14H64C65.3807 14 66.5 15.1193 66.5 16.5C66.5 17.8807 65.3807 19 64 19H47C45.6193 19 44.5 17.8807 44.5 16.5ZM47 27C45.6193 27 44.5 28.1193 44.5 29.5C44.5 30.8807 45.6193 32 47 32H64C65.3807 32 66.5 30.8807 66.5 29.5C66.5 28.1193 65.3807 27 64 27H47ZM44.5 42.5C44.5 41.1193 45.6193 40 47 40H64C65.3807 40 66.5 41.1193 66.5 42.5C66.5 43.8807 65.3807 45 64 45H47C45.6193 45 44.5 43.8807 44.5 42.5Z" fill="#404A67"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M79.7939 93.0254C91.9442 93.0254 101.794 83.1757 101.794 71.0254C101.794 58.8751 91.9442 49.0254 79.7939 49.0254C67.6437 49.0254 57.7939 58.8751 57.7939 71.0254C57.7939 83.1757 67.6437 93.0254 79.7939 93.0254ZM88.0433 71.0251L79.7936 62.7754L71.544 71.0251L79.7936 79.2748L88.0433 71.0251Z" fill="#D2D9EE"></path></svg>

              <p className="text-gray-500">There is no activity yet</p>
              <p className="text-gray-400 text-sm mb-4 text-center">Your on-chain transactions and project contributions will appear here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
        <animated.div
          style={transitions}
          className="w-[400px] bg-customblack shadow-lg p-4 h-full fixed right-0 top-0 transition-transform"
        >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="bg-green-500 p-2 rounded-full text-white">
            <svg height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
              <g style={{ transformOrigin: "center center" }}>
                <circle cx="20" cy="20" fill="#B1E5E329" r="20"></circle>
                <g transform="translate(6.666666666666666, 6.666666666666666) scale(0.5555555555555556)">
                  <path clipRule="evenodd" d="M21 6C21 4.34315 22.3431 3 24 3C25.6569 3 27 4.34315 27 6V15C27 16.6569 25.6569 18 24 18C22.3431 18 21 16.6569 21 15V6Z" fill="#B1E5E3" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M21 33C21 31.3431 22.3431 30 24 30C25.6569 30 27 31.3431 27 33V42C27 43.6569 25.6569 45 24 45C22.3431 45 21 43.6569 21 42V33Z" fill="#B1E5E3" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M42 21C43.6569 21 45 22.3431 45 24C45 25.6569 43.6569 27 42 27H33C31.3431 27 30 25.6569 30 24C30 22.3431 31.3431 21 33 21H42Z" fill="#B1E5E3" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M15 21C16.6569 21 18 22.3431 18 24C18 25.6569 16.6569 27 15 27H6C4.34315 27 3 25.6569 3 24C3 22.3431 4.34315 21 6 21H15Z" fill="#B1E5E3" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M34.6066 9.15076C35.7782 7.97918 37.6777 7.97918 38.8492 9.15076C40.0208 10.3223 40.0208 12.2218 38.8492 13.3934L36.7279 15.5147C35.5563 16.6863 33.6569 16.6863 32.4853 15.5147C31.3137 14.3431 31.3137 12.4437 32.4853 11.2721L34.6066 9.15076Z" fill="#B1E5E3" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M11.2721 32.4853C12.4437 31.3137 14.3431 31.3137 15.5147 32.4853C16.6863 33.6569 16.6863 35.5563 15.5147 36.7279L13.3934 38.8492C12.2218 40.0208 10.3223 40.0208 9.15076 38.8492C7.97919 37.6777 7.97919 35.7782 9.15076 34.6066L11.2721 32.4853Z" fill="#B1E5E3" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M38.8492 34.6066C40.0208 35.7782 40.0208 37.6777 38.8492 38.8492C37.6777 40.0208 35.7782 40.0208 34.6066 38.8492L32.4853 36.7279C31.3137 35.5563 31.3137 33.6569 32.4853 32.4853C33.6569 31.3137 35.5563 31.3137 36.7279 32.4853L38.8492 34.6066Z" fill="#B1E5E3" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M15.5147 11.2721C16.6863 12.4437 16.6863 14.3431 15.5147 15.5147C14.3431 16.6863 12.4437 16.6863 11.2721 15.5147L9.15076 13.3934C7.97918 12.2218 7.97919 10.3223 9.15076 9.15076C10.3223 7.97918 12.2218 7.97918 13.3934 9.15076L15.5147 11.2721Z" fill="#B1E5E3" fillRule="evenodd"></path>
                </g>
              </g>
            </svg>
          </div>

          <div className="ml-0">
            <p className="truncate text-sm font-medium text-white">{`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</p>

          </div>
        </div>
        <div className="flex items-center ">
          <button onClick={onClose} className="ml-40 hover:bg-secondary/40 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="24"><path d="M20.83 14.6C19.9 14.06 19.33 13.07 19.33 12C19.33 10.93 19.9 9.93999 20.83 9.39999C20.99 9.29999 21.05 9.1 20.95 8.94L19.28 6.06C19.22 5.95 19.11 5.89001 19 5.89001C18.94 5.89001 18.88 5.91 18.83 5.94C18.37 6.2 17.85 6.34 17.33 6.34C16.8 6.34 16.28 6.19999 15.81 5.92999C14.88 5.38999 14.31 4.41 14.31 3.34C14.31 3.15 14.16 3 13.98 3H10.02C9.83999 3 9.69 3.15 9.69 3.34C9.69 4.41 9.12 5.38999 8.19 5.92999C7.72 6.19999 7.20001 6.34 6.67001 6.34C6.15001 6.34 5.63001 6.2 5.17001 5.94C5.01001 5.84 4.81 5.9 4.72 6.06L3.04001 8.94C3.01001 8.99 3 9.05001 3 9.10001C3 9.22001 3.06001 9.32999 3.17001 9.39999C4.10001 9.93999 4.67001 10.92 4.67001 11.99C4.67001 13.07 4.09999 14.06 3.17999 14.6H3.17001C3.01001 14.7 2.94999 14.9 3.04999 15.06L4.72 17.94C4.78 18.05 4.89 18.11 5 18.11C5.06 18.11 5.12001 18.09 5.17001 18.06C6.11001 17.53 7.26 17.53 8.19 18.07C9.11 18.61 9.67999 19.59 9.67999 20.66C9.67999 20.85 9.82999 21 10.02 21H13.98C14.16 21 14.31 20.85 14.31 20.66C14.31 19.59 14.88 18.61 15.81 18.07C16.28 17.8 16.8 17.66 17.33 17.66C17.85 17.66 18.37 17.8 18.83 18.06C18.99 18.16 19.19 18.1 19.28 17.94L20.96 15.06C20.99 15.01 21 14.95 21 14.9C21 14.78 20.94 14.67 20.83 14.6ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z" fill="#9398A7"></path></svg>
          </button>
        </div>
        <div className="flex items-center hover:bg-secondary/40 rounded-lg">
          <button onClick={handlelogout} >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7.3335C7.63133 7.3335 7.33333 7.03483 7.33333 6.66683V2.00016C7.33333 1.63216 7.63133 1.3335 8 1.3335C8.36867 1.3335 8.66667 1.63216 8.66667 2.00016V6.66683C8.66667 7.03483 8.36867 7.3335 8 7.3335ZM14 8.66683C14 6.5375 12.8506 4.5462 11.002 3.47087C10.6833 3.28553 10.2753 3.39343 10.0907 3.71143C9.90532 4.03009 10.0134 4.43822 10.3314 4.62288C11.772 5.46088 12.6667 7.01083 12.6667 8.66683C12.6667 11.2402 10.5727 13.3335 8 13.3335C5.42733 13.3335 3.33333 11.2402 3.33333 8.66683C3.33333 7.01083 4.22795 5.46088 5.66862 4.62288C5.98729 4.43822 6.09534 4.02943 5.90934 3.71143C5.72334 3.39343 5.31538 3.2842 4.99805 3.47087C3.14938 4.54687 2 6.5375 2 8.66683C2 11.9748 4.69133 14.6668 8 14.6668C11.3087 14.6668 14 11.9748 14 8.66683Z" fill="#9398A7"></path></svg>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-semibold text-white">0,00 $</p>
      </div>

      <div className="grid grid-cols-2  gap-2 mb-6">
        <button className="bg-secondary/40 p-4 hover:bg-secondary/60 rounded-[20px] flex flex-col items-center ">
          <img role="img" aria-label="buy" className="ml-0" src={Tarjeta}></img>
          <p className="text-secondary mt-2 -ml-8 text-[16px] mr-[85px] font-bold">Buy</p>
        </button>
        <button className="bg-secondary/40 hover:bg-secondary/60 p-4 rounded-[20px] flex flex-col items-center">
          <img role="img" aria-label="buy" className="ml-0" src={imagen}></img>
          <p className="text-secondary mt-2 -ml-2.5 text-[16px] mr-[70px] font-bold">See NFTs</p>
        </button>
      </div>

      <div className="flex justify-around text-gray-500 mb-[130px] text-[16px]  " >
        <button
          className={` ${activeTab === 'NFT' ? 'text-white font-bold ' : 'text-gray-500'}`}
          onClick={() => setActiveTab('NFT')}
        >
          NFTs
        </button>
        <button
          className={`${activeTab === 'Rewards' ? 'text-white font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('Rewards')}
        >
          Rewards
        </button>
        <button
          className={`${activeTab === 'Activity' ? 'text-white font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('Activity')}
        >
          Activity
        </button>
      </div>

      {renderContent()}
      
      </animated.div>
)
};

export default Sidebar;
