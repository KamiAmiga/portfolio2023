<script setup lang="ts">
import {
  type StrapiImage,
  StrapiResponsiveFormats,
} from "@/types/strapiResponsiveImage";

defineProps<{
  coverImage: StrapiImage;
  title: string;
}>();
</script>

<template>
  <header class="project-header">
    <div class="project-header__visual">
      <div class="project-header__visual__image">
        <CustomPicture :picture-data="coverImage.attributes" :format="StrapiResponsiveFormats.FullWidth" />
      </div>
    </div>

    <div class="container">
      <div class="section section--full">
        <div class="project-header__title">
          <h1 class="heading--main">
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

.project-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50dvh;
  max-height: 60rem;
  position: relative;
  z-index: map-get($z-index, base-decrease);
  background: linear-gradient(to bottom,
      fade-out(map-get($theme-color-accent, base), map-get($fading-out, 0)),
      66%,
      fade-out(map-get($theme-color-accent, darker), map-get($fading-out, 5)));

  @media screen and (min-width: $breakpoint-m) {
    height: 75dvh;
  }

  &__visual {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;

    &__image {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: calc(100% - map-get($spacers, 8) * 2);
      max-height: 60dvh;
      position: relative;
      overflow: hidden;
    }
  }

  &__title {
    box-sizing: border-box;
    width: 100%;
    padding-right: map-get($spacers, 4);
    margin: 0 auto;
    z-index: map-get($z-index, base-increase);

    @media screen and (min-width: $breakpoint-m) {
      padding-left: 20rem;
    }
  }
}
</style>
