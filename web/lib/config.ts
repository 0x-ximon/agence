import { createConfig, http } from "@wagmi/core";
import { mainnet } from "@wagmi/core/chains";

export const web3Config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});
