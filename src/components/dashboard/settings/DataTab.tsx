"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Download, 
  Upload, 
  Trash2, 
  AlertTriangle,
  FileText,
  Database
} from "lucide-react";

export interface DataTabProps {
  onExportData?: () => Promise<void>;
  onImportTransactions?: (file: File) => Promise<void>;
  onDeleteAllData?: () => Promise<void>;
}

export function DataTab({ onExportData, onImportTransactions, onDeleteAllData }: DataTabProps) {
  const [loading, setLoading] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExportData = async () => {
    try {
      setLoading("export");
      if (onExportData) {
        await onExportData();
        toast.success("Data exported successfully");
      } else {
        // Mock export for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = { transactions: [], reports: [], settings: {} };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cryptotax-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Data exported successfully");
      }
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setLoading(null);
    }
  };

  const handleImportTransactions = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading("import");
      if (onImportTransactions) {
        await onImportTransactions(file);
        toast.success("Transactions imported successfully");
      } else {
        // Mock import for demo
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success("Transactions imported successfully");
      }
    } catch (error) {
      toast.error("Failed to import transactions");
    } finally {
      setLoading(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAllData = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all your data? This action cannot be undone."
    );
    
    if (!confirmed) return;

    try {
      setLoading("delete");
      if (onDeleteAllData) {
        await onDeleteAllData();
        toast.success("All data deleted successfully");
      } else {
        // Mock deletion for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("All data deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete data");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
          </CardTitle>
          <CardDescription>
            Download all your data in JSON format for backup or migration purposes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleExportData} 
            disabled={loading === "export"}
            className="w-full"
          >
            {loading === "export" ? "Exporting..." : "Export All Data"}
          </Button>
        </CardContent>
      </Card>

      {/* Import Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Transactions
          </CardTitle>
          <CardDescription>
            Upload CSV or JSON files to import transaction history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            onChange={handleImportTransactions}
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={loading === "import"}
            variant="outline"
            className="w-full"
          >
            {loading === "import" ? "Importing..." : "Choose File"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Supported formats: CSV, JSON. Maximum file size: 10MB.
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This action will permanently delete all your transactions, reports, and settings. 
              This cannot be undone.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={handleDeleteAllData}
            disabled={loading === "delete"}
            variant="destructive"
            className="mt-4 w-full"
          >
            {loading === "delete" ? "Deleting..." : "Delete All Data"}
          </Button>
        </CardContent>
      </Card>

      {/* Data Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• All data is stored securely and encrypted</p>
          <p>• Regular backups are performed automatically</p>
          <p>• You can export your data at any time</p>
          <p>• Deleted data cannot be recovered</p>
        </CardContent>
      </Card>
    </div>
  );
}
