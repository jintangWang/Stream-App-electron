<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <PageWrapper title="流媒体管理页" content="对用户上传的流媒体进行管理">
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'posterPath'">
          <img :src="baseUrl + '/' + record?.posterPath" alt="posterPath" class="poster-img" />
        </template>
        <template v-else-if="column.key === 'createtime'">
          <span>{{ formatToDateTime(record.createtime) }}</span>
        </template>
        <template v-else-if="column.key === 'isVip'">
          <span>{{ record.isVip ? '是' : '否' }}</span>
        </template>
        <template v-else-if="column.key === 'labels'">
          <div class="tag-wrap flex items-center">
            <a-tag v-for="tag in record.labels" :key="tag.name">
              {{ tag.name.toUpperCase() }}
            </a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <Popconfirm
              title="是否确认删除？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDel(record)"
            >
              <a>删除</a>
            </Popconfirm>
            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
    <VideoEditModal @register="register" :info="curMedia" @updated="httpList" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, computed } from 'vue';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { Popconfirm, message } from 'ant-design-vue';
  import { mediaListByLabels, delMedia } from '/@/api/sys/media';
  import VideoEditModal from './VideoEditModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useUserStore } from '/@/store/modules/user';
  import { getAppEnvConfig } from '/@/utils/env';
  import { RoleEnum } from '/@/enums/roleEnum';

  const { VITE_GLOB_API_URL: baseUrl } = getAppEnvConfig();
  const dataSource = ref([]);
  const [register, { openModal }] = useModal();
  const curMedia = ref<any>({});
  const userStore = useUserStore();

  const columns = [
    {
      title: '流媒体名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '流媒体海报',
      dataIndex: 'posterPath',
      key: 'posterPath',
    },
    {
      title: '上传时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: '简介',
      dataIndex: 'overview',
      key: 'overview',
    },
    {
      title: '只允许VIP观看',
      dataIndex: 'isVip',
      key: 'isVip',
      width: 140,
    },
    {
      title: '标签',
      dataIndex: 'labels',
      key: 'labels',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];

  const httpList = async () => {
    const userinfo = computed(() => userStore.getUserInfo);
    let isVip = userStore.getRoleList?.[0] === RoleEnum.VIP;
    let params = userinfo.value.labels?.map((tag) => tag.id);
    // 管理员
    if (userinfo.value?.roleList?.[0]?.id === 1) {
      isVip = true;
      params = userStore.getTags.map((tag) => tag.id);
    }
    try {
      const res = await mediaListByLabels(isVip, params);
      dataSource.value = res;
    } catch (e) {
      message.error(`获取列表失败`);
    }
  };
  httpList();

  const handleEdit = async (record: any) => {
    curMedia.value = record;
    openModal();
  };

  const handleDel = async (record: any) => {
    console.log(record);
    try {
      await delMedia(record.id);
      message.success(`删除成功`);
      httpList();
    } catch (e) {
      message.error(`删除失败`);
    }
  };
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-content';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;
    }
  }

  .@{prefix-cls} {
  }

  .poster-img {
    width: 60px;
    // height: 80px;
  }
</style>
