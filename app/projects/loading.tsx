export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 animate-pulse">
      <div className="h-10 w-64 bg-muted rounded-lg mb-3" />
      <div className="h-5 w-96 max-w-full bg-muted rounded-lg mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="h-40 bg-muted" />
            <div className="p-6 space-y-3">
              <div className="h-5 w-3/4 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-2/3 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
