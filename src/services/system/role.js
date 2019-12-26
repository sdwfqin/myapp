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

/**
 * 添加角色
 *
 * @param params
 * @returns {Promise<* | void>}
 */
export async function saveRole(params) {
  return requestForm('/auth/role/save', 'POST', params);
}

/**
 * 删除角色
 *
 * @param params
 * @returns {Promise<* | void>}
 */
export async function deleteRole(params) {
  return requestForm('/auth/role/remove', 'DELETE', params);
}
