/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Zl16n2Hjg59
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <WalletIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">UPI Wallet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            About
          </Link>
          <Button variant="outline" className="px-4 py-2 text-sm">
            Get the App
          </Button>
        </nav>
        <Button variant="ghost" className="md:hidden">
          <MenuIcon className="w-6 h-6" />
        </Button>
      </header>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 py-12 md:py-20 bg-primary">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground">Seamless Digital Payments</h1>
          <p className="text-lg text-primary-foreground">
            Experience the future of financial services with our secure and user-friendly UPI wallet app.
          </p>
          <Button variant="default" className="px-6 py-3 text-sm">
            Download the App
          </Button>
        </div>
        <div className="mb-8 md:mb-0">
          <img
            src="/placeholder.svg"
            width={500}
            height={400}
            alt="Hero Illustration"
            className="max-w-full"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
        </div>
      </section>
    </div>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}