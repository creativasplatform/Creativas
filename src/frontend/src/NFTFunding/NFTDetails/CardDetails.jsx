import React from 'react';

const CardDetails = () => {
  return (
    <div className="flex justify-center space-x-4 p-4 bg-gradient-to-b from-primary to-customblack">
      <div className=" text-white rounded-lg p-14 space-y-4">
        <div>
          <h2 className="text-2xl font-bold">PROJECT OVERVIEW</h2>
          <p>
            TECATE COMUNA 2024 IS AN INNOVATIVE PROPOSAL FOR A MULTI-DAY MUSIC FESTIVAL TO BE HELD IN MEXICO CITY. THIS EVENT IS DESIGNED TO BE A VIBRANT SHOWCASE OF CONTEMPORARY MUSIC, FEATURING A DIVERSE MIX OF GENRES INCLUDING ROCK, POP, INDIE, ELECTRONIC AND LATIN MUSIC. THE GOAL OF THE FESTIVAL IS TO CREATE A UNIQUE EXPERIENCE THAT CELEBRATES CULTURAL AND MUSICAL DIVERSITY, ATTRACTING LOCALS AND TOURISTS ALIKE.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">FESTIVAL OBJECTIVES</h2>
          <ul className="list-disc list-inside">
            <li>PROMOTE MUSIC AND CULTURE: CELEBRATE AND PROMOTE CONTEMPORARY MUSIC AND CULTURE, HIGHLIGHTING BOTH EMERGING AND ESTABLISHED ARTISTS.</li>
            <li>PROMOTE TOURISM: BECOME A TOURIST ATTRACTION, GENERATING A POSITIVE ECONOMIC IMPACT IN THE REGION.</li>
            <li>UNIQUE EXPERIENCE: OFFER AN IMMERSIVE EXPERIENCE THROUGH HIGH-QUALITY PRODUCTION, WHICH INCLUDES IMPRESSIVE SETTINGS, CUTTING-EDGE TECHNOLOGY AND A WIDE RANGE OF SERVICES AND ACTIVITIES.</li>
          </ul>
        </div>



        <div className="bg-black p-4 rounded-lg space-y-4">
          <h2 className="text-2xl font-bold">Rewards</h2>
          <p>ERC-1155 Tokens: Fungible and non-fungible tokens are split for rewards.</p>
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold">Token price</h3>
              <p>Expendable tokens (general admission tickets)</p>
              <p>Price in USD: $100 per token</p>
              <p>Price in RBTC: 0.00148 RBTC</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Non-fungible tokens (VIP tickets)</h3>
              <p>Price in USD: $300 per token</p>
              <p>Price in RBTC: 0.00444 RBTC</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold">Token Details and Benefits:</h3>
              <p>General admission tokens (essential)</p>
              <ul className="list-disc list-inside">
                <li>Benefits: Access to all three days of the festival.</li>
                <li>Quantity: 3,000 tokens.</li>
                <li>Available: 2,000 tokens.</li>
              </ul>
            </div>
            <div>
              <p>VIP tokens (non-fungible)</p>
              <ul className="list-disc list-inside">
                <li>Benefits: Access to VIP areas.</li>
                <li>Meet and greet the artists.</li>
                <li>Exclusive merchandise.</li>
                <li>Free food and drinks in specific areas.</li>
                <li>Quantity: 1,500 chips.</li>
                <li>Available: 1,200 tokens.</li>
              </ul>
            </div>
          </div>
        </div>




        <div className="bg-black p-4 rounded-lg space-y-4">
          <h2 className="text-2xl font-bold">Rewards</h2>
          <p>ERC-1155 Tokens: Fungible and non-fungible tokens are split for rewards.</p>
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold">Token price</h3>
              <p>Expendable tokens (general admission tickets)</p>
              <p>Price in USD: $100 per token</p>
              <p>Price in RBTC: 0.00148 RBTC</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Non-fungible tokens (VIP tickets)</h3>
              <p>Price in USD: $300 per token</p>
              <p>Price in RBTC: 0.00444 RBTC</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold">Token Details and Benefits:</h3>
              <p>General admission tokens (essential)</p>
              <ul className="list-disc list-inside">
                <li>Benefits: Access to all three days of the festival.</li>
                <li>Quantity: 3,000 tokens.</li>
                <li>Available: 2,000 tokens.</li>
              </ul>
            </div>
            <div>
              <p>VIP tokens (non-fungible)</p>
              <ul className="list-disc list-inside">
                <li>Benefits: Access to VIP areas.</li>
                <li>Meet and greet the artists.</li>
                <li>Exclusive merchandise.</li>
                <li>Free food and drinks in specific areas.</li>
                <li>Quantity: 1,500 chips.</li>
                <li>Available: 1,200 tokens.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
