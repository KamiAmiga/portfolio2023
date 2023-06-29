<script setup lang="ts">
interface ResponsiveFormats {
  url: string,
  width: number,
  height: number,
}

interface PictureAttributes {
  url: string,
  alternativeText?: string,
  width: number,
  height: number,
  formats: Record<string, ResponsiveFormats>,
}

defineProps<{
  pictureData: PictureAttributes
  format: 'full_width' | 'half_width' | 'zoom_in'
}>()
</script>

<template>
  <picture>
    <source :srcset="useStrapiMedia(pictureData?.formats[`${format}_desktop`]?.url)" media="(min-width: 80em)" type="image/webp"/>
    <source :srcset="useStrapiMedia(pictureData?.formats[`${format}_tablet`]?.url)" media="(min-width: 40em)" type="image/webp"/>
    <source :srcset="useStrapiMedia(pictureData?.formats[`${format}_mobile`]?.url)" type="image/webp"/>
    <img :src="useStrapiMedia(pictureData?.url)" :alt="pictureData.alternativeText" />
  </picture>
</template>