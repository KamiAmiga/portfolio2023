<script setup lang="ts">
import type {
  StrapiImageResponsiveData,
  StrapiResponsiveFormats,
} from "@/types/strapiResponsiveImage";

defineProps<{
  pictureData: StrapiImageResponsiveData;
  format: StrapiResponsiveFormats;
}>();
</script>

<template>
  <picture>
    <source
      :srcset="`${pictureData?.formats[`${format}_desktop`]?.url}`"
      media="(min-width: 80em)"
      type="image/webp" >
    <source
      v-if="format !== 'fourth_width'
        && format !== 'half_width'"
      :srcset="`${pictureData?.formats[`${format}_tablet`]?.url}`"
      media="(min-width: 40em)"
      type="image/webp" >
    <source
      v-else
      :srcset="`${pictureData?.formats[`${format}_tablet`]?.url}`"
      type="image/webp" >
    <source 
      v-if="format !== 'fourth_width'
        && format !== 'half_width'"
      :srcset="`${pictureData?.formats[`${format}_mobile`]?.url}`"
      type="image/webp" >
    <img :src="`${pictureData?.url}`" :alt="pictureData?.alternativeText ?? ''" >
  </picture>
</template>
