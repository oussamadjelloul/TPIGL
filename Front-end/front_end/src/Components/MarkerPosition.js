import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import icon from "./icon";

const MarkerPosition = ({ pos }) => {
  return <Marker position={pos} icon={icon} draggable={true} />;
};

export default MarkerPosition;
