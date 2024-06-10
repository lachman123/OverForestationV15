"use client";
import Agents from "@/components/Agents";
import { useState } from "react";
import Narration from "@/components/Narration";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { GNode, Graph, relaxGraph } from "@/components/Graph";
import { getGroqCompletion } from "@/ai/groq";
import Timeline, { TimelineEvent } from "@/components/Timeline";
import { jsonText } from "@/ai/prompts";
import { unstable_noStore as noStore } from "next/cache";
import { generateImageFal } from "@/ai/fal";
import Panorama from "@/components/Panorama";
import Link from "next/link";

const agentGoal =
  "Build and expand a forestation project in Canadas northern short grasslands, with the goal of supplying the worlds construction timber by 2060, whilst resolving unexpected conflicts and events between agents";
const initAgents: any = [];
const addNodes = true;
const startYear = 2024;

export default function AgentsPage() {
  noStore();
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [showUI, setShowUI] = useState<boolean>(true);
  const [playNarration, setPlayNarration] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(startYear);
  const [fetching, setFetching] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");

  const handleResponse = async (newAgents: any[]) => {
    setGenerating(true);
    try {
      const requestString = `${JSON.stringify({ graph, newAgents })}`;
      console.log(requestString);
      const newStates = await getGroqCompletion(
        requestString,
        1024,
        `The user will provide you with an implementation of a specific concept in the form of a knowledge graph together with an array of agents working towards specific goals within this graph.
          Your task is to update the knowledge graph to reflect the changes made by the agents.
          Generate an array of new Nodes and an array of new Edges to represent any concepts not already modelled by the knowledge graph.
          Update any existing nodes affected by the agents using a state map. Generate a new state object for each affected node using the node ID as the key and the new state as the value.
          Return your response in JSON in the format {newNodes:Node[], newEdges:Edge[], newStates:{[id:string]: string}}.` +
          jsonText,
        true,
        "llama3-8b-8192"
      );
      const graphJSON = JSON.parse(newStates);
      console.log(graphJSON);
      const updatedNodes = [...graph.nodes];
      for (const [id, state] of Object.entries(graphJSON.newStates)) {
        const node: any = updatedNodes.find((n) => n.id === id);
        if (node) node.state = state;
      }
      const edges = [...graph.edges, ...graphJSON.newEdges];
      const relaxed = relaxGraph(
        [...updatedNodes, ...graphJSON.newNodes],
        edges
      );
      const newGraph = { nodes: relaxed, edges: edges };

      setGraph(newGraph);
      setCurrentYear((c) => c + 5);
      timelineEvents.push({
        time: currentYear,
        title: currentYear.toString(),
        data: newGraph,
      });
    } catch (e) {
      console.error(e);
      alert("failed to update graph");
    }
    setGenerating(false);
  };

  const getGraph = (graph: Graph) => {
    setGraph(graph);
    setCurrentYear((c) => c + 2);
    timelineEvents.push({
      time: currentYear,
      title: currentYear.toString(),
      data: graph,
    });
  };

  const handleTimelineSelect = (event: TimelineEvent) => {
    setGraph(event.data);
  };

  const handleNodeSelect = async (node: GNode) => {
    setFetching(true);
    const newPrompt =
      "An equirectangular panorama of" + node.name + node.properties.image ??
      "" + ". Canon EOS 5D Mark IV, 24mm, f/8, 1/250s, ISO 100";
    const pano = await generateImageFal(newPrompt);
    if (pano) setImg(pano);
    setFetching(false);
  };

  return (
    <main className="">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
        {img && !playNarration && (
          <div className="fixed top-0 left-0 w-screen h-screen min-h-screen">
            <Panorama img={img} immersive={false} />
          </div>
        )}
        <Narration
          play={playNarration}
          textToNarrate={JSON.stringify(graph)}
          captionPrompt={`You are provided with a world state and an array of agents performing tasks to make changes to this world state. Write a short script that narrates an interview with Gordon Cadwell, who is one of the chairs on the board of directors of the Forestry project in Canada, whos at his wits end, stressed out, and hes talking about how annoying it is dealing with the struggles and issues that arise throughout the forestry project. Gordon can can make jokes about his struggles which should be satiric, funny, edgy or dark humor jokes to match his personality. Please ensure that they are still respectful and considerate, avoiding any content that might be overly offensive or harmful. Do not include more than one analogy in the script. The interview should start with Gordon briefly explaining the project, his role in the project, and the desired brief/goal of the project. Gordons responses can be long and detailed, referring to the different parties, their conflicts and the resolutions he was involved in to solve the issues. Some example parties that are affected by the project include: environmentalists, local communities, indigenous communities, land owners, the government, stakeholders, rival timber suppliers etc. Do not refer to the agents as ‘agents’, refer to them by the name of the group they represent, or make up a persons name for example (dont use this one): ‘John Smith from Saskatoon Forestry Management’. Narrate the interview as lines of dialogue between Gordon and the interviewer. The interviewer shouldnt reply to every sentence from Gordon, instead should ask questions that would allow Gordon to tell a captivating story, or say something engaging. The voice of Gordon must be male. Dont give lots of analogies, or talk about cats, just talk about Gordons experience. The inverview should be quite long, like a 5 minute interview, so the script needs to be very long. At least 35 responses from Gordon. Place each item of dialogue on a new line. Each line should be in the format "Speaker: Dialogue". Do not include any other text or explanation.`}
          imagePrompt={`You are an expert photographer describing images to the blind. You pick a some words relating to a forestry project in canada and the issues that arise from a large scale forestry project, such as issues of resolving issues between different parties affected by the project including environmentalists, local communities, indigenous communities, land owners, the government, stakeholders, rival timber suppliers, or showing the progress of a large scale timber forestation project in Canada. The scenes should show a point of view, and be from a lower perspective such as from the view from someones eyes in the scene. Other image ideas can include forestation project related scenes for example if the interview script talks about resolving an issue of environmentalists blocking a road to stop logging trucks, you should show that. Dont describe an interview or an image of a person talking. You describe a scene provided by the user in vivid detail. Describe the scene as if you were painting a picture with words. Start your description with: "A photograph of" then use keywords and simple phrases separated by commas. End your description with: Canon EOS 5D Mark IV, 24mm, f/8, 1/250s, ISO 100, 2019`}
        />
        <div id="Agent UI" className="flex flex-col p-8 z-50">
          <div className="flex justify-between w-full items-center mb-4">
            <Link href="/" legacyBehavior>
              <a className="text-black text-lg">Back</a>
            </Link>
            <button
              className="p-2 border rounded-lg bg-white/25"
              onClick={() => setShowUI(!showUI)}
            >
              {showUI ? "Hide UI" : "Show UI"}
            </button>
          </div>
          <div
            className={`${
              showUI ? "flex" : "hidden"
            } flex-col w-full bg-orange-200 bg-opacity-75 p-4 rounded-lg gap-4`}
            style={{ maxWidth: "700px", margin: "auto" }}
          >
            <button
              className="p-2 rounded-lg border bg-[#d1d5db] shadow"
              onClick={() => setPlayNarration(!playNarration)}
            >
              {playNarration ? "Stop Narrating" : "Start Narrating"}
            </button>
            {generating && <span>Updating Graph...</span>}
            <Timeline events={timelineEvents} onSelect={handleTimelineSelect} />
            <KnowledgeGraph
              graph={graph}
              onUpdate={getGraph}
              onSelect={handleNodeSelect}
            />
            <Agents
              world={graph}
              initAgents={initAgents}
              onUpdate={handleResponse}
              goal={agentGoal}
              time={currentYear.toString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
