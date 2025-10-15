import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "€0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 100 transactions",
        "Basic tax calculations",
        "PDF export",
        "Email support",
        "FIFO method only"
      ],
      cta: "Get Started Free",
      href: "/signup",
      popular: false
    },
    {
      name: "Pro",
      price: "€29",
      period: "per year",
      description: "For serious crypto traders",
      features: [
        "Unlimited transactions",
        "All tax calculation methods",
        "Exchange integrations",
        "Wallet connections",
        "Priority support",
        "Advanced reporting",
        "Tax advisor sharing"
      ],
      cta: "Start Pro Trial",
      href: "/signup?plan=pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For businesses and institutions",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "API access",
        "White-label options",
        "Dedicated support",
        "Custom reporting",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false
    }
  ];

  return (
    <main className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your crypto trading needs. All plans include German tax compliance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <a href={plan.href}>{plan.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-left">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, all your data is encrypted and stored securely. We use industry-standard security practices.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Do you support all exchanges?</h3>
              <p className="text-sm text-muted-foreground">
                We support all major exchanges. If you don&apos;t see your exchange, contact us and we&apos;ll add it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
