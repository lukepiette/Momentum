import React, { Component } from 'react';
// import logo from './logo.svg';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import './App.css';
import LayoutBack from './components/TrackPAGE';
import Metric from './components/MetricPAGE';
import LoginForm from './components/Login';
import FireTest from './components/Firebase';
import SignupForm from './components/Signup';


import {Router, Route, Redirect, Switch} from "react-router";
import { BrowserRouter } from 'react-router-dom';

// import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
// import Cookies from 'js-cookie';


import Firetest from './components/TestFire';



// import WrappedApp from './components/Form';
// import ProgressBar from './components/Progress.jsx';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  render() {
    return (
      // <AuthProvider>
      <BrowserRouter>
          <Switch>
            <Route path={"/create"} component={SignupForm}/>
            <Route path={"/login"} component={LoginForm}/>
            <PrivateRoute path={"/track"} component={LayoutBack}/>
            <PrivateRoute path={"/metric/:name"} component={Metric}/>


            <Route path={"/test"} component={Firetest} />
            <Route render={() => <h1>Not Found</h1>}/>
          </Switch>
      </BrowserRouter>
      // </AuthProvider>
    );
  }
}

export default App


// export default SliderDemo;
// export default SliderDemo;