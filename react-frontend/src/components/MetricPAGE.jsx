import React, { Component, useState, useContext, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import WrappedApp from './TrackForm';
import CollectionsPage from './TrackFields';
import ChartClass from './ChartNum';
import { useHistory, withRouter, Redirect } from "react-router-dom";
// import { AuthContext } from "../Auth.js";
import firebase from '../Firebase';
import { useList, useListVals, useListKeys } from 'react-firebase-hooks/database';
import AntSpinIcon from './SpinWheel';
import Cookies from 'js-cookie'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function arrayGen(len){
  var foo = new Array(len);
  for(var i = 0; i < len; i++){
    foo[i] = i;
  }
  return foo
}



function Metric(props){
  const [collapsed,setCollapsed] = useState(false);
  const history = useHistory();

  const uid = Cookies.get('uid');

  // const uid = 'sYeArYqMNjXzI272M6bAefQXo6u1';
  const dataTag = props.match.params.name
  const rootItemRef = firebase.database().ref().child('logs').child(uid).child(dataTag);
  const rootDatesRef = firebase.database().ref().child('dates').child(uid);
  // const dataHolder = useData(rootDatesRef);

  const [snapshot, loading, err] = useListVals(rootDatesRef.child(dataTag));
  const [snapshotRef, loadingRef, errRef] = useListKeys(rootDatesRef);
  const [snapshotType, loadingType, errType] = useListVals(rootItemRef);


  // const [snapType, loadingType, errType] = useListVals(rootItemRef);



  function returnSub(data){
    var tmp = [];
    for (let i = 0; i < data.length; i++){
      tmp.push(<Menu.Item onClick={() => history.push(data[i])} key={i+3}>{data[i]}</Menu.Item>)
    }
    return tmp
  }

  const onCollapse = collapsed => {
    if (collapsed){
      setCollapsed(true);
    }
    else{
      setCollapsed(false);
    }
  };

  function binaryToAr(data){
    let arr = [];
    for (var i=0;i<data.length;i++){
      if (data[i] == 'yes'){
        arr.push(1);
      }
      else{
        arr.push(0)
      }
    }
    return arr
  }


  if (err){
    return <h1>{err}</h1>
  }

  else if (loading || loadingRef || loadingType){
    return <AntSpinIcon />
  }

  else{
    console.log(snapshotType);
    if (snapshotType == 'num' || snapshotType == 'min'){
      var type = 'line';
      var inData = snapshot;
    }
    else if (snapshotType == 'bin'){
      var type = 'bar';
      var inData = binaryToAr(snapshot);
    }
    
    var chartArgs = arrayGen(snapshot.length)
    var title = dataTag[0].toUpperCase() + dataTag.slice(1,dataTag.length);
    var subItems = returnSub(snapshotRef);


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item onClick={() => history.push('../track')} key="1">
              <Icon type="edit" />
              <span>Track</span>
            </Menu.Item>
            <Menu.Item onClick={() => history.push('../track')} key="2">
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
            <div className="ant-row ant-form-item">
                <h1 className="ant-col ant-col-5"></h1>
                <h1 style={{fontSize: "30px",marginRight:"20px",fontWeight:"700",marginTop:"2%",marginBottom:"0"}} className="ant-col ant-col-6">{title}</h1>
            </div>
            <div className="ant-row ant-form-item">
                <h1 className="ant-col ant-col-5"></h1>
                <div className="ant-col ant-col-5" style={{width:"50rem",height:"30rem"}}>
                    <ChartClass Data={inData} Labels={chartArgs} Title={title} Type={type} Height="20" Width="60" />
                </div>
            </div>     
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Momentum ©2020</Footer> */}
        </Layout>

        {/* <h1 className="ant-col ant-col-5"></h1> */}
      </Layout>
    );
  }
}


export default withRouter(Metric)



