import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import LLMInterface from './LLMInterface';
import DataCompiler from './DataCompiler';

interface Workflow {
  _id: string;
  name: string;
  description?: string;
  steps: string[];
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useApp();
  const [personalWorkflows, setPersonalWorkflows] = useState<Workflow[]>([]);
  const [sharedWorkflows, setSharedWorkflows] = useState<Workflow[]>([]);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDescription, setNewWorkflowDescription] = useState('');
  const [newWorkflowSteps, setNewWorkflowSteps] = useState('');
  const [isSharedWorkflow, setIsSharedWorkflow] = useState(false);
  const [activeTab, setActiveTab] = useState('workflows');

  const llms = ['Vee', 'Maestro', 'Create'];

  useEffect(() => {
    if (user) {
      fetchWorkflows();
    }
  }, [user]);

  const fetchWorkflows = async () => {
    try {
      const personalResponse = await fetch(`/api/workflows?userId=${user}`);
      const sharedResponse = await fetch('/api/workflows?shared=true');

      if (personalResponse.ok && sharedResponse.ok) {
        const personalData = await personalResponse.json();
        const sharedData = await sharedResponse.json();
        setPersonalWorkflows(personalData);
        setSharedWorkflows(sharedData);
      } else {
        console.error('Failed to fetch workflows');
      }
    } catch (error) {
      console.error('Error fetching workflows:', error);
    }
  };

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/workflows?userId=${user}&shared=${isSharedWorkflow}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWorkflowName,
          description: newWorkflowDescription,
          steps: newWorkflowSteps.split(',').map(step => step.trim()),
        }),
      });

      if (response.ok) {
        setNewWorkflowName('');
        setNewWorkflowDescription('');
        setNewWorkflowSteps('');
        setIsSharedWorkflow(false);
        fetchWorkflows();
      } else {
        console.error('Failed to create workflow');
      }
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard, {user}!</h2>
      
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('workflows')}
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'workflows' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Workflows
        </button>
        {llms.map(llm => (
          <button
            key={llm}
            onClick={() => setActiveTab(llm)}
            className={`mr-2 px-4 py-2 rounded ${activeTab === llm ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {llm}
          </button>
        ))}
        <button
          onClick={() => setActiveTab('dataCompiler')}
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'dataCompiler' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Data Compiler
        </button>
      </div>
      
      {activeTab === 'workflows' && (
        <>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Create New Workflow</h3>
            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <input
                type="text"
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
                placeholder="Workflow Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                value={newWorkflowDescription}
                onChange={(e) => setNewWorkflowDescription(e.target.value)}
                placeholder="Workflow Description"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={newWorkflowSteps}
                onChange={(e) => setNewWorkflowSteps(e.target.value)}
                placeholder="Steps (comma-separated)"
                className="w-full p-2 border rounded"
                required
              />
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={isSharedWorkflow}
                    onChange={(e) => setIsSharedWorkflow(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Shared Workflow</span>
                </label>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Workflow
              </button>
            </form>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Personal Workflows</h3>
            <ul className="space-y-2">
              {personalWorkflows.map(workflow => (
                <li key={workflow._id} className="border-b pb-2">
                  <h4 className="font-semibold">{workflow.name}</h4>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                  <p className="text-sm text-gray-600">Steps: {workflow.steps.join(', ')}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Shared Workflows</h3>
            <ul className="space-y-2">
              {sharedWorkflows.map(workflow => (
                <li key={workflow._id} className="border-b pb-2">
                  <h4 className="font-semibold">{workflow.name}</h4>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                  <p className="text-sm text-gray-600">Steps: {workflow.steps.join(', ')}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {llms.includes(activeTab) && (
        <LLMInterface llmName={activeTab} />
      )}

      {activeTab === 'dataCompiler' && (
        <DataCompiler />
      )}
    </div>
  );
};

export default Dashboard;