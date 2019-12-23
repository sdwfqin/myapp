import {requestForm} from '@/utils/request';

export async function query() {
  return requestForm('/users');
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser() {
  return requestForm('/auth/user/userInfo', 'GET', {});
}

export async function queryNotices() {
  return requestForm('/notices');
}
