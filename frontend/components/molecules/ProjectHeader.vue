<script setup lang="ts">
import type {
  StrapiImage,
} from "@/types/strapiResponsiveImage";

defineProps<{
  coverImageLandscape: StrapiImage;
  coverImagePortrait: StrapiImage;
  title: string;
}>();
</script>

<template>
  <header class="project-header">
    <div v-if="coverImageLandscape?.attributes && coverImagePortrait?.attributes" class="project-header__image">
      <CustomPicture 
        :picture-data-landscape="coverImageLandscape?.attributes"
        :picture-data-portrait="coverImagePortrait?.attributes"
        format='full_screen' />
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
  height: 90lvh;
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

    &__image {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;

      picture {
        display: initial;
        max-width: none;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
