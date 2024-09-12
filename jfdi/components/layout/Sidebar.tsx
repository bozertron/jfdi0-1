'use client'

import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-gray-800 w-64 min-h-screen p-4">
      <div className="text-white text-2xl font-semibold mb-6">JFDI</div>
      <ul>
        <li><Link href="/" className="text-gray-300 hover:text-white block py-2">Dashboard</Link></li>
        <li><Link href="/workflows" className="text-gray-300 hover:text-white block py-2">Workflows</Link></li>
        <li><Link href="/campaigns" className="text-gray-300 hover:text-white block py-2">Campaigns</Link></li>
        <li><Link href="/knowledge" className="text-gray-300 hover:text-white block py-2">Knowledge</Link></li>
        <li><Link href="/integrations" className="text-gray-300 hover:text-white block py-2">Integrations</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;