<template>
  <PageWrapper>
    <template #headerContent>
      <div class="flex items-center">
        <Avatar
          :src="baseUrl + '/' + userinfo.avatar || headerImg"
          :size="72"
          class="!mx-auto !block"
        />
        <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
          <h1 class="md:text-lg text-md">{{ userinfo.username }}, 开始您一天的工作吧！</h1>
        </div>
        <div class="flex flex-1 justify-end md:mt-0 mt-4">
          <img class="xl:h-50 h-30" src="/@/assets/svg/illustration.svg" />
        </div>
      </div>
    </template>
    <div class="lg:flex">
      <div class="w-full enter-y">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { getUserLogs } from '/@/api/sys/user';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table';
  import eventType from '/@/assets/json/eventType.json';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useUserStore } from '/@/store/modules/user';
  import { Avatar } from 'ant-design-vue';
  import { computed } from 'vue';
  import headerImg from '/@/assets/images/header.jpg';

  const userStore = useUserStore();
  const { VITE_GLOB_API_URL: baseUrl } = getAppEnvConfig();

  const userinfo = computed(() => userStore.getUserInfo);

  const columns: BasicColumn[] = [
    {
      title: '用户',
      dataIndex: 'user',
      width: 120,
      customRender: ({ text }) => text?.username,
    },
    {
      title: '操作类型',
      dataIndex: 'typeName',
      customRender: ({ text }) => eventType.find((t) => t.value === text)?.label,
      width: 120,
    },
    {
      title: '说明',
      dataIndex: 'content',
    },
    {
      title: '操作时间',
      dataIndex: 'occurredOn',
    },
  ];

  const [registerTable] = useTable({
    title: '日志记录',
    api: getUserLogs,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      labelAlign: 'left',
      baseRowStyle: { paddingLeft: '8px' },
      autoSubmitOnEnter: true,
    },
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
  });
</script>
