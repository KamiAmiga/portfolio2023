<script setup lang="ts">
import { inView } from "motion"

import type { SocialLink } from '@/types/about'

defineProps<{
  socialLinks: SocialLink[]
}>();

const isInView = ref(false)
const container = useTemplateRef("container")
let stopViewTracking: () => void

onMounted(() => {
  if (!container.value) return

  stopViewTracking = inView(container.value, () => {
    isInView.value = true

    stopViewTracking()

    return () => {
      isInView.value = false
    }
  }, {
    margin: "0% 0% -33% 0%"
  })
})
  
onUnmounted(() => stopViewTracking())
</script>

<template>
  <section ref="container" class="section section--half">
    <h2 
      class="about-social-links__title heading--second"
      :class="{'about-social-links__title--in-view' : isInView}">
      Contacts
    </h2>

    <ul class="about-social-links">
      <li
        v-for="(link, index) in socialLinks"
        :key="link.id"
        class="about-social-links__item"
        :class="{'about-social-links__item--in-view': isInView}"
        :style="{'--delay': `${index * .1}s`}">
        <a :href="link.url" target="_blank" class="about-social-links__item__link">
          <div class="about-social-links__item__link__icon-wrapper icon-wrapper icon-wrapper--square">
            <nuxt-icon :name="link.icon_name" class="about-social-links__item__link__icon icon" />
          </div>
  
          <span class="about-social-links__item__link__name">{{ link.name }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.about-social-links {
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__title {
    opacity: 0;
    transition: opacity .5s ease-in-out;

    &--in-view {
      opacity: 1;
    }
  }

  &__item {
    padding-left: var(--spacer-6);
    margin-top: var(--spacer-3);
    margin-bottom: var(--spacer-3);
    position: relative;
    opacity: 0;
    transition: opacity .4s ease-in-out calc(var(--delay) + .4s),
      padding .45s ease-in-out calc(var(--delay) + .42s);

    &--in-view {
      padding-left: var(--spacer-4);
      opacity: 1;
    }

    &__link {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      color: var(--color-primary-reverse);
      text-decoration: none;

      &::before {
        content: "";
        display: block;
        width: 3.5rem;
        height: var(--spacer-3);
        position: absolute;
        right: 100%;
        bottom: 50%;
        z-index: -1;
        background-color: var(--color-accent-base);
        transform: translateX(var(--spacer-4));
      }

      &::after {
        content: "";
        display: block;
        width: auto;
        height: var(--spacer-3);
        position: absolute;
        top: 50%;
        right: calc(100% - 5.25rem);
        left: var(--spacer-5);
        z-index: -2;
        background: linear-gradient(
          to right,
          color-mix(
            in srgb,
            transparent var(--opacity-percentage-8),
            var(--color-accent-lighter)
          ),
          transparent);
        transform: translateY(0);
        transition:
          right .2s .1s ease-out,
          transform .12s ease-out;
      }

      &__icon {
        font-size: var(--icon-size-s);
        color: var(--color-primary-base);

        &-wrapper {
          width: var(--icon-wrapper-size-s);
          height: var(--icon-wrapper-size-s);
          flex-grow: 0;
          flex-shrink: 0;

          &::before {
            width: 1.75rem;
            height: 1.75rem;
            border-width: var(--spacer-1);
            border-color: var(--color-accent-darker);
            background-color: var(--color-primary-reverse);
            box-shadow:
              0
              0
              var(--spacer-2)
              color-mix(
                in srgb,
                transparent var(--opacity-percentage-5),
                var(--color-accent-lighter)
              );
            transition: transform .32s cubic-bezier(0, -0.8, .4, 1.25);
          }
        }
      }

      &__name {
        margin-left: var(--spacer-3);
      }

      &:hover,
      &:focus,
      &:active {
        &::after {
          right: 0;
          background: linear-gradient(
            to right,
            color-mix(
              in srgb,
              transparent var(--opacity-percentage-6),
              var(--color-accent-lighter)
            ),
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
      padding-left: var(--spacer-11);
      margin-top: var(--spacer-4);
      margin-bottom: var(--spacer-4);

      &--in-view {
        padding-left: var(--spacer-10);
      }

      &__link {
        &::before {
          width: var(--spacer-7);
          height: var(--spacer-1);
          left: calc(var(--spacer-8) * -1);
          transform: translateY(50%);
          transition:
            width .12s ease-out,
            left .12s ease-out;
        }

        &::after {
          left: var(--spacer-6);
        }

        &__icon {
          font-size: var(--icon-size-m);

          &-wrapper {
            width: var(--icon-wrapper-size-m);
            height: var(--icon-wrapper-size-m);

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
            width: var(--spacer-5);
            left: calc(var(--spacer-5) * -1);
          }
        }
      }
    }
  }
}
</style>
