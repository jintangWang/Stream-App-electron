import type { AppRouteModule } from '/@/router/types';
// import { RoleEnum } from '/@/enums/roleEnum'

import { LAYOUT } from '/@/router/constant';

const profile: AppRouteModule = {
  path: '/profile',
  name: 'profilePage',
  component: LAYOUT,
  redirect: '/profile/index',
  meta: {
    orderNo: 900,
    title: '个人中心',
    hideMenu: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'profileIndex',
      component: () => import('/@/views/profile/index.vue'),
      meta: {
        title: '个人中心',
      },
    },
    {
      path: 'change-pwd',
      name: 'changePwdIndex',
      component: () => import('/@/views/profile/ChangePwd.vue'),
      meta: {
        title: '修改密码',
      },
    },
  ],
};

export default profile;
