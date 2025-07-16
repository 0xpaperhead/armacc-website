'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, DollarSign } from 'lucide-react';

const DONATION_ADDRESS = '0x63be781E86736971F115fcf86Daa539A5e42E6B0' as const;
const PRESET_AMOUNTS = [10, 50, 100];

// Price fetching for different chains
const getEthPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,matic-network,optimism,arbitrum&vs_currencies=usd');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
};

const chainIdToPriceKey: Record<number, string> = {
  1: 'ethereum',
  137: 'matic-network',
  10: 'optimism',
  42161: 'arbitrum',
  8453: 'ethereum', // Base uses ETH
  7777777: 'ethereum', // Zora uses ETH
};

export function EVMDonationWidget() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });
  const { sendTransaction, data: hash, isPending: isSending, error: sendError } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

  useEffect(() => {
    loadPrices();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // Reset form after successful transaction
      setSelectedAmount(null);
      setCustomAmount('');
      alert(`Donation successful! Transaction: ${hash}`);
    }
  }, [isSuccess, hash]);

  useEffect(() => {
    if (sendError) {
      console.error('Transaction error:', sendError);
      alert('Transaction failed. Please try again.');
    }
  }, [sendError]);

  const loadPrices = async () => {
    setIsLoadingPrices(true);
    try {
      const priceData = await getEthPrice();
      if (priceData) {
        const priceMap: Record<string, number> = {};
        Object.entries(priceData).forEach(([key, value]: [string, any]) => {
          priceMap[key] = value.usd;
        });
        setPrices(priceMap);
      }
    } catch (error) {
      console.error('Error loading prices:', error);
    } finally {
      setIsLoadingPrices(false);
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

  const getCurrentChainPrice = () => {
    const priceKey = chainIdToPriceKey[chainId] || 'ethereum';
    return prices[priceKey] || 0;
  };

  const convertUsdToNative = (usdAmount: number): number => {
    const price = getCurrentChainPrice();
    if (price === 0) return 0;
    return usdAmount / price;
  };

  const handleMaxAmount = () => {
    if (balance) {
      const nativeAmount = parseFloat(formatEther(balance.value));
      const price = getCurrentChainPrice();
      const maxUsdAmount = nativeAmount * price;
      setCustomAmount(maxUsdAmount.toFixed(2));
      setSelectedAmount(null);
    }
  };

  const handleDonate = async () => {
    if (!address) return;
    
    const usdAmount = getSelectedUsdAmount();
    if (usdAmount <= 0) return;

    const nativeAmount = convertUsdToNative(usdAmount);
    if (nativeAmount <= 0) return;

    try {
      sendTransaction({
        to: DONATION_ADDRESS,
        value: parseEther(nativeAmount.toString()),
      });
    } catch (error) {
      console.error('Error sending donation:', error);
    }
  };

  const usdAmount = getSelectedUsdAmount();
  const nativeAmount = convertUsdToNative(usdAmount);
  const currentChain = chains.find(chain => chain.id === chainId);
  const nativeBalance = balance ? parseFloat(formatEther(balance.value)) : 0;
  const canDonate = usdAmount > 0 && nativeAmount <= nativeBalance;

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-white">Support via Ethereum & L2s</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <ConnectButton />
        </div>

        {isConnected && address && (
          <div className="space-y-4">

            <div className="text-center">
              <p className="text-sm text-gray-400">Your Balance</p>
              <p className="text-lg font-semibold text-white">
                {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ${balance.symbol}` : 'Loading...'}
              </p>
              {balance && getCurrentChainPrice() > 0 && (
                <p className="text-sm text-gray-400">
                  ≈ ${(nativeBalance * getCurrentChainPrice()).toFixed(2)} USD
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-gray-300">Donation Amount (USD)</Label>
              
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AMOUNTS.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    disabled={isLoadingPrices}
                  >
                    ${amount}
                  </Button>
                ))}
                <Button
                  variant={customAmount && !selectedAmount ? "default" : "outline"}
                  onClick={handleMaxAmount}
                  disabled={!balance || isLoadingPrices}
                >
                  MAX
                </Button>
              </div>

              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  disabled={isLoadingPrices}
                />
              </div>
            </div>

            {usdAmount > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">USD Amount:</span>
                  <Badge variant="secondary">${usdAmount.toFixed(2)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{balance?.symbol} Amount:</span>
                  <Badge variant="secondary">{nativeAmount.toFixed(6)} {balance?.symbol}</Badge>
                </div>
                {getCurrentChainPrice() > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{balance?.symbol} Price:</span>
                    <Badge variant="outline">${getCurrentChainPrice().toFixed(2)}</Badge>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleDonate}
              disabled={!canDonate || isSending || isConfirming || isLoadingPrices}
              className="w-full"
            >
              {isSending || isConfirming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSending ? 'Sending...' : 'Confirming...'}
                </>
              ) : (
                `Donate ${usdAmount > 0 ? `$${usdAmount.toFixed(2)}` : ''}`
              )}
            </Button>

            {usdAmount > 0 && nativeAmount > nativeBalance && (
              <p className="text-sm text-red-500 text-center">
                Insufficient balance. You need {(nativeAmount - nativeBalance).toFixed(6)} more {balance?.symbol}.
              </p>
            )}
          </div>
        )}

        {!isConnected && (
          <p className="text-center text-gray-400">
            Connect your wallet to start donating
          </p>
        )}
      </CardContent>
    </Card>
  );
}