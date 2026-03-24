import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="surface max-w-xl px-8 py-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">404</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-4 text-base text-muted-foreground">
          The requested page could not be found.
        </p>
        <Link
          href="/en"
          className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
        >
          Go to home
        </Link>
      </div>
    </main>
  );
}
