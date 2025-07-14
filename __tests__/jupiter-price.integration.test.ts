import { getSolPrice, convertUsdToSol } from '../lib/jupiter-price';
import { PublicKey } from '@solana/web3.js';

// Helper function for proper Solana address validation
const isValidSolanaAddress = (address: string): boolean => {
  try {
    const publicKey = new PublicKey(address);
    return publicKey.toBytes().length === 32;
  } catch (error) {
    return false;
  }
};

describe('Jupiter Price API Integration Tests', () => {
  const SOL_MINT = 'So11111111111111111111111111111111111111112';
  
  beforeAll(() => {
    // Test should not depend on environment variables for Jupiter API
    // as it uses the public lite endpoint
    console.log('Running Jupiter Price API integration tests...');
  });

  describe('getSolPrice()', () => {
    test('should fetch real SOL price from Jupiter API v3', async () => {
      const price = await getSolPrice();
      
      // Validate that we got a real price
      expect(price).toBeGreaterThan(0);
      expect(typeof price).toBe('number');
      expect(price).not.toBeNaN();
      
      // SOL price should be within reasonable bounds (assuming $10-$1000 range)
      expect(price).toBeGreaterThan(10);
      expect(price).toBeLessThan(1000);
      
      console.log(`Current SOL price: $${price}`);
    }, 30000); // 30 second timeout for real API call

    test('should validate SOL mint address is correct', async () => {
      // Validate that we're using a proper Solana address
      expect(isValidSolanaAddress(SOL_MINT)).toBe(true);
      
      // Validate the SOL mint address specifically
      const solPublicKey = new PublicKey(SOL_MINT);
      expect(solPublicKey.toBase58()).toBe(SOL_MINT);
    });

    test('should handle API response structure correctly', async () => {
      // Test the actual API response structure
      const response = await fetch('https://lite-api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112');
      expect(response.ok).toBe(true);
      
      const data = await response.json();
      
      // Validate v3 API response structure
      expect(data).toHaveProperty(SOL_MINT);
      expect(data[SOL_MINT]).toHaveProperty('usdPrice');
      expect(data[SOL_MINT]).toHaveProperty('blockId');
      expect(data[SOL_MINT]).toHaveProperty('decimals');
      expect(data[SOL_MINT].decimals).toBe(9); // SOL has 9 decimals
      
      expect(typeof data[SOL_MINT].usdPrice).toBe('number');
      expect(typeof data[SOL_MINT].blockId).toBe('number');
      expect(data[SOL_MINT].usdPrice).toBeGreaterThan(0);
    }, 30000);

    test('should handle network errors gracefully', async () => {
      // Mock fetch to simulate network error
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
      const price = await getSolPrice();
      
      // Should return 0 on error and not throw
      expect(price).toBe(0);
      
      // Restore original fetch
      global.fetch = originalFetch;
    });

    test('should handle invalid API response gracefully', async () => {
      // Mock fetch to return invalid response
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ invalidStructure: true })
      });
      
      const price = await getSolPrice();
      
      // Should return 0 on invalid response
      expect(price).toBe(0);
      
      // Restore original fetch
      global.fetch = originalFetch;
    });

    test('should handle API error status codes', async () => {
      // Mock fetch to return error status
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({})
      });
      
      const price = await getSolPrice();
      
      // Should return 0 on API error
      expect(price).toBe(0);
      
      // Restore original fetch
      global.fetch = originalFetch;
    });

    test('should complete within performance threshold', async () => {
      const startTime = Date.now();
      
      await getSolPrice();
      
      const duration = Date.now() - startTime;
      
      // Should complete within 30 seconds
      expect(duration).toBeLessThan(30000);
      console.log(`API call completed in ${duration}ms`);
    });
  });

  describe('convertUsdToSol()', () => {
    test('should convert USD to SOL correctly with real price', async () => {
      const solPrice = await getSolPrice();
      const usdAmount = 100;
      
      const solAmount = convertUsdToSol(usdAmount, solPrice);
      
      expect(solAmount).toBeGreaterThan(0);
      expect(typeof solAmount).toBe('number');
      expect(solAmount).not.toBeNaN();
      
      // Verify the conversion math
      expect(solAmount).toBeCloseTo(usdAmount / solPrice, 10);
      
      console.log(`$${usdAmount} USD = ${solAmount} SOL at $${solPrice} per SOL`);
    });

    test('should handle zero SOL price gracefully', () => {
      const solAmount = convertUsdToSol(100, 0);
      expect(solAmount).toBe(0);
    });

    test('should handle zero USD amount', async () => {
      const solPrice = await getSolPrice();
      const solAmount = convertUsdToSol(0, solPrice);
      expect(solAmount).toBe(0);
    });

    test('should handle negative values appropriately', async () => {
      const solPrice = await getSolPrice();
      
      // Negative USD should result in negative SOL
      const negativeUsdAmount = convertUsdToSol(-100, solPrice);
      expect(negativeUsdAmount).toBeLessThan(0);
      
      // Negative SOL price should result in negative SOL
      const negativePriceAmount = convertUsdToSol(100, -solPrice);
      expect(negativePriceAmount).toBeLessThan(0);
    });

    test('should handle very large numbers', async () => {
      const solPrice = await getSolPrice();
      const largeUsdAmount = 1000000; // $1M
      
      const solAmount = convertUsdToSol(largeUsdAmount, solPrice);
      
      expect(solAmount).toBeGreaterThan(0);
      expect(solAmount).toBe(largeUsdAmount / solPrice);
      expect(Number.isFinite(solAmount)).toBe(true);
    });

    test('should handle very small numbers with precision', async () => {
      const solPrice = await getSolPrice();
      const smallUsdAmount = 0.01; // 1 cent
      
      const solAmount = convertUsdToSol(smallUsdAmount, solPrice);
      
      expect(solAmount).toBeGreaterThan(0);
      expect(solAmount).toBe(smallUsdAmount / solPrice);
      expect(Number.isFinite(solAmount)).toBe(true);
    });
  });

  describe('Integration with real market conditions', () => {
    test('should work consistently across multiple calls', async () => {
      const prices = [];
      
      // Make 3 API calls with small delays
      for (let i = 0; i < 3; i++) {
        const price = await getSolPrice();
        prices.push(price);
        
        if (i < 2) {
          // Small delay between calls to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // All prices should be valid
      prices.forEach(price => {
        expect(price).toBeGreaterThan(0);
        expect(typeof price).toBe('number');
      });
      
      // Prices should be relatively stable (within 10% variance)
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      const variance = (maxPrice - minPrice) / minPrice;
      
      expect(variance).toBeLessThan(0.1); // Less than 10% variance
      
      console.log(`Price stability test - Min: $${minPrice}, Max: $${maxPrice}, Variance: ${(variance * 100).toFixed(2)}%`);
    }, 120000); // 2 minute timeout for multiple API calls

    test('should provide recent block data', async () => {
      const response = await fetch('https://lite-api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112');
      const data = await response.json();
      
      const blockId = data[SOL_MINT].blockId;
      
      // Block ID should be a reasonable number (Solana mainnet is in millions)
      expect(blockId).toBeGreaterThan(300000000); // Should be recent mainnet block
      expect(typeof blockId).toBe('number');
      
      console.log(`Price data from block: ${blockId}`);
    }, 30000);

    test('should handle concurrent API calls', async () => {
      // Test concurrent calls to ensure no race conditions
      const promises = Array(5).fill(null).map(() => getSolPrice());
      
      const results = await Promise.all(promises);
      
      // All results should be valid and similar
      results.forEach(price => {
        expect(price).toBeGreaterThan(0);
        expect(typeof price).toBe('number');
      });
      
      // All prices should be identical or very close (same block)
      const firstPrice = results[0];
      results.forEach(price => {
        expect(Math.abs(price - firstPrice)).toBeLessThan(0.01); // Within 1 cent
      });
      
      console.log(`Concurrent calls returned prices: ${results.join(', ')}`);
    }, 60000);
  });

  describe('Real-world usage scenarios', () => {
    test('should handle portfolio calculations with real data', async () => {
      const solPrice = await getSolPrice();
      
      // Simulate a small portfolio
      const portfolioValueUsd = 1000;
      const solAmount = convertUsdToSol(portfolioValueUsd, solPrice);
      
      // Validate portfolio calculations
      expect(solAmount).toBeGreaterThan(0);
      expect(solAmount * solPrice).toBeCloseTo(portfolioValueUsd, 2);
      
      console.log(`Portfolio: $${portfolioValueUsd} USD = ${solAmount.toFixed(6)} SOL`);
    });

    test('should work with DeFi transaction amounts', async () => {
      const solPrice = await getSolPrice();
      
      // Test common DeFi amounts
      const testAmounts = [1, 10, 50, 100, 500, 1000];
      
      testAmounts.forEach(usdAmount => {
        const solAmount = convertUsdToSol(usdAmount, solPrice);
        
        expect(solAmount).toBeGreaterThan(0);
        expect(solAmount * solPrice).toBeCloseTo(usdAmount, 2);
        
        // SOL amounts should be reasonable (not too tiny or huge)
        expect(solAmount).toBeGreaterThan(0.001); // At least 0.001 SOL
        expect(solAmount).toBeLessThan(100000); // Less than 100k SOL
      });
    });
  });
}); 