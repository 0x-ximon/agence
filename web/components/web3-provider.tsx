"use client";

import { AlgorandWalletConnectors } from "@dynamic-labs/algorand";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { WagmiProvider } from "wagmi";
import { web3Config } from "@/lib/config";
import { env } from "@/lib/env";

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: env.NEXT_PUBLIC_DYNAMIC_ENV_ID,
        walletConnectors: [
          AlgorandWalletConnectors,
          BitcoinWalletConnectors,
          EthereumWalletConnectors,
          SolanaWalletConnectors,
        ],
      }}
    >
      <WagmiProvider config={web3Config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
