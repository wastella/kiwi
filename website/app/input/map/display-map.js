import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const DisplayMap = ({
  center = [36, 263.5],
  zoom = 4,
  setMap,
  ...props
}) => {
  return (
    <MapContainer
      {...props}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      ref={setMap || props.ref}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.children}
    </MapContainer>
  );
};

export const DynamicMarker = ({ position, setPosition, draggable = true, ...props }) => {
  useMapEvent("click", (e) => {
    setPosition(e.latlng);
  });

  return (
    <>{position ? <Marker draggable={draggable} position={position} {...props} /> : null}</>
  );
};
