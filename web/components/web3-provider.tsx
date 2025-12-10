"use client";

import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { StandardConnect } from "@wallet-standard/core";
import {
  type UiWallet,
  type UiWalletAccount,
  useWallets,
} from "@wallet-standard/react";
import React from "react";
import { env } from "@/lib/env";

type SolanaConnection = {
  rpc: ReturnType<typeof createSolanaRpc>;
  ws: ReturnType<typeof createSolanaRpcSubscriptions>;
  chain: typeof env.NEXT_PUBLIC_SOLANA_CHAIN;

  wallets: UiWallet[];
  selectedWallet: UiWallet | null;
  selectedAccount: UiWalletAccount | null;
  isConnected: boolean;

  setWalletAndAccount: (
    wallet: UiWallet | null,
    account: UiWalletAccount | null,
  ) => void;
};

type Web3ContextType = {
  base?: object;
  solana: SolanaConnection;
};

export const Web3Context = React.createContext<Web3ContextType | null>(null);

export function useWeb3() {
  const context = React.useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }

  return context;
}

const solanaChain = env.NEXT_PUBLIC_SOLANA_CHAIN;
const solanaRPC = createSolanaRpc(env.NEXT_PUBLIC_SOLANA_RPC_URL);
const solanaWS = createSolanaRpcSubscriptions(env.NEXT_PUBLIC_SOLANA_WS_URL);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const allWallets = useWallets();
  console.debug("Available wallets:", allWallets);

  const [selectedWallet, setSelectedWallet] = React.useState<UiWallet | null>(
    null,
  );
  const [selectedAccount, setSelectedAccount] =
    React.useState<UiWalletAccount | null>(null);

  const wallets = React.useMemo(() => {
    return allWallets.filter(
      (wallet) =>
        wallet.chains?.some((c) => c.startsWith("solana:")) &&
        wallet.features.includes(StandardConnect) &&
        wallet.features.includes("solana:signAndSendTransaction"),
    );
  }, [allWallets]);

  const isConnected = React.useMemo(() => {
    if (!selectedAccount || !selectedWallet) return false;

    const currentWallet = wallets.find((w) => w.name === selectedWallet.name);
    return !!currentWallet?.accounts.some(
      (acc) => acc.address === selectedAccount.address,
    );
  }, [selectedAccount, selectedWallet, wallets]);

  const setWalletAndAccount = React.useCallback(
    (wallet: UiWallet | null, account: UiWalletAccount | null) => {
      setSelectedWallet(wallet);
      setSelectedAccount(account);
    },
    [],
  );

  const solana = React.useMemo<SolanaConnection>(
    () => ({
      ws: solanaWS,
      rpc: solanaRPC,
      chain: solanaChain,

      wallets,
      selectedWallet,
      selectedAccount,
      isConnected,
      setWalletAndAccount,
    }),

    [
      wallets,
      selectedWallet,
      selectedAccount,
      isConnected,
      setWalletAndAccount,
    ],
  );

  return (
    <Web3Context.Provider
      value={{
        solana,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
