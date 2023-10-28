<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <PageWrapper title="流媒体上传页" content="欢迎上传您的流媒体">
    <a-form :model="formState" name="validate_other" v-bind="formItemLayout" ref="formRef">
      <a-form-item label="流媒体名称" name="title" v-bind="validateInfos.title">
        <a-input v-model:value="formState.title" placeholder="请输入流媒体名称" />
      </a-form-item>
      <a-form-item label="流媒体介绍" name="overview" v-bind="validateInfos.overview">
        <a-textarea
          v-model:value="formState.overview"
          placeholder="请输入流媒体介绍"
          :auto-size="{ minRows: 4, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item name="posterPath" label="流媒体缩略图">
        <BasicUpload
          v-model:value="formState.posterPath"
          helpText="上传流媒体海报，目前大小 2M 以下的图片"
          :maxSize="2"
          :maxNumber="1"
          :api="uploadApi"
          :accept="['image/*']"
          @delete="handleDeleteUpload"
          @preview-delete="handleDeleteUploadPreview"
        />
      </a-form-item>
      <a-form-item name="url" label="流媒体">
        <BasicUpload
          v-model:value="formState.url"
          helpText="上传流媒体文件，目前支持格式为 mp4、 大小 50M 以下的流媒体文件"
          :maxSize="50"
          :maxNumber="1"
          :api="uploadApi"
          :accept="['.mp4']"
          @delete="handleDeleteUpload"
          @preview-delete="handleDeleteUploadPreview"
        />
      </a-form-item>
      <a-form-item name="isVip" label="是否只有VIP可见">
        <a-switch v-model:checked="formState.isVip" />
      </a-form-item>
      <a-form-item name="labels" label="流媒体标签">
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
      <a-form-item label=" " :colon="false">
        <Button type="primary" size="large" block @click="handleSubmit" :loading="loading">
          提交
        </Button>
      </a-form-item>
    </a-form>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, reactive, computed } from 'vue';
  import { message, Button, Select, Form } from 'ant-design-vue';
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi, delMedia, createMedia } from '/@/api/sys/upload';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const useForm = Form.useForm;
  const formRef = ref();
  const formState = reactive<Record<string, any>>({
    isVip: false,
  });
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tagOptions: any[] = reactive(userStore.getTags);
  const loading = ref(false);

  const rulesRef = reactive({
    title: [
      {
        required: true,
        message: '请输入流媒体名称！',
      },
    ],
    overview: [
      {
        required: true,
        message: '请输入流媒体介绍!',
      },
    ],
  });

  const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);

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
    try {
      await delMedia(fileName);
    } catch (error) {
      console.log(error);
      message.error(`删除失败！`);
    }
  };

  const resetForm = () => {
    formState.title = '';
    formState.overview = '';
    formState.posterPath = '';
    formState.url = '';
    formState.isVip = false;
    formState.labels = [];
    resetFields();
  };

  const handleSubmit = async () => {
    try {
      await validate();
    } catch (e) {
      return;
    }
    if (!formState.posterPath || formState.posterPath.length === 0) {
      message.error(`请上传流媒体海报！`);
      return;
    }
    if (!formState.url || formState.url.length === 0) {
      message.error(`请上传流媒体！`);
      return;
    }
    // console.log('formState', JSON.stringify(formState, null, 2));
    try {
      loading.value = true;
      await createMedia({
        image: {
          title: formState.title,
          overview: formState.overview,
          posterPath: formState.posterPath?.[0],
          url: formState.url?.[0],
          isVip: formState.isVip,
          labels: formState.labels.map((id) => ({ id: id })),
        },
        user: {
          id: userinfo.value.userId,
        },
      });
      message.success(`流媒体上传成功`);
      resetForm();
    } catch (error) {
      message.error(`流媒体上传失败`);
    } finally {
      loading.value = false;
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
</style>
