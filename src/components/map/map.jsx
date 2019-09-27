import React from 'react';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import {Map, TileLayer, Marker, Popup, GeoJSON, CircleMarker} from 'react-leaflet';
import L from 'leaflet';

const pointerIcon = new L.Icon({
  iconUrl: require('../../assets/marker-icon.png'),
  iconRetinaUrl: require('../../assets/marker-icon.png'),
  iconAnchor: [5, 55],
  popupAnchor: [8, -60],
});

export default class SimpleExample extends React.Component {
  state = {
    // lat: 51.535334,
    // lng: 46.023948,
    lat: 54.708838,
    lng: 20.511507,
    zoom: 12,
    newMarker: {
      isVisible: false,
      lat: 20,
      lng: 20,
    }
  };

  handleClick = (e) => {
    const {latlng} = e;
    const {lat, lng} = latlng;
    this.setState({newMarker: {
        isVisible: true,
        lat,
        lng,
      }})
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    const newPosition = [this.state.newMarker.lat, this.state.newMarker.lng];
    return (
      <Map center={position} zoom={this.state.zoom} maxZoom={17} onClick={this.handleClick}>
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          maxZoom='17'
          minZoom='1'
        />
        <CircleMarker center={position} radius={5}/>

        <Marker position={position} icon={pointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>

        {this.state.newMarker.isVisible ? (
          <Marker position={newPosition} icon={pointerIcon}>
            <Popup>New Marker</Popup>
          </Marker>) : null}
      </Map>
    );
  }
}
