import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Lato } from "@next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const hyperSpaceChain: Chain = {
  id: 3141,
  name: "Filecoin — HyperSpace testnet",
  network: "Filecoin — HyperSpace testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test Filecoin",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: {
      http: ["https://api.hyperspace.node.glif.io/rpc/v1"],
    },
    chainstack: {
      http: ["https://filecoin-hyperspace.chainstacklabs.com/rpc/v1"],
    },
  },
  blockExplorers: {
    default: {
      name: "Filfox Explorer",
      url: "https://hyperspace.filfox.info/en",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [hyperSpaceChain],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <main className={lato.className}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={midnightTheme({
            accentColor: "#262A53",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "rounded",
          })}
        >
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </RainbowKitProvider>
      </main>
    </WagmiConfig>
  );
}
