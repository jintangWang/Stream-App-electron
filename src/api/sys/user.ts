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

/**
 * @description: 用户更新
 */
export function updateUser(userId: any, params: any) {
  return defHttp.put<LoginResultModel>({
    url: `/users/${userId}`,
    params,
  });
}

/**
 * @description: 设置为 VIP
 */
export function setUserVIP(userId: any) {
  return defHttp.put<LoginResultModel>({
    url: `/roles/2/users`,
    params: {
      userIds: [userId],
    },
  });
}

/**
 * @description: 修改密码
 * @param params.username
 * @param params.password
 * @param params.userid
 */
export function updatePwd(params: any) {
  return defHttp.post<any>({
    url: `/updatePassword`,
    params,
  });
}
