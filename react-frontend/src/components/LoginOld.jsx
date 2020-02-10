import React, { Component, useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from "react-router";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import firebase from './Firebase';
import { AuthContext } from "../Auth.js";


function NormalLoginForm(history,props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const {handleLogin} = useCallback(
    //     async event => {
    //       event.preventDefault();
    //       const { email, password } = event.target.elements;
    //       try {
    //         await firebase
    //           .auth()
    //           .signInWithEmailAndPassword(email.value, password.value);
    //         history.push("/track");
    //       } catch (error) {
    //         alert(error);
    //       }
    //     },
    //     [history]
    //   );

    function handleSubmit(e){
        e.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
            const password = document.getElementById("login_password").value;
            const email = document.getElementById("login_username").value;
            try {
                await firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password);
                history.push("/track");
              } 
            catch (error) {
                alert(error);
            }
          }
        });
    }

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
      return <Redirect to="/track" />;
    }


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
            <Button onClick={(e) => handleSubmit(e)} type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                Log in
            </Button>
            Or <a href="">register now!</a>
            </Form.Item>
        </Form>
      </div>
    );
}

const LoginForm = Form.create({ name: 'login' })(NormalLoginForm);

export default withRouter(LoginForm)
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);


