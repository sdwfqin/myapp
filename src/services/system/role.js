import {requestForm} from '@/utils/request';

/**
 * 角色列表
 *
 * @param params
 * @returns {Promise<* | void>}
 */
export async function getRoleList(params) {
  return requestForm('/auth/role/list', 'GET', params);
}
