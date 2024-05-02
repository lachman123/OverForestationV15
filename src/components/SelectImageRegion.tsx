import React, { useState, useRef } from "react";

interface SelectionArea {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export default function SelectImageRegion({ img }: { img: string }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionArea, setSelectionArea] = useState<SelectionArea>({
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startSelection = (event: React.MouseEvent) => {
    event.preventDefault();
    const rect = imgRef.current!.getBoundingClientRect();
    setSelectionArea({
      startX: event.clientX - rect.left,
      startY: event.clientY - rect.top,
      width: 0,
      height: 0,
    });
    setIsSelecting(true);
  };

  const updateSelection = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!isSelecting) return;
    const rect = imgRef.current!.getBoundingClientRect();
    setSelectionArea((prev) => ({
      ...prev,
      width: event.clientX - rect.left - prev.startX,
      height: event.clientY - rect.top - prev.startY,
    }));
  };

  const endSelection = () => {
    if (canvasRef.current && imgRef.current) {
      const ctx = canvasRef.current.getContext("2d")!;
      canvasRef.current.width = Math.abs(selectionArea.width);
      canvasRef.current.height = Math.abs(selectionArea.height);
      ctx.drawImage(
        imgRef.current,
        selectionArea.startX,
        selectionArea.startY,
        selectionArea.width,
        selectionArea.height,
        0,
        0,
        Math.abs(selectionArea.width),
        Math.abs(selectionArea.height)
      );
    }
    setIsSelecting(false);
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "selected-region.png";
      link.click();
    }
  };

  return (
    <div>
      <img
        ref={imgRef}
        src={img}
        crossOrigin="anonymous" // This line is important
        onMouseDown={startSelection}
        onMouseMove={updateSelection}
        onMouseUp={endSelection}
        style={{ cursor: isSelecting ? "crosshair" : "default" }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button onClick={downloadImage}>Download PNG</button>
    </div>
  );
}
