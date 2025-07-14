'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { getSolPrice, convertUsdToSol } from '@/lib/jupiter-price';
import { Badge } from '@/components/ui/badge';
import { Loader2, DollarSign } from 'lucide-react';

const DONATION_ADDRESS = 'DuGAeaHQUGP4mZBD2hLUeZpDBUyV3ave6GDUKxkCcwRz';
const PRESET_AMOUNTS = [10, 50, 100];

export function DonationWidget() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (publicKey) {
      loadBalance();
    }
  }, [publicKey, connection]);

  useEffect(() => {
    loadSolPrice();
  }, []);

  const loadBalance = async () => {
    if (!publicKey) return;
    
    try {
      const balanceInLamports = await connection.getBalance(publicKey);
      setBalance(balanceInLamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error loading balance:', error);
      // Set balance to null to indicate we couldn't load it
      setBalance(null);
    }
  };

  const loadSolPrice = async () => {
    setIsLoading(true);
    try {
      const price = await getSolPrice();
      setSolPrice(price);
    } catch (error) {
      console.error('Error loading SOL price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getSelectedUsdAmount = (): number => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseFloat(customAmount) || 0;
    return 0;
  };

  const handleMaxAmount = () => {
    if (balance && solPrice) {
      const maxUsdAmount = balance * solPrice;
      setCustomAmount(maxUsdAmount.toFixed(2));
      setSelectedAmount(null);
    }
  };

  const handleDonate = async () => {
    if (!publicKey || !connection) return;
    
    const usdAmount = getSelectedUsdAmount();
    if (usdAmount <= 0) return;

    const solAmount = convertUsdToSol(usdAmount, solPrice);
    if (solAmount <= 0) return;

    setIsSending(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(DONATION_ADDRESS),
          lamports: Math.floor(solAmount * LAMPORTS_PER_SOL),
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      // Reset form and reload balance
      setSelectedAmount(null);
      setCustomAmount('');
      loadBalance();
      
      alert(`Donation successful! Transaction: ${signature}`);
    } catch (error) {
      console.error('Error sending donation:', error);
      alert('Donation failed. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const usdAmount = getSelectedUsdAmount();
  const solAmount = convertUsdToSol(usdAmount, solPrice);
  const canDonate = usdAmount > 0 && balance && solAmount <= balance;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Support Armenian Accelerationism</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <WalletMultiButton />
        </div>

        {publicKey && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Your Balance</p>
              <p className="text-lg font-semibold">
                {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
              </p>
              {balance !== null && solPrice > 0 && (
                <p className="text-sm text-muted-foreground">
                  ≈ ${(balance * solPrice).toFixed(2)} USD
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Donation Amount (USD)</Label>
              
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AMOUNTS.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    disabled={isLoading}
                  >
                    ${amount}
                  </Button>
                ))}
                <Button
                  variant={customAmount && !selectedAmount ? "default" : "outline"}
                  onClick={handleMaxAmount}
                  disabled={!balance || isLoading}
                >
                  MAX
                </Button>
              </div>

              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {usdAmount > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">USD Amount:</span>
                  <Badge variant="secondary">${usdAmount.toFixed(2)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">SOL Amount:</span>
                  <Badge variant="secondary">{solAmount.toFixed(6)} SOL</Badge>
                </div>
                {solPrice > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">SOL Price:</span>
                    <Badge variant="outline">${solPrice.toFixed(2)}</Badge>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleDonate}
              disabled={!canDonate || isSending || isLoading}
              className="w-full"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                `Donate ${usdAmount > 0 ? `$${usdAmount.toFixed(2)}` : ''}`
              )}
            </Button>

            {usdAmount > 0 && balance && solAmount > balance && (
              <p className="text-sm text-red-500 text-center">
                Insufficient balance. You need {(solAmount - balance).toFixed(6)} more SOL.
              </p>
            )}
          </div>
        )}

        {!publicKey && (
          <p className="text-center text-muted-foreground">
            Connect your wallet to start donating
          </p>
        )}
      </CardContent>
    </Card>
  );
}