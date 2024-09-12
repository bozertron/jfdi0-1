import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import KnowledgeBase from '@/components/KnowledgeBase';

export default function KnowledgePage() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>
        <KnowledgeBase />
      </div>
    </MainLayout>
  );
}