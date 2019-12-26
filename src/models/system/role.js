import {getRoleList, postRoleSave} from '@/services/system/role';

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
      const response = yield call(postRoleSave, payload);
      yield put({
        type: 'roleAdd',
        payload: response,
      });
    },
  },

  reducers: {
    refreshRoleTable(state, {payload}) {
      return {...state, roleDataSource: payload.data.datas || []};
    },
    roleAdd(state, {payload}) {
      return {
        ...state,
        roleDataSource: state.roleDataSource.concat(payload.data),
      };
    },
  },

};

export default RoleModel;
