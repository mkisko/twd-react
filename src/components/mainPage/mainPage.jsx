import React from 'react';
import './mainPage.scss';
import {Layout, Icon, Dropdown} from "antd";
import {ReactComponent as CallIcon} from "../../assets/sidebar/call-centre.svg";
import {ReactComponent as ObrasheniaIcon} from "../../assets/sidebar/obrashenia.svg";
import {ReactComponent as OtchetIcon} from "../../assets/sidebar/otchet.svg";
import {ReactComponent as SpravkaIcon} from "../../assets/sidebar/spravka.svg";
import {ReactComponent as ZadaniaIcon} from "../../assets/sidebar/zadanya.svg";
import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
import Spravka from "../spravka/spravka";
import Call from "../call/call";
import Otchet from "../otchet/otchet";
import Obrashenia from "../obrashenia/obrashenia";
import Zadania from "../zadania/zadania";

const {Header, Content, Sider} = Layout;

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

          <NavLink to='/spravka' className='sidebar__item' activeClassName='sidebar__item is-active'>
            <SpravkaIcon className='sidebar__item__icon'/>
            <p className='sidebar__item__text'>Справочники</p>
          </NavLink>

          <NavLink to='/obrashenia' className='sidebar__item' activeClassName='sidebar__item is-active'>
            <ObrasheniaIcon className='sidebar__item__icon'/>
            <p className='sidebar__item__text'>Обращения</p>
          </NavLink>

          <NavLink to='/zadania' className='sidebar__item' activeClassName='sidebar__item is-active'>
            <ZadaniaIcon className='sidebar__item__icon'/>
            <p className='sidebar__item__text'>Задания</p>
          </NavLink>

        </Sider>

        <Layout style={{background: "white"}}>
          <Switch>
            <Route path='/call'>
              <Call/>
            </Route>

            <Route path='/otchet'>
              <Otchet/>
            </Route>

            <Route path='/spravka'>
              <Spravka/>
            </Route>

            <Route path='/obrashenia'>
              <Obrashenia/>
            </Route>

            <Route path='/zadania'>
              <Zadania/>
            </Route>

            <Redirect to='/spravka'/>
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
