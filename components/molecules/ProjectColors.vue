<script setup lang="ts">
import { ProjectColor } from 'types/project';

defineProps<{
  colors: ProjectColor[];
}>();
</script>

<template>
  <ul class="project-colors">
    <li v-for="color in colors" :key="color.id" class="project-colors__item">
      <span class="project-colors__item__swatch" :style="{ '--swatch-color': `#${color.color_code}` }"></span>
      <span class="project-colors__item__name">{{ color.color_name }}</span>
    </li>
  </ul>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

.project-colors {
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: map-get($spacers, 7);

    &__swatch {
      display: block;
      width: map-get($spacers, 9);
      height: map-get($spacers, 9);
      flex-grow: 0;
      flex-shrink: 0;
      position: relative;
      margin-right: map-get($spacers, 6);
      background-color: var(--swatch-color);

      &::after {
        content: "";
        display: block;
        width: map-get($spacers, 7);
        height: map-get($spacers, 7);
        border-right: 1px solid map-get($theme-color-primary, lighter-2);
        border-bottom: 1px solid map-get($theme-color-primary, lighter-2);
        position: absolute;
        right: map-get($spacers, 3) * -1;
        bottom: map-get($spacers, 3) * -1;
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
        padding-right: map-get($spacers, 4);
      }
    }
  }
}
</style>
