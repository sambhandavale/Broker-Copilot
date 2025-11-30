import { NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import dbConnect from "@/lib/db/dbConfig";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// Custom API error class
export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Type for the context passed to the inner handler
type HandlerContext = {
  req: Request;
  session: Session | null;
  params?: any; // For dynamic routes like [id]
};

export type AppRouteHandler<T = any> = (context: HandlerContext) => Promise<T>;

export const handleRoute = (handler: AppRouteHandler) => {
  return async (req: Request, { params }: { params?: any } = {}) => {
    try {
      await dbConnect();

      const session = await getServerSession(authOptions);

      const data = await handler({ req, session, params });

      return NextResponse.json(data, { status: 200 });

    } catch (error: any) {
      console.error("API Error:", error);

      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message },
          { status: error.statusCode }
        );
      }

      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val: any) => val.message);
        return NextResponse.json(
          { message: "Validation Error", details: messages },
          { status: 400 }
        );
      }

      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return NextResponse.json(
          { message: `Duplicate value entered for ${field}` },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};