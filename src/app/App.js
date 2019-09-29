import React, {useState} from 'react';
import './App.scss';
import LoginForm from '../components/loginForm/loginForm';
import ForgetForm from '../components/forgerForm/forgetForm';
import {Route, Switch, Redirect} from 'react-router-dom';
import MainPage from "../components/mainPage/mainPage";

const App = () => {
  const [isAuth, setAuth] = useState(false);

  const exitFromProfile = () => {
    setAuth(false);
  };

  let routes = (
    <>
      <Route path='/'>
        <MainPage exit={exitFromProfile}/>
      </Route>
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
