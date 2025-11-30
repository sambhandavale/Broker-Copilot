import User from "@/lib/models/User";
import { ApiError, handleRoute } from "@/lib/utils/apiHandler";

export const GET = handleRoute(async ({ params }) => {
  const { id } = params;

  const user = await User.findById(id).select("-password -salt");
  
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return { user };
});

export const PATCH = handleRoute(async ({ req, params }) => {
  const { id } = params;
  const body = await req.json();

  const { password, role, ...updateData } = body; 

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true, 
    runValidators: true,
  }).select("-password -salt");

  if (!updatedUser) {
    throw new ApiError("User not found", 404);
  }

  return { message: "User updated successfully", user: updatedUser };
});

export const DELETE = handleRoute(async ({ params }) => {
  const { id } = params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new ApiError("User not found", 404);
  }

  return { message: "User deleted successfully" };
});