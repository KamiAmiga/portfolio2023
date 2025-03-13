<script setup lang="ts">
import { inView } from "motion"
import type { Experience } from '@/types/about'

defineProps<{
  history: Experience[]
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
  <section ref="container" class="section section--full">
    <h2 class="about-history__title heading--second" :class="{'about-history__title--in-view' : isInView}">Parcours</h2>
  
    <ul class="about-history" :class="{'about-history--in-view' : isInView}">
      <li
        v-for="(historyItem, index) in history"
        :key="historyItem.id"
        class="about-history__item"
        :class="[
          'about-history__item--' + historyItem.category,
          { 'about-history__item--junction': 
            historyItem.category !== history[index + 1]?.category 
            && index < history.length - 1 
            && index !== 0 }
        ]"
        :style="`--delay: ${index * .05 + .4}s`"
      >
        <span class="about-history__item__icon-wrapper icon-wrapper icon-wrapper--s icon-wrapper--circle">
          <nuxt-icon v-if="historyItem.category === 'school'" class="icon icon--m" name="scholar" />
          <nuxt-icon v-else class="icon icon--m" name="bag" />
        </span>
        <div class="about-history__item__description">
          <span class="font-sans--bold">{{ historyItem.name }}</span>
          <p class="font-mono font-mono--small">
            <span v-if="historyItem.place" class="about-history__item__description__company">
              {{ historyItem.place }},
            </span>
            <span class="about-history__item__description__date">
              {{ historyItem.date }}
            </span>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@use "sass:map";
@use "sass:math";

//
// Variables
//

$history-item-school-color: map.get($theme-color-secondary, base);
$history-item-work-color: map.get($theme-color-tertiary, base);
$history-item-link-width: map.get($spacers, 1);
$history-item-link-adjust: math.div($history-item-link-width, 2);

$types: 
  "school" $history-item-school-color,
  "work" $history-item-work-color;

//
// Styling
//

.about-history {
  $self: &;

  display: flex;
  padding: 0;
  margin: 0;
  list-style-type: none;
  flex-direction: column;
  opacity: 0;
  transition: opacity .5s ease-in-out;

  &__title {
    opacity: 0;
    transition: opacity .5s ease-in-out;

    &--in-view {
      opacity: 1;
    }
  }

  &--in-view {
    opacity: 1;
  }

  &__item {
    box-sizing: border-box;
    padding: var(--spacer-4) 0 var(--spacer-4) calc(2.5rem + var(--spacer-4));
    position: relative;
    opacity: 0;
    transition: opacity .4s var(--delay) ease-in-out;

    &::before {
      content: "";
      display: block;
      width: $history-item-link-width;
      height: 100%;
      position: absolute;
      top: 0;
      left: var(--spacer-5);
      background-color: var(--item-color);
      transform: translateX(-50%);
    }

    @each $name, $color in $types {
      &--#{$name} {
        --item-color: #{$color};
      }
    }

    #{$self}--in-view & {
      opacity: 1;
    }

    &__icon-wrapper {
      color: var(--color-primary-base);
      border: var(--spacer-1) solid var(--item-color);
      background-color: var(--color-primary-reverse);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);

      svg {
        margin-bottom: 0;
        vertical-align: baseline;
      }
    }

    &__description {
      &__company,
      &__date {
        display: block;
      }
    }
  }

  @media screen and (min-width: $breakpoint-xs) {
    &__item {
      width: 50%;

      &--school {
        align-self: flex-start;
        padding: 
          var(--spacer-4) 
          (calc(var(--icon-wrapper-size-s) / 2 + var(--spacer-4)))
          var(--spacer-4)
          0;

        &::before {
          left: 100%;
        }

        .about-history__item__icon-wrapper {
          left: 100%;
          transform: translate(-50%, -50%);
        }

        .about-history__item__description {
          text-align: right;
        }
      }

      &--work {
        align-self: flex-end;
        padding: 
          var(--spacer-4)
          0
          var(--spacer-4)
          (calc(var(--icon-wrapper-size-s) / 2 + var(--spacer-4)));

        &::before {
          left: 0;
        }

        .about-history__item__icon-wrapper {
          left: calc(var(--icon-wrapper-size-s) / -2);
        }
      }
    }
  }

  @media screen and (min-width: $breakpoint-l) {
    flex-direction: row;
    justify-content: center;

    &__item {
      width: 12.5%;
      padding: 0;

      &::before {
        width: 100%;
        height: 0;
        left: 0;
      }

      &__description {
        position: absolute;
        width: 200%;
      }

      &__icon-wrapper {
        transform: translate(-50%, -50%);
      }

      &--school {
        height: 15rem;
        align-self: flex-start;

        &::before {
          border-top: var(--spacer-1) solid var(--color-secondary-base);
          top: 100%;
          background-color: transparent;
          transform: translateY(-$history-item-link-adjust);
        }

        &.about-history__item--junction {
          &::before {
            width: 200%;
            height: var(--spacer-9);
            border-right: var(--spacer-1) solid var(--color-secondary-base);
            border-top-right-radius: .5rem;
            right: 0;
            left: auto;
            transform-origin: top right;
            transform: translateY(-$history-item-link-adjust) skewX(30deg);
          }
        }

        .about-history__item__description {
          bottom: 0;
          left: 50%;
          text-align: left;
          transform-origin: left bottom;
          transform: translate(2.5rem, calc(var(--spacer-6) * -1)) rotate(330deg);
        }

        .about-history__item__icon-wrapper {
          top: 100%;
          left: 50%;
        }
      }

      &--work {
        height: 10rem;
        align-self: flex-end;
        margin-top: 19.125rem;

        &::before {
          border-bottom: var(--spacer-1) solid var(--color-tertiary-base);
          background-color: transparent;
          transform: translateY(-$history-item-link-adjust);
        }

        &.about-history__item--junction {
          &::before {
            width: 200%;
            height: var(--spacer-9);
            border-left: var(--spacer-1) solid var(--color-tertiary-base);
            border-bottom-left-radius: .5rem;
            top: auto;
            bottom: 100%;
            transform-origin: bottom left;
            transform: translateY($history-item-link-adjust) skewX(30deg);
          }
        }

        .about-history__item__description {
          right: 50%;
          text-align: right;
          transform-origin: right top;
          transform: translate(-2.5rem, var(--spacer-6)) rotate(330deg);
        }

        .about-history__item__icon-wrapper {
          top: 0;
          left: 50%;
        }
      }
    }
  }
}
</style>
