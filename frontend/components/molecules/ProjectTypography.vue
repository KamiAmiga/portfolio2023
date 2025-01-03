<script setup lang="ts">
import type { ProjectTypography } from '@/types/project';

defineProps<{
  fonts: ProjectTypography[];
}>();
</script>

<template>
  <ul class="project-typography">
    <li v-for="font in fonts" :key="font.id" class="project-typography__item">
      <img :src="`${font.typo_visual?.data?.attributes.url}`" :alt="font.typo_name" >
    </li>
  </ul>
</template>

<style lang="scss">
.project-typography {
  padding: 0;
  margin: 0;
  list-style-type: none;

  &__item {
    max-width: 20rem;
    padding-bottom: map-get($spacers, 3);
    border-bottom: 2px solid fade-out(map-get($theme-color-fourth, base), map-get($fading-out, 5));
    position: relative;
    margin-bottom: map-get($spacers, 7);
    line-height: 0;

    &::after {
      content: "";
      display: block;
      width: 100%;
      border-bottom: 2px dashed fade-out(map-get($theme-color-fourth, lighter), map-get($fading-out, 2));
      position: absolute;
      bottom: map-get($spacers, 2);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
