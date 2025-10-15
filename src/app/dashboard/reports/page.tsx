import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GenerateReportDialog } from "@/components/dashboard/GenerateReportDialog";
import { Plus, Eye, Download, Trash2 } from "lucide-react";
import { getReports } from "@/app/actions/reports";
import { ReportStatus } from "@/types/report";
import { format } from "date-fns";

export default async function ReportsPage() {
  const result = await getReports();
  const reports = result.success ? result.data || [] : [];

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.COMPLETED:
        return <Badge variant="default">Final</Badge>;
      case ReportStatus.PROCESSING:
        return <Badge variant="secondary">Processing</Badge>;
      case ReportStatus.DRAFT:
        return <Badge variant="outline">Draft</Badge>;
      case ReportStatus.FAILED:
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "—";
    return `€${amount.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tax Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage your cryptocurrency tax reports
          </p>
        </div>
        <GenerateReportDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </GenerateReportDialog>
      </div>

      {/* Reports Table */}
      <div className="rounded-lg border">
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                <svg
                  className="mx-auto h-12 w-12 text-muted-foreground/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No tax reports yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Generate your first tax report to get started with your crypto tax calculations.
              </p>
              <GenerateReportDialog>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Your First Report
                </Button>
              </GenerateReportDialog>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Gain/Loss</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => {
                const netGainLoss = (report.total_gains || 0) - (report.total_losses || 0);
                
                return (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.year}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(report.status)}
                    </TableCell>
                    <TableCell>
                      <div className="font-mono">
                        {netGainLoss > 0 ? (
                          <span className="text-green-600">
                            +{formatCurrency(netGainLoss)}
                          </span>
                        ) : netGainLoss < 0 ? (
                          <span className="text-red-600">
                            {formatCurrency(netGainLoss)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            {formatCurrency(netGainLoss)}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Gains: {formatCurrency(report.total_gains)} | 
                        Losses: {formatCurrency(report.total_losses)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(report.created_at), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          disabled={report.status !== ReportStatus.COMPLETED}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Additional Info */}
      {reports.length > 0 && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <h3 className="text-sm font-medium mb-2">Report Information</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Reports are calculated using FIFO (First In, First Out) method</li>
            <li>• Only completed reports can be downloaded</li>
            <li>• Draft reports can be edited before finalizing</li>
            <li>• Failed reports can be regenerated</li>
          </ul>
        </div>
      )}
    </div>
  );
}
