import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/dashboard/settings/ProfileTab";
import { TaxTab } from "@/components/dashboard/settings/TaxTab";
import { ExchangeTab } from "@/components/dashboard/settings/ExchangeTab";
import { WalletTab } from "@/components/dashboard/settings/WalletTab";
import { DataTab } from "@/components/dashboard/settings/DataTab";
import { getUser } from "@/app/actions/auth";

export default async function SettingsPage() {
  const userResult = await getUser();
  const user = userResult.success ? userResult.data : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings, tax preferences, and connections.
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="tax">Tax Settings</TabsTrigger>
          <TabsTrigger value="exchange">Exchange Connections</TabsTrigger>
          <TabsTrigger value="wallet">Wallet Connections</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <ProfileTab 
            profile={user ? {
              id: user.id,
              full_name: user.user_metadata?.full_name || "",
              email: user.email || "",
              avatar_url: user.user_metadata?.avatar_url,
            } : undefined}
          />
        </TabsContent>

        <TabsContent value="tax" className="mt-6">
          <TaxTab />
        </TabsContent>

        <TabsContent value="exchange" className="mt-6">
          <ExchangeTab />
        </TabsContent>

        <TabsContent value="wallet" className="mt-6">
          <WalletTab />
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <DataTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
