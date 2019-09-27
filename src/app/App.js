import React, {useState} from 'react';
import './App.scss';
import MyMap from '../components/map/map';
import LoginForm from '../components/loginForm/loginForm';
import ForgetForm from '../components/forgerForm/forgetForm';
import {Route, Switch, Redirect} from 'react-router-dom';

const App = () => {
  const [isAuth, setAuth] = useState(false);

  let routes = (
    <>
      <Route path='/' exact component={MyMap}/>
      <Redirect to='/'/>
    </>
  );

  routes = !isAuth ? (
    <>
      <Route path='/forget' component={ForgetForm}/>
      <Route path='/login' render={() => <LoginForm auth={setAuth}/>}/>
      <Redirect to='/login'/>
    </>
  ) : routes;

  return (
    <>
      <Switch>
        {routes}
      </Switch>
    </>
  );
};

export default App;
