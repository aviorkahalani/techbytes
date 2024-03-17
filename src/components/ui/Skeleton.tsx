interface SkeletonProps {
  amount?: number
}

export default function Skeleton({ amount = 4 }: SkeletonProps) {
  const skeletons = []
  for (let i = 0; i < amount; i++) {
    skeletons.push(
      <div
        key={i}
        className="flex flex-col gap-5 overflow-hidden rounded border bg-white shadow-sm transition hover:shadow"
      >
        <div className="h-40 w-full animate-pulse bg-neutral-200"></div>
        <div className="space-y-2.5 p-5">
          <div className="h-4 w-28 animate-pulse bg-neutral-200"></div>
          <div className="h-6 w-full animate-pulse bg-neutral-200"></div>
          <div className="space-y-1">
            <div className="h-5 w-80 animate-pulse bg-neutral-200"></div>
            <div className="h-5 w-72 animate-pulse bg-neutral-200"></div>
          </div>
          <div className="h-4 w-28 animate-pulse bg-neutral-200"></div>
        </div>
      </div>,
    )
  }

  return skeletons
}
