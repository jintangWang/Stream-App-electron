import type { AppRouteModule } from '/@/router/types';
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
      },
    },
  ],
};

export default videoUpload;
