export async function getSolPrice(): Promise<number> {
  try {
    // Using Jupiter Price API v3 (lite version for public use)
    const response = await fetch('https://lite-api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112');
    
    if (!response.ok) {
      throw new Error(`Jupiter API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // v3 API returns direct object with token mint as key and usdPrice property
    const solData = data.So11111111111111111111111111111111111111112;
    
    if (!solData || typeof solData.usdPrice !== 'number') {
      throw new Error('Invalid response structure from Jupiter API');
    }
    
    return solData.usdPrice;
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    return 0;
  }
}

export function convertUsdToSol(usdAmount: number, solPrice: number): number {
  if (solPrice === 0) return 0;
  return usdAmount / solPrice;
}