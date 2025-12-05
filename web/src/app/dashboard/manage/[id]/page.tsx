import path from "path";
import fs from "fs/promises";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import EmailSection from "./EmailSection";
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

interface ClientDetailData {
  client_id: string;
  client_name: string;
  brief_generated_at: string;
  executive_summary: string;
  financial_snapshot: {
    total_annual_premium: number;
    primary_carrier: string;
    days_to_expiry: number;
    renewal_urgency: string;
  };
  key_signals: Array<{
    signal_type: string;
    description: string;
    source_system: string;
    source_reference: string;
    source_link: string;
    impact: string;
  }>;
  coverage_gap_analysis: {
    current_coverage: string[];
    identified_gaps: string[];
    upsell_talking_point: string;
  };
  action_plan: {
    suggested_actions: Array<{
      step: number;
      action: string;
      detail: string;
      tool_link: string;
    }>;
  };
}

async function getClientData(id: string): Promise<DashboardItem | null> {
  const jsonFilePath = path.join(process.cwd(), "data", "dashboard.json");
  const jsonData = await fs.readFile(jsonFilePath, "utf8");
  const data: DashboardItem[] = JSON.parse(jsonData);
  return data.find((item) => item.rank === parseInt(id)) || null;
}

async function getClientDetailData(): Promise<ClientDetailData> {
  const jsonFilePath = path.join(
    process.cwd(),
    "src/lib/utils/data/client-data.json" 
  );
  const jsonData = await fs.readFile(jsonFilePath, "utf8");
  return JSON.parse(jsonData);
}

const ManageClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const client = await getClientData(id);
  const clientDetail = await getClientDetailData();

  if (!client) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
        <Navbar />
        <main className="pt-24 pb-16 flex-1">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Client Not Found
            </h1>
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
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "positive":
        return "text-green-600 bg-green-100";
      case "negative":
        return "text-red-600 bg-red-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };
  return (
    <div className="h-screen bg-white text-slate-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="h-full max-w-[1600px] mx-auto px-6 pt-8 pb-6">
          {/* Header */}
          <div className="mb-6">
            <Link href="/dashboard" className="inline-block mb-4">
              <span className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
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
            <p className="text-slate-600">
              Client ID: {clientDetail.client_id} • Priority Score:{" "}
              {client.score}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Side - Client Information */}
            <div
              className="space-y-6 overflow-y-auto pr-2 pb-20"
              style={{ maxHeight: "calc(100vh - 180px)" }}
            >
              {/* Executive Summary */}
              <Card className="bg-white shadow-lg border border-slate-100 rounded-2xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 leading-relaxed">
                    {clientDetail.executive_summary}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg border border-slate-100 rounded-2xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Financial Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-semibold">
                        Total Annual Premium
                      </span>
                      <span className="text-2xl font-extrabold text-slate-900">
                        $
                        {clientDetail.financial_snapshot.total_annual_premium.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-semibold">
                        Primary Carrier
                      </span>
                      <span className="text-lg font-semibold text-slate-900">
                        {clientDetail.financial_snapshot.primary_carrier}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-semibold">
                        Days to Expiry
                      </span>
                      <span className="text-lg font-bold text-slate-900">
                        {clientDetail.financial_snapshot.days_to_expiry} days
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-semibold">
                        Renewal Urgency
                      </span>
                      <Badge className="text-sm font-semibold">
                        {clientDetail.financial_snapshot.renewal_urgency}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Signals */}
              <Card className="bg-white shadow-lg border border-slate-100 rounded-2xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Key Signals
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {clientDetail.key_signals.map((signal, index) => (
                      <div
                        key={index}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="text-xs font-semibold">
                              {signal.signal_type}
                            </Badge>
                            <Badge
                              className={`text-xs font-semibold ${getImpactColor(
                                signal.impact
                              )}`}
                            >
                              {signal.impact}
                            </Badge>
                          </div>
                          <a
                            href={signal.source_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0"
                          >
                            <span className="text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              {signal.source_reference}
                            </span>
                          </a>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">
                          {signal.description}
                        </p>
                        <p className="text-xs text-slate-500">
                          {signal.source_system}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Coverage Gap Analysis */}
              <Card className="bg-white shadow-lg border border-slate-100 rounded-2xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Coverage Gap Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      Current Coverage
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {clientDetail.coverage_gap_analysis.current_coverage.map(
                        (coverage, index) => (
                          <Badge
                            key={index}
                            className="bg-green-100 text-green-800"
                          >
                            {coverage}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      Identified Gaps
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {clientDetail.coverage_gap_analysis.identified_gaps.map(
                        (gap, index) => (
                          <Badge
                            key={index}
                            className="bg-red-100 text-red-800"
                          >
                            {gap}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      Upsell Talking Point
                    </h4>
                    <p className="text-sm text-slate-700 italic">
                      &ldquo;
                      {clientDetail.coverage_gap_analysis.upsell_talking_point}
                      &rdquo;
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Plan */}
              <Card className="bg-white shadow-lg border border-slate-100 rounded-2xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {clientDetail.action_plan.suggested_actions.map(
                      (action) => (
                        <div
                          key={action.step}
                          className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
                        >
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {action.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 mb-1">
                                {action.action}
                              </h4>
                              <p className="text-sm text-slate-700 mb-2">
                                {action.detail}
                              </p>
                              <a
                                href={action.tool_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Open Tool
                              </a>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Email Section */}
            <div
              className="overflow-y-auto pl-2 pb-4"
              style={{ maxHeight: "calc(100vh - 180px)" }}
            >
              <EmailSection clientName={client.client_name} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageClient;
