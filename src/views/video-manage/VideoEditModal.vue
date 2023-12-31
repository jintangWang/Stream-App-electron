<template>
  <BasicModal
    :width="600"
    @register="register"
    title="流媒体更新"
    v-bind="$attrs"
    @ok="handleSubmit"
  >
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
        <!-- <img :src="baseUrl + '/' + formState?.posterPath" alt="posterPath" class="w-80px" /> -->
        <BasicUpload
          v-model:value="posterList"
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
        <!-- <img :src="baseUrl + '/' + formState?.posterPath" alt="posterPath" class="w-80px" /> -->
        <BasicUpload
          v-model:value="urlList"
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
    </a-form>
  </BasicModal>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { watchEffect } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import { reactive, ref } from 'vue';
  import { message, Select, Form } from 'ant-design-vue';
  import { updateMedia } from '/@/api/sys/media';
  import { useUserStore } from '/@/store/modules/user';
  // import { getAppEnvConfig } from '/@/utils/env';
  import { uploadApi, delMedia } from '/@/api/sys/upload';
  import { BasicUpload } from '/@/components/Upload';

  // const { VITE_GLOB_API_URL: baseUrl } = getAppEnvConfig();
  const userStore = useUserStore();
  const useForm = Form.useForm;
  const props = defineProps({
    info: Object as PropType<Recordable>,
  });
  const emit = defineEmits(['updated', 'visible-change']);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const formState = ref<Record<string, any>>({
    isVip: false,
  });
  const tagOptions: any[] = reactive(userStore.getTags);
  // 已上传海报列表
  const posterList = ref<string[]>([]);
  // 已上传视频列表
  const urlList = ref<string[]>([]);

  watchEffect(() => {
    const info = props.info;
    formState.value = {
      title: info?.title,
      overview: info?.overview,
      posterPath: info?.posterPath,
      url: info?.url,
      isVip: info?.isVip,
      labels: info?.labels?.map((item: any) => item.id) || [],
    };
    posterList.value = info?.posterPath ? [info?.posterPath] : [];
    urlList.value = info?.url ? [info?.url] : [];
  });

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

  const [register, { closeModal }] = useModalInner();
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
    formState.value = {
      title: '',
      overview: '',
      posterPath: '',
      isVip: false,
      labels: [],
    };
    resetFields();
  };

  const handleSubmit = async () => {
    try {
      await validate();
    } catch (e) {
      return;
    }
    if (!posterList.value || posterList.value.length === 0) {
      message.error(`请上传流媒体海报！`);
      return;
    }
    if (!urlList.value || urlList.value.length === 0) {
      message.error(`请上传流媒体！`);
      return;
    }
    // console.log('formState', JSON.stringify(formState.value, null, 2));
    try {
      await updateMedia(props?.info?.id, {
        title: formState.value.title,
        overview: formState.value.overview,
        posterPath: posterList.value[0],
        url: urlList.value[0],
        isVip: formState.value.isVip,
        labels: formState.value.labels.map((id) => ({ id: id })),
      });
      message.success(`流媒体更新成功`);
      emit('updated');
      resetForm();
      closeModal();
    } catch (error) {
      message.error(`流媒体更新失败`);
    } finally {
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
