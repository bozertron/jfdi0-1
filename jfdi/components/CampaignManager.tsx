import React, { useState } from 'react';

interface Campaign {
  id: number;
  name: string;
  status: 'active' | 'paused' | 'completed';
  department: string;
}

const CampaignManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Summer Sale', status: 'active', department: 'Marketing' },
    { id: 2, name: 'Customer Feedback', status: 'paused', department: 'Customer Service' },
    { id: 3, name: 'Product Launch', status: 'completed', department: 'Sales' },
  ]);

  const addCampaign = () => {
    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      name: `New Campaign ${campaigns.length + 1}`,
      status: 'active',
      department: 'Marketing',
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Campaign Manager</h2>
      <button onClick={addCampaign} className="mb-4 bg-blue-500 text-white p-2 rounded">Add Campaign</button>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Department</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b">
              <td className="p-2">{campaign.name}</td>
              <td className="p-2">{campaign.status}</td>
              <td className="p-2">{campaign.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignManager;