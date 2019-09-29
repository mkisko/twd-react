import React from 'react';
import './mainPage.scss';
import {Layout, Icon, Dropdown} from "antd";
import {ReactComponent as CallIcon} from "../../assets/sidebar/call-centre.svg";
import {ReactComponent as OtchetIcon} from "../../assets/sidebar/otchet.svg";
import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
import Spravka from "../spravka/spravka";
import Otchet from "../otchet/otchet";

const {Header, Sider} = Layout;

const MainPage = ({exit}) => {
  const menu = (
    <div className='profile-exit' onClick={exit}>
      Выйти
    </div>
  );

  return (
    <Layout className='main-page'>
      <Header className="header">
        <div style={{color: "white"}}>Название</div>

        <Dropdown overlay={menu}>
          <div className='admin'>
            <Icon type="user" className="admin__icon"/>
            <div className='admin__text'>Администратор</div>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={130} className='sidebar' style={{background: "#60637C"}}>
          <NavLink to='/call' className='sidebar__item' activeClassName='sidebar__item is-active'>
            <CallIcon className='sidebar__item__icon'/>
            <p className='sidebar__item__text'>Диспетчерская</p>
          </NavLink>

          <NavLink to='/otchet' className='sidebar__item' activeClassName='sidebar__item is-active'>
            <OtchetIcon className='sidebar__item__icon'/>
            <p className='sidebar__item__text'>Отчеты</p>
          </NavLink>

        </Sider>

        <Layout style={{background: "white"}}>
          <Switch>
            <Route path='/call'>
              <Spravka/>
            </Route>

            <Route path='/otchet'>
              <Otchet/>
            </Route>

            <Redirect to='/call'/>
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
