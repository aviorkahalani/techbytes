interface PostListSkeletonProps {
  amount?: number
}

export default function PostListSkeleton({
  amount = 4,
}: PostListSkeletonProps) {
  let skeletons = []

  for (let i = 0; i < amount; i++) {
    skeletons.push(
      <article
        key={i}
        className="flex flex-col gap-2.5 rounded bg-white p-5 shadow"
      >
        <div className="h-3 w-20 animate-pulse bg-slate-100"></div>
        <div className="h-7 w-full animate-pulse bg-slate-100"></div>
        <div className="space-y-1">
          <div className="h-4 w-72 animate-pulse bg-slate-100"></div>
          <div className="h-4 w-80 animate-pulse bg-slate-100"></div>
          <div className="h-4 w-64 animate-pulse bg-slate-100"></div>
        </div>
        <div className="h-5 w-32 animate-pulse bg-slate-100"></div>
      </article>,
    )
  }

  return skeletons
}
