"use client";
import Agents from "@/components/Agents";
import { useState } from "react";
import Narration from "@/components/Narration";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { GNode, Graph, relaxGraph } from "@/components/Graph";
import { getGroqCompletion } from "@/ai/groq";

//If true, the agents will add new nodes and edges to the graph
//If false, the agents will refine the implementation of the nodes in the graph
const addToGraph = true;

//Demo of running multiple agents that all compete for resources
export default function AgentsPage() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [showUI, setShowUI] = useState<boolean>(true);
  const [playNarration, setPlayNarration] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleResponse = async (newAgents: any[]) => {
    setGenerating(true);
    //now we have the new agents, we can implement our logic for how to update the graph.
    try {
      if (addToGraph) {
        const newGraph = await getGroqCompletion(
          JSON.stringify({
            graph: { nodes: graph.nodes, edges: graph.edges },
            agents: newAgents,
          }),
          1024,
          `The user will provide you with an implementation of a project in the form of a knowledge graph
        together with an array of agents working towards specific goals within this project.
        Generate a new array of nodes and a new array of edges that integrate new concepts and relationships required to describe the goals and tasks of the agents.
        If necessary, generate intermediate nodes to help link agent goals and tasks to the existing nodes in the graph.
        For each new node, include an implementation property that describes the actions of the agents. 
        Return your response in JSON in the format {newNodes:Node[], newEdges: Edge[]}.`,
          true
        );
        const graphJSON = JSON.parse(newGraph);
        const edges = [...graph.edges, ...graphJSON.newEdges];
        const relaxed = relaxGraph(
          [...graph.nodes, ...graphJSON.newNodes],
          edges
        );
        setGraph({ nodes: relaxed, edges: edges });
      } else {
        //just refine implementation
        const newData = await getGroqCompletion(
          JSON.stringify({ graph, newAgents }),
          2048,
          `The user will provide you with an implementation of a specific concept in the form of a knowledge graph together with an array of agents working towards specific goals within this graph.
        Generate a new state property for each node that describes how the goals, tasks and actions of an agent has impacted this node. 
        If the node is impacted, include a brief summary of the agent name and their task in the new state. 
        Include specific changes that may be required to the implementation of the node, or challenges the node now faces.
        Generate a map using the node ID as the key and the new state as the value.
        Return your response in JSON in the format {[id:string]: string}.`,
          true
        );
        const graphJSON = JSON.parse(newData);
        console.log(graphJSON);
        const newNodes = graph.nodes.map((n: GNode) => ({
          ...n,
          state: graphJSON[n.id] ?? "",
        }));

        console.log(newNodes);
        setGraph({ nodes: newNodes, edges: graph.edges });
      }
    } catch (e) {
      console.error(e);
      alert("failed to update graph");
    }
    setGenerating(false);
  };

  const getGraph = (graph: Graph) => {
    setGraph(graph);
  };

  return (
    <main className="">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm lg:flex">
        <Narration
          play={playNarration}
          textToNarrate={JSON.stringify(graph)}
          captionPrompt={`You are provided with a world state and an array of agents performing tasks to make changes to this world state. 
        Write a short script that narrates a documentary film that dramatizes these events and embellishes them where necessary to make them 
        engaging to the audience. Narrate the documenary as lines of dialogue by a narrator and other characters. Place each item of dialogue on a new line. 
        Each line should be in the format "Speaker: Dialogue". Do not include any other text or explanation.`}
          imagePrompt={`You are an expert photographer describing images to the blind. You describe a scene provided by the user in vivid detail. 
          Describe the scene as if you were painting a picture with words. Start your description with: "A photograph of" then use keywords and simple phrases separated by commas.
          End your description with: Canon EOS 5D Mark IV, 24mm, f/8, 1/250s, ISO 100, 2019`}
        />
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
            }  flex-col w-full bg-white p-4 rounded-lg gap-4`}
          >
            <button
              className="p-2 rounded-lg border bg-white shadow"
              onClick={() => setPlayNarration(!playNarration)}
            >
              {playNarration ? "Stop Narrating" : "Start Narrating"}
            </button>
            {generating && <span>Updating Graph...</span>}
            <KnowledgeGraph graph={graph} onUpdate={getGraph} />
            <Agents world={graph} initAgents={[]} onUpdate={handleResponse} />
          </div>
        </div>
      </div>
    </main>
  );
}
