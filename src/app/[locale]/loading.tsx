export default function Loading() {
  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl animate-pulse space-y-4">
        <div className="h-8 w-2/3 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
        <div className="mt-8 h-48 w-full rounded-lg bg-muted" />
      </div>
    </main>
  );
}
