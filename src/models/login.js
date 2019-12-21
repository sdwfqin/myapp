import {stringify} from 'querystring';
import router from 'umi/router';
import {fakeAccountLogin, getFakeCaptcha, logout} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {setAccessToken} from '@/utils/token';
import {getPageQuery} from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * accountLogin({payload}, {call, put}) {

      const config = {
        client_id: 'pc',
        client_secret: 'sdwfqin',
        scope: 'web',
        grant_type: 'password'
      };

      const response = yield call(fakeAccountLogin, {...config, ...payload});
      if (response === undefined) {
        return;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.code === 0) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, {call}) {

      yield call(logout);

      setAccessToken(undefined);
      setAuthority(undefined);

      const {redirect} = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAccessToken(payload.data.accessToken);
      setAuthority(payload.data.authorities);
      return {...state, status: payload.status, type: payload.type};
    },
  },
};

export default Model;
