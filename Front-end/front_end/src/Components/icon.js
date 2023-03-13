import L, {popup} from "leaflet";

import icon from "../assets/img/icon-location.svg";

export default L.icon({
  iconSize: [32, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon,
});
