import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/account-manage',
  name: 'System',
  component: LAYOUT,
  redirect: '/account-manage/index',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: '账号管理',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'AccountManagement',
      meta: {
        title: '账号管理',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/account-manage/index.vue'),
    },
  ],
};

export default system;
