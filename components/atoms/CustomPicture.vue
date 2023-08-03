<script setup lang="ts">
import {
  StrapiImageResponsiveData,
  StrapiResponsiveFormats,
} from "../../types/strapiResponsiveImage";

defineProps<{
  pictureData: StrapiImageResponsiveData;
  format: `${StrapiResponsiveFormats}`;
}>();
</script>

<template>
  <picture>
    <source :srcset="useStrapiMedia(pictureData?.formats[`${format}_desktop`]?.url)" media="(min-width: 80em)"
      type="image/webp" />
    <source v-if="format !== StrapiResponsiveFormats.FourthWidth &&
      format !== StrapiResponsiveFormats.HalfWidth
      " :srcset="useStrapiMedia(pictureData?.formats[`${format}_tablet`]?.url)" media="(min-width: 40em)"
      type="image/webp" />
    <source v-else :srcset="useStrapiMedia(pictureData?.formats[`${format}_tablet`]?.url)" type="image/webp" />
    <source v-if="format !== StrapiResponsiveFormats.FourthWidth &&
      format !== StrapiResponsiveFormats.HalfWidth
      " :srcset="useStrapiMedia(pictureData?.formats[`${format}_mobile`]?.url)" type="image/webp" />
    <img :src="useStrapiMedia(pictureData?.url)" :alt="pictureData?.alternativeText ?? ''" />
  </picture>
</template>
