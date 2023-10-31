import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 媒体资源列表
 */
export const mediaList = (params) => {
  return defHttp.get<any>({ url: '/images', params });
};

/**
 * @description: 根据 labels 获取媒体资源列表
 */
export const mediaListByLabels = (isVip, labelIds) => {
  return defHttp.post<any>({ url: `/images/getAllByLabelIds?isvip=${isVip}`, params: labelIds });
};

/**
 * @description: 更新媒体资源
 */
export const updateMedia = (imageId, params) => {
  return defHttp.put<any>({ url: `/images/${imageId}`, params });
};

/**
 * @description: 删除媒体资源，会删除对应文件
 */
export const delMedia = (imageId) => {
  return defHttp.delete<any>({ url: `/images/${imageId}` });
};

/**
 * @description: 媒体资源详情
 */
export const mediaInfo = (imageId) => {
  return defHttp.get<any>({ url: `/images/${imageId}` });
};
