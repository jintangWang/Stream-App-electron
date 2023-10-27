import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: 上传文件到文件系统
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

/**
 * @description: 删除上传到文件系统里的文件
 */

export const delMedia = (filePath: string) => {
  return defHttp.delete<any>({ url: `/storage/files/${filePath}` });
};

/**
 * @description: 创建媒体资源
 */

export const createMedia = (params) => {
  return defHttp.post<any>({ url: '/storage/upload/imageSave', params });
};
