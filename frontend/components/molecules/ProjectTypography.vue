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
    padding-bottom: var(--spacer-3);
    border-bottom: 2px solid color-mix(
      in srgb,
      transparent var(--opacity-percentage-7),
      var(--color-fourth-base)
    );
    position: relative;
    margin-bottom: var(--spacer-7);
    line-height: 0;

    &::after {
      content: "";
      display: block;
      width: 100%;
      border-bottom: 2px dashed color-mix(
        in srgb,
        transparent var(--opacity-percentage-9),
        var(--color-fourth-lighter)
      );
      position: absolute;
      bottom: var(--spacer-2);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
