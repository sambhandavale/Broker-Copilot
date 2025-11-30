import User from "@/lib/models/User";
import { handleRoute } from "@/lib/utils/apiHandler";

export const GET = handleRoute(async () => {
  const users = await User.find({})
    .select("-password -salt")
    .sort({ createdAt: -1 });

  return { 
    count: users.length, 
    users 
  };
});