<script setup lang="ts">
import { SocialLink } from '@/types/about'

defineProps<{
  socialLinks: SocialLink[]
}>();
</script>

<template>
  <ul class="about-social-links">
    <li v-for="link in socialLinks" :key="link.id" class="about-social-links__item">
      <a :href="link.url" target="_blank" class="about-social-links__item__link">
        <div class="about-social-links__item__link__icon-wrapper icon-wrapper icon-wrapper--square">
          <nuxt-icon :name="link.icon_name" class="about-social-links__item__link__icon icon" />
        </div>

        <span class="about-social-links__item__link__name">{{ link.name }}</span>
      </a>
    </li>
  </ul>
</template>

<style lang="scss">
@use "sass:math";
@use "../../assets/styles/abstracts" as *;

.about-social-links {
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__item {
    padding-left: map-get($spacers, 4);
    margin-top: map-get($spacers, 3);
    margin-bottom: map-get($spacers, 3);
    position: relative;

    &__link {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      color: map-get($theme-color-primary, reverse);
      text-decoration: none;

      &::before {
        content: "";
        display: block;
        width: 3.5rem;
        height: map-get($spacers, 3);
        position: absolute;
        right: 100%;
        bottom: 50%;
        z-index: -1;
        background-color: map-get($theme-color-accent, base);
        transform: translateX(map-get($spacers, 4));
      }

      &::after {
        content: "";
        display: block;
        width: auto;
        height: map-get($spacers, 3);
        position: absolute;
        top: 50%;
        right: calc(100% - 5.25rem);
        left: map-get($spacers, 5);
        z-index: -2;
        background: linear-gradient(to right,
            fade-out(map-get($theme-color-accent, lighter),
              map-get($fading-out, 4)),
            transparent);
        transform: translateY(0);
        transition: right .2s .1s ease-out,
          transform .12s ease-out;
      }

      &__icon {
        font-size: map-get($icon-sizes, s);
        color: map-get($theme-color-primary, base);

        &-wrapper {
          width: map-get($icon-wrapper-sizes, s);
          height: map-get($icon-wrapper-sizes, s);
          flex-grow: 0;
          flex-shrink: 0;

          &::before {
            width: 1.75rem;
            height: 1.75rem;
            border-width: map-get($spacers, 1);
            border-color: map-get($theme-color-accent, darker);
            background-color: map-get($theme-color-primary, reverse);
            box-shadow: 0 0 map-get($spacers, 2) fade-out(map-get($theme-color-accent, lighter),
                map-get($fading-out, 7));
            transition: transform .32s cubic-bezier(0, -0.8, .4, 1.25);
          }
        }
      }

      &__name {
        margin-left: map-get($spacers, 3);
      }

      &:hover,
      &:focus,
      &:active {
        &::after {
          right: 0;
          background: linear-gradient(to right,
              fade-out(map-get($theme-color-accent, lighter),
                map-get($fading-out, 6)),
              transparent);
          transform: translateY(.375rem);
        }

        .about-social-links__item__link__icon-wrapper::before {
          transform: translate(-50%, -50%) rotate(180deg);
        }
      }
    }
  }

  @media screen and (min-width: $breakpoint-m) {
    &__item {
      padding-left: map-get($spacers, 10);
      margin-top: map-get($spacers, 4);
      margin-bottom: map-get($spacers, 4);

      &__link {
        &::before {
          width: map-get($spacers, 7);
          height: map-get($spacers, 1);
          left: map-get($spacers, 8) * -1;
          transform: translateY(50%);
          transition: width .12s ease-out,
            left .12s ease-out;
        }

        &::after {
          left: map-get($spacers, 6);
        }

        &__icon {
          font-size: map-get($icon-sizes, m);

          &-wrapper {
            width: map-get($icon-wrapper-sizes, m);
            height: map-get($icon-wrapper-sizes, m);

            &::before {
              width: 2.125rem;
              height: 2.125rem;
            }
          }
        }

        &:hover,
        &:focus,
        &:active {
          &::before {
            width: map-get($spacers, 5);
            left: map-get($spacers, 5) * -1;
          }
        }
      }
    }
  }
}
</style>
