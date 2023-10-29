<template>
  <PageWrapper title="流媒体详情" content="观看流媒体的播放">
    <div class="py-8 px-8 bg-white flex flex-col justify-center">
      <div class="self-start">
        <p class="text-28px">{{ info.title }}</p>
        <p>{{ info.overview }}</p>
        <p v-if="info.isVip">
          <Tag color="red">仅允许 VIP 用户观看</Tag>
        </p>
        <Tag v-for="label in info.labels" :key="label.id">{{ label.name }}</Tag>
      </div>
      <video
        class="w-full mt-8 max-h-800px"
        :poster="baseUrl + '/' + info.posterPath"
        :src="baseUrl + '/' + info.url"
        controls
      ></video>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { unref, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Tag, message } from 'ant-design-vue';
  import { mediaInfo } from '/@/api/sys/media';
  import { getAppEnvConfig } from '/@/utils/env';

  const { VITE_GLOB_API_URL: baseUrl } = getAppEnvConfig();
  const info = ref<Recordable>({});
  const { currentRoute } = useRouter();
  const { query } = unref(currentRoute);

  const httpInfo = async () => {
    try {
      const res = await mediaInfo(query?.id);
      info.value = res;
    } catch (e) {
      message.error('获取流媒体详情失败！');
    }
  };
  httpInfo();
</script>
<style lang="less" scoped></style>
