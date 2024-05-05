import SelectImageRegion from "@/components/SelectImageRegion";

//Demo of generating a map of coordinates that can be selected
export default function SelectRegionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col">
          <SelectImageRegion img="/sat.jpg" />
        </div>
      </div>
    </main>
  );
}
