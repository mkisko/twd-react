import React, {useState} from 'react';
import './spravka.scss';
import {Layout, Badge, Icon} from "antd";
import MyMap from '../map/map';
import FilterControl from "../ui/filterControl/filterControl";
import layers from '../../utils/model';
import {getCount} from "../../utils/getCount";
import axios from 'axios';

const {Header, Content, Sider} = Layout;

const Spravka = () => {
  const [filterState, setFilterState] = useState(layers);
  const [newLine, setNewLine] = useState(false);

  const changeFilter = (id) => () => {
    setFilterState((prevState) => {
      const currentIndex = prevState.findIndex(item => item.id === id);
      const currentObj = {...prevState[currentIndex]};
      currentObj['isActive'] = !currentObj['isActive'];
      return [
        ...prevState.slice(0, currentIndex),
        currentObj,
        ...prevState.slice(currentIndex + 1)
      ];
    })
  };

  const addPoint = async (newPoint) => {
    const {layerId, lineId, pointId, coord, info} = newPoint;
    const newP = {
      id: `f${(+new Date()).toString(16)}`,
      lineId,
      layerId,
      lat: coord.lat,
      lng: coord.lng,
      info,
      history: []
    };
    const indexWithLayer = filterState.findIndex(layer => layer.id === layerId);
    const line = filterState[indexWithLayer]['lines'][lineId];
    const parentIdx = line.findIndex(point => point.id === pointId);
    if (parentIdx > line.length / 2) {
      line.push(newP);
    } else {
      line.unshift(newP);
    }
    const json = JSON.stringify(line);
    const config = {
      mode: 'no-cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await axios.post('http://cp-hack-back.profsoft.online/line/create', json, config);
      const {data} = response;
      console.log(data);
    } catch (e) {
      console.log(e);
    }

  };
  
  const addLine = (form) => {
    const {coord, info} = form;
    setFilterState((prev) => {
      const newState = [...prev];
      const currentLayerIndex = newState.findIndex(layer => layer.id === info.layer);
      const currentLayer = newState[currentLayerIndex];
      const lineId = `f${(+new Date()).toString(16)}`;
      currentLayer.lines[lineId] = [];
      const newLine = currentLayer.lines[lineId];
      const newPoint = {
        id: `f${(+new Date()).toString(16)}`,
        lineId,
        layerId: info.layer,
        lat: coord.lat,
        lng: coord.lng,
        info,
        history: []
      };
      newLine.push(newPoint);

      return [
        ...prev.slice(0, currentLayerIndex),
        currentLayer,
        ...prev.slice(currentLayerIndex + 1)
      ];
    });
  };

  return (
    <>
      <div className='spravka__header'>
        <ul className='spravka__header__list'>
          {filterState.map(filter => {
            const {id, isActive, text} = filter;
            const count = getCount(filter);
            return <FilterControl key={id} isActive={isActive} count={count}
                                  onChange={changeFilter(id)}>{text}</FilterControl>
          })}
        </ul>

        <button onClick={() => setNewLine(true)}><Icon style={{ fontSize: '24px', }} type="plus-square" /></button>
      </div>

      <Content
        className='content'
      >
        <MyMap layers={filterState} addPoint={addPoint} newLine={newLine} setNewLine={setNewLine}
               addLine={addLine}/>
      </Content>
    </>
  );
};

export default Spravka;