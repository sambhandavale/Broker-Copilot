"use client";

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ExternalLink, 
  Mail, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  BrainCircuit
} from 'lucide-react';
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAction, postAction } from '@/lib/utils/apiRequests';
import { redirect, useRouter } from 'next/navigation';
import { ActionPlanLoader } from './components/RenewalBriefAnimation';

// --- Interfaces ---
interface KeyReference { source_id: string; snippet: string; url: string; }
interface RenewalAnalysis {
    score: number; rank: number; status: 'Critical' | 'High' | 'Medium' | 'Low';
    reasoning: string; risk_factors: string[]; positive_factors: string[];
    talking_points: string[]; upsell_opportunity?: string;
    recommendedAction: string; keyReferences: KeyReference[]; analyzedAt: string;
}
interface RenewalItem {
    _id: string; 
    brokerId: string; 
    clientId: string; 
    clientName: string;
    email: string; 
    company: string; 
    totalPremium: number; 
    aiAnalysis: RenewalAnalysis;
    hasDetail:boolean;
}
interface DashboardStats { total: number; critical: number; high: number; premiumAtRisk: number; }

const processingSteps = [
    "Analyzing Risk Profile...",      // Phase: analyze
    "Generating Renewal Brief...",    // Phase: brief
    "Drafting Outreach Email...",     // Phase: email
    "Checking Calendar Availability...", // Phase: calendar
    "Finalizing Action Package",       // Phase: complete
    "Generating Renewal Brief...",
];

const Dashboard = () => {
    const router = useRouter();
    const [data, setData] = useState<RenewalItem[]>([]);
    const [stats, setStats] = useState<DashboardStats>({ total: 0, critical: 0, high: 0, premiumAtRisk: 0 });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // --- New State for Overlay ---
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    
    // Track expanded rows by ID
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const json = await getAction('/api/dashboard/renewals');

                if (json.success) {
                    setData(json.data);
                    setStats(json.stats);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const requestBrief = async (renewalId: string) => {
        // 1. Start Loading State
        setIsAnalyzing(true);
        setAnalysisStep(0);

        // 2. Cycle through steps but PAUSE before the end
        // We stop at (length - 2) which is "Checking Calendar Availability"
        // We do NOT show "Finalizing Action Package" (Complete Phase) until API returns.
        const stepInterval = setInterval(() => {
            setAnalysisStep((prev) => {
                if (prev >= processingSteps.length - 2) {
                    return prev; // Pause here
                }
                return prev + 1;
            });
        }, 2500);

        try {
            const res = await postAction('/api/pipeline/generate-brief', { renewalId });
            
            if (res.success && res.redirectUrl) {
                // 3. API Success: Jump to "Finalizing" (Complete Phase)
                clearInterval(stepInterval);
                setAnalysisStep(processingSteps.length - 1);

                // 4. Short delay to let the user see the "Success" animation
                setTimeout(() => {
                    router.push(res.redirectUrl);
                    // Optional: Keep loader visible until navigation completes
                    // setIsAnalyzing(false); 
                }, 1000);
            } else {
                // Handle logical failure
                clearInterval(stepInterval);
                setIsAnalyzing(false);
                console.error("API returned failure");
            }
        } catch (error) {
            console.error("Failed to fetch brief data:", error);
            clearInterval(stepInterval);
            setIsAnalyzing(false);
        }
    };

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) newExpanded.delete(id);
        else newExpanded.add(id);
        setExpandedRows(newExpanded);
    };

    const filteredData = data.filter((item) => {
        const matchesSearch = item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.company?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.aiAnalysis.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'critical': return 'bg-red-100 text-red-800 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-red-600 bg-red-50 border-red-100';
        if (score >= 50) return 'text-orange-600 bg-orange-50 border-orange-100';
        return 'text-green-600 bg-green-50 border-green-100';
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <Navbar />
            
            <main className="pt-8 pb-16">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                
                <div className="max-w-7xl mx-auto px-6"> 
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                            Priority Dashboard
                        </h1>
                        <p className="text-lg text-slate-600">
                            AI-driven renewal prioritization and risk analysis.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-slate-200 shadow-sm p-4">
                            <div className="text-xs font-bold uppercase text-slate-500">Total Premium</div>
                            <div className="text-xl font-black text-slate-900 mt-1">{loading ? "..." : `$${stats.premiumAtRisk.toLocaleString()}`}</div>
                        </Card>
                        <Card className="border-slate-200 shadow-sm p-4">
                            <div className="text-xs font-bold uppercase text-slate-500">Pipeline</div>
                            <div className="text-xl font-black text-slate-900 mt-1">{loading ? "..." : stats.total} Clients</div>
                        </Card>
                        <Card className="border-red-100 bg-red-50/30 shadow-sm p-4">
                            <div className="text-xs font-bold uppercase text-red-600">Critical</div>
                            <div className="text-xl font-black text-red-700 mt-1">{loading ? "..." : stats.critical}</div>
                        </Card>
                        <Card className="border-orange-100 bg-orange-50/30 shadow-sm p-4">
                            <div className="text-xs font-bold uppercase text-orange-600">High Priority</div>
                            <div className="text-xl font-black text-orange-700 mt-1">{loading ? "..." : stats.high}</div>
                        </Card>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-3 mb-6">
                        <Input 
                            placeholder="Search clients..." 
                            className="max-w-xs"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="All status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex-1" />
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white">Export Report</Button>
                    </div>
                    
                    <Card className="bg-white shadow-lg border border-slate-200 rounded-xl overflow-hidden">
                        {/* FIX 1: Added table-fixed and w-full */}
                        <Table className="table-fixed w-full">
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead className="font-bold text-slate-700 w-[200px]">Client</TableHead>
                                    <TableHead className="font-bold text-slate-700 w-[120px]">Status</TableHead>
                                    <TableHead className="font-bold text-slate-700 w-[120px] text-right">Premium</TableHead>
                                    <TableHead className="font-bold text-slate-700 w-[100px] text-center">Score</TableHead>
                                    {/* FIX 2: Let this column take remaining space */}
                                    <TableHead className="font-bold text-slate-700 w-auto">Recommended Action</TableHead>
                                    <TableHead className="w-[80px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center">
                                            <div className="flex items-center justify-center gap-2 text-slate-500">
                                                <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-slate-500">No results found.</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((item) => {
                                        const isExpanded = expandedRows.has(item._id);
                                        return (
                                            <React.Fragment key={item._id}>
                                                <TableRow 
                                                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                                                    onClick={() => toggleRow(item._id)}
                                                >
                                                    <TableCell className="py-4 pl-4">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="font-medium truncate">
                                                        <div className="text-slate-900 truncate">{item.clientName}</div>
                                                        <div className="text-xs text-slate-500 truncate">{item.company}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={`rounded-full px-2.5 font-normal shadow-none border ${getStatusColor(item.aiAnalysis.status)}`}>
                                                            {item.aiAnalysis.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono text-slate-700">
                                                        ${item.totalPremium.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border text-sm font-bold ${getScoreColor(item.aiAnalysis.score)}`}>
                                                            {item.aiAnalysis.score}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm text-slate-600 truncate" title={item.aiAnalysis.recommendedAction}>
                                                            {item.aiAnalysis.recommendedAction}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right pr-4" onClick={(e) => e.stopPropagation()}>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4 text-slate-500" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => window.location.href = `mailto:${item.email}`}>
                                                                    <Mail className="mr-2 h-4 w-4" /> Email Client
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => window.open(item.aiAnalysis.keyReferences?.[0]?.url, '_blank')}>
                                                                    <ExternalLink className="mr-2 h-4 w-4" /> View Source
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>

                                                {isExpanded && (
                                                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                                        <TableCell colSpan={7} className="p-0 border-b border-slate-200">
                                                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-1 duration-200">
                                                                
                                                                <div className="space-y-4 min-w-0">
                                                                <div className="min-w-0">
                                                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">
                                                                        AI Executive Summary
                                                                    </h4>

                                                                    <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 break-words whitespace-normal">
                                                                        {item.aiAnalysis.reasoning}
                                                                    </p>
                                                                </div>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {item.aiAnalysis.risk_factors.map((risk, i) => (
                                                                    <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1 pl-1">
                                                                        <AlertTriangle className="h-3 w-3" /> {risk}
                                                                    </Badge>
                                                                    ))}
                                                                    {item.aiAnalysis.positive_factors.map((pos, i) => (
                                                                    <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 pl-1">
                                                                        <CheckCircle2 className="h-3 w-3" /> {pos}
                                                                    </Badge>
                                                                    ))}
                                                                </div>
                                                                </div>


                                                                <div className="space-y-4">
                                                                    {item.aiAnalysis.upsell_opportunity && (
                                                                    <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg border border-purple-100 min-w-0">
                                                                        <Sparkles className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />

                                                                        <div className="min-w-0">
                                                                            <div className="text-xs font-bold text-purple-700 uppercase">
                                                                                Upsell Opportunity
                                                                            </div>

                                                                            <div className="text-sm text-purple-900 mt-1 break-words whitespace-normal min-w-0">
                                                                                {item.aiAnalysis.upsell_opportunity}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    )}

                                                                    <div className="min-w-0">
                                                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-2">
                                                                        <MessageSquare className="h-3 w-3" /> Suggested Talking Points
                                                                    </h4>

                                                                    <ul className="space-y-2 min-w-0">
                                                                        {item.aiAnalysis.talking_points.map((point, i) => (
                                                                        <li key={i} className="text-sm text-slate-600 flex gap-2 min-w-0">
                                                                            <span className="text-blue-400 font-bold flex-shrink-0">•</span>

                                                                            {/* FIX: wrapping enabled with whitespace-normal + min-w-0 */}
                                                                            <span className="italic break-words whitespace-normal min-w-0">
                                                                                {`"${point}"`}
                                                                            </span>
                                                                        </li>
                                                                        ))}
                                                                    </ul>
                                                                    </div>

                                                                    
                                                                    <div className="pt-2 flex gap-2">
                                                                        <Button 
                                                                            size="sm" 
                                                                            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                                                            onClick={()=>item.hasDetail ? redirect(`/dashboard/renewals/${item._id}`) : requestBrief(item._id)}
                                                                        >
                                                                            {item.hasDetail ? 'View Brief' : 'Take Action'} 
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </main>
            <Footer />

            {/* --- AI PROCESSING OVERLAY --- */}
            {isAnalyzing && (
                <ActionPlanLoader
                    currentStep={analysisStep}
                    steps={processingSteps}
                />
            )}
        </div>
    );
}

export default Dashboard;