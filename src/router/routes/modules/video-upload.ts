import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const videoUpload: AppRouteModule = {
  path: '/video-upload',
  name: 'VideoUpload',
  component: LAYOUT,
  redirect: '/video-upload/index',
  meta: {
    orderNo: 800,
    hideChildrenInMenu: true,
    icon: 'mdi:upload',
    title: '流媒体上传',
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'index',
      name: 'UploadPage',
      component: () => import('/@/views/video-upload/index.vue'),
      meta: {
        title: '流媒体上传',
        icon: 'whh:paintroll',
        hideMenu: true,
        roles: [RoleEnum.ADMIN],
      },
    },
  ],
};

export default videoUpload;
