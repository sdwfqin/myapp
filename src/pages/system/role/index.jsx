import {Table} from 'antd';
import React, {Component} from 'react';
import {connect} from 'dva';

class Role extends Component {

  state = {
    roleTitles: [
      {
        title: '角色',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        ellipsis: 'true',
        width: '20%'
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        ellipsis: 'true',
        width: '30%'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center',
        ellipsis: 'true',
        width: '30%'
      },
      {
        title: '创建者',
        dataIndex: 'userIdCreate',
        key: 'userIdCreate',
        align: 'center',
        ellipsis: 'true',
        width: '20%'
      },
    ]
  };

  componentDidMount() {
    this.handleTableDatas();
  }

  handleTableDatas = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'role/fetchRoleList',
      payload: {},
    });
  };

  render() {
    const {role = {}, roleListing} = this.props;
    const {roleDataSource} = role;
    const {roleTitles} = this.state;
    return (
      <div>
        <Table
          bordered
          rowKey={record => record.id}
          loading={roleListing}
          dataSource={roleDataSource}
          columns={roleTitles}/>
      </div>
    );
  }
}

export default connect(({role, loading}) => ({
  role,
  roleListing: loading.effects['role/fetchRoleList'],
}))(Role);
