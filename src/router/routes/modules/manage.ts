import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const manage: AppRouteModule = {
  path: '/manage',
  name: 'Manage',
  component: LAYOUT,
  redirect: '/manage/index',
  meta: {
    orderNo: 100000,
    hideChildrenInMenu: true,
    icon: 'mdi:upload',
    title: '流媒体上传',
  },
  children: [
    {
      path: 'index',
      name: 'UploadPage',
      component: () => import('/@/views/manage/index.vue'),
      meta: {
        title: '流媒体上传',
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
};

export default manage;
