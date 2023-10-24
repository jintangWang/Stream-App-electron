<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <RoleTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'avatar'">
          <img :src="baseUrl + text" alt="" class="w-40px mx-auto" />
        </template>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            searchInfo.roleId === 3 && {
              icon: 'material-symbols:volunteer-activism-outline-sharp',
              tooltip: '设置为VIP用户',
              popConfirm: {
                title: '是否确认开通其VIP权限',
                confirm: handleEdit.bind(null, record),
              },
            },
            record.username !== 'admin' && {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList, delAccount } from '/@/api/demo/system';
  import { PageWrapper } from '/@/components/Page';
  import RoleTree from './RoleTree.vue';
  import { message } from 'ant-design-vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { getAppEnvConfig } from '/@/utils/env';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, RoleTree, TableAction },
    setup() {
      const { VITE_GLOB_API_URL } = getAppEnvConfig();
      const go = useGo();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '账号列表',
        api: getAccountList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          labelAlign: 'left',
          baseRowStyle: { paddingLeft: '8px' },
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleEdit(record: Recordable) {
        console.log(record);
        // TODO 调用设置为vip接口
      }

      async function handleDelete(record: Recordable) {
        console.log(record);
        try {
          await delAccount(record.id);
          message.success(`删除用户成功！`);
          reload();
        } catch (error) {
          message.error(`删除用户失败！`);
        }
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function handleSelect(roleId = '') {
        searchInfo.roleId = roleId;
        reload();
      }

      return {
        registerTable,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        searchInfo,
        baseUrl: VITE_GLOB_API_URL,
      };
    },
  });
</script>
