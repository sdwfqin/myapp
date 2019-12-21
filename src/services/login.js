import {requestForm} from '@/utils/request';

/**
 * 用户登陆
 *
 * @param params
 * @returns {Promise<* | void>}
 */
export async function fakeAccountLogin(params) {
  return requestForm('/auth/oauth/token', 'POST', params);
}

/**
 * 获取验证码
 *
 * @param mobile
 * @returns {Promise<* | void>}
 */
export async function getFakeCaptcha(mobile) {
  return requestForm(`/api/login/captcha?mobile=${mobile}`, 'GET');
}

/**
 * 退出登录
 * @returns {Promise<* | void>}
 */
export async function logout() {
  return requestForm('/auth/user/logout', 'POST');
}
