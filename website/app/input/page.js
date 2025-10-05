"use client";

import { useState } from "react";
import Location from "./location";
import { Calendar29 } from "./calender";
import { Map, StaticMap } from "./map/map";

export default function InputPage() {
  const [position, setPosition] = useState(null);
  const [time, setTime] = useState(null);

  const [stage, setStage] = useState("location");

  const nextStage = {
    location: "time",
    time: "end",
  };
  const prevStage = {
    time: ["location"],
    end: ["time", "location"],
  };

  const canNext =
    stage === "location"
      ? position != null
      : stage === "time"
      ? time != null
      : false;

  return (
    <div>
      {stage === "location" ? (
        <Location position={position} setPosition={setPosition} />
      ) : null}
      {stage === "time" ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-16">
          
        </div>
      ) : null}
      <div className="fixed inset-6 flex items-end flex-row gap-3 pointer-events-none *:pointer-events-auto max-w-sm">
        <div className="flex flex-col gap-3 flex-1">
          <div className="w-full bg-white/80 px-5 py-4 rounded-xl border border-neutral-300">
            <div className="flex flex-col gap-y-1.25">
              {stage === "location" ? (
                <>
                  <span className="leading-5.5">
                    Move and/or zoom throughout the map and click to select a
                    location.
                  </span>
                  <span className="leading-5.5">
                    You can also type in the location search bar to find a
                    location.
                  </span>
                </>
              ) : (
                "Pick a date and time for your event."
              )}
            </div>
          </div>
          <div className="px-5 py-4 pr-8 bg-white/80 border border-neutral-300 backdrop-blur-xl w-full rounded-xl">
            <ul className="flex flex-col gap-1">
              {[
                { label: "Select a location", value: "location" },
                { label: "Choose a day and time", value: "time" },
              ].map((item) => (
                <li key={item.value} className="flex items-start gap-x-2.5">
                  <div className="border-[2] border-black size-5 flex items-center justify-center mt-[4px]">
                    <span>
                      {(
                        stage === item.value && item.value === "location"
                          ? position != null
                          : prevStage[stage]?.includes(item.value)
                      )
                        ? "✓"
                        : ""}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg">{item.label}</span>
                    {item.value === "location" &&
                    prevStage[stage]?.includes(item.value) ? (
                      <div className="h-[280px] w-[280px] relative pointer-events-none mb-4 mt-1">
                        <StaticMap center={position} zoom={10} />
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-14 flex gap-2 *:bg-white/80 *:backdrop-blur-xl *:border *:border-neutral-300 cursor-pointer">
            {prevStage[stage]?.length > 0 ? (
              <button
                type="button"
                className="w-18 flex items-center justify-center rounded-xl cursor-pointer"
                onClick={() => {
                  const prev = prevStage[stage];

                  if (prev) {
                    setStage(prev[0]);
                  }
                }}
              >
                <span className="sr-only">Back</span>
                <div>
                  <svg
                    aria-hidden="true"
                    fill="none"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6"
                  >
                    <path
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            ) : null}
            <button
              type="button"
              className="flex items-center gap-2 justify-between pl-5 pr-3 w-full rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-500 disabled:opacity-80"
              disabled={!canNext}
              onClick={() => {
                const next = nextStage[stage];

                if (next) {
                  setStage(next);
                }
              }}
            >
              <span className="text-lg">Next</span>
              <div>
                <svg
                  aria-hidden="true"
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6"
                >
                  <path
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div>
          <form className="fixed bottom-6 right-6">
            <input
              type="text"
              placeholder={stage === "location" ? "Search for a location" : "Search for a time"}
              className="h-14 text-lg! bg-white/80  backdrop-blur-xl flex items-center justify-center px-5 py-3 rounded-xl focus-visible:outline-none w-sm border border-neutral-300"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
