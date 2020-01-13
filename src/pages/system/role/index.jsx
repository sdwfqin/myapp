import {Button, Card, Col, Divider, Popconfirm, Row, Table} from 'antd';
import React, {Component} from 'react';
import {connect} from 'dva';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import styles from '@/utils/utils.less';
import RoleAdd from "@/pages/system/role/components/RoleAdd";
import RoleEdit from "@/pages/system/role/components/RoleEdit";

class Role extends Component {

  state = {
    addModalVisible: false,
    editModalVisible: false,
    editModalData: {},
    pagination: {
      current: 1,
      defaultPageSize: 10
    },
    roleTitles: [
      {
        title: '角色',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        ellipsis: 'true',
        width: '18%'
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        ellipsis: 'true',
        width: '25%'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center',
        ellipsis: 'true',
        width: '25%'
      },
      {
        title: '创建者',
        dataIndex: 'userNameCreate',
        key: 'userNameCreate',
        align: 'center',
        ellipsis: 'true',
        width: '16%'
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        width: '16%',
        render: (text, record) => (
          <span>
            <a onClick={() => this.editItem(record)}>编辑</a>
            <Divider type="vertical"/>
            <Popconfirm
              title="确认要删除当前角色吗？"
              onConfirm={() => this.deleteItem(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      }
    ]
  };

  componentDidMount() {
    const {pagination} = this.state;

    this.handleTableDatas({
      limit: pagination.current,
      offset: pagination.defaultPageSize
    });
  }

  /**
   * 加载数据
   * @param payload
   */
  handleTableDatas = payload => {
    const {dispatch} = this.props;

    dispatch({
      type: 'role/fetchRoleList',
      payload,
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    this.handleTableDatas({
      limit: pager.current,
      offset: pager.defaultPageSize
    });
  };

  showAddModal = () => {
    this.setState({
      addModalVisible: true
    });
  };

  hideAddModal = (value) => {
    this.setState({
      addModalVisible: false
    });
    if (value !== undefined) {
      const {dispatch} = this.props;

      dispatch({
        type: 'role/fetchRoleAdd',
        payload: {
          ...value
        },
      });
    }
  };

  hideEditModal = (value) => {
    console.log(value)
    this.setState({
      editModalVisible: false
    });
    if (value !== undefined) {
      const {dispatch} = this.props;

      dispatch({
        type: 'role/fetchRoleEdit',
        payload: {
          ...value
        },
      });
    }
  };

  editItem = (record) => {
    console.log(record)
    this.setState({
      editModalData: record,
      editModalVisible: true
    });
  };

  deleteItem = (id) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'role/fetchRoleDelete',
      payload: {
        roleId: id
      },
    });
  };

  render() {
    const {role = {}, roleListLoading, roleAddLoading, roleEditLoading} = this.props;
    const {roleDataSource} = role;
    const {roleTitles, pagination, addModalVisible, editModalVisible,editModalData} = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <Row gutter={16} type="flex" justify="space-between" align="middle"
               className={styles.tableHeadRow}>
            <Col span={12} align="left">
              <Button type="primary" onClick={this.showAddModal}>添加</Button>
            </Col>
            <Col span={12} align="right">

            </Col>
          </Row>
          <RoleAdd
            visible={addModalVisible}
            roleAddLoading={roleAddLoading}
            hideDialog={(value) => this.hideAddModal(value)}/>
          <RoleEdit
            visible={editModalVisible}
            roleEditLoading={roleEditLoading}
            dataSource={editModalData}
            hideDialog={(value) => this.hideEditModal(value)}/>
          <Table
            bordered
            rowKey={record => record.id}
            loading={roleListLoading}
            dataSource={roleDataSource}
            columns={roleTitles}
            pagination={pagination}
            onChange={this.handleTableChange}/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({role, loading}) => ({
  role,
  roleListLoading: loading.effects['role/fetchRoleList'],
  roleAddLoading: loading.effects['role/fetchRoleAdd'],
  roleEditLoading: loading.effects['role/fetchRoleEdit'],
}))(Role);
