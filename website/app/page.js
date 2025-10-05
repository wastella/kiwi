"use client";

import { useState, useRef, useEffect } from "react";
import Location from "./input/location";
import { Map, StaticMap } from "./input/map/map";
import { parseDateTime } from "./datetime-parser";
import { geocodeLocation } from "./location-to-coordinates";
import { Calendar24 } from "./input/datetime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function InputPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialPosition = searchParams.get("position")
    ? JSON.parse(decodeURIComponent(searchParams.get("position")))
    : null;
  const initialDate = searchParams.get("date")
    ? new Date(decodeURIComponent(searchParams.get("date")))
    : null;

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(initialPosition);
  const [date, setDate] = useState(initialDate);
  const [errorMessage, setErrorMessage] = useState("");
  const debounceTimeout = useRef(null);
  const [textInputValue, setTextInputValue] = useState("");
  const [usingTextInput, setUsingTextInput] = useState(false);

  const [stage, setStage] = useState(
    initialPosition && initialDate
      ? "date"
      : initialPosition
      ? "location"
      : "location"
  );

  useEffect(() => {
    if (stage === "end") {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("position", encodeURIComponent(JSON.stringify(position)));
      nextParams.set("date", encodeURIComponent(date.toISOString()));
      router.push(`/results?${nextParams.toString()}`);
    }
  }, [stage]);

  useEffect(() => {
    if (position && map && usingTextInput) {
      map.setView(position, 7);
    }
  }, [position]);

  useEffect(() => {
    if (textInputValue.length > 0) {
      setUsingTextInput(false);
      setTextInputValue("");
    }
  }, [stage]);

  useEffect(() => {
    if (position || date) {
      const nextParams = new URLSearchParams(searchParams);
      if (position)
        nextParams.set(
          "position",
          encodeURIComponent(JSON.stringify(position))
        );
      if (date) nextParams.set("date", encodeURIComponent(date.toISOString()));

      const url = `${pathname}?${nextParams.toString()}`;
      router.push(url);
    }
  }, [position, date, pathname, router, searchParams]);

  const nextStage = {
    location: "date",
    date: "end",
  };
  const prevStage = {
    date: ["location"],
    end: ["date", "location"],
  };

  const canNext =
    stage === "location"
      ? position != null
      : stage === "date"
      ? date != null
      : false;

  const glassStyle = {
    background: "rgba(0, 0, 0, 0.36)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    borderRadius: "22px",
    transition: "transform 0.3s ease, background 0.3s ease",
  };

  return (
    <div>
      {stage === "location" ? (
        <Location ref={setMap} position={position} setPosition={setPosition} />
      ) : null}
      {stage !== "end" ? (
        <div className="fixed inset-6 flex items-end justify-between flex-row gap-3 pointer-events-none *:pointer-events-auto">
          <div className="flex flex-col gap-3 flex-1  max-w-sm">
            <div
              style={glassStyle}
              className="text-white w-full px-5 py-4 rounded-xl"
            >
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
            <div
              style={glassStyle}
              className="px-5 py-4 pr-8 backdrop-blur-xl w-full rounded-xl"
            >
              <ul className="flex flex-col gap-1">
                {[
                  { label: "Select a location", value: "location" },
                  { label: "Choose a day and time", value: "date" },
                ].map((item) => (
                  <li key={item.value} className="flex items-start gap-x-2.5">
                    <div className="border-[2] text-white border-white size-5 flex items-center justify-center mt-[4px]">
                      <span>
                        {{
                          date: date != null,
                          location: position != null,
                        }[item.value]
                          ? "✓"
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg text-white">{item.label}</span>
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
            <div className="h-14 flex gap-2 *:backdrop-blur-xl *:border cursor-pointer">
              {prevStage[stage]?.length > 0 ? (
                <button
                  type="button"
                  style={glassStyle}
                  className="text-white w-18 flex items-center justify-center rounded-xl cursor-pointer"
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
                style={glassStyle}
                className="flex items-center gap-2 justify-between pl-5 pr-3 w-full rounded-xl cursor-pointer disabled:cursor-not-allowed text-white disabled:text-neutral-200/80 disabled:opacity-80"
                disabled={!canNext}
                onClick={() => {
                  const next = nextStage[stage];

                  if (next) {
                    setStage(next);
                  }
                }}
              >
                <span className="text-lg">
                  {nextStage[stage] === "end" ? "View Results" : "Next"}
                </span>
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
          <div className="flex flex-col gap-3 flex-1  max-w-sm">
            <div className="flex flex-col items-end gap-2">
              {stage === "date" ? (
                <div>
                  <Calendar24 date={date} setDate={setDate} />
                </div>
              ) : null}
              <div className="gap-y-1.25 flex flex-col">
                <form>
                  <input
                    type="text"
                    style={glassStyle}
                    placeholder={
                      stage === "location"
                        ? "Search for a location"
                        : "Search for a date"
                    }
                    value={textInputValue}
                    className="h-14 text-lg! text-white backdrop-blur-xl flex items-center justify-center px-5 py-3 rounded-xl focus-visible:outline-none w-sm border border-neutral-300"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setTextInputValue(inputValue);

                      // Clear previous timeout
                      if (debounceTimeout.current) {
                        clearTimeout(debounceTimeout.current);
                      }

                      // Clear error message when user starts typing
                      setErrorMessage("");

                      // Set new timeout with debounce
                      debounceTimeout.current = setTimeout(() => {
                        if (inputValue.trim() === "") return;

                        if (stage === "location") {
                          geocodeLocation(inputValue)
                            .then((result) => {
                              if (result && !result.error) {
                                setUsingTextInput(true);
                                setPosition(result);
                              } else {
                                setErrorMessage(
                                  result?.error || "Invalid location"
                                );
                              }
                            })
                            .catch((error) => {
                              setErrorMessage("Failed to find location");
                            });
                        } else {
                          parseDateTime(inputValue)
                            .then((result) => {
                              if (result && !result.error) {
                                setUsingTextInput(true);
                                setDate(result);
                              } else {
                                setErrorMessage(
                                  result?.error || "Invalid time format"
                                );
                              }
                            })
                            .catch((error) => {
                              console.log(error);
                              setErrorMessage("Failed to parse time");
                            });
                        }
                      }, 300);
                    }}
                  />
                </form>

                {errorMessage && (
                  <div
                    style={{
                      ...glassStyle,
                      background: "rgba(220, 38, 38, 0.8)",
                      border: "1px solid rgba(220, 38, 38, 0.3)",
                    }}
                    className="px-4 py-2 rounded-lg text-red-200 text-sm"
                  >
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
