import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./server/db"
import bcrypt from "bcryptjs";
import { getUser } from "./server/queries";
import { accounts, sessions, users, verificationTokens } from "./server/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                let user = null

                // logic to salt and hash password
                // const passwordHash = await hash(credentials.password as string, {
                //     memoryCost: 19456,
                //     timeCost: 2,
                //     outputLen: 32,
                //     parallelism: 1
                // })


                // logic to verify if the user exists
                user = await getUser(credentials.username as string)

                console.log({ user })

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    // throw new Error("User not found.")
                    return null
                }

                const validPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.password_hash
                );

                console.log({ validPassword })

                if (!validPassword) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    // throw new Error("Incorrect username or password.")
                    return null
                }

                // return user object with their profile data
                return user
            },
        })
    ],
})