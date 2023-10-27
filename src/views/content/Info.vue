<template>
  <PageWrapper title="流媒体详情" content="观看流媒体的播放">
    <div class="py-8 px-8 bg-white flex flex-col justify-center">
      <div class="self-start">
        <p class="text-28px">{{ info.title }}</p>
        <p>{{ info.overview }}</p>
        <Tag v-for="label in info.genre" :key="label.id">{{ label.name }}</Tag>
      </div>
      <video class="w-full mt-8" src="/@/assets/json/5.mp4" controls></video>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import listNewReleases from '/@/assets/json/listNewReleases.json';
  import { reactive } from 'vue';
  import { Tag } from 'ant-design-vue';

  const info = reactive(listNewReleases[0]?.movie);
</script>
<style lang="less" scoped></style>
