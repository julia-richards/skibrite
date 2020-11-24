import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Map = ({ lat, long }) => {
	return (
		<MapContainer
			center={[lat, long]}
			zoom={12}
			maxZoom={15}
			attributionControl={true}
			zoomControl={true}
			doubleClickZoom={true}
			scrollWheelZoom={false}
			dragging={true}
			animate={true}
			easeLinearity={0.35}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker position={[lat, long]} />
		</MapContainer>
	);
};

export default Map;
