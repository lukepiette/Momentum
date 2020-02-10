import React, { useCallback, useContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { withRouter, Redirect } from "react-router";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import firebase from "../Firebase.js";
// import { AuthContext } from "../Auth.js";
import Cookies from 'js-cookie';
import AuthUser from '../Auth';



function LoginFormRoot(props,metricName){
  const history = useHistory();
  
  // if (AuthUser){
  //   history.push("/track");
  // }

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const email = document.getElementById("login_username").value;
      const password = document.getElementById("login_password").value;
      var tmp = props.form.validateFields((err, values) => {
        if (!err) {
         return true;
        }
        return false
      });

      try {
          if (tmp){
            await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
            Cookies.set('uid', firebase.auth().currentUser.uid)
            history.push("/track");
          }
      }
      catch (error) {
        alert(error);
      }
    },[history]
  );

  // const { currentUser } = useContext(AuthContext);

  // if (currentUser){
  //   if (typeof(metricName) == 'Object'){
  //     var routeMetric = "metric/" + metricName;
  //     return <Redirect to={routeMetric} />;
  //   }
  //   return <Redirect to="/track" />;
  // }



  const { getFieldDecorator } = props.form;
  return (
    <div style={{width:"300px",height:"300px",position:"absolute",top:"30%",left:"41%"}}>
      <Form className="login-form">
          <Form.Item>
          {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
          })(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              />,
          )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
          })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              />,
          )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a style={{marginLeft:"22%"}} className="login-form-forgot" href="">
              Forgot password
          </a>
          <Button onClick={handleLogin} type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
              Log in
          </Button>
          <a onClick={() => history.push("/create")}>Don't have an account? <b>Sign up</b>.</a>
          </Form.Item>
      </Form>
    </div>
    )
}

const LoginForm = Form.create({ name: 'login' })(LoginFormRoot);

export default withRouter(LoginForm);