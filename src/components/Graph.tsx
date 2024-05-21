"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export type Node = {
  id: string;
  name: string;
  x: number;
  y: number;
  properties: any;
};

export type Edge = {
  source: string;
  target: string;
  relation: string;
};

export default function Graph({
  nodes,
  edges,
  onSelect,
}: {
  nodes: Node[];
  edges: Edge[];
  onSelect: (node: Node) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mouseClick, setMouseClick] = useState<{ x: number; y: number } | null>(
    null
  );
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const lookup = useMemo(() => {
    const lookup: { [id: string]: Node } = {};
    nodes.forEach((node) => {
      lookup[node.id] = node;
    });
    return lookup;
  }, [nodes]);

  const mapScale = 5;

  const drawMap = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply zoom and pan transformations
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);

      // Draw your content here
      drawFeatures();

      ctx.restore();
    }
  };

  const drawFeatures = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      //draw all features
      nodes.forEach((feature) => {
        const x = feature.x;
        const y = feature.y;
        ctx.textAlign = "center";

        const connections = edges.filter((e) => e.source === feature.id);
        connections?.forEach((c) => {
          //draw a line to the connection
          const connection = lookup[c.target];
          ctx.beginPath();
          ctx.moveTo(x * mapScale, y * mapScale + 2);
          ctx.lineTo(connection.x * mapScale, connection.y * mapScale + 2);
          //scale strokewidth
          ctx.lineWidth = 1 / scale;
          //set stroke colour
          ctx.strokeStyle = "rgb(220 220 220)";
          ctx.stroke();
          ctx.closePath();
          ctx.font = `${10 / scale}px Arial`;
          ctx.fillStyle = "gray";
          ctx.fillText(
            c.relation,
            ((x + connection.x) / 2) * mapScale,
            ((y + connection.y) / 2) * mapScale - 2 / scale
          );
        });
        const fontSize = 12 / scale;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = "blue";

        ctx.fillText(feature.name, x * mapScale, y * mapScale - 8 / scale);
        ctx.beginPath();
        // Define the circle
        ctx.arc(x * mapScale, y * mapScale + 2, 5 / scale, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) drawMap();

    const handleClick = (mouseX: number, mouseY: number) => {
      if (!mouseClick) return;
      setMouseClick(null);
      const canvas = canvasRef.current;
      if (canvas) {
        const clickedFeature = nodes.find((feature) => {
          const x = feature.x;
          const y = feature.y;
          const distance = Math.sqrt(
            (x * mapScale - mouseX) ** 2 + (y * mapScale - mouseY) ** 2
          );
          if (distance < 20 / scale) console.log(feature.name);
          return distance <= 20 / scale;
        });

        if (clickedFeature) {
          onSelect(clickedFeature);
        } else {
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? 0.9 : 1.1;
      const mouseX = event.clientX - canvas!.getBoundingClientRect().left;
      const mouseY = event.clientY - canvas!.getBoundingClientRect().top;
      const newScale = scale * delta;
      const newOffset = {
        x: offset.x + (mouseX - offset.x) * (1 - delta),
        y: offset.y + (mouseY - offset.y) * (1 - delta),
      };
      setScale(newScale);
      setOffset(newOffset);
    };

    const handleMouseDown = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setMouseClick({
          x: (event.clientX - rect.left - offset.x) / scale,
          y: (event.clientY - rect.top - offset.y) / scale,
        });
      }
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMouseClick(null);
      if (isDragging) {
        const newOffset = {
          x: offset.x + (event.clientX - dragStart.x),
          y: offset.y + (event.clientY - dragStart.y),
        };
        setOffset(newOffset);
        setDragStart({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseUp = () => {
      if (mouseClick) {
        console.log("handling click");
        handleClick(mouseClick.x, mouseClick.y);
      }
      setIsDragging(false);
    };

    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseleave", handleMouseUp);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("wheel", handleWheel);
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseleave", handleMouseUp);
      }
    };
  }, [scale, offset, mapScale, isDragging, dragStart, mouseClick]);

  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg border border-black overflow-hidden">
      <h1>Graph</h1>
      <canvas ref={canvasRef} width={1024} height={1024} />
    </div>
  );
}
