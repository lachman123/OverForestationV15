import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-wrap gap-4">
        <Link href="/agents">Play Simulation</Link>
        
        <Link href="/experts">Experts Demo </Link>
        <Link href="/debate">Debate Simulator</Link>
        <Link href="/panorama">Panorama Viewer</Link>
        <Link href="/drawing">Sketch to Image</Link>
        <Link href="/graph">Graph Concepts</Link>
      </div>
    </main>
  );
}
