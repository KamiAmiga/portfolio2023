<script setup lang="ts">
import type {
  StrapiImage,
  CustomResponsiveFormats,
} from "@/types/strapiResponsiveImage";

const props = defineProps<{
  pictureDataLandscape: StrapiImage;
  pictureDataPortrait: StrapiImage;
  format: CustomResponsiveFormats;
}>();

const img = useImage()
const imgSizesParams = {
  sizes: 'md:100vw lg:100vw xl:100vw',
    modifiers: {
      format: 'webp',
      quality: 85
    }
}

const _srcset = computed(() => {
  if (!props.pictureDataLandscape && !props.pictureDataPortrait) return null

  const resizerLandscape = img.getSizes(props.pictureDataLandscape?.attributes?.url, imgSizesParams)
  const resizerPortrait = img.getSizes(props.pictureDataPortrait?.attributes?.url, imgSizesParams)

  return {resizerLandscape, resizerPortrait}
})
</script>

<template>
  <picture>
    <source
      v-if="_srcset?.resizerPortrait"
      :srcset="_srcset.resizerPortrait.srcset"
      :sizes="_srcset.resizerPortrait.sizes"
      media="(orientation: portrait)"
      type="image/webp">
    <source
      v-if="_srcset?.resizerLandscape"
      :srcset="_srcset.resizerLandscape.srcset"
      :sizes="_srcset.resizerLandscape.sizes"
      type="image/webp">
    <img 
      :src="_srcset?.resizerLandscape?.src ?? pictureDataLandscape?.attributes?.url"
      :alt="pictureDataLandscape?.attributes?.alternativeText ?? ''" >
  </picture>
</template>