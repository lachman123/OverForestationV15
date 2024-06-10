"use client";
import Link from "next/link";

export default function RecordedVideoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="z-10 w-full text-center font-mono text-lg">
        <div className="flex justify-between w-full items-center mb-4">
          <Link href="/" legacyBehavior>
            <a className="text-black text-lg">Back</a>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4">Recorded Videos</h1>
        <p className="mb-4">
          Pre-recorded videos exploring simulation outcomes using the project engine
        </p>
        <div className="flex flex-col items-center w-full gap-4">
          <div className="w-full">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/J08HguINfRQ?si=y6qFdX_khqNK2zFZ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center">Overall Simulation - Covering Multiple Interests</p>
          </div>
          <div className="flex flex-wrap w-full justify-between">
            <div className="flex flex-col items-center w-1/2 p-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/SduaO7phrkA?si=BKevjAXsI3IxQ1MH"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center">Simulation 1 - Bribes and Government Greed</p>
            </div>
            <div className="flex flex-col items-center w-1/2 p-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/jOw_18owKu4?si=7aRveOFeBXMXLVfu"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center">Simulation 2 - Financial Considerations</p>
            </div>
            <div className="flex flex-col items-center w-1/2 p-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/VTxEBJ0_Dzo?si=TpoOekzX-UfoDiUn"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center">Simulation 3 - Deeper Indigenous Considerations</p>
            </div>
            <div className="flex flex-col items-center w-1/2 p-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/uc_SxU6vDGE?si=jBHg7O2-7-WaPCdK"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center">Simulation 4 - Water Scarcity and Property Concerns</p>
            </div>
            <div className="flex flex-col items-center w-1/2 p-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/bdUrRHspVao?si=XqjUYm2YMPK5XQdz"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center">Simulation 5 - Sabotage</p>
            </div>
            <div className="flex flex-col items-center w-1/2 p-2">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/3PBKKYv_fwU?si=TAYyOYidxpVA_Ms5"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center">Simulation 6 - Community Concerns</p>
            </div>
          </div>
          <div className="w-full">
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/XkVaLFyisZE?si=3YGnhobR5WOZ6hBh"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center">Project Engine - Over-Forestation Development Tool</p>
          </div>
        </div>
      </div>
    </main>
  );
}
