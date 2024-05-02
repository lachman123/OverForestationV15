"use client";

import { useState } from "react";
import { describeImagePrompt } from "@/ai/prompts";
import ImageGallery from "@/components/ImageGallery";
import { getGroqCompletion } from "@/ai/groq";
import { generateImageFal, generateVoice } from "@/ai/fal";
import { getGeminiCompletion } from "@/ai/gemini";
import GenerativeTagCloud from "@/components/TagCloud";
import { saveArtwork } from "@/supabase/supabase";

type Artwork = {
  description: string;
  imageUrl: string;
  critique: string;
  score: string;
};

//An example of making an art critic game

export default function ArtcriticPage() {
  const [keywords, setKeywords] = useState<string>("Selected Keywords...");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [message, setMessage] = useState<string>("Create Artwork");
  const [critiqueAudio, setCritiqueAudio] = useState<string>("");

  async function handleCreate() {
    setMessage("Generating artwork...");
    //generate the image description
    const description = await getGroqCompletion(
      `Describe an artpiece that includes: ${keywords}`,
      64,
      describeImagePrompt
    );

    //create the image
    const imageUrl = await generateImageFal(description, "landscape_16_9");

    setMessage("Generating critique...");
    //generate a critique
    const critique = await getGroqCompletion(
      `The player made an artpiece described as follows: ${description}`,
      64,
      "Critique the merit of the artwork"
    );

    setMessage("Scoring artwork...");

    const score = await getGeminiCompletion(
      "How much is this artwork valued at in dollars? Do not output a range, output a single figure.",
      imageUrl
    );

    const valueNumber = await getGroqCompletion(
      `The description of the value is ${score}, return the numerical value of the artwork.`,
      8,
      "Return the numerical value of the artwork with no other text or explanation. Do not output a range. Output a best guess single number. Do not output dollar signs. The response must cast to a number format. "
    );

    //lets save this into our database!
    saveArtwork(Number(valueNumber), imageUrl, description, keywords);

    //update the artwork object and add to our state to display it
    const newArtwork = {
      description,
      imageUrl,
      critique,
      score,
    };
    setArtworks([...artworks, newArtwork]);
    setSelectedArtwork(newArtwork);
    setMessage("Create Artwork");

    //read the critique - do this asynchronously as it takes forever
    generateVoice(score).then((audio) => setCritiqueAudio(audio));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col">
          <GenerativeTagCloud
            prompt="A description of an artpiece"
            totalTags={60}
            handleSelect={(tags) => setKeywords(tags.join(", "))}
          />
          <button className="p-4" onClick={handleCreate}>
            {message}
          </button>
          {selectedArtwork && (
            <div className="flex flex-col pb-4">
              <span>{selectedArtwork.description}</span>
              <span>Score: {selectedArtwork.score}</span>
              {critiqueAudio !== "" && (
                <audio
                  className="w-full my-4"
                  src={critiqueAudio}
                  controls
                  autoPlay
                />
              )}
              <img src={selectedArtwork.imageUrl} />
            </div>
          )}

          <ImageGallery
            images={artworks.map((a) => a.imageUrl)}
            handleClickImage={(id) => setSelectedArtwork(artworks[id])}
          />
        </div>
      </div>
    </main>
  );
}
