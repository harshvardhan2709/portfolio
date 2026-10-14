/** Static visual used when WebGL is unavailable, the scene errors, or while the scene chunk loads. */
export default function SculptureFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-20 xl:pr-32 pointer-events-none" aria-hidden="true">
      <div className="relative w-[min(70vw,420px)] aspect-square">
        <div className="absolute inset-0 rounded-full border border-accent/20" />
        <div className="absolute inset-[14%] rounded-full border border-accent/30" />
        <div className="absolute inset-[30%] rounded-full bg-accent/10 blur-2xl" />
        <div className="absolute inset-[38%] rounded-full border border-accent-mint/40 bg-accent/5" />
        <div className="absolute left-[8%] top-[16%] h-2 w-2 rounded-full bg-accent-mint shadow-glow" />
        <div className="absolute right-[12%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-accent-light shadow-glow-sm" />
      </div>
    </div>
  );
}
