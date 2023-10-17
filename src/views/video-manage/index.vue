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
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, reactive, nextTick } from 'vue';
  import listMovies from '/@/assets/json/listMovies.json';
  import { formatToDateTime } from '/@/utils/dateUtil';

  const dataSource = listMovies.list;

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
