import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

interface Tag {
  _id: string;
  userId: string;
  llm: string;
  project: string;
  task: string;
  name: string;
  value: string;
}

interface LLMInterfaceProps {
  llmName: string;
}

const LLMInterface: React.FC<LLMInterfaceProps> = ({ llmName }) => {
  const { user } = useApp();
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState({ project: '', task: '', name: '', value: '' });
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (user) {
      fetchTags();
    }
  }, [user, llmName]);

  const fetchTags = async () => {
    try {
      const response = await fetch(`/api/tags?userId=${user}&llm=${llmName}`);
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      } else {
        console.error('Failed to fetch tags');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user,
          llm: llmName,
          ...newTag
        }),
      });

      if (response.ok) {
        setNewTag({ project: '', task: '', name: '', value: '' });
        fetchTags();
      } else {
        console.error('Failed to create tag');
      }
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          llmName,
          message,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.response);
      } else {
        console.error('Failed to send message to LLM');
      }
    } catch (error) {
      console.error('Error sending message to LLM:', error);
    }
    setMessage('');
  };

  return (
    <div className="p-6 bg-gray-100 text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">{llmName} Interface</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Create New Tag</h3>
        <form onSubmit={handleCreateTag} className="space-y-2">
          <input
            type="text"
            value={newTag.project}
            onChange={(e) => setNewTag({...newTag, project: e.target.value})}
            placeholder="Project"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={newTag.task}
            onChange={(e) => setNewTag({...newTag, task: e.target.value})}
            placeholder="Task"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={newTag.name}
            onChange={(e) => setNewTag({...newTag, name: e.target.value})}
            placeholder="Tag Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={newTag.value}
            onChange={(e) => setNewTag({...newTag, value: e.target.value})}
            placeholder="Tag Value"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Tag
          </button>
        </form>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Current Tags</h3>
        <ul className="space-y-2">
          {tags.map(tag => (
            <li key={tag._id} className="border-b pb-2">
              <p><strong>Project:</strong> {tag.project}</p>
              <p><strong>Task:</strong> {tag.task}</p>
              <p><strong>Name:</strong> {tag.name}</p>
              <p><strong>Value:</strong> {tag.value}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Send Message to {llmName}</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Type your message to ${llmName}...`}
          className="w-full p-2 border rounded mb-2"
          rows={4}
        />
        <button onClick={handleSendMessage} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Send Message
        </button>
      </div>

      {response && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">LLM Response</h3>
          <p className="p-2 bg-white border rounded">{response}</p>
        </div>
      )}
    </div>
  );
};

export default LLMInterface;