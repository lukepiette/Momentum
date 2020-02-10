import React, { useCallback, useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { withRouter, Redirect } from "react-router";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import firebase from "../Firebase.js";
import { AuthContext } from "../Auth.js";



function SignupFormRoot(props){
  const history = useHistory();

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const email = document.getElementById("login_username").value;
      const password = document.getElementById("login_password").value;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
          history.push("/track");
      } catch (error) {
        alert(error);
      }
    },[history]
  );


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
          <Button onClick={handleLogin} type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
              Sign up
          </Button>
            <a onClick={() => history.push("/login")}>Already have an account? <b>Log in</b>.</a>
          </Form.Item>
      </Form>
    </div>
    )
}

const SignupForm = Form.create({ name: 'login' })(SignupFormRoot);

export default withRouter(SignupForm);