import React from 'react';
import { useApp } from '../contexts/AppContext';

interface Workflow {
  id: number;
  name: string;
  steps: string[];
}

interface DashboardProps {
  workflows: Workflow[];
}

const Dashboard: React.FC<DashboardProps> = ({ workflows }) => {
  const { user } = useApp();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard, {user}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Active Workflows</h3>
          <p className="text-2xl">{workflows.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Recent Workflows</h3>
          <ul>
            {workflows.slice(0, 3).map(workflow => (
              <li key={workflow.id}>{workflow.name}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Quick Actions</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create New Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;