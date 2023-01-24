import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["400", "700"]
});
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <main className={lato.className}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={midnightTheme({
        accentColor: '#262A53',
        accentColorForeground: 'white',
        borderRadius: 'small',
        fontStack: 'rounded',
        
      })}>
      <Component {...pageProps} />
      </RainbowKitProvider>
        </main>
    </WagmiConfig>
  )
}
