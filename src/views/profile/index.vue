<template>
  <PageWrapper title="个人中心" content="普通用户上传 5 个视频即可成为 VIP 用户，享受更多权益。">
    <div class="py-8 px-8 bg-white flex flex-col justify-center">
      <a-form :model="formState" v-bind="formItemLayout">
        <a-form-item label="用户头像" name="title">
          <BasicUpload
            v-model:value="avatarList"
            helpText="上传头像，限制大小 2M 以下的图片"
            :maxSize="2"
            :maxNumber="1"
            :api="uploadApi"
            :accept="['image/*']"
            @delete="handleDeleteUpload"
            @preview-delete="handleDeleteUploadPreview"
          />
        </a-form-item>
        <a-form-item label="用户名">
          {{ userinfo.username }}
        </a-form-item>
        <a-form-item label="用户角色">
          {{ userinfo.roleList?.[0].name }}
        </a-form-item>
        <a-form-item label="已上传视频数量">
          {{ userinfo.imageCount }}
        </a-form-item>
        <a-form-item name="gender" label="用户性别">
          <Select
            v-model:value="formState.gender"
            size="large"
            :style="{ width: '200px' }"
            placeholder="请选择自己的性别"
            :options="[
              { value: 'MALE', label: '男' },
              { value: 'FEMALE', label: '女' },
            ]"
          />
        </a-form-item>
        <a-form-item name="labels" label="用户标签">
          <Select
            v-model:value="formState.labels"
            size="large"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择自己的标签"
            :options="tagOptions"
            :field-names="{ label: 'name', value: 'id' }"
          />
        </a-form-item>
        <div class="flex justify-center">
          <a-button @click="resetForm"> 重置 </a-button>
          <a-button class="!ml-4" type="primary" :loading="loading" @click="handleSubmit">
            确认
          </a-button>
        </div>
      </a-form>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, computed, ref, watchEffect } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useUserStore } from '/@/store/modules/user';
  // import { getAppEnvConfig } from '/@/utils/env';
  import { message, Select, Form } from 'ant-design-vue';
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi, delMedia } from '/@/api/sys/upload';
  import { updateUser } from '/@/api/sys/user';
  import { useRedo } from '/@/hooks/web/usePage';

  // const { VITE_GLOB_API_URL: baseUrl } = getAppEnvConfig();
  const redo = useRedo();
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
    labelAlign: 'left',
  };
  const useForm = Form.useForm;
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const tagOptions: any[] = reactive(userStore.getTags);
  const loading = ref(false);
  const formState = reactive<Record<string, any>>({});
  // 已上传头像列表
  const avatarList = ref<string[]>([]);

  const { resetFields, validate } = useForm(formState);

  watchEffect(() => {
    avatarList.value = userinfo.value?.avatar ? [userinfo.value?.avatar] : [];
    formState.gender = userinfo.value?.gender;
    formState.labels = userinfo.value?.labels?.map((item) => item.id) || [];
  });

  const handleDeleteUpload = async (record: Recordable) => {
    const filePath = record.responseData?.[0]?.url || '';
    const fileName = filePath.split('/').pop() || '';
    try {
      await delMedia(fileName);
    } catch (error) {
      console.log(error);
      message.error(`删除失败！`);
    }
  };

  const handleDeleteUploadPreview = async (url: string) => {
    const fileName = url.split('/').pop() || '';
    if (fileName === 'avatar.jpg') {
      // 默认头像不需要调接口
      return;
    }
    try {
      await delMedia(fileName);
    } catch (error) {
      console.log(error);
      message.error(`删除失败！`);
    }
  };

  const resetForm = () => {
    formState.labels = [];
    resetFields();
  };

  async function handleSubmit() {
    try {
      await validate();
    } catch (e) {
      return;
    }
    try {
      loading.value = true;
      await updateUser(userinfo.value.userId, {
        avatar: avatarList.value[0],
        gender: formState.gender,
        organizationId: userinfo.value.organization?.id,
        label: formState.labels.map((id) => ({ id: id })),
      });
      message.success(`更新成功！`);
      await userStore.getUserInfoAction();
      redo();
    } catch (error) {
      message.error(`更新失败！`);
    } finally {
      loading.value = false;
    }
  }
</script>
<style lang="less" scoped></style>
