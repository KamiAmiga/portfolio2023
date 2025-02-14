<script setup lang="ts">
import type {
  StrapiImage,
} from "@/types/strapiResponsiveImage";

defineProps<{
  images: StrapiImage[];
}>();
</script>

<template>
  <div class="project-secondary-images">
    <figure v-for="secondaryImage in images" :key="secondaryImage.id" class="project-secondary-images__item">
      <NuxtImg 
        v-if="secondaryImage.attributes.url"
        format="webp"
        :src="secondaryImage.attributes.url"
        :alt="secondaryImage.attributes.alternativeText ?? ''"
        sizes="md:50vw lg:45vw xl:45vw"/>
    </figure>
  </div>
</template>

<style lang="scss">
.project-secondary-images {
  &__item {
    line-height: 0;

    &__image {
      width: 100%;
      line-height: 0;
    }

    @media screen and (min-width: $breakpoint-s) {
      width: 50%;
      flex: 50% 0 0;
    }
  }

  @media screen and (min-width: $breakpoint-s) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
