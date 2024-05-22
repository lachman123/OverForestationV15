"use client";
import Agents from "@/components/Agents";
import { useState } from "react";
import Animation from "@/components/Animation";
import { describeImagePrompt } from "@/ai/prompts";
import Narration from "@/components/Narration";
import KeyValueTable from "@/components/KeyValueTable";

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
  const [showUI, setShowUI] = useState<boolean>(true);

  const handleResponse = async (newResources: any, newAgents: any[]) => {
    setResources(newResources);
    setAgents(newAgents);
  };

  return (
    <main className="">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
        <Narration scenario={`World State: ${resources}. Agents: ${agents}`} />
        <div id="Agent UI" className="flex flex-col p-8 z-50">
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
            <KeyValueTable data={resources} />
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
