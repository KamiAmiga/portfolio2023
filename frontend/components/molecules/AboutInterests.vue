<script setup lang="ts">
import { inView } from "motion"
import type { Interest } from '@/types/about'

defineProps<{
  interests: Interest[]
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
    <h2 class="about-interests__title heading--second" :class="{'about-interests__title--in-view' : isInView}">Intérêts</h2>

    <div class="about-interests">
      <div 
        class="about-interests__icon-wrapper icon-wrapper icon-wrapper--l icon-wrapper--circle"
        :class="{'about-interests__icon-wrapper--in-view': isInView}">
        <nuxt-icon class="icon icon--xl" name="heart" />
      </div>
  
      <ul
        class="about-interests__list"
        :class="{'about-interests__list--in-view': isInView}">
        <li
          v-for="(interest, index) in interests"
          :key="interest.id"
          class="about-interests__list__item"
          :class="{'about-interests__list__item--in-view': isInView}"
          :style="{'--delay': `${index * .05}s`}">
          <div class="about-interests__list__item__icon-wrapper icon-wrapper icon-wrapper--circle">
            <nuxt-icon :name="interest.icon_name" class="about-interests__list__item__icon icon" />
          </div>
  
          <h3 class="about-interests__list__item__name font-mono font-mono--small">{{ interest.name }}</h3>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
.about-interests {
  display: flex;
  position: relative;
  margin-top: var(--spacer-10);
  margin-bottom: var(--spacer-8);
  align-items: center;
  justify-content: center;

  &__title {
    opacity: 0;
    transition: opacity .5s ease-in-out;

    &--in-view {
      opacity: 1;
    }
  }

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
    opacity: 0;
    transition: opacity .5s ease-in-out .4s;

    &--in-view {
      opacity: 1;
    }
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
    opacity: 0;
    transition: opacity .5s ease-in-out .2s;

    &--in-view {
      opacity: 1;
    }

    &__item {
      position: absolute;
      opacity: 0;
      transition: opacity .3s ease-in-out calc(var(--delay) + .6s);

      &--in-view {
        opacity: 1;
      }

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
