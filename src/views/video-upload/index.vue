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
        name="username"
        :rules="[{ required: true, message: '请输入流媒体名称!' }]"
      >
        <a-input v-model:value="formState.username" placeholder="请输入流媒体名称" />
      </a-form-item>
      <a-form-item
        label="流媒体介绍"
        name="username"
        :rules="[{ required: true, message: '请输入流媒体介绍!' }]"
      >
        <a-textarea
          v-model:value="formState.username"
          placeholder="请输入流媒体介绍"
          :auto-size="{ minRows: 4, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item name="dragger" label="流媒体">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined />
          </p>
          <p class="ant-upload-text">点击上传流媒体文件</p>
          <p class="ant-upload-hint"> 目前支持格式为mp4大小 50M 以下的流媒体文件 </p>
        </a-upload-dragger>
      </a-form-item>
      <a-form-item name="isVip" label="是否只有VIP可见">
        <a-switch v-model:checked="formState.switch" />
      </a-form-item>
      <a-form-item name="isVip" label="流媒体标签">
        <template v-for="(tag, index) in tags" :key="tag">
          <a-tooltip v-if="tag.length > 20" :title="tag">
            <a-tag :closable="index !== 0" @close="handleClose(tag)">
              {{ `${tag.slice(0, 20)}...` }}
            </a-tag>
          </a-tooltip>
          <a-tag v-else :closable="index !== 0" @close="handleClose(tag)">
            {{ tag }}
          </a-tag>
        </template>
        <a-input
          v-if="inputVisible"
          :ref="inputRef"
          v-model:value="inputValue"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
          <plus-outlined />
          新增 tag
        </a-tag>
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
  import { ref, reactive, nextTick } from 'vue';
  import { InboxOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { Button } from 'ant-design-vue';

  const formState = reactive<Record<string, any>>({
    'input-number': 3,
    'checkbox-group': ['A', 'B'],
    rate: 3.5,
  });
  const fileList = ref([]);
  const inputRef = ref();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tags = ref(['tag1', 'tag2']);
  const inputVisible = ref(false);
  const inputValue = ref('');
  const loading = ref(false);

  const handleChange = (info: UploadChangeParam) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  function handleDrop(e: DragEvent) {
    console.log(e);
  }

  const handleClose = (removedTag: string) => {
    const tmpTags = tags.value.filter((tag) => tag !== removedTag);
    console.log(tmpTags);
    tags.value = tmpTags;
  };
  const handleInputConfirm = () => {
    const tmpInputValue = inputValue.value;
    let tmpTags = tags.value;
    if (!!tmpInputValue && tmpTags.indexOf(tmpInputValue) === -1) {
      tmpTags = [...tmpTags, tmpInputValue];
    }
    tags.value = tmpTags;
    inputValue.value = tmpInputValue;
    inputVisible.value = false;
  };
  const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
      inputRef.value.focus();
    });
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
