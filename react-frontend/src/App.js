import React, { Component } from 'react';
// import logo from './logo.svg';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import './App.css';
import LayoutBack from './components/TrackPAGE';
import Metric from './components/MetricPAGE';

import {Router, Route} from "react-router";
import { BrowserRouter } from 'react-router-dom'



// import WrappedApp from './components/Form';
// import ProgressBar from './components/Progress.jsx';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path={"/track"} component={LayoutBack}/>
          <Route path={"/metric"} component={Metric}/>
        </div>
        {/* <LayoutBack /> */}
      </BrowserRouter>
    );
  }
}

export default App


// export default SliderDemo;
// export default SliderDemo;