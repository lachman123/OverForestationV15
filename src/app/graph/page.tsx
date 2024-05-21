"use client";
import { getGeminiVision } from "@/ai/gemini";
import Graph, { Edge, GNode, relaxGraph } from "@/components/Graph";
import { useState } from "react";

export default function Page() {
  const [nodes, setNodes] = useState<GNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [concept, setConcept] = useState<string>("Offshore Salmon Farming");
  const [generating, setGenerating] = useState<boolean>(false);

  const handleCreate = async (prompt: string) => {
    setGenerating(true);
    const graph = await getGeminiVision(
      prompt,
      undefined,
      `
        The user will provide you with a concept to be graphed. 
        Generate an array of Nodes and an array of Edges to represent the graph.
        Nodes should be in the format {id: string, name: string, x:number, y:number, properties: any}.
        Properties can be an object with any additional information you want to include about the node.
        Edges should be in the format {source:string, target:string, relation:string}.
        Return your response in JSON in the format {nodes:Node[], edges: Edge[]}.`,
      true
    );

    const graphJSON = JSON.parse(graph);
    relaxNodes(graphJSON.nodes, graphJSON.edges);
    setGenerating(false);
  };

  const handleRefine = async () => {
    setGenerating(true);
    const graph = await getGeminiVision(
      JSON.stringify({ nodes, edges }),
      undefined,
      `The user will provide you with a graph of entities and relationships.
       For each node in the graph, add additional nodes and relationships that describe the entity in more detail. 
       Add nodes and relationships to nodes that do not have many existing edges. 
       Return your response in JSON in the format {nodes:Node[], edges: Edge[]}.`,
      true
    );
    const graphJSON = JSON.parse(graph);
    relaxNodes(graphJSON.nodes, graphJSON.edges);
    setGenerating(false);
  };

  const relaxNodes = (nodes: GNode[], edges: Edge[]) => {
    const relaxedNodes = relaxGraph(nodes, edges);
    setNodes(relaxedNodes);
    setEdges(edges);
  };

  const handleSelect = (node: GNode) => {
    console.log(node);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="flex justify-between w-full mb-4 gap-4">
            <input
              className="p-2 bg-white rounded-lg w-full"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
            />
            <button
              className="p-2 bg-white rounded-lg"
              onClick={() => handleCreate(concept)}
            >
              {generating ? "Generating..." : "Create"}
            </button>
            <button
              className="p-2 bg-white rounded-lg"
              onClick={() => handleRefine()}
            >
              {generating ? "Generating..." : "Refine"}
            </button>
          </div>
          <Graph nodes={nodes} edges={edges} onSelect={handleSelect} />
        </div>
      </div>
    </main>
  );
}
