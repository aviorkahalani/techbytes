export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {/* METADATA */}
      <div className="flex items-center gap-2">
        <span className="h-4 w-20 animate-pulse bg-neutral-200"></span> ·{' '}
        <span className="h-4 w-20 animate-pulse bg-neutral-200"></span> ·{' '}
        <span className="h-4 w-20 animate-pulse bg-neutral-200"></span>
      </div>
      {/* TITLE */}
      <div className="h-8 w-full animate-pulse bg-neutral-200"></div>
      {/* IMAGE */}
      <div className="h-80 w-full animate-pulse bg-neutral-200"></div>
      {/* CONTENT */}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
        </div>
        <div className="space-y-1">
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
        </div>
        <div className="space-y-1">
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
        </div>
      </div>
    </div>
  )
}
