<script setup lang="ts">
import type {
  StrapiImage,
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
        <CustomPicture :picture-data="coverImage.attributes" format="full_width" />
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
.project-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50dvh;
  max-height: 60rem;
  position: relative;
  z-index: var(--z-index-base-decrease);
  background: linear-gradient(
    to bottom,
    transparent,
    66%,
    color-mix(
      in srgb,
      transparent var(--opacity-percentage-7),
      var(--color-accent-darker) 
    ));

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
      max-width: calc(100% - var(--spacer-8) * 2);
      max-height: 60dvh;
      position: relative;
      overflow: hidden;
    }
  }

  &__title {
    box-sizing: border-box;
    width: 100%;
    padding-right: var(--spacer-4);
    margin: 0 auto;
    z-index: var(--z-index-base-increase);

    @media screen and (min-width: $breakpoint-m) {
      padding-left: 20rem;
    }
  }
}
</style>
