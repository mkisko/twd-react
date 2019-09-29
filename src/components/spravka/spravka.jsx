import React, {useState, useEffect} from 'react';
import './spravka.scss';
import {Layout, Badge, Icon} from "antd";
import MyMap from '../map/map';
import FilterControl from "../ui/filterControl/filterControl";
import layers from '../../utils/model';
import {getCount} from "../../utils/getCount";
import axios from '../../utils/axiosConfig';

const {Header, Content, Sider} = Layout;

function fetchData(url, set) {
  try {
    const config = {
      mode: 'no-cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const response = axios.get(url, config);
    const data = response.data;
    set(data);
    console.log(data);
  } catch (e) {
    console.log(e)
  }
}

const Spravka = () => {
  const [filterState, setFilterState] = useState(null);
  const [newLine, setNewLine] = useState(false);

  useEffect(() => {
    axios.get('/index')
      .then((response) => response.data)
      .then(data => setFilterState(data))
      .catch(err => console.log(err));
    // setFilterState(layers)
  }, []);

  if (!filterState) {
    return null;
  }

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
    setFilterState((p) => {
      const layerIdx = p.findIndex(l => l.id === layerId);
      const newState = {...p[layerIdx]};
      const arr = newState['lines'][lineId];
      const parentIdx = arr.findIndex(par => par.id === pointId);
      if (parentIdx > arr.length / 2) {
        newState['lines'][lineId].push(newP);
      } else {
        newState['lines'][lineId].unshift(newP);
      }

      return [
        ...p.slice(0, layerIdx),
        newState,
        ...p.slice(layerIdx + 1)
      ];
      console.log(newState);
    });
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
  
  // console.log(filterState);

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

        <button onClick={() => setNewLine(true)}><Icon style={{fontSize: '24px',}} type="plus-square"/></button>
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