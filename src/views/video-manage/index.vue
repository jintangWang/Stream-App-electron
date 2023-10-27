<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <PageWrapper title="流媒体管理页" content="对用户上传的流媒体进行管理">
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'poster_path'">
          <img :src="record?.poster_path" alt="poster_path" class="poster-img" />
        </template>
        <template v-else-if="column.key === 'dateCreated'">
          <span>{{ formatToDateTime(record.dateCreated) }}</span>
        </template>
        <template v-else-if="column.key === 'genre'">
          <div class="tag-wrap">
            <a-tag
              v-for="tag in record.genre"
              :key="tag.name"
              :color="tag.name.length > 5 ? 'geekblue' : 'green'"
            >
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
    <VideoEditModal @register="register" :info="curMedia" @updated="refreshList" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import listMovies from '/@/assets/json/listMovies.json';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { Popconfirm, message } from 'ant-design-vue';
  import { mediaList, delMedia } from '/@/api/sys/media';
  import VideoEditModal from './VideoEditModal.vue';
  import { useModal } from '/@/components/Modal';

  const dataSource = listMovies.list;
  const [register, { openModal }] = useModal();
  const curMedia = ref<any>({});

  const columns = [
    {
      title: '流媒体名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '流媒体海报',
      dataIndex: 'poster_path',
      key: 'poster_path',
    },
    {
      title: '上传时间',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    // {
    //   title: '简介',
    //   dataIndex: 'overview',
    //   key: 'overview',
    // },
    {
      title: '标签',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];

  const refreshList = () => {
    console.log('refreshList');
  };

  const handleEdit = async (record: any) => {
    curMedia.value = record;
    openModal();
  };

  const handleDel = async (record: any) => {
    console.log(record);
    try {
      await delMedia(record.id);
      message.success(`删除成功`);
      // TODO 刷新列表
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
  .tag-wrap {
    .ant-tag {
      margin-top: 8px;
    }
  }
</style>
