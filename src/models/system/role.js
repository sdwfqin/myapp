import {deleteRole, getRoleList, saveEdit, saveRole} from '@/services/system/role';

const RoleModel = {

  namespace: 'role',

  state: {
    roleDataSource: []
  },

  effects: {
    * fetchRoleList({payload}, {call, put}) {
      const response = yield call(getRoleList, payload);
      yield put({
        type: 'refreshRoleTable',
        payload: response,
      });
    },
    * fetchRoleAdd({payload}, {call, put}) {
      const response = yield call(saveRole, payload);
      yield put({
        type: 'roleAdd',
        payload: response,
      });
    },
    * fetchRoleEdit({payload}, {call, put}) {
      const response = yield call(saveEdit, payload);
      yield put({
        type: 'roleEdit',
        payload: response,
      });
    },
    * fetchRoleDelete({payload}, {call, put}) {
      const response = yield call(deleteRole, payload);
      yield put({
        type: 'roleDelete',
        payload: response,
      });
    },
  },

  reducers: {
    refreshRoleTable(_, {payload}) {
      return {roleDataSource: payload.data.datas || []};
    },
    roleAdd(state, {payload}) {
      return {
        roleDataSource: state.roleDataSource.concat(payload.data),
      };
    },
    roleEdit(state, {payload}) {
      // 返回被删除的对象
      const oldData = state.roleDataSource.find(item => item.id === payload.data.id);
      const assign = Object.assign(oldData, payload.data);
      console.log(oldData);
      console.log(assign);
      state.roleDataSource.splice(state.roleDataSource.findIndex(item => item.id === payload.data.id), 1, oldData);
      return {
        roleDataSource: state.roleDataSource
      };
    },
    roleDelete(state, {payload}) {
      // 返回被删除的对象
      state.roleDataSource.splice(state.roleDataSource.findIndex(item => item.id === payload.data), 1)
      return {
        roleDataSource: state.roleDataSource
      };
    },
  },

};

export default RoleModel;
