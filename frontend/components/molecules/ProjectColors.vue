<script setup lang="ts">
import type { ProjectColor } from '@/types/project';

defineProps<{
  colors: ProjectColor[];
}>();
</script>

<template>
  <ul class="project-colors">
    <li v-for="color in colors" :key="color.id" class="project-colors__item">
      <span class="project-colors__item__swatch" :style="{ '--swatch-color': `#${color.color_code}` }"/>
      <span class="project-colors__item__name">{{ color.color_name }}</span>
    </li>
  </ul>
</template>

<style lang="scss">
.project-colors {
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: var(--spacer-7);

    &__swatch {
      display: block;
      width: var(--spacer-9);
      height: var(--spacer-9);
      flex-grow: 0;
      flex-shrink: 0;
      position: relative;
      margin-right: var(--spacer-6);
      background-color: var(--swatch-color);

      &::after {
        content: "";
        display: block;
        width: var(--spacer-7);
        height: var(--spacer-7);
        border-right: 1px solid var(--color-primary-lighter-2);
        border-bottom: 1px solid var(--color-primary-lighter-2);
        position: absolute;
        right: calc(var(--spacer-3) * -1);
        bottom: calc(var(--spacer-3) * -1);
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: $breakpoint-m) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    &__item {
      flex: 50% 0 0;

      &__name {
        padding-right: var(--spacer-4);
      }
    }
  }
}
</style>
