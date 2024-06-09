import { getGroqCompletion } from "@/ai/groq";
import { useState } from "react";

//function that runs multiple agents in parallel that compete over given resources
export default function Agents({
  world,
  initAgents,
  maxTokens = 1024,
  onUpdate,
  goal,
  time,
}: {
  world: any;
  initAgents: any[];
  maxTokens?: number;
  onUpdate: (agents: string[]) => void;
  goal?: string;
  time?: string;
}) {
  const [generating, setGenerating] = useState<boolean>(false);
  const [agents, setAgents] = useState<any[]>(initAgents);
  const [agentNames, setAgentNames] = useState<string[]>([]);

  const generateAgents = async (context: any, goal: string) => {
    setGenerating(true);
    try {
      const newAgents = await getGroqCompletion(
        //run all agents in parallel
        JSON.stringify({
          context,
          goal,
        }),
        512,
        `You simulate autonomous agent behaviour within a given world state. 
        A knowledge graph representing the world state together with a high level goal for the agents will be provided by the user. 
        Generate an array of three Agent objects that represent the agents in the world working towards the high level goal.
        Return a JSON object in the format {agents: {name: string, goal:string, currentTask:string, inhibitors:string, resourcesRequired:string}[]}.`,
        true
      );
      console.log(newAgents);
      const agentJSON = JSON.parse(newAgents);
      setAgents(agentJSON.agents);
      setAgentNames(agentJSON.agents.map((agent: any) => agent.name));
      onUpdate(agentJSON.agents);
      return agentJSON.agents;
    } catch (e) {
      console.error(e);
      alert("Error generating agents");
      return [];
    } finally {
      setGenerating(false);
    }
  };

  const runAgents = async (agents: any[]) => {
    //don't generate if already running
    if (generating) return;
    setGenerating(true);
    try {
      const newAgents = await getGroqCompletion(
        //run all agents in parallel
        JSON.stringify({ world, agents, currentYear: time }),
        1024,
        `You simulate autonomous agent behaviour within a world state represented by a knowledge graph. 
        The current year, goal and other properties of the agent will be provided by the user. 
        If the current task of the agent has been completed, determine the result of the task as specifically as possible based on the knowledge graph. 
        Generate a task for each agent to help them achieve their goal, and describe actions they perform and resources they consume to achieve it.
        Return a new JSON object with the updated agents in the format {agents: Agent[]}.`,
        true
      );
      console.log(newAgents);
      const agentJSON = JSON.parse(newAgents);
      setAgents(agentJSON.agents);
      onUpdate(agentJSON.agents);
      return agentJSON.agents;
    } catch (e) {
      console.error(e);
      alert("Error running agents");
      return [];
    } finally {
      setGenerating(false);
    }
  };

  const generateAndRunAgents = async () => {
    let newAgents = await generateAgents(world, goal ?? "");
    while (newAgents.length === 0) {
      newAgents = await generateAgents(world, goal ?? "");
    }
    let resultAgents = await runAgents(newAgents);
    while (resultAgents.length === 0) {
      resultAgents = await runAgents(newAgents);
    }
  };

  return (
    <div className="flex flex-col w-full rounded-lg border border-black/25 p-4">
      <button
        className="p-2 bg-white rounded-lg my-4 border border-black/25 w-full hover:shadow"
        onClick={() => generateAndRunAgents()}
      >
        {generating ? "Generating..." : "Generate Agents"}
      </button>
      {agentNames.length > 0 && (
        <p className="text-center mt-4">
          The agents generated are: {agentNames.join(", ")}
        </p>
      )}
    </div>
  );
}
