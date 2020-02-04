import { Form, Select, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';
import CollectionsPage from './AddTrack.jsx';
import WeekDays from './WeekDays.jsx';
import ChartClass from "./ChartJS.jsx";


const { Option } = Select;

class FormSub extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        console.log('Received values of form: ', values);
      }
    });
  };

  state = {
    loading: false,
    iconLoading: false,
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <div style={{verticalAlign:"middle"}}className="ant-row ant-form-item">
          <h1 className="ant-col ant-col-5"></h1>
          <WeekDays />
          <h1 className="ant-col ant-col-5"></h1>
          <h1 style={{fontSize: "30px",marginRight:"20px",fontWeight:"700",marginTop:"2%",marginBottom:"0"}} className="ant-col ant-col-6">Track your progress</h1>
        </div>
        <Form.Item label="Gym (min)">
          {getFieldDecorator('gym', {
            rules: [{ required: true, message: 'Please enter this value.' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Sleep (hrs)">
          {getFieldDecorator('python', {
            rules: [{ required: true, message: 'Please enter this value.' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Calories">
          {getFieldDecorator('podcast', {
            rules: [{ required: true, message: 'Please enter this value.' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Fap">
          {getFieldDecorator('fap', {
            rules: [{ required: true, message: 'Please enter this value.' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Melatonin">
          {getFieldDecorator('melatonin', {
            rules: [{ required: true, message: 'Please enter this value.' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <div style={{display:"inline-block",marginRight:"10px"}}>
            <CollectionsPage />
          </div>
          <Button type="primary" style={{display:"inline-block"}} htmlType="submit" loading={this.state.loading}>
            Submit
          </Button>
        </Form.Item>
        <h1 className="ant-col ant-col-5"></h1>
        <div style={{width:"600px",height:"400px"}}>
          <ChartClass Height="20" Width="60" />
        </div>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(FormSub);

export default WrappedApp
// ReactDOM.render(<WrappedApp />, mountNode);