"use client";
import Experts from "@/components/Experts";
import { useState } from "react";

const initState = {
  project:
    "A timber consortium has a vision to develop a forestry plantation of sufficient scale to entirely replace the world's dependence on concrete with renewable timber.",
  location: "Oregon, USA",
  year: 2024,
  planatationArea: "2000 acres",
  productionCapacity: "1M Linear Board Feet",
  environmentalImpact: "Low",
  annualReport: "",
};

//Examples of macroeconomic experts
const economicExperts = [
  "based on the current state of the project, predict likely changes in the global economy that may impact project revenue over the next 3 years.",
  "based on the current state of the project, predict likely infrastructure costs required to increase supply output by 15% over the next 3 years. ",
  "based on current state of the project, predict bottlenecks in supply logistics over the next 3 years. ",
  "based on current state of the project, predict the most likely 5 environmental challenges that will impact the project over the next 3 years.",
  "based on current state of the project, predict the most likely political and policy barriers to project success over the next 3 years. ",
  "based on current state of the project, predict the most likely economic and financial barriers to project success over the next 3 years. ",
];

//Examples of stakeholder experts
const stakeholders = [
  "You are a timber consortium responsible for growing revenue by 15% year over year. Conduct a one-paragraph SWOT analysis of the project.",
  "You are a local climate activist responsible for preserving existing national and state forests. Conduct a one-paragraph  SWOT analysis of the project.",
  "You are a state government politician responsible to constituents to deliver stable economic growth and social welfare. Conduct a one-paragraph  SWOT analysis of the project.",
  "You are a local community leader responsible for ensuring that the project does not negatively impact the local community. Conduct a one-paragraph  SWOT analysis of the project.",
  "You are a shipping company responsible for delivering timber to market. You stand to benefit from ongoing growth in the project. Conduct a one-paragraph  SWOT analysis of the project.",
];

//Demo of generating a forecast
export default function ExpertPage() {
  const [state, setState] = useState<any>(initState);
  const [systemPrompts, setSystemPrompts] = useState<string[]>(stakeholders);

  function handleResponse(newState: any) {
    //do something with the new state
    newState.year += 3;
    setState(newState);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col w-full">
          <div>
            {Object.keys(state).map((key) => (
              <div className="flex justify-between" key={key}>
                <span className="font-semibold">{key}: </span>
                <span>{state[key]}</span>
              </div>
            ))}
          </div>
          <span className="font-bold my-4">Select Expert Analysis</span>
          <select
            className="p-2 bg-white rounded-lg"
            onChange={(e) =>
              setSystemPrompts(
                e.target.value === "economic" ? economicExperts : stakeholders
              )
            }
          >
            <option value="stakeholders">Stakeholders</option>
            <option value="economic">Economic</option>
          </select>
          <Experts
            initState={state}
            systemPrompts={systemPrompts}
            maxTokens={512}
            handleResponse={handleResponse}
          />
        </div>
      </div>
    </main>
  );
}
