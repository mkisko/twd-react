import React from 'react';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import {Map, TileLayer, Marker, Popup, GeoJSON, CircleMarker, Polyline} from 'react-leaflet';
import L from 'leaflet';
import warning from '../../assets/marker-warning.svg';
import danger from '../../assets/marker-danger.svg';
import success from '../../assets/marker-success.svg';
import ShowInfoModal from "../ui/showInfoModal/showInfoModal";
import CreateNewModal from "../ui/createNewModal/createNewModal";

// const line = [[54.71323033228929, 20.546815395355228], [54.74959231046368, 20.501174926757816]];

const getPointerIcon = (status) => {
  let icon;
  switch (status) {
    case 'danger':
      icon = danger;
      break;
    case 'warning':
      icon = warning;
      break;
    case 'success':
      icon = success;
      break;
    default:
      icon = success;
  }
  return new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: [12, 12],
    popupAnchor: [8, -60],
    iconSize: [25, 25]
  })
};

export default class SimpleExample extends React.Component {
  state = {
    // lat: 51.535334,
    // lng: 46.023948,
    lat: 51.53606837416495,
    lng: 46.026490107178695,
    zoom: 14,

    infoModalOpen: false,
    infoModalContentId: null,

    createModalOpen: false,
    addLineId: null,
    addLayerId: null,
    addPointId: null,

    creationMode: false,
    newLat: null,
    newLng: null
  };

  handleClick = (e) => {
    if (this.state.creationMode || this.props.newLine) {
      const {latlng} = e;
      const {lat, lng} = latlng;
      console.log(lat, lng);

      this.setState({
        newLat: lat,
        newLng: lng,
        createModalOpen: true,
        creationMode: false,
      })
    }
  };

  // TOGGLE INFO MODAL
  openInfoModal = (id) => {
    this.props.setNewLine(false);
    this.setState({infoModalOpen: true, infoModalContentId: id, creationMode: false})
  };

  closeInfoModal = () => {
    this.setState({infoModalOpen: false})
  };

  openCreateModal = () => {
    this.setState({createModalOpen: true});
  };

  closeCreateModal = () => {
    this.setState({createModalOpen: false, addLineId: null, addPointId: null, addLayerId: null})
  };

  continueLine = (addLineId, addLayerId, addPointId) => {
    this.setState({addLineId, addLayerId, addPointId, creationMode: true});
    this.closeInfoModal();
  };

  addToLine = (form) => {
    this.closeCreateModal();
    const date = Date.now();
    const info = {...form, date};
    const coord = {lat: this.state.newLat, lng: this.state.newLng};
    const lineId = this.state.addLineId;
    const layerId = this.state.addLayerId;
    const pointId = this.state.addPointId;
    const result = {
      info,
      coord,
      lineId,
      layerId,
      pointId
    };
    this.props.addPoint(result);
    this.setState({addLineId: null, addLayerId: null, addPointId: null, newLat: null, newLng: null});
  };

  createLine = (form) => {
    this.closeCreateModal();
    this.props.setNewLine(false);

    const date = Date.now();
    const info = {...form, date};
    const coord = {lat: this.state.newLat, lng: this.state.newLng};
    const result = {
      info,
      coord,
    };
    this.props.addLine(result);
    this.setState({addLineId: null, addLayerId: null, addPointId: null, newLat: null, newLng: null});
  };

  render() {
    console.log(this.props.newLine);
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

    const pointInfo = this.state.infoModalContentId ? points.find(item => item.id === this.state.infoModalContentId) : null;


    const markers = points.map(point => {
      const {lat, lng, id: pointId, info} = point;
      // console.log(info);
      const position = [lat, lng];
      return (
        <Marker key={pointId} position={position} icon={getPointerIcon(info.status)}
                onClick={() => this.openInfoModal(pointId)}>
        </Marker>)
    });

    const position = [this.state.lat, this.state.lng];
    return (
      <>
        <Map center={position} zoom={this.state.zoom} maxZoom={17} onClick={this.handleClick}>
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            maxZoom='17'
            minZoom='1'
          />

          {polylines}

          {markers}

          {/*{this.state.newMarker.isVisible ? (*/}
          {/*  <Marker position={newPosition} icon={pointerIcon}>*/}
          {/*  </Marker>) : null}*/}
        </Map>

        <ShowInfoModal continueLine={this.continueLine} closeModal={this.closeInfoModal} info={pointInfo}
                       isOpen={this.state.infoModalOpen}/>
        <CreateNewModal createLineMode={this.props.newLine} isOpen={this.state.createModalOpen} closeModal={this.closeCreateModal} submit={this.addToLine} createLine={this.createLine}/>
      </>
    );
  }
}
