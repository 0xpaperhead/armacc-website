'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DonationWidget } from './donation-widget';
import { EVMDonationWidget } from './evm-donation-widget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function MultiChainDonation() {
  const [activeTab, setActiveTab] = useState('solana');

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-white">Support Armenian Accelerationism</CardTitle>
        <CardDescription className="text-center text-gray-300">
          Choose your preferred blockchain to make a donation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
            <TabsTrigger value="solana" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300">Solana</TabsTrigger>
            <TabsTrigger value="evm" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300">Ethereum & L2s</TabsTrigger>
          </TabsList>
          <TabsContent value="solana" className="mt-6">
            <DonationWidget />
          </TabsContent>
          <TabsContent value="evm" className="mt-6">
            <EVMDonationWidget />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}