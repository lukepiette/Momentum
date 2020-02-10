import React, { Component, useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import WrappedApp from './TrackForm';
import CollectionsPage from './TrackFields';
import { useHistory, withRouter } from "react-router-dom";
import { useList, useListVals, useListKeys } from 'react-firebase-hooks/database';
import AntSpinIcon from './SpinWheel';
import firebase from '../Firebase';
import Cookies from 'js-cookie'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function LayoutBack(props){
  const [collapsed,setCollapsed] = useState(false);
  const history = useHistory();

  const uid = Cookies.get('uid');
  const rootDatesRef = firebase.database().ref().child('dates').child(uid);
  const [snapshotRef, loadingRef, errRef] = useListKeys(rootDatesRef);

  const onCollapse = collapsed => {
    if (collapsed){
      setCollapsed(true);
    }
    else{
      setCollapsed(false);
    }
  };


  function returnSub(data){
    var tmp = [];
    for (let i = 0; i < data.length; i++){
      tmp.push(<Menu.Item onClick={() => history.push('metric/'+data[i])} key={i+3}>{data[i]}</Menu.Item>)
    }
    return tmp
  }

  if (loadingRef){
    return <AntSpinIcon />
  }

  var subItems = returnSub(snapshotRef);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" onClick={() => history.push('../track')}>
            <Icon type="edit" />
            <span>Track</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="line-chart" onClick={() => history.push('../track')} />
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
            {subItems}
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


export default withRouter(LayoutBack)



{/* <div style={{width:"600px",height:"400px"}}>
<ChartClass Height="20" Width="60" />
</div> */}