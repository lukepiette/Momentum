import { Button, Modal, Form, Input, Radio, Select } from 'antd';
import React, { Component } from 'react';

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
                <Option value="yes/no">Yes/No</Option>
                <Option value="number">Number</Option>
                <Option value="minutes">Minutes</Option>
                <Option value="hours">Hours</Option>
                <Option value="text">Text</Option>
                </Select>,
            )}
            </Form.Item>
            <Form.Item label="Tracking Frequency">
            {getFieldDecorator('frequency', {
                rules: [{ required: true, message: 'Please enter this value.' }],
            })(
                <Select placeholder="Select a option and change input text above">
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
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

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
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