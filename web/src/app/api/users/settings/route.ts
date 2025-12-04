import User from "@/lib/models/User";
import { ApiError, handleRoute } from "@/lib/utils/apiHandler";
import { z } from "zod";

const updateSettingsSchema = z.object({
  renewalWindowDays: z.number().refine((val) => [30, 90, 180].includes(val), {
    message: "Renewal window must be 30, 90, or 180 days",
  }),
});

export const PATCH = handleRoute(async ({ req, session }) => {
  const userId = session?.user?.id; 

  if (!userId) {
    throw new ApiError("Unauthorized", 401);
  }

  const body = await req.json();
  const { renewalWindowDays } = updateSettingsSchema.parse(body);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        "settings.renewalWindowDays": renewalWindowDays,
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new ApiError("User not found", 404);
  }

  return {
    message: "Settings updated successfully",
    settings: updatedUser.settings,
  };
});