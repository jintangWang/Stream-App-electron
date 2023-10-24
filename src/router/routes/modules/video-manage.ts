import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const manage: AppRouteModule = {
  path: '/video-manage',
  name: 'VideoManage',
  component: LAYOUT,
  redirect: '/video-manage/index',
  meta: {
    orderNo: 700,
    hideChildrenInMenu: true,
    icon: 'carbon:gui-management',
    title: '流媒体管理',
    roles: [RoleEnum.ADMIN],
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
        roles: [RoleEnum.ADMIN],
      },
    },
  ],
};

export default manage;
