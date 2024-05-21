"use client";

import { useEffect, useState } from "react";

import TextToSpeech, { AuraModel } from "./TextToSpeech";

const models = [
  "aura-asteria-en",
  "aura-luna-en",
  "aura-stella-en",
  "aura-athena-en",
  "aura-hera-en",
  "aura-orion-en",
  "aura-arcas-en",
  "aura-perseus-en",
  "aura-angus-en",
  "aura-orpheus-en",
  "aura-helios-en",
  "aura-zeus-en",
];

//This could take a string rather than array and could split in useEffect. Would solve the issue with the re-render and remove the first-line hack
export default function Caption({
  text,
  speed = 3000,
  speech = false,
  onComplete,
}: {
  text: string[];
  speed: number;
  speech: boolean;
  onComplete?: (lastText: string, nextText: string) => void;
}) {
  const [firstLine, setFirstLine] = useState(text[0]);
  const [currentLine, setCurrentLine] = useState(0);
  const [voices, setVoices] = useState<any>({ Narrator: "aura-helios-en" });
  const [currentVoice, setCurrentVoice] = useState<AuraModel | null>();

  useEffect(() => {
    //reset when we get new text
    if (text[0] !== firstLine) {
      setFirstLine(text[0]);
      setCurrentLine(0);
      updateSpeaker(text[0]);
    }

    //change the line every n seconds if we aren't reading it out aloud
    if (!speech) {
      const interval = setInterval(() => {
        setCurrentLine((currentLine) => {
          if (currentLine === text.length - 1) {
            return currentLine;
          }
          return currentLine + 1;
        });
      }, speed);
      return () => clearInterval(interval);
    }
  }, [text, speed, speech]);

  //read the next bit of text when we finish this one
  const handleEndSpeech = async () => {
    //wait for 1 seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (onComplete && currentLine < text.length - 1)
      onComplete(text[currentLine], text[currentLine + 1]);

    const nextLine =
      currentLine === text.length - 1 ? currentLine : currentLine + 1;
    setCurrentLine(nextLine);

    updateSpeaker(text[nextLine]);
  };

  const updateSpeaker = (text: string) => {
    //get the new model
    const speaker = text.split(":")[0];
    console.log("Speaker", speaker, voices[speaker]);
    //check if it already has a voice
    if (voices[speaker]) {
      setCurrentVoice(voices[speaker]);
    } else {
      //get a random model
      const randomModel = models[
        Math.floor(Math.random() * models.length)
      ] as AuraModel;
      setCurrentVoice(randomModel);
      setVoices({ ...voices, [speaker]: randomModel });
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-screen h-auto flex flex-col items-center justify-end pb-4">
      <p className="text-sm bg-black/50 p-2 rounded-lg max-w-lg text-white font-semibold">
        {text[currentLine]}
      </p>
      {speech && text[currentLine] && (
        <TextToSpeech
          text={text[currentLine].split(":")[1]}
          showControls={false}
          autoPlay
          handleEnded={handleEndSpeech}
          model={currentVoice ?? "aura-helios-en"}
        />
      )}
    </div>
  );
}
