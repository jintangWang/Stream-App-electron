import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  GetUserInfo = '/userinfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 重名检测
 */
export function nameDupliDetect(name: string) {
  return defHttp.get<any>({
    url: `/users/validate/${name}`,
  });
}

/**
 * @description: 注册
 */
export function registerApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>({
    url: '/register',
    params,
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({ url: '/logout' });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

/**
 * @description: 获取标签库
 */
export function getUserTags() {
  return defHttp.get<any[]>({ url: '/label/getAll' });
}

/**
 * @description: 获取用户日志
 */
export function getUserLogs(params) {
  return defHttp.get<any[]>({
    url: '/logs',
    params: {
      page: params.page,
      size: params.size,
    },
  });
}
