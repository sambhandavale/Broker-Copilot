import { z } from "zod";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiError } from "@/lib/utils/apiHandler";
import dbConnect from "@/lib/db/dbConfig";
import User from "@/lib/models/User";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 3600, updateAge: 1800 },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new ApiError("Email and password are required", 400);

        const normalizedEmail = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        const result = loginSchema.safeParse({ email: normalizedEmail, password });
        if (!result.success)
          throw new ApiError(
            "Invalid input: " + result.error.issues.map((e) => e.message).join(", "),
            400
          );

        await dbConnect();

        const user = await User.findOne({ email: normalizedEmail }).select("+password +salt");
        if (!user) throw new ApiError("Invalid email or password", 401);
        if (!user.isActive) throw new ApiError("Account deactivated", 403);

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new ApiError("Invalid email or password", 401);

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
