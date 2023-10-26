<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <PageWrapper title="流媒体上传页" content="欢迎上传您的流媒体">
    <a-form
      :model="formState"
      name="validate_other"
      v-bind="formItemLayout"
      @finishFailed="onFinishFailed"
      @finish="onFinish"
    >
      <a-form-item
        label="流媒体名称"
        name="title"
        :rules="[{ required: true, message: '请输入流媒体名称!' }]"
      >
        <a-input v-model:value="formState.title" placeholder="请输入流媒体名称" />
      </a-form-item>
      <a-form-item
        label="流媒体介绍"
        name="overview"
        :rules="[{ required: true, message: '请输入流媒体介绍!' }]"
      >
        <a-textarea
          v-model:value="formState.overview"
          placeholder="请输入流媒体介绍"
          :auto-size="{ minRows: 4, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item
        name="posterPath"
        label="流媒体缩略图"
        :rules="[{ required: true, message: '请上传流媒体缩略图!' }]"
      >
        <BasicUpload
          helpText="上传流媒体海报，目前大小 2M 以下的图片"
          :maxSize="2"
          :maxNumber="1"
          @change="handlePosterChange"
          :api="uploadApi"
          :accept="['image/*']"
        />
      </a-form-item>
      <a-form-item
        name="url"
        label="流媒体"
        :rules="[{ required: true, message: '请上传流媒体!' }]"
      >
        <BasicUpload
          helpText="上传流媒体文件，目前支持格式为 mp4、 大小 50M 以下的流媒体文件"
          :maxSize="50"
          :maxNumber="1"
          @change="handleMediaChange"
          :api="uploadApi"
          :accept="['.mp4']"
        />
      </a-form-item>
      <a-form-item name="isVip" label="是否只有VIP可见">
        <a-switch v-model:checked="formState.switch" />
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
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
          提交
        </Button>
      </a-form-item>
    </a-form>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, reactive, toRaw } from 'vue';
  import { message, Button, Select } from 'ant-design-vue';
  import { getUserTags } from '/@/api/sys/user';
  import { BasicUpload } from '/@/components/Upload';
  import { uploadApi } from '/@/api/sys/upload';

  const formState = reactive<Record<string, any>>({});
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tagOptions: any[] = reactive([]);
  const loading = ref(false);

  async function httpTags() {
    try {
      const res = await getUserTags();
      tagOptions.push(...res);
    } catch (error) {
      message.error(`获取用户标签失败！`);
    }
  }
  httpTags();

  const handlePosterChange = (fileList) => {
    console.log('handlePosterChange', toRaw(fileList));
  };

  const handleMediaChange = (fileList) => {
    console.log('handleMediaChange', toRaw(fileList));
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogin = async () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 2000);
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
