import React, { ReactNode } from "react";

//blends and animate an new component over the top of any previously rendered component
export default function AnimateContent({
  animation,
  fullscreen,
  children,
}: {
  animation: string;
  fullscreen: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`${
        fullscreen
          ? "fixed top-0 left-0 -z-50 min-w-[100vw] min-h-[100vh]"
          : `relative max-w-full w-[1024px] h-[600px] overflow-hidden`
      }`}
    >
      <div
        className={`${
          fullscreen && "absolute top-0 left-0"
        } w-full h-full ${animation}`}
      >
        {children}
      </div>
    </div>
  );
}
