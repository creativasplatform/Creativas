import React from 'react';

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-customblack text-white font-roboto">
      <div className="text-center">
        <h1 className="text-4xl">404</h1>
        <p className="text-lg">This page could not be found.</p>
      </div>
    </div>
  );
}

export default NotFound;
