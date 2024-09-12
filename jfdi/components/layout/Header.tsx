'use client'

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New Campaign
          </button>
          <div className="ml-4 relative">
            <div className="text-sm font-medium text-gray-700">John Doe</div>
            <div className="text-xs text-gray-500">john@example.com</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;