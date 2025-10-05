"use client";

import { Map } from "./map/map";
import dynamic from "next/dynamic";

const DynamicMarker = dynamic(() => import("./map/display-map").then((mod) => mod.DynamicMarker), { ssr: false });

export default function Location({ position, setPosition, ...props }) {
  return (
    <div>
      <Map {...props} className="fixed inset-0">
        <DynamicMarker position={position} setPosition={setPosition} />
      </Map>
    </div>
  );
}