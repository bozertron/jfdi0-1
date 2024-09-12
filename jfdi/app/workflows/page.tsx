import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WorkflowCreator from '@/components/WorkflowCreator';

export default function WorkflowsPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Workflows</h1>
        <WorkflowCreator />
      </div>
    </MainLayout>
  );
}