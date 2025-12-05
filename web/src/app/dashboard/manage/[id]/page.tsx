import path from "path";
import fs from "fs/promises";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Mail, Video, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface KeyReference {
  source_id: string;
  snippet: string;
  url: string;
}

interface DashboardItem {
  rank: number;
  client_name: string;
  total_premium: number;
  score: number;
  status: string;
  reasoning: string;
  key_references: KeyReference[];
  recommended_action: string;
}

async function getClientData(id: string): Promise<DashboardItem | null> {
  const jsonFilePath = path.join(process.cwd(), "data", "dashboard.json");
  const jsonData = await fs.readFile(jsonFilePath, "utf8");
  const data: DashboardItem[] = JSON.parse(jsonData);
  return data.find((item) => item.rank === parseInt(id)) || null;
}

const ManageClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const client = await getClientData(id);

  if (!client) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
        <Navbar />
        <main className="pt-24 pb-16 flex-1">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Client Not Found
            </h1>
            <Link href="/dashboard">
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "safe":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="pt-24 pb-16 flex-1">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header with Back Button */}
          <div className="mb-8">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="mb-4 border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                    {client.client_name}
                  </h1>
                  <Badge
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(
                      client.status
                    )}`}
                  >
                    {client.status}
                  </Badge>
                </div>
                <p className="text-lg text-slate-600">
                  Client ID: #{client.rank} • Priority Score: {client.score}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none text-base py-6">
              <Mail className="h-5 w-5 mr-2" />
              Send Email
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none text-base py-6">
              <Video className="h-5 w-5 mr-2" />
              Start Meeting
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageClient;
