import User from "@/lib/models/User";
import { ApiError, handleRoute } from "@/lib/utils/apiHandler";

export const GET = handleRoute(async ({ req, session }) => {
  if (!session || !session.user?.email) {
    throw new ApiError("Not authenticated", 401);
  }

  const user = await User.findOne({ email: session.user.email }).select("-password -salt");
  
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return { user };
});