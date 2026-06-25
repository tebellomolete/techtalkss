import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">TechTalks</h1>
        <p className="text-lg text-muted-foreground">
          Browse and register for upcoming technical sessions.
        </p>
      </div>
      
      {/* Topic Filter Buttons Placeholder */}
      <div className="flex flex-wrap gap-3 mb-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Grid of 6 Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    </main>
  );
}