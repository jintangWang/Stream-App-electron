<template>
  <PageWrapper title="个人中心" content="修改密码成功后会自动退出当前登录！">
    <div class="py-8 px-8 bg-white flex flex-col justify-center">
      <div class="base-info">
        <div class="row">
          <span class="label">用户头像</span>
          <img :src="baseUrl + userinfo.avatar" alt="" class="w-60px mx-auto" />
        </div>
        <div class="row">
          <span class="label">用户名</span>
          <span class="value">{{ userinfo.username }}</span>
        </div>
        <!-- <div class="row">
          <span class="label">性别</span>
          <span class="value">{{ userinfo.gender === 'MALE' ? '男' : '女' }}</span>
        </div> -->
      </div>

      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useUserStore } from '/@/store/modules/user';
  import { getAppEnvConfig } from '/@/utils/env';

  import { formSchema } from './profile.data';
  export default defineComponent({
    name: 'Profile',
    components: { BasicForm, PageWrapper },
    setup() {
      const { VITE_GLOB_API_URL } = getAppEnvConfig();
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        labelAlign: 'left',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      });

      const userStore = useUserStore();
      const userinfo = computed(() => userStore.getUserInfo);

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;

          // TODO custom api
          console.log(passwordOld, passwordNew);
          // const { router } = useRouter();
          // router.push(pageEnum.BASE_LOGIN);
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit, userinfo, baseUrl: VITE_GLOB_API_URL };
    },
  });
</script>
<style lang="less" scoped>
  .base-info {
    align-self: flex-start;
  }
  .row {
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .label {
      width: 100px;
      text-align: left;
    }
  }
</style>
