import React from 'react';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import {Map, TileLayer, Marker, Popup, GeoJSON, CircleMarker, Polyline} from 'react-leaflet';
import L from 'leaflet';

// const line = [[54.71323033228929, 20.546815395355228], [54.74959231046368, 20.501174926757816]];

const pointerIcon = new L.Icon({
  iconUrl: require('../../assets/marker.svg'),
  iconRetinaUrl: require('../../assets/marker.svg'),
  iconAnchor: [12, 12],
  popupAnchor: [8, -60],
  iconSize: [25, 25]
});

export default class SimpleExample extends React.Component {
  state = {
    // lat: 51.535334,
    // lng: 46.023948,
    lat: 51.53606837416495,
    lng: 46.026490107178695,
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
    console.log(lat, lng);
    this.setState({
      newMarker: {
        isVisible: true,
        lat,
        lng,
      }
    })
  };

  render() {
    const {layers} = this.props;

    const activeLayers = layers.filter(layer => layer.isActive);

    const lines = activeLayers.reduce((acc, layer) => {
      const {id: layerId, color, lines} = layer;
      Object.entries(lines).forEach(([lineId, points]) => {
        const result = {
          layerId,
          color,
          lineId,
          points
        };
        acc.push(result);
      });
      return acc;
    }, []);

    const polylines = lines.map(line => {
      const {color, points, lineId} = line;
      const positions = points.reduce((acc, point) => {
        const {lat, lng} = point;
        const coords = [lat, lng];
        acc.push(coords);
        return acc;
      }, []);
      return <Polyline key={lineId} positions={positions} color={color} weight={5}/>
    });

    const points = lines.flatMap((line) => {
      return line.points;
    });
    
    console.log(points);

    const markers = points.map(point => {
      const {lat, lng, id: pointId, info} = point;
      // console.log(info);
      const position = [lat, lng];
      return (
        <Marker key={pointId} position={position} icon={pointerIcon}>
          <Popup>New Marker</Popup>
        </Marker>)
    });

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

        {polylines}

        {markers}

        {this.state.newMarker.isVisible ? (
          <Marker position={newPosition} icon={pointerIcon}>
            <Popup>New Marker</Popup>
          </Marker>) : null}
      </Map>
    );
  }
}
