import React, { useState } from 'react';

const EmailIntegration: React.FC = () => {
  const [provider, setProvider] = useState<'google' | 'microsoft' | ''>('');
  const [connected, setConnected] = useState(false);

  const connectProvider = () => {
    // In a real app, this would initiate OAuth flow
    console.log(`Connecting to ${provider}`);
    setConnected(true);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Email Integration</h2>
      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value as 'google' | 'microsoft' | '')}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">Select Provider</option>
        <option value="google">Google</option>
        <option value="microsoft">Microsoft</option>
      </select>
      <button
        onClick={connectProvider}
        disabled={!provider || connected}
        className={`w-full p-2 rounded ${
          !provider || connected ? 'bg-gray-300' : 'bg-blue-500 text-white'
        }`}
      >
        {connected ? 'Connected' : 'Connect'}
      </button>
    </div>
  );
};

export default EmailIntegration;