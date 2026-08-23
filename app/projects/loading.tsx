export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      {/* PageHeader */}
      <div className="pt-6 md:pt-8 pb-10 md:pb-14 text-center animate-pulse">
        <div className="h-3 w-44 mx-auto bg-muted notch-sm mb-4" />
        <div className="h-10 md:h-[48px] w-56 md:w-72 mx-auto bg-muted" />
        <div className="h-5 w-72 md:w-96 max-w-full mx-auto bg-muted mt-4" />
      </div>
      {/* ProjectsGrid — same grid + Card anatomy as ProjectCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="notch bg-card border border-border overflow-hidden animate-pulse">
            <div className="h-48 -mt-4 bg-muted" />
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="h-6 w-3/5 bg-muted" />
                <div className="h-5 w-14 shrink-0 bg-muted badge-notch" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted" />
                <div className="h-4 w-4/5 bg-muted" />
              </div>
              <div className="flex items-end justify-between gap-2">
                <div className="flex gap-2">
                  <div className="h-5 w-14 bg-muted badge-notch" />
                  <div className="h-5 w-16 bg-muted badge-notch" />
                  <div className="hidden sm:block h-5 w-14 bg-muted badge-notch" />
                </div>
                <div className="h-5 w-5 bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
