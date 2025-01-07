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
.about-interests {
  display: flex;
  position: relative;
  margin-top: var(--spacer-10);
  margin-bottom: var(--spacer-8);
  align-items: center;
  justify-content: center;

  &__icon-wrapper {
    border: var(--spacer-1) solid var(--color-secondary-base);
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: var(--color-primary-base);
    color: var(--color-primary-reverse);
    box-shadow: 
      0
      0
      var(--spacer-2)
      color-mix(
        in srgb,
        transparent var(--opacity-percentage-6),
        var(--color-secondary-base)
      );
    transform: translate(-50%, -50%);
  }

  &__list {
    box-sizing: border-box;
    width: 7.5rem;
    height: 7.5rem;
    padding: 0;
    border: 1px solid var(--color-primary-lighter-3);
    margin: 0;
    position: relative;
    list-style-type: none;
    border-radius: 50%;

    &__item {
      position: absolute;

      &__icon {
        font-size: var(--icon-size-l);
        color: var(--color-primary-lighter-3);

        &-wrapper {
          width: var(--icon-wrapper-size-m);
          height: var(--icon-wrapper-size-m);
          background-color: var(--color-primary-base);
        }
      }

      &__name {
        max-width: var(--spacer-9);
        position: absolute;
      }

      &:first-child {
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);

        .about-interests__list__item__name {
          bottom: 100%;
          left: 50%;
          transform: translate(
            calc(var(--spacer-6) / -2),
            var(--spacer-2));
        }
      }

      &:nth-child(2) {
        top: 50%;
        left: 100%;
        transform: translate(-50%, -50%);

        .about-interests__list__item__name {
          top: 50%;
          left: 100%;
          transform: translate(
            calc(var(--spacer-2) * -1),
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
          transform: translate(
            calc(var(--spacer-6) / 2),
            calc(var(--spacer-2) * -1));
        }
      }

      &:nth-child(4) {
        top: 50%;
        right: 100%;
        transform: translate(50%, -50%);

        .about-interests__list__item__name {
          top: 50%;
          right: 100%;
          transform: translate(var(--spacer-2), -50%);
        }
      }
    }
  }

  @media screen and (min-width: $breakpoint-xs) {
    &__icon {
      font-size: 2.5rem;
      color: var(--color-primary-reverse);

      &-wrapper {
        width: var(--spacer-10);
        height: var(--spacer-10);
      }
    }

    &__list {
      width: 12.5rem;
      height: 12.5rem;

      &__item {
        &__icon {
          font-size: var(--icon-size-xl);

          &-wrapper {
            width: var(--icon-wrapper-size-l);
            height: var(--icon-wrapper-size-l);
          }
        }
      }
    }
  }
}
</style>
