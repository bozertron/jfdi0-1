import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

interface CompanyData {
  _id: string;
  name: string;
  value: any;
}

const DataCompiler: React.FC = () => {
  const { user } = useApp();
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [newDataName, setNewDataName] = useState('');
  const [newDataValue, setNewDataValue] = useState('');

  useEffect(() => {
    if (user) {
      fetchCompanyData();
    }
  }, [user]);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch('/api/companydata');
      if (response.ok) {
        const data = await response.json();
        setCompanyData(data);
      } else {
        console.error('Failed to fetch company data');
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const handleCreateCompanyData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/companydata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newDataName,
          value: newDataValue,
        }),
      });

      if (response.ok) {
        setNewDataName('');
        setNewDataValue('');
        fetchCompanyData();
      } else {
        console.error('Failed to create company data');
      }
    } catch (error) {
      console.error('Error creating company data:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Data Compiler</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Create New Company Data</h3>
        <form onSubmit={handleCreateCompanyData} className="space-y-2">
          <input
            type="text"
            value={newDataName}
            onChange={(e) => setNewDataName(e.target.value)}
            placeholder="Data Name"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={newDataValue}
            onChange={(e) => setNewDataValue(e.target.value)}
            placeholder="Data Value"
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Company Data
          </button>
        </form>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Company Data</h3>
        <ul className="space-y-2">
          {companyData.map(data => (
            <li key={data._id} className="border-b pb-2">
              <h4 className="font-semibold">{data.name}</h4>
              <p className="text-sm text-gray-600">{JSON.stringify(data.value)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataCompiler;