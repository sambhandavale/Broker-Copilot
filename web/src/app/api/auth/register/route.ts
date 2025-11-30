import User from "@/lib/models/User";
import { ApiError, handleRoute } from "@/lib/utils/apiHandler";
import { z } from "zod";

// Validation Schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const POST = handleRoute(async ({ req }) => {
  const body = await req.json();

  const result = signupSchema.safeParse(body);
  if (!result.success) {
    throw new ApiError(
      "Validation Error: " + result.error.issues.map((e) => e.message).join(", "),
      400
    );
  }

  const { name, email, password } = result.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError("User with this email already exists", 409);
  }

  const newUser = await User.create({
    name,
    email,
    password, 
    role: "user",
  });

  return { 
    message: "User registered successfully", 
    userId: newUser._id 
  };
});