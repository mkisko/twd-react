import React, {useState} from 'react';
import './spravka.scss';
import {Layout , Badge} from "antd";
import MyMap from '../map/map';
import FilterControl from "../ui/filterControl/filterControl";
import layers from '../../utils/model';
import {getCount} from "../../utils/getCount";

const {Header, Content, Sider} = Layout;

const Spravka = () => {
  const [filterState, setFilterState] = useState(layers);

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

  return (
    <>
      <div className='spravka__header'>
        <ul className='spravka__header__list'>
          {filterState.map(filter => {
            const {id, isActive, text} = filter;
            const count = getCount(filter);
            return <FilterControl key={id} isActive={isActive} count={count} onChange={changeFilter(id)}>{text}</FilterControl>
          })}
        </ul>
      </div>

      <Content
        className='content'
      >
        <MyMap layers={filterState}/>
      </Content>
    </>
  );    
};

export default Spravka;