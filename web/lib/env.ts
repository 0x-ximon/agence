import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),

    NEXT_PUBLIC_SOLANA_CHAIN: z.string(),
    NEXT_PUBLIC_SOLANA_RPC_URL: z.url(),
    NEXT_PUBLIC_SOLANA_WS_URL: z.string(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    NEXT_PUBLIC_SOLANA_CHAIN: process.env.NEXT_PUBLIC_SOLANA_CHAIN,
    NEXT_PUBLIC_SOLANA_WS_URL: process.env.NEXT_PUBLIC_SOLANA_WS_URL,
    NEXT_PUBLIC_SOLANA_RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
  },
});
