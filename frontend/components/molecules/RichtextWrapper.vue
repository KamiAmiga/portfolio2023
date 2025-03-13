<script setup lang="ts">
import type { BlockNode } from '#strapi-blocks-renderer/types';

defineProps<{
  text: BlockNode[];
}>();
</script>

<template>
   <div class="richtext-wrapper">
     <StrapiBlocksText :nodes="text" />
   </div>
</template>

<style lang="scss">
.richtext-wrapper {
  max-width: 45rem;

  strong {
    @include font-sans(capitalized)
  }

  a {
    position: relative;
    font-size: var(--font-sans-size-base);
    color: var(--color-accent-lighter);
    font-weight: var(--font-sans-weight-base);
    line-height: var(--font-sans-line-height-base);
    letter-spacing: var(--font-sans-letter-spacing-base);
    text-decoration: none;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      right: 100%;
      height: 2px;
      background: linear-gradient(
        to right,
        var(--color-accent-base),
        color-mix(
          in srgb,
          transparent var(--opacity-percentage-8),
          var(--color-accent-lighter)
        ));
      transition: right .16s ease-out;
    }

    &:hover,
    &:focus,
    &:active {
      &::after {
        right: 0;
      }
    }
  }
}
</style>
