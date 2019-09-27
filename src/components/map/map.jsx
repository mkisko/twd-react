import React from 'react';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export const pointerIcon = new L.Icon({
  iconUrl: require('../../assets/marker-icon.png'),
  iconRetinaUrl: require('../../assets/marker-icon.png'),
  iconAnchor: [5, 55],
  popupAnchor: [8, -60],
});


export default class SimpleExample extends React.Component {
  state = {
    lat: 51.535334,
    lng: 46.023948,
    zoom: 17
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    
    return (
      <Map center={position} zoom={this.state.zoom} maxZoom={17}>
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          maxZoom='17'
        />

        <Marker position={position} icon={pointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}
