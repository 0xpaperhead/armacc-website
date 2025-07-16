import type { Metadata } from 'next'
import './globals.css'
import { WalletContextProvider } from '@/components/donation/wallet-context'
import { EVMWalletProvider } from '@/components/donation/evm-wallet-context'

export const metadata: Metadata = {
  title: 'Armenian Accelerationism | arm/acc',
  description: 'A decentralized movement accelerating Armenia\'s transformation into a global technology hub. Radically optimistic. Delusionally ambitious. Relentlessly building.',
  keywords: ['Armenian Accelerationism', 'arm/acc', 'Armenia', 'technology', 'startups', 'innovation', 'tech hub', 'acceleration'],
  authors: [{ name: 'Armenian Accelerationism Movement' }],
  creator: 'Armenian Accelerationism Movement',
  publisher: 'Armenian Accelerationism Movement',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://acceleratearmenia.com',
    title: 'Armenian Accelerationism | arm/acc',
    description: 'A decentralized movement accelerating Armenia\'s transformation into a global technology hub. Radically optimistic. Delusionally ambitious. Relentlessly building.',
    siteName: 'Armenian Accelerationism',
    images: [
      {
        url: '/armenian-flag.png',
        width: 1200,
        height: 630,
        alt: 'Armenian Accelerationism Movement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Armenian Accelerationism | arm/acc',
    description: 'A decentralized movement accelerating Armenia\'s transformation into a global technology hub. Radically optimistic. Delusionally ambitious. Relentlessly building.',
    images: ['/armenian-flag.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#60a5fa',
  colorScheme: 'dark',
  icons: {
    icon: '/armenian-flag.png',
    shortcut: '/armenian-flag.png',
    apple: '/armenian-flag.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          <EVMWalletProvider>
            {children}
          </EVMWalletProvider>
        </WalletContextProvider>
      </body>
    </html>
  )
}
