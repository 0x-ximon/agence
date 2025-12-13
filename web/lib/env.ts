import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PRIVY_JWKS_URL: z.url(),
    PRIVY_SECRET_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_DYNAMIC_ENV_ID: z.string(),
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),

    NEXT_PUBLIC_PRIVY_APP_ID: z.string(),
    NEXT_PUBLIC_PRIVY_CLIENT_ID: z.string(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_DYNAMIC_ENV_ID: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    PRIVY_JWKS_URL: process.env.PRIVY_JWKS_URL,
    PRIVY_SECRET_KEY: process.env.PRIVY_SECRET_KEY,
    NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_PRIVY_CLIENT_ID: process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID,
  },
});
