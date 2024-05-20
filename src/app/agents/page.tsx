"use client";
import { getGroqCompletion } from "@/ai/groq";
import Agents from "@/components/Agents";
import { useEffect, useState } from "react";
import Animation from "@/components/Animation";
import { describeImagePrompt } from "@/ai/prompts";
import TextToSpeech from "@/components/TextToSpeech";
import Caption from "@/components/Caption";
import { getGeminiVision } from "@/ai/gemini";
import { getOpenAICompletion } from "@/ai/openai";

//Anything you want in your scenario to track over time goes here
//This should really be things like current challenges, disasters, successes, design issues etc
const initResources = {
  land: "2000 acres",
  owner: "Oregon State",
  use: "Forestry",
  marketDemand: "",
  environmentalImpact: "",
  revenue: "",
};
const initAgents = [
  {
    name: "Oregon State Forestry Marketing Department",
    goal: "increase market demand for timber while maintaining environmental awareness",
    plan: "",
    currentTask: "",
    resourcesRequired: "",
  },
  {
    name: "Oregon State Forestry Exec",
    goal: "increase revenue and decrease environmental awareness",
    plan: "",
    currentTask: "",
    resourcesRequired: "",
  },
  {
    name: "Grassroots activist organization",
    goal: "reduce environmental impact and market demand for timber",
    plan: "",
    currentTask: "",
    resourcesRequired: "",
  },
];

//Demo of running multiple agents that all compete for resources
export default function AgentsPage() {
  const [resources, setResources] = useState<any>(initResources);
  const [agents, setAgents] = useState<string[]>(
    initAgents.map((a) => JSON.stringify(a))
  );
  const [worldDescription, setWorldDescription] = useState<string>(
    "A documentary about the impact of deforestation on the environment"
  );
  const [showUI, setShowUI] = useState<boolean>(true);
  const [narrativeLine, setNarrativeLine] = useState<string>(
    "A documentary about the impact of deforestation on the environment"
  );

  const handleResponse = async (newResources: any, newAgents: any[]) => {
    //update the resources based on the new agents
    const description = await getGeminiVision(
      `World State: ${newResources}. Agents: ${newAgents}`,
      undefined,
      `You are provided with a world state and an array of agents performing tasks to make changes to this world state. 
      Write a short script that narrates a documentary film that dramatizes these events and embellishes them where necessary to make them 
      engaging to the audience. Narrate the documenary as lines of dialogue by a narrator and other characters. Place each item of dialogue on a new line. 
      Each line should be in the format "Speaker: Dialogue". Do not include any other text or explanation.`
    );

    //split by new lines

    setWorldDescription(description);
    //update resources and agents
    setResources(newResources);
    setAgents(newAgents);
  };

  const handleReadText = (last: string, next: string) => {
    setNarrativeLine(next);
  };

  return (
    <main className="">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
        {worldDescription !== "" && (
          <>
            <Animation
              prompt={`${narrativeLine}`}
              systemPrompt={describeImagePrompt}
              width={1344}
              height={1024}
              animate={0}
              fullscreen={true}
              video={false}
            />
            <Caption
              text={worldDescription.split("\n")}
              speed={8000}
              speech={true}
              onComplete={handleReadText}
            />
          </>
        )}
        <div className="flex flex-col p-8 z-50">
          <button
            className="p-2 border rounded-lg bg-white/25 mb-2"
            onClick={() => setShowUI(!showUI)}
          >
            {showUI ? "Hide UI" : "Show UI"}
          </button>
          <div
            className={`${
              showUI ? "flex" : "hidden"
            }  flex-col w-full bg-white p-4 rounded-lg`}
          >
            <div>
              {Object.keys(resources).map((key) => (
                <div className="flex justify-between" key={key}>
                  <span className="font-semibold">{key}: </span>
                  <span>{resources[key]}</span>
                </div>
              ))}
            </div>
            <div>{worldDescription}</div>

            <Agents
              initResources={resources}
              initAgents={agents}
              maxTokens={128}
              handleResponse={handleResponse}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
