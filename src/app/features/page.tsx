import { Features } from "@/components/sections/Features";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Powerful Features for Crypto Tax Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to calculate, manage, and report your cryptocurrency taxes in Germany.
          </p>
        </div>

        <Features />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Exchange Integration</CardTitle>
              <CardDescription>
                Connect with major exchanges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Binance</li>
                <li>• Coinbase</li>
                <li>• Kraken</li>
                <li>• Bitpanda</li>
                <li>• And more...</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Methods</CardTitle>
              <CardDescription>
                Multiple calculation methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• FIFO (First In, First Out)</li>
                <li>• LIFO (Last In, First Out)</li>
                <li>• Average Cost Method</li>
                <li>• German Tax Compliant</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>
                Multiple export formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• PDF Reports</li>
                <li>• CSV Export</li>
                <li>• JSON Data</li>
                <li>• Finanzamt Ready</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
