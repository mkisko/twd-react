import React, {useState} from 'react';
import './spravka.scss';
import {Layout, Badge} from "antd";
import MyMap from '../map/map';
import FilterControl from "../ui/filterControl/filterControl";
import layers from '../../utils/model';
import {getCount} from "../../utils/getCount";

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

  const addPoint = (newPoint) => {
    const {layerId, lineId, pointId, coord, info} = newPoint;
    setFilterState((prev) => {
      const newState = [...prev];
      const currentLayerIndex = newState.findIndex(layer => layer.id === layerId);
      const currentLayer = newState[currentLayerIndex];
      const targetLine = currentLayer['lines'][lineId];
      const startPointIndex = targetLine.findIndex(point => point.id === pointId);
      const newPoint = {
        id: `f${(+new Date()).toString(16)}`,
        lineId,
        layerId,
        lat: coord.lat,
        lng: coord.lng,
        info,
        history: []
      };
      console.log('startPointIndex', startPointIndex);
      if (startPointIndex < targetLine.length / 2) {
        targetLine.unshift(newPoint);
      } else {
        targetLine.push(newPoint);
      }

      return [
        ...prev.slice(0, currentLayerIndex),
        currentLayer,
        ...prev.slice(currentLayerIndex + 1)
      ];
    })
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

        <button onClick={() => setNewLine(true)}>Add Line</button>
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