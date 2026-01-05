import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { env } from "@/env";
import { getUserSession } from "@/server/better-auth/helper";
import { db } from "@/server/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	rateLimit: {
		enabled: env.NODE_ENV !== "development",
		customRules: {
			"/get-session": false,
			"/sign-in/email": {
				window: 60,
				max: 5,
			},
			"/sign-up/email": {
				window: 60,
				max: 5,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		minPasswordLength: 4,
	},
	plugins: [
		nextCookies(),
		customSession(async ({ user, session }) => {
			const { role, profile } = await getUserSession(user.id);

			return {
				role,
				profile,
				user: {
					...user,
				},
				session,
			};
		}),
	],
});

export type Session = typeof auth.$Infer.Session;
