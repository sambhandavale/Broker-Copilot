import path from "path";
import fs from "fs/promises";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Mail, Settings } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

// Define the types for the dashboard data
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

async function getDashboardData(): Promise<DashboardItem[]> {
  const jsonFilePath = path.join(process.cwd(), "data", "dashboard.json");
  const jsonData = await fs.readFile(jsonFilePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}

const Dashboard = async () => {
  const data = await getDashboardData();
  const totalPremium = data.reduce((sum, d) => sum + (d.total_premium || 0), 0);
  const criticalCount = data.filter(
    (d) => d.status.toLowerCase() === "critical"
  ).length;
  const clientCount = data.length;

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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Client Priority Dashboard
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              Monitor and manage your highest priority clients based on
              AI-powered analysis and risk assessment.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="text-xs uppercase text-slate-500 font-semibold">
                Total Premium
              </div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">
                ${totalPremium.toLocaleString()}
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="text-xs uppercase text-slate-500 font-semibold">
                Clients
              </div>
              <div className="mt-2 text-2xl font-extrabold text-slate-900">
                {clientCount}
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="text-xs uppercase text-slate-500 font-semibold">
                Critical
              </div>
              <div className="mt-2 text-2xl font-extrabold text-red-600">
                {criticalCount}
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
            <div className="flex-1 flex items-center gap-3">
              <Input placeholder="Search clients..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="safe">Safe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Export CSV
              </Button>
            </div>
          </div>
          <Separator className="my-6" />

          <Card className="bg-white shadow-xl border border-slate-100 rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-2xl font-bold text-slate-900">
                Prioritized Client List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-slate-50">
                    <TableRow className="border-b-2 border-slate-200">
                      <TableHead className="font-semibold text-slate-700 py-4 w-[18%] min-w-[180px]">
                        Client
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 py-4 w-[10%] min-w-[110px]">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 py-4 w-[12%] min-w-[120px]">
                        Premium
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 py-4 w-[8%] min-w-[80px] text-center">
                        Score
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 py-4 w-[26%] min-w-[260px]">
                        Reasoning
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 py-4 w-[26%] min-w-[260px]">
                        Recommended Action
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 py-4 w-[10%] min-w-[150px] text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow
                        key={item.rank}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                        }`}
                      >
                        <TableCell className="py-6 px-4">
                          <div className="font-semibold text-slate-900">
                            {item.client_name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Rank #{item.rank}
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-4">
                          <Badge
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-700 py-6 px-4 font-semibold">
                          <div className="text-lg">
                            ${item.total_premium.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-700 py-6 px-4 text-center">
                          <div className="text-2xl font-bold text-slate-900">
                            {item.score}
                          </div>
                          <div className="text-xs text-slate-500">Priority</div>
                        </TableCell>
                        <TableCell className="py-6 px-4 max-w-[320px]">
                          <div className="break-words whitespace-normal">
                            {item.reasoning}
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-4 max-w-[320px]">
                          <div className="break-words whitespace-normal">
                            {item.recommended_action}
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-4">
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 w-full"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Reference
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300 w-full"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                            <a href={`/dashboard/manage/${item.rank}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 w-full"
                              >
                                <Settings className="h-3 w-3 mr-1" />
                                Manage
                              </Button>
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
