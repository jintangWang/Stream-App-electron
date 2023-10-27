import type { AppRouteModule } from '/@/router/types';
// import { RoleEnum } from '/@/enums/roleEnum'

import { LAYOUT } from '/@/router/constant';

const content: AppRouteModule = {
  path: '/content',
  name: 'ContentDemo',
  component: LAYOUT,
  redirect: '/content/index',
  meta: {
    orderNo: 600,
    icon: 'ion:videocam-sharp',
    title: '媒体库',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'ContentIndex',
      component: () => import('/@/views/content/index.vue'),
      meta: {
        title: '媒体库',
      },
    },
    {
      path: 'info',
      name: 'ContentInfo',
      component: () => import('/@/views/content/Info.vue'),
      meta: {
        title: '流媒体详情',
      },
    },
  ],
};

export default content;
