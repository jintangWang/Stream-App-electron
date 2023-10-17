import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const manage: AppRouteModule = {
  path: '/video-manage',
  name: 'VideoManage',
  component: LAYOUT,
  redirect: '/video-manage/index',
  meta: {
    orderNo: 100000,
    hideChildrenInMenu: true,
    icon: 'carbon:gui-management',
    title: '流媒体管理',
  },
  children: [
    {
      path: 'index',
      name: 'VideoManagePage',
      component: () => import('/@/views/video-manage/index.vue'),
      meta: {
        title: '流媒体管理',
        icon: 'carbon:gui-management',
        hideMenu: true,
      },
    },
  ],
};

export default manage;
