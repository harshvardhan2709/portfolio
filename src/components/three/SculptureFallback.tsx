/** Static visual used on mobile devices, when WebGL is unavailable, or while the 3D scene loads. */
export default function SculptureFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-20 xl:pr-32 pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative w-[min(76vw,380px)] aspect-square opacity-80 sm:opacity-90">
        {/* Soft background ambient emerald glow */}
        <div className="absolute inset-[15%] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-[25%] rounded-full bg-accent-mint/10 blur-xl" />

        {/* Outer orbital ring */}
        <div className="absolute inset-0 rounded-full border border-accent/20" />

        {/* Angled decorative ring */}
        <div className="absolute inset-[10%] rounded-full border border-border/80 rotate-12" />

        {/* Intermediate accented ring */}
        <div className="absolute inset-[20%] rounded-full border border-accent-mint/30" />

        {/* Inner core ring */}
        <div className="absolute inset-[32%] rounded-full border border-accent-mint/45 bg-accent/10 backdrop-blur-[2px]" />

        {/* Center node */}
        <div className="absolute inset-[44%] rounded-full border border-accent-mint/60 bg-accent-mint/20" />

        {/* Orbital static accent points */}
        <div className="absolute left-[12%] top-[18%] h-2.5 w-2.5 rounded-full bg-accent-mint shadow-glow" />
        <div className="absolute right-[14%] bottom-[22%] h-2 w-2 rounded-full bg-accent-light shadow-glow-sm" />
        <div className="absolute right-[28%] top-[12%] h-1.5 w-1.5 rounded-full bg-text-muted/60" />
      </div>
    </div>
  );
}
