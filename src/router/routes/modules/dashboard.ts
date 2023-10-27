import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  meta: {
    orderNo: 200,
    icon: 'ion:grid-outline',
    title: '概览',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/index.vue'),
      meta: {
        title: '工作台',
      },
    },
  ],
};

export default dashboard;
