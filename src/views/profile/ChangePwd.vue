<template>
  <PageWrapper title="修改密码" content="修改密码成功后会自动退出当前登录！">
    <div class="py-8 px-8 bg-white flex flex-col justify-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit" :loading="loading">
          确认
        </a-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './profile.data';
  import { updatePwd } from '/@/api/sys/user';
  import { message } from 'ant-design-vue';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useUserStore } from '/@/store/modules/user';
  import { useGo } from '/@/hooks/web/usePage';

  const go = useGo();
  const [register, { validate, resetFields }] = useForm({
    size: 'large',
    labelAlign: 'left',
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: formSchema,
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  });
  const loading = ref(false);
  const userStore = useUserStore();

  const userinfo = computed(() => userStore.getUserInfo);
  async function handleSubmit() {
    let values = { passwordNew: '' };
    try {
      values = await validate();
    } catch (e) {
      return;
    }
    try {
      const { passwordNew } = values;
      await updatePwd({
        username: userinfo.value.username,
        password: passwordNew,
        userid: userinfo.value.userId,
      });
      message.success(`密码更新成功`);
      userStore.clearLoginInfo();
      go(PageEnum.BASE_LOGIN);
    } catch (error) {
      message.error(`密码更新失败！`);
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped>
  /* Your CSS code here */
</style>
