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
export const mediaListByLabels = (labelIds) => {
  return defHttp.get<any>({ url: '/images/getAllByLabelIds', params: { labelIds: labelIds } });
};

/**
 * @description: 更新媒体资源
 */
export const updateMedia = (imageId, params) => {
  return defHttp.put<any>({ url: `/images/${imageId}`, params });
};

/**
 * @description: 删除媒体资源
 */
export const delMedia = (imageId) => {
  return defHttp.delete<any>({ url: `/images/${imageId}` });
};
