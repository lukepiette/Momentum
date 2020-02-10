import { Button, Modal, Form, Input, Radio, Select } from 'antd';
import React, { Component, useState } from 'react';
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

function CollectionsPage(props){
  const [visible,setVisible] = useState(false);
  const [formRef,setFormRef] = useState();
  const uid = Cookies.get('uid');
  const rootItemRef = firebase.database().ref().child('logs').child(uid);


  function showModal(){
    setVisible(true)
  };

  function handleCancel(){
    setVisible(false)
  };


  function sendToFirebase(data){
    let first = {};
    first['type'] = data['datatype'];
    let rootReal = rootItemRef.child(data['title']);
    rootReal.update(first);
    console.log('success!');
  };

  function handleCreate(){
    // const { form } = formRef.props;
    // form.validateFields((err, values) => {
    //   if (err) {
    //     return;
    //   }

    //   console.log('Received values of form: ', values);
    //   let allVals = [];
    //   allVals.push(values.title);
    //   allVals.push(values.datatype);
    //   allVals.push(values.frequency);
    //   // document.getElementById('values').value = allVals;
    //   setVisible(false)

    //   sendToFirebase(values);

    //   form.resetFields();
    // });
    console.log('ya')
  };

  function saveFormRef(formRef){
    setFormRef(formRef);
    console.log('set!');
  };

  return (
    <div>
      <Button type="default" onClick={showModal()}>
        Add Item
      </Button>
      <CollectionCreateForm
        wrappedComponentRef={saveFormRef}
        visible={visible}
        onCancel={handleCancel()}
        onCreate={handleCreate()}
      />
    </div>
  );

}


export default CollectionsPage