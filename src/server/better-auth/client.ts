import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/server/better-auth/config";

export const authClient = createAuthClient({
	plugins: [customSessionClient<typeof auth>()],
});

export type Session = typeof auth.$Infer.Session;
