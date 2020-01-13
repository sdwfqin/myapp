import {Form, Input, Modal} from 'antd';
import React, {Component} from "react";

const {TextArea} = Input;

@Form.create()
class RoleEdit extends Component {

  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {dataSource} = this.props;
        this.props.hideDialog({
          id: dataSource.id,
          ...values
        });
        this.props.form.resetFields();
      }
    });
  };

  handleCancel = () => {
    this.props.hideDialog(undefined);
    this.props.form.resetFields();
  };

  render() {
    const {visible, roleEditLoading, dataSource} = this.props;
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
        title="修改角色"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={roleEditLoading}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="角色名">
            {getFieldDecorator('name', {
              initialValue: dataSource.name,
              rules: [
                {
                  required: true,
                  message: '请输入角色名称',
                },
              ],
            })(<Input placeholder="ROLE_XXXX"/>)}
          </Form.Item>
          <Form.Item label="描述" hasFeedback>
            {getFieldDecorator('description', {
              initialValue: dataSource.description
            })(<TextArea rows={3}/>)}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('remark', {
              initialValue: dataSource.remark
            })(<TextArea rows={3}/>)}
          </Form.Item>
          <Form.Item label="创建者">
            <span className="ant-form-text">{dataSource.userNameCreate}</span>
          </Form.Item>
          <Form.Item label="创建时间">
            <span className="ant-form-text">{dataSource.createTime}</span>
          </Form.Item>
          <Form.Item label="修改时间">
            <span className="ant-form-text">{dataSource.updateTime}</span>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default RoleEdit;
