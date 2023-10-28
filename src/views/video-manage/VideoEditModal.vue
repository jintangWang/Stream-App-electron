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
      <a-form-item name="" label="流媒体缩略图" />
      <a-form-item name="" label="流媒体" />
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
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import { reactive } from 'vue';
  import { message, Select, Form } from 'ant-design-vue';
  import { updateMedia } from '/@/api/sys/media';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  const useForm = Form.useForm;
  const props = defineProps({
    info: Object as PropType<Recordable>,
  });
  const emit = defineEmits(['updated']);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const formState = reactive<Record<string, any>>({
    isVip: false,
  });
  const tagOptions: any[] = reactive(userStore.getTags);

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

  const handleSubmit = async () => {
    emit('updated');
    closeModal();
    return;
    try {
      await validate();
    } catch (e) {
      return;
    }
    console.log('formState', JSON.stringify(formState, null, 2));
    try {
      const res = await updateMedia(props?.info?.id, {
        image: {
          title: formState.title,
          overview: formState.overview,
          posterPath: formState.posterPath?.[0],
          url: formState.url?.[0],
          isVip: formState.isVip,
          labels: formState.labels.map((id) => ({ id: id })),
        },
      });
      console.log(res);
      message.success(`流媒体更新成功`);
      resetFields();
      emit('updated');
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
