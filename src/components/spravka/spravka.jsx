import React from 'react';
import './spravka.scss';
import {Layout} from "antd";
import MyMap from '../map/map';

const {Header, Content, Sider} = Layout;


const Spravka = () => {
  return (
    <>
      <div className='spravka__head'>ГОЛОВА</div>

      <Content
        className='content'
      >
        <MyMap />
      </Content>
    </>
  );    
};

export default Spravka;