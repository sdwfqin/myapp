import {getRoleList} from '@/services/system/role';

const RoleModel = {

    namespace: 'role',

    state: {
      roleDataSource: []
    },

    effects: {
      * fetchRoleList(payload, {call, put}) {
        const response = yield call(getRoleList, payload);
        yield put({
          type: 'refreshRoleTable',
          payload: response,
        });
      },
    },

    reducers: {
      refreshRoleTable(state, {payload}) {
        return {...state, roleDataSource: payload.data.datas|| []};
      },
    },

  };

export default RoleModel;
