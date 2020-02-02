<Form.Item label="Dragger">
{getFieldDecorator('dragger', {
  valuePropName: 'fileList',
  getValueFromEvent: this.normFile,
})(
  <Upload.Dragger name="files" action="/upload.do">
    <p className="ant-upload-drag-icon">
      <Icon type="inbox" />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
  </Upload.Dragger>,
)}
</Form.Item>
