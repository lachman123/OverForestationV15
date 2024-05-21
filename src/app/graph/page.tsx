"use client";
import { getGeminiVision } from "@/ai/gemini";
import { getGroqCompletion } from "@/ai/groq";
import { getOpenAICompletion } from "@/ai/openai";
import Graph, { Edge, GNode, relaxGraph } from "@/components/Graph";
import { useState } from "react";
import { KeyValueTable } from "../agents/page";

export default function Page() {
  const [nodes, setNodes] = useState<GNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [concept, setConcept] = useState<string>(
    "Design and engineering considerations for an offshore salmon farm"
  );
  const [generating, setGenerating] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<GNode | null>(null);

  const handleCreate = async (prompt: string) => {
    setGenerating(true);
    const graph = await getGeminiVision(
      prompt,
      undefined,
      `
        The user will provide you with a concept to be graphed. 
        Generate an array of Nodes and an array of Edges to represent the graph.
        Nodes should be in the format {id: string, name: string, x:number, y:number, properties?: any}.
        Properties can be an object with any additional information you want to include about the node.
        Edges should be in the format {source:string, target:string, relation:string}.
        Return your response in JSON in the format {nodes:Node[], edges: Edge[]}.`,
      true
    );

    const graphJSON = JSON.parse(graph);
    setGenerating(false);
    relaxNodes(graphJSON.nodes, graphJSON.edges);
  };

  const handleRefine = async () => {
    setGenerating(true);
    const graph = await getGeminiVision(
      JSON.stringify({ concept, nodes, edges }),
      undefined,
      `The user will provide you with a conceptual graph of entities and relationships.
       Add nodes to the graph to further connect and explain entities and relationships.
       Add nodes and relationships to nodes that do not have many existing edges. 
       Return your response in JSON in the format {nodes:Node[], edges: Edge[]}.`,
      true
    );
    const graphJSON = JSON.parse(graph);
    setGenerating(false);
    relaxNodes(graphJSON.nodes, graphJSON.edges);
  };

  const handleInterlink = async () => {
    setGenerating(true);
    const graph = await getGeminiVision(
      JSON.stringify({ concept, nodes, edges }),
      undefined,
      `The user will provide you with a conceptual graph of entities and relationships.
       Generate an array of Nodes and an array of Edges to append to this graph. 
       New nodes should link existing concepts in the graph.
       Return your response in JSON in the format {nodes:Node[], edges: Edge[]}.`,
      true
    );
    const graphJSON = JSON.parse(graph);
    setGenerating(false);
    relaxNodes([...nodes, ...graphJSON.nodes], [...edges, ...graphJSON.edges]);
  };

  const handleAppend = async () => {
    setGenerating(true);
    const graph = await getGeminiVision(
      JSON.stringify({ concept, nodes, edges }),
      undefined,
      `The user will provide you with a conceptual graph of entities and relationships.
       Generate an array of Nodes and an array of Edges to append to this graph. 
       New nodes and edges should link existing concepts in the graph.
       Expand on the existing graph with new concepts and relationships.
       Return your response in JSON in the format {nodes:Node[], edges: Edge[]}.`,
      true
    );
    const graphJSON = JSON.parse(graph);
    setGenerating(false);
    relaxNodes([...nodes, ...graphJSON.nodes], [...edges, ...graphJSON.edges]);
  };

  const handleEmbellish = async () => {
    setGenerating(true);
    const graph = await getGeminiVision(
      JSON.stringify({ concept, nodes, edges }),
      undefined,
      `The user will provide you with an abstract graph of entities and relationships.
      Use this graph as a template to generate a specific case study of the project concept. 
       Add specific data to the properties of each node that demonstrates a real-world example of the concept.
       Return your response in JSON in the format {nodes:Node[]}.`,
      true
    );
    const graphJSON = JSON.parse(graph);
    setGenerating(false);
    setNodes(graphJSON.nodes);
  };

  const relaxNodes = (nodes: GNode[], edges: Edge[]) => {
    const relaxedNodes = relaxGraph(nodes, edges);
    setNodes(relaxedNodes);
    setEdges(edges);
  };

  const handleSelect = (node: GNode) => {
    console.log(node);
    setSelectedNode(node);
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
            <button
              className="p-2 bg-white rounded-lg"
              onClick={() => handleAppend()}
            >
              {generating ? "Generating..." : "Append"}
            </button>
            <button
              className="p-2 bg-white rounded-lg"
              onClick={() => handleInterlink()}
            >
              {generating ? "Generating..." : "Link"}
            </button>
            <button
              className="p-2 bg-white rounded-lg"
              onClick={() => handleEmbellish()}
            >
              {generating ? "Generating..." : "Create Project"}
            </button>
          </div>
          {selectedNode && (
            <div className="flex flex-col w-full">
              <span className="font-bold"> {selectedNode.name}</span>
              <KeyValueTable data={selectedNode.properties} />
            </div>
          )}
          <Graph nodes={nodes} edges={edges} onSelect={handleSelect} />
        </div>
      </div>
    </main>
  );
}
