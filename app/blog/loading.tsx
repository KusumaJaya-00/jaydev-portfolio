export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      {/* PageHeader */}
      <div className="pt-6 md:pt-8 pb-10 md:pb-14 text-center animate-pulse">
        <div className="h-3 w-36 mx-auto bg-muted notch-sm mb-4" />
        <div className="h-10 md:h-[48px] w-44 md:w-56 mx-auto bg-muted" />
        <div className="h-5 w-64 md:w-80 max-w-full mx-auto bg-muted mt-4" />
      </div>
      {/* BlogGrid — same grid + Card anatomy as PostCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="notch bg-card border border-border overflow-hidden animate-pulse">
            <div className="h-48 -mt-4 bg-muted" />
            <div className="p-6 space-y-3">
              <div className="h-6 w-5/6 bg-muted" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-muted badge-notch" />
                <div className="h-5 w-20 bg-muted badge-notch" />
              </div>
            </div>
            <div className="px-6 pb-6 space-y-2">
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-full bg-muted" />
              <div className="h-4 w-2/3 bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
