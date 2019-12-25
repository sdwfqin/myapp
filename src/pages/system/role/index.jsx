import {Button, Card, Col, Row, Table} from 'antd';
import React, {Component} from 'react';
import {connect} from 'dva';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import styles from '@/utils/utils.less';

class Role extends Component {

  state = {
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

  render() {
    const {role = {}, roleListing} = this.props;
    const {roleDataSource} = role;
    const {roleTitles, pagination} = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <Row gutter={16} type="flex" justify="space-between" align="middle"
               className={styles.tableHeadRow}>
            <Col span={12} align="left">
              <Button type="primary">添加</Button>
            </Col>
            <Col span={12} align="right">

            </Col>
          </Row>
          <Table
            bordered
            rowKey={record => record.id}
            loading={roleListing}
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
  roleListing: loading.effects['role/fetchRoleList'],
}))(Role);
