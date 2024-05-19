"use client";
import { getPanorama } from "@/ai/blockade";
import { getOpenAICompletion } from "@/ai/openai";
import Panorama from "@/components/Panorama";
import { useState } from "react";

export default function App() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [img, setImg] = useState<string>("/old_depot_2k.hdr");
  const [prompt, setPrompt] = useState<string>("a beautiful underwater reef");
  const [selectedImg, setSelectedImage] = useState<string>("");
  const [description, setDescription] = useState<string>(
    "Hold shift and drag to screencap"
  );
  const handleCreate = async () => {
    setFetching(true);
    const pano = await getPanorama(prompt);
    if (pano) setImg(pano);
    setFetching(false);
  };

  const handleSelect = async (imgUrl: string) => {
    //Do whatever you want with the selected region of the image here
    //E.g. send to openAI and ask questions about it
    //or send to an image upscaler with FAL etc
    const description = await getOpenAICompletion(
      "briefly describe the image.",
      128,
      "",
      false,
      imgUrl
    );

    setDescription(description);
    setSelectedImage(imgUrl);
  };

  return (
    <>
      <main className="flex flex-col w-full h-screen min-h-screen">
        <div className="flex justify-between gap-4 m-2">
          <input
            className="w-full rounded"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></input>
          <button
            disabled={fetching}
            className="p-2 w-full rounded bg-white"
            onClick={handleCreate}
          >
            {fetching ? "Generating skybox..." : "Create"}
          </button>
          <div className="fixed bottom-0 left-0 p-4">
            <img src={selectedImg} />
          </div>
        </div>
        <div className="relative w-full h-full">
          <Panorama img={img} onSelect={handleSelect} />
          <div className="absolute top-0 left-0 p-4 flex flex-col max-w-lg">
            <p className="text-xs bg-white p-2">{description}</p>
            <img src={selectedImg} />
          </div>
        </div>
      </main>
    </>
  );
}
