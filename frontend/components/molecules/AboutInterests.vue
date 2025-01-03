<script setup lang="ts">
import type { Interest } from '@/types/about'

defineProps<{
  interests: Interest[]
}>();
</script>

<template>
  <div class="about-interests">
    <div class="about-interests__icon-wrapper icon-wrapper icon-wrapper--l icon-wrapper--circle">
      <nuxt-icon class="icon icon--xl" name="heart" />
    </div>

    <ul class="about-interests__list">
      <li v-for="interest in interests" :key="interest.id" class="about-interests__list__item">
        <div class="about-interests__list__item__icon-wrapper icon-wrapper icon-wrapper--circle">
          <nuxt-icon :name="interest.icon_name" class="about-interests__list__item__icon icon" />
        </div>

        <h3 class="about-interests__list__item__name font-mono font-mono--small">{{ interest.name }}</h3>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "sass:math";

.about-interests {
  display: flex;
  position: relative;
  margin-top: map-get($spacers, 10);
  margin-bottom: map-get($spacers, 8);
  align-items: center;
  justify-content: center;

  &__icon-wrapper {
    border: map-get($spacers, 1) solid map-get($theme-color-secondary, base);
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: map-get($theme-color-primary, base);
    color: map-get($theme-color-primary, reverse);
    box-shadow: 0 0 map-get($spacers, 2) fade-out(map-get($theme-color-secondary, base),
        map-get($fading-out, 6));
    transform: translate(-50%, -50%);
  }

  &__list {
    box-sizing: border-box;
    width: 7.5rem;
    height: 7.5rem;
    padding: 0;
    border: 1px solid map-get($theme-color-primary, lighter-3);
    margin: 0;
    position: relative;
    list-style-type: none;
    border-radius: 50%;

    &__item {
      position: absolute;

      &__icon {
        font-size: map-get($icon-sizes, l);
        color: map-get($theme-color-primary, lighter-3);

        &-wrapper {
          width: map-get($icon-wrapper-sizes, m);
          height: map-get($icon-wrapper-sizes, m);
          background-color: map-get($theme-color-primary, base);
        }
      }

      &__name {
        max-width: map-get($spacers, 9);
        position: absolute;
      }

      &:first-child {
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);

        .about-interests__list__item__name {
          bottom: 100%;
          left: 50%;
          transform: translate(math.div(map-get($spacers, 6), -2),
              map-get($spacers, 2));
        }
      }

      &:nth-child(2) {
        top: 50%;
        left: 100%;
        transform: translate(-50%, -50%);

        .about-interests__list__item__name {
          top: 50%;
          left: 100%;
          transform: translate(map-get($spacers, 2) * -1,
              -50%);
        }
      }

      &:nth-child(3) {
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);

        .about-interests__list__item__name {
          top: 100%;
          right: 50%;
          transform: translate(math.div(map-get($spacers, 6), 2),
              map-get($spacers, 2) * -1,
            );
        }
      }

      &:nth-child(4) {
        top: 50%;
        right: 100%;
        transform: translate(50%, -50%);

        .about-interests__list__item__name {
          top: 50%;
          right: 100%;
          transform: translate(map-get($spacers, 2),
              -50%);
        }
      }
    }
  }

  @media screen and (min-width: $breakpoint-xs) {
    &__icon {
      font-size: 2.5rem;
      color: map-get($theme-color-primary, reverse);

      &-wrapper {
        width: map-get($spacers, 10);
        height: map-get($spacers, 10);
      }
    }

    &__list {
      width: 12.5rem;
      height: 12.5rem;

      &__item {
        &__icon {
          font-size: map-get($icon-sizes, xl);

          &-wrapper {
            width: map-get($icon-wrapper-sizes, l);
            height: map-get($icon-wrapper-sizes, l);
          }
        }
      }
    }
  }
}
</style>
