import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import ProgressBar from "./Progress.jsx";
import WrappedApp from './Form.jsx';
import CollectionsPage from './AddTrack.jsx';
import { useHistory, withRouter } from "react-router-dom";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function HomeButton() {
  const history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

const routeTrack = (props) => {
  console.log(props)
  // props.history.push('/dashboard')
}


class LayoutBack extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="edit" />
              <span>Track</span>
            </Menu.Item>
            <Menu.Item onClick={routeTrack} key="2">
              <Icon type="line-chart" />
              <span>Dashboard</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="unordered-list" />
                  <span>Items</span>
                </span>
              }
            >
              <Menu.Item key="3">Fap</Menu.Item>
              <Menu.Item key="4">Gym</Menu.Item>
              {/* <Menu.Item key="5">Alex</Menu.Item> */}
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="sliders" />
              <span>Weekly Review</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          {/* <ProgressBar /> */}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Track</Breadcrumb.Item>
            </Breadcrumb>
            <WrappedApp />
            {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Momentum ©2020</Footer> */}
        </Layout>
      </Layout>
    );
  }
}


export default withRouter(LayoutBack)