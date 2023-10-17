import type { AppRouteModule } from '/@/router/types';
// import { RoleEnum } from '/@/enums/roleEnum'

import { LAYOUT } from '/@/router/constant';

const content: AppRouteModule = {
  path: '/content',
  name: 'ContentDemo',
  component: LAYOUT,
  redirect: '/content/index',
  meta: {
    orderNo: 100,
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
  ],
};

export default content;
