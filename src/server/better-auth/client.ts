import { createAuthClient } from "better-auth/react";

export const auth = createAuthClient();

export type Session = typeof auth.$Infer.Session;
