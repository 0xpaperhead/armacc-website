'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DonationWidget } from './donation-widget';
import { EVMDonationWidget } from './evm-donation-widget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function MultiChainDonation() {
  const [activeTab, setActiveTab] = useState('solana');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Support Armenian Accelerationism</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred blockchain to make a donation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="solana">Solana</TabsTrigger>
            <TabsTrigger value="evm">Ethereum & L2s</TabsTrigger>
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