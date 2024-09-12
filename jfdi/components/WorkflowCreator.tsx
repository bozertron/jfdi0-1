import React, { useState } from 'react';

const WorkflowCreator: React.FC = () => {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowSteps, setWorkflowSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addStep = () => {
    setWorkflowSteps([...workflowSteps, '']);
  };

  const updateStep = (index: number, value: string) => {
    const updatedSteps = [...workflowSteps];
    updatedSteps[index] = value;
    setWorkflowSteps(updatedSteps);
  };

  const saveWorkflow = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: workflowName, steps: workflowSteps }),
      });
      if (!response.ok) {
        throw new Error('Failed to save workflow');
      }
      const data = await response.json();
      console.log('Workflow saved:', data);
      setWorkflowName('');
      setWorkflowSteps([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Workflow</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <input
        type="text"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        placeholder="Workflow Name"
        className="w-full p-2 mb-4 border rounded"
      />
      {workflowSteps.map((step, index) => (
        <input
          key={index}
          type="text"
          value={step}
          onChange={(e) => updateStep(index, e.target.value)}
          placeholder={`Step ${index + 1}`}
          className="w-full p-2 mb-2 border rounded"
        />
      ))}
      <button onClick={addStep} className="bg-blue-500 text-white p-2 rounded mr-2">Add Step</button>
      <button 
        onClick={saveWorkflow} 
        className={`bg-green-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Workflow'}
      </button>
    </div>
  );
};

export default WorkflowCreator;