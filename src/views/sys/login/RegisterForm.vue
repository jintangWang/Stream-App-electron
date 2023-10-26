<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          placeholder="账号"
        />
      </FormItem>
      <!-- <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          placeholder="手机号"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          placeholder="短信验证码"
        />
      </FormItem> -->
      <FormItem name="password" class="enter-x">
        <StrengthMeter size="large" v-model:value="formData.password" placeholder="密码" />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          placeholder="确认密码"
        />
      </FormItem>

      <FormItem name="tags" class="enter-x">
        <Select
          v-model:value="formData.tags"
          size="large"
          mode="multiple"
          style="width: 100%"
          placeholder="请选择自己的标签"
          :options="tagOptions"
          :field-names="{ label: 'name', value: 'id' }"
        />
      </FormItem>

      <!-- <FormItem class="enter-x" name="policy">
        <Checkbox v-model:checked="formData.policy" size="small"> 我同意 Stream 隐私协议 </Checkbox>
      </FormItem> -->

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        注册
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">返回</Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Select, message } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  // import { CountdownInput } from '/@/components/CountDown';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { registerApi, getUserTags } from '/@/api/sys/user';
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '张三',
    password: '123456',
    confirmPassword: '123456',
    tags: [],
  });

  const tagOptions: any[] = reactive([]);

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function httpTags() {
    try {
      const res = await getUserTags();
      tagOptions.push(...res);
    } catch (error) {
      message.error(`获取用户标签失败！`);
    }
  }
  httpTags();

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    console.log('handleRegister', data);
    try {
      const param = {
        username: data.account,
        password: data.password,
      };
      const res = await registerApi(param);
      console.log('res', res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
</script>
