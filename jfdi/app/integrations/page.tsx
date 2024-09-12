import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EmailIntegration from '@/components/integrations/EmailIntegration';
import TextIntegration from '@/components/integrations/TextIntegration';

export default function IntegrationsPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Integrations</h1>
        <EmailIntegration />
        <TextIntegration />
      </div>
    </MainLayout>
  );
}