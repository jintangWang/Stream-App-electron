<template>
  <PageWrapper title="媒体库" content="欢迎查看系统中的流媒体">
    <swiper
      :cssMode="true"
      :pagination="true"
      :mousewheel="true"
      :keyboard="true"
      :navigation="true"
      :modules="modules"
      :autoplay="autoPlayOptions"
      class="mySwiper"
    >
      <swiper-slide v-for="item in listNewReleases" :key="item.id" class="swiperItem">
        <div class="leftPart">
          <img :src="item?.movie?.poster_path" alt="" />
        </div>
        <div
          class="rightPart"
          :style="{ backgroundImage: 'url(' + imageUrl + item?.movie?.backdrop_path + ')' }"
        >
          <div class="new-release-footer">
            <PlayCircleOutlined class="play-icon" @click="goInfo(item)" />
            <div class="new-releases-description">
              <h3 class="release-title">{{ item?.movie?.title }}</h3>
              <p class="release-desc">
                {{ item?.movie?.overview }}
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <section class="media-list">
      <div v-for="item in listMovies?.list || []" :key="'movie' + item?.id" class="media-list-item">
        <img :src="item?.poster_path" alt="" />
        <div class="item-mask">
          <h3 class="release-title">{{ item?.title }}</h3>
          <PlayCircleOutlined class="play-icon" @click="goInfo(item)" />
        </div>
      </div>
    </section>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  // import { useDesign } from '/@/hooks/web/useDesign'
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
  import listNewReleases from '/@/assets/json/listNewReleases.json';
  import listMovies from '/@/assets/json/listMovies.json';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import { PlayCircleOutlined } from '@ant-design/icons-vue';
  import { useGo } from '/@/hooks/web/usePage';

  const go = useGo();
  // const { prefixVar } = useDesign('')
  const autoPlayOptions = {
    delay: 5000,
  };

  const modules = [Navigation, Pagination, Mousewheel, Keyboard, Autoplay];

  const imageUrl = import.meta.env.VITE_IMAGE_URL;

  const goInfo = (item) => {
    console.log(item);
    go('info');
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

  .mySwiper {
    min-height: 500px;
  }
  .swiperItem {
    display: flex;
  }
  .leftPart {
    img {
      width: 342px;
    }
  }
  .rightPart {
    flex: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    color: white;
    .new-release-footer {
      position: absolute;
      left: 0;
      background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.71) 20%);
      padding: 34px;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
    }
    .play-icon {
      margin-right: 36px;
      font-size: 60px;
    }
    .release-title {
      font-size: 32px;
      text-transform: none;
      font-weight: 100;
      color: white;
      margin-top: 0.1em;
      margin-bottom: 0.2em;
    }
    .release-desc {
      margin: 0 0 10.5px;
    }
  }

  .media-list {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 170px);
    grid-row-gap: 24px;
    grid-column-gap: 24px;
    margin-top: 36px;
  }
  .media-list-item {
    width: 170px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.22);
    padding: 12px 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .item-mask {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.71);
      right: 0;
      bottom: 0;
      padding: 12px;
      font-weight: bold;
      opacity: 0;
      transition: opacity 0.2s;
      display: flex;
      color: white;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      h3 {
        color: white;
        align-self: center;
        font-size: 20px;
      }
      .play-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -24px;
        margin-left: -24px;
        font-size: 48px;
      }
    }
    &:hover {
      .item-mask {
        opacity: 1;
      }
      img {
        transform: scale(1.2);
        transition: transform 0.3s;
      }
    }
  }
</style>
