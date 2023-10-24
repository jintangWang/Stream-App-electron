import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/account',
  name: 'System',
  component: LAYOUT,
  redirect: '/account/index',
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
      component: () => import('/@/views/account/index.vue'),
    },
    {
      path: 'detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: '账号详情',
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: () => import('/@/views/account/AccountDetail.vue'),
    },
  ],
};

export default system;
