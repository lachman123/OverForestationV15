"use client";
import { getGeminiVision } from "@/ai/gemini";
import { getGroqCompletion } from "@/ai/groq";
import Graph, { Edge, GNode, relaxGraph } from "@/components/Graph";
import { useEffect, useState } from "react";
import crypto from "crypto";
import KeyValueTable from "@/components/KeyValueTable";

type EditNode = {
  x: number;
  y: number;
  node?: GNode;
  context: GNode[];
};

export default function Page() {
  const [nodes, setNodes] = useState<GNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [concept, setConcept] = useState<string>(
    "Design and engineering considerations for an offshore salmon farm"
  );
  const [generating, setGenerating] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<GNode | null>(null);
  const [editNode, setEditNode] = useState<EditNode | null>(null);

  const handleCreate = async (prompt: string) => {
    setGenerating(true);
    try {
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
      relaxNodes(graphJSON.nodes, graphJSON.edges);
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const handleRefine = async () => {
    setGenerating(true);
    try {
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
      relaxNodes(graphJSON.nodes, graphJSON.edges);
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const handleLink = async () => {
    setGenerating(true);
    try {
      const graph = await getGeminiVision(
        JSON.stringify({ concept, nodes, edges }),
        undefined,
        `The user will provide you with a conceptual graph of entities and relationships.
       Generate an array of Edges to append to this graph. 
       New edges should link existing concepts in the graph.
       Return your response in JSON in the format { edges: Edge[]}.`,
        true
      );
      const graphJSON = JSON.parse(graph);
      setEdges([...edges, ...graphJSON.edges]);
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const handleAppend = async () => {
    setGenerating(true);
    try {
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
      relaxNodes(
        [...nodes, ...graphJSON.nodes],
        [...edges, ...graphJSON.edges]
      );
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const handleCreateProject = async () => {
    setGenerating(true);
    try {
      const graph = await getGeminiVision(
        JSON.stringify({ concept, nodes, edges }),
        undefined,
        `The user will provide you with an abstract graph of entities and relationships in a project concept.
        Your task is to implement this template to create a concrete design proposal.
        Add an "implementation" property to each node in the graph that describes how the abstract template is implemented in a specific case study.
        Always give a single exact specification in the implementation. For example, is implementing a site, specify the exact location. If implementing a technology, specify the exact technology. 
        If implementation requires estimating quantities, do so. If implementation requires analysis, conduct the analysis and draw conclusions. 
        Use specific examples and details to describe the implementation, and add any additional nodes or edges that are necessary to complete the implementation.
       Return your response in JSON in the format {caseStudy: string, nodes:Node[]}.`,
        true
      );
      const graphJSON = JSON.parse(graph);
      console.log(graphJSON);
      setNodes(graphJSON.nodes);
    } catch (e) {
      console.error(e);
      alert(e);
    }
    setGenerating(false);
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

  const handleRightClick = (
    x: number,
    y: number,
    onNode: boolean,
    nodes: GNode[]
  ) => {
    //create a new node at the location of the right click
    console.log(x, y, onNode, nodes);
    const e = { x, y, context: nodes } as EditNode;
    if (onNode) e.node = nodes[0];
    setEditNode(e);
  };

  const handleClose = () => {
    setEditNode(null);
  };

  const handleCreateNode = async (node: GNode, context: GNode[]) => {
    //connect to graph
    try {
      const newEdges = await getGroqCompletion(
        JSON.stringify({ concept, node, context: editNode }),
        128,
        `The user will provide you with a concept, node and an array of proximate nodes in a graph representing some aspect of this concept.
         Generate an array of new edges that relate the node to the context.
         Only generate edges if they are relevant to the context.
         Return your response in JSON in the format {edges: {source:id, target:id, relation:string}[]}.`,
        true
      );
      const graphJSON = JSON.parse(newEdges);
      console.log(node, graphJSON.edges);
      setEdges([...edges, ...graphJSON.edges]);
      setNodes([...nodes, node]);
    } catch (e) {
      console.error(e);
    }
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
              onClick={() => handleLink()}
            >
              {generating ? "Generating..." : "Link"}
            </button>
            <button
              className="p-2 bg-white rounded-lg"
              onClick={() => handleCreateProject()}
            >
              {generating ? "Generating..." : "Create Project"}
            </button>
          </div>
          {selectedNode && (
            <div className="flex flex-col w-full">
              <span className="font-bold"> {selectedNode.name}</span>
              <KeyValueTable data={selectedNode} />
            </div>
          )}
          <Graph
            nodes={nodes}
            edges={edges}
            onSelect={handleSelect}
            onRightClick={handleRightClick}
          />
          {editNode && (
            <EditNodeDialog
              editNode={editNode}
              graph={{ nodes, edges }}
              concept={concept}
              onClose={handleClose}
              onCreate={handleCreateNode}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function EditNodeDialog({
  editNode,
  graph,
  concept,
  onClose,
  onCreate,
}: {
  editNode: EditNode;
  graph: { nodes: GNode[]; edges: Edge[] };
  concept: string;
  onClose: () => void;
  onCreate: (node: GNode, context: GNode[]) => void;
}) {
  const [name, setName] = useState(editNode.node?.name || "");
  const [properties, setProperties] = useState(editNode.node?.properties || {});
  const [newPropKey, setNewPropKey] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleConfirm = () => {
    //update the node and close the dialog
    if (editNode.node) {
      editNode.node.name = name;
      editNode.node.properties = properties;
    } else {
      //add new node
      const id = crypto.randomBytes(4).toString("hex");
      onCreate(
        { id: id, name, x: editNode.x, y: editNode.y, properties },
        editNode.context
      );
    }
    onClose();
  };

  useEffect(() => {
    if (!editNode.node) {
      predictNode();
    }
  }, [editNode]);

  const predictNode = async () => {
    setGenerating(true);
    try {
      const node = await getGeminiVision(
        JSON.stringify({ concept, context: editNode, nodes: graph }),
        undefined,
        `The user will provide you with a concept and an array of proximate nodes in a graph representing some aspect of this concept.
         Generate a new node that fits into this graph.
         Return your response in JSON in the format {x:number, y:number, name:string, properties:{description:string}}.`,
        true
      );
      const graphJSON = JSON.parse(node);
      if (graphJSON) {
        setName(graphJSON.name);
        setProperties(graphJSON.properties);
      }
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const addProperty = () => {
    if (newPropKey) {
      setProperties({ ...properties, [newPropKey]: "" });
      setNewPropKey("");
    }
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`absolute top-0 left-0 w-full h-full bg-black/25 flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col p-4 max-w-lg bg-white rounded-lg shadow-xl gap-4 w-full">
        <span className="text-lg font-bold w-full">
          {editNode.node
            ? "Edit Node"
            : generating
            ? "Generating..."
            : "Create Node"}
        </span>
        <input
          onChange={(e) => setName(e.target.value)}
          className="p-2 bg-white rounded-lg w-full border border-black/10"
          value={name}
        />
        {properties &&
          Object.entries(properties).map(([key, value]) => (
            <div
              key={key}
              className="flex w-full gap-4 items-center justify-between"
            >
              <span>{key}</span>
              <input
                className="p-2 bg-white rounded-lg w-full border border-black/10"
                value={properties[key]}
                onChange={(e) =>
                  setProperties({ ...properties, [key]: e.target.value })
                }
              />
            </div>
          ))}
        <div className="w-full border border-black/50 p-2 flex flex-col rounded-lg gap-2">
          <input
            onChange={(e) => setNewPropKey(e.target.value)}
            className="p-2 bg-white rounded-lg w-full border border-black/10"
            value={newPropKey}
          />
          <button
            className="p-2 bg-white w-full rounded-lg border hover:shadow"
            onClick={addProperty}
          >
            Add Property
          </button>
        </div>

        <div className="flex justify-between items-center gap-2">
          <button className="p-2 bg-white rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button
            className="p-2 bg-white rounded-lg border hover:shadow"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
