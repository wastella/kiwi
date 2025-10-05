"use client";

import dynamic from "next/dynamic";

const DisplayMap = dynamic(
  () => import("./display-map").then((mod) => mod.DisplayMap),
  { ssr: false }
);

const DynamicMarker = dynamic(() => import("./display-map").then((mod) => mod.DynamicMarker), { ssr: false });

export const Map = (props) => {
  return <DisplayMap {...props} />;
};

export const StaticMap = (props) => {
  return (
    <Map
      {...props}
      className="absolute inset-0 pointer-events-none! *:[.leaflet-control-container]:*:[.leaflet-top.leaflet-left]:hidden *:[.leaflet-control-container]:*:[.leaflet-bottom.leaflet-right]:hidden **:[.leaflet-marker-pane]:**:pointer-events-none!"
    >
      <DynamicMarker
        position={props.center}
        setPosition={() => {}}
        draggable={false}
        className="**:pointer-events-none! **:z-0!"
      />
    </Map>
  );
};
