import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple Pricing
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 text-center">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="mt-2 text-sm text-muted-foreground">Up to 100 transactions</p>
            </div>
            <div className="rounded-lg border bg-white p-6 text-center">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="mt-2 text-sm text-muted-foreground">Unlimited transactions</p>
            </div>
            <div className="rounded-lg border bg-white p-6 text-center">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <p className="mt-2 text-sm text-muted-foreground">Custom solutions</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
