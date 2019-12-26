import {Form, Input, Modal} from 'antd';
import React, {Component} from "react";

const {TextArea} = Input;

@Form.create()
class RoleAdd extends Component {

  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.hideDialog({...values});
      }
    });
  };

  handleCancel = () => {
    this.props.hideDialog(undefined);
  };

  render() {
    const {visible, roleAddLoading} = this.props;
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };
    return (
      <Modal
        title="添加角色"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={roleAddLoading}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="角色名">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入角色名称',
                },
              ],
            })(<Input placeholder="ROLE_XXXX"/>)}
          </Form.Item>
          <Form.Item label="描述" hasFeedback>
            {getFieldDecorator('description', {})(<TextArea rows={3}/>)}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('remark', {})(<TextArea rows={3}/>)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default RoleAdd;
