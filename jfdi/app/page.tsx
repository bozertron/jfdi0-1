import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { JfdiHubUpdated } from "@/components/jfdi-hub-updated";

export default function Home() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">JFDI Hub</h1>
        <JfdiHubUpdated />
      </div>
    </MainLayout>
  );
}