import { Form, Select, Input, Button, Icon } from 'antd';
import React, { Component, useState } from 'react';
import CollectionsPage from './TrackFields';
import WeekDays from './WeekDays';
import ChartClass from "./ChartNum";
import { useList, useListVals, useListKeys } from 'react-firebase-hooks/database';
import Cookies from 'js-cookie'
import firebase from '../Firebase';
import AntSpinIcon from './SpinWheel';
import date from 'date-and-time';
import { useHistory, withRouter, Redirect } from "react-router-dom";


const { Option } = Select;





function FormSub(props){
  const [loading,setLoading] = useState(false);
  const { getFieldDecorator } = props.form;

  const uid = Cookies.get('uid');
  const rootItemRef = firebase.database().ref().child('logs').child(uid);
  const rootDatesRef = firebase.database().ref().child('dates').child(uid);
  const history = useHistory();

  const [snapshotKey, loadingKey, errKey] = useListKeys(rootItemRef);
  const [snapshotVal, loadingVal, errVal] = useListVals(rootItemRef);


  function genFormInput(){
    if (snapshotKey == undefined){
      return
    }

    let output = [];
    for (let i=0;i<snapshotKey.length;i++){
      if (snapshotVal[i].type == 'num'){
        output.push(
          <Form.Item label={snapshotKey[i]} >
          {getFieldDecorator(snapshotKey[i], {
            rules: [{ required: true, message: 'Please enter this value.' }],
          })(<Input />)}
        </Form.Item>
        )
      }

      if (snapshotVal[i].type == 'min'){
        output.push(
          <Form.Item label={snapshotKey[i]+' (min)'} >
          {getFieldDecorator(snapshotKey[i], {
            rules: [{ required: true, message: 'Please enter this value.' }],
          })(<Input />)}
        </Form.Item>
        )
      }

      else if (snapshotVal[i].type == 'bin'){
        output.push(
          <Form.Item label={snapshotKey[i]}>
            {getFieldDecorator(snapshotKey[i], {
              rules: [{ required: true, message: 'Please enter this value.' }],
            })(
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>,
            )}
          </Form.Item>
        )
      }
    }
    return output
  }
  

  function dateToNum(date){
      let tmp = date.split('-');
      let month = parseInt(tmp[1])-1;
      let day = parseInt(tmp[2]);
      let totalMonths = [31,28,31,30,31,30,31,31,30,31,30,31]
      let total = day
      for (var i=0;i<month;i++){
          total += totalMonths[i];
      }
      return total;
  }

  function sendToFirebase(data){
    var now = new Date();
    var keys = Object.keys(data);
    var curDate = date.format(now, 'YYYY-MM-DD');
    var curDateNum = dateToNum(curDate);

    for (var i=0;i<keys.length;i++){
      let first = {};
      first[curDateNum] = data[keys[i]];
      let rootReal = rootDatesRef.child(keys[i]);

      rootReal.update(first)
    }
  }


  async function init() {
    await sleep(300);
    // setLoading(false);
    window.location.reload();
  }
  
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   



  if (loadingKey){
    return <AntSpinIcon />
  }
  else if (loadingVal){
    return <AntSpinIcon />
  }



  function handleSubmit(e){
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        sendToFirebase(values);
        init();
      }
    });
  };

  var subItems = genFormInput();


  return (
    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={(e) => handleSubmit(e)}>
      <div style={{verticalAlign:"middle"}}className="ant-row ant-form-item">
        <h1 className="ant-col ant-col-5"></h1>
        <WeekDays />
        <h1 className="ant-col ant-col-5"></h1>
        <h1 style={{fontSize: "30px",marginRight:"20px",fontWeight:"700",marginTop:"2%",marginBottom:"0"}} className="ant-col ant-col-6">Track your progress</h1>
      </div>



      {subItems}
      
      <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
        <div style={{display:"inline-block",marginRight:"10px"}}>
          <CollectionsPage />
        </div>
        <Button type="primary" style={{display:"inline-block"}} htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
      <h1 className="ant-col ant-col-5"></h1>
    </Form>
  );
}

const WrappedApp = Form.create({ name: 'coordinated' })(FormSub);

export default WrappedApp
// ReactDOM.render(<WrappedApp />, mountNode);