import React, { useRef, useState, useEffect, useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import marker from '../../images/marker.png'
import { offerContext } from '../../offerContext';
import { Map } from 'react-leaflet'
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'

const markerIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [35, 35],
})
// make new leaflet element
const Search = (props) => {
    const map = useMap();
    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            style: 'bar',
            showMarker: true,
            showPopup: true,
            autoClose: true,
            retainZoomLevel: true,
            animateZoom: true,
            keepResult: true,
            searchLabel: 'search',

            marker: {
                icon: L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [10, 41],
                    popupAnchor: [2, -40],
                    iconUrl: marker,
                    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
                })
            }
        });

        console.log(searchControl)
        map.addControl(searchControl);

        function searchEventHandler(result) {
            console.log(result.location);
        }

        map.on('geosearch/showlocation', searchEventHandler);
        return () => map.removeControl(searchControl);
    }, []);

    return null;
}





function Map2() {
    const mapRef = useRef();
    const { center, setCenter } = useContext(offerContext)
    const [load, setLoad] = useState(false)
    const ZOOM_LEVEL = 9
    function showPosition(position) {
        setLoad(true)
        console.log("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude);
        console.log(position)
        setCenter({ lat: position.coords.latitude, lon: position.coords.longitude });
        setLoad(false)
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }, [navigator.geolocation])


    return (
        <><MapContainer
            center={center}
            zoom={9}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
            ref={mapRef}
        >
            <Search provider={new OpenStreetMapProvider()} />
            <TileLayer
                url='https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=GCrOaQueIQ4AmML6iiTF'
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            />
            <Marker position={center} icon={markerIcon}>

            </Marker>
        </MapContainer>
        </>
    )
}

export default Map2