import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CampaignManager from '@/components/CampaignManager';

export default function CampaignsPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Campaigns</h1>
        <CampaignManager />
      </div>
    </MainLayout>
  );
}