import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === 'google') {
				return profile?.email ?? false;
			}
			return false;
		},
	},
	session: {
		maxAge: 60 * 60 * 8,
	},
	jwt: { maxAge: 60 * 60 * 8 },
	secret: process.env.NEXT_AUTH_SECRET,
});
