<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div v-html="$mdRenderer.render(text)" class="richtext-wrapper"></div>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

.richtext-wrapper {
  max-width: 45rem;

  strong {
    @include font-sans(capitalized)
  }

  a {
    position: relative;
    font-size: $font-size-base;
    color: map-get($theme-color-accent, lighter);
    font-weight: $font-weight-base;
    line-height: $line-height-base;
    letter-spacing: $letter-spacing-large-1;
    text-decoration: none;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      right: 100%;
      height: 2px;
      background: linear-gradient(to right,
          map-get($theme-color-accent, base),
          fade-out(map-get($theme-color-accent, lighter),
            map-get($fading-out, 3)));
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
