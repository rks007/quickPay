
import Link from "next/link"

export function CoverPage() {
  return (
    <section className="flex h-screen items-center justify-center bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto max-w-4xl space-y-6 px-4 text-center text-primary-foreground">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Effortless Payments, Seamless Experience</h1>
        <p className="text-xl text-primary-foreground/80 sm:text-2xl">
          Revolutionize the way you handle payments. Our intuitive app streamlines transactions, empowering your
          business to thrive.
        </p>
        <Link
          href="/signup"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}
