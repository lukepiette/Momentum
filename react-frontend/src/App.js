import React, { Component } from 'react';
// import logo from './logo.svg';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import './App.css';
import LayoutBack from './components/Layout';
// import WrappedApp from './components/Form';
// import ProgressBar from './components/Progress.jsx';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  render() {
    return (
    <div>
      <LayoutBack />
    </div>);
  }
}

export default App


// export default SliderDemo;
// export default SliderDemo;