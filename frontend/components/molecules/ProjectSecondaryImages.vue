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
      <CustomPicture
        :picture-data="secondaryImage.attributes" format="half_width"
        class="project-secondary-images__item__image" />
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
