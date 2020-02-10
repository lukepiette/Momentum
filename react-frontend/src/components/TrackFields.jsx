import { Button, Modal, Form, Input, Radio, Select } from 'antd';
import React, { Component } from 'react';
import firebase from '../Firebase';
import Cookies from 'js-cookie'

const { Option } = Select;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line

  class extends Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
    //   const { getFieldDecorator } = this.props.form;
      return (
        <Modal
          visible={visible}
          title="Track a new metric"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please enter this value.' }],
              })(<Input />)}
            </Form.Item>
            {/* <Form.Item label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>,
              )}
            </Form.Item> */}
            <Form.Item label="Data Type">
            {getFieldDecorator('datatype', {
                rules: [{ required: true, message: 'Please enter this value.' }],
            })(
                <Select placeholder="Select a option and change input text above">
                <Option value="bin">Yes/No</Option>
                <Option value="num">Number</Option>
                <Option value="min">Minutes</Option>
                <Option value="hrs">Hours</Option>
                <Option value="txt">Text</Option>
                </Select>,
            )}
            </Form.Item>
            <Form.Item label="Tracking Frequency">
            {getFieldDecorator('frequency', {
                rules: [{ required: true, message: 'Please enter this value.' }],
            })(
                <Select placeholder="Select a option and change input text above">
                <Option value="daily">Daily</Option>
                {/* <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option> */}
                </Select>,
            )}
            </Form.Item>


          </Form>
        </Modal>
      );
    }
  },
);



class CollectionsPage extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };


  sendToFirebase = (data) =>{
    let uid = Cookies.get('uid');
    let rootItemRef = firebase.database().ref().child('logs').child(uid);
    let first = {};
    first['type'] = data['datatype'];
    let rootReal = rootItemRef.child(data['title'].toLowerCase());
    rootReal.update(first);
    console.log('success!');
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      let allVals = [];
      allVals.push(values.title);
      allVals.push(values.datatype);
      allVals.push(values.frequency);
      // document.getElementById('values').value = allVals;
      this.setState({ visible: false });

      this.sendToFirebase(values);

      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="default" onClick={this.showModal}>
          Add Item
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


export default CollectionsPage