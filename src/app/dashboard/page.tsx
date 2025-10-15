import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/app/actions/auth";

export default async function DashboardPage() {
  const userResult = await getUser();
  const user = userResult.success ? userResult.data : null;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back{(user as any)?.email ? `, ${(user as any).email.split('@')[0]}` : ''}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your crypto tax status.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No transactions yet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxable Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€0.00</div>
            <p className="text-xs text-muted-foreground">
              No calculations yet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Report Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">
              No reports generated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium">Import Transactions</h3>
            <p className="text-sm text-muted-foreground">
              Upload CSV files from exchanges
            </p>
          </div>
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium">Generate Report</h3>
            <p className="text-sm text-muted-foreground">
              Create tax report for current year
            </p>
          </div>
          <div className="p-4 rounded-md bg-muted/50">
            <h3 className="font-medium">View Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure tax preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
