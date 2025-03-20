import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-4xl font-bold">FundingNext</div>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">
            Connect with Innovative Startups and Smart Investors
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our platform to discover promising startups, connect with investors,
            and be part of the next big thing in technology and innovation.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/auth/register">Start Investing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/startups">Browse Startups</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}