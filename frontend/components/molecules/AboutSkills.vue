<script setup lang="ts">
import { inView } from "motion"
import type { Skill } from "@/types/skills";

const props = defineProps<{
  skills: Skill[]
}>();

const sortedSkills = computed(() => {
  const langSkills = props.skills.filter(skill => skill.attributes.category === 'language')
  const devSkills = props.skills.filter(skill => skill.attributes.category === 'development')
  const artSkills = props.skills.filter(skill => skill.attributes.category === 'art')
  const webSkills = props.skills.filter(skill => skill.attributes.category === 'web')

  return langSkills.concat(devSkills, artSkills, webSkills)
})

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
  <ul ref="container" class="about-skills" :class="{'about-skills--in-view' : isInView}">
    <li 
      v-for="(skill, index) in sortedSkills"
      :key="skill.id"
      class="about-skills__item"
      :class="'about-skills__item--' + skill.attributes.category"
      :style="`--delay: ${index * .02}s`">
      <div class="about-skills__item__icon-wrapper">
        <nuxt-icon :name="skill.attributes.icon_name" class="icon icon--xl" />
      </div>

      <span class="about-skills__item__name">{{ skill.attributes.name }}</span>

      <template v-if="skill.attributes.level && skill.attributes.level > 0">
        <template v-if="skill.attributes.level == 1">
          <span class="sr-only">Niveau correct</span>
          <nuxt-icon class="about-skills__item__level icon icon--s" name="star" />
        </template>

        <template v-else>
          <span class="sr-only">Bon niveau</span>
          <nuxt-icon class="about-skills__item__level icon icon--s" name="stars" />
        </template>
      </template>
    </li>
    <li class="about-skills__filler about-skills__filler--lang"/>
    <li class="about-skills__filler about-skills__filler--dev"/>
    <li class="about-skills__filler about-skills__filler--art"/>
  </ul>
</template>

<style lang="scss">
@use "sass:map";

//
// Variables
//

$types:
  "language" $theme-color-fourth,
  "development" $theme-color-tertiary,
  "art" $theme-color-secondary,
  "web" $theme-color-accent;

$skill-item-size: 7.5rem;
$skill-grid-gap: .125rem;

//
// Styling
//

.about-skills {
  $self: &;

  display: grid;
  width: min-content;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: $skill-grid-gap;
  list-style-type: none;

  &__item {
    --responsiveDelay: calc(var(--delay) * 2);

    display: flex;
    box-sizing: border-box;
    width: $skill-item-size;
    height: $skill-item-size;
    padding: var(--spacer-3);
    position: relative;
    flex-direction: column;
    fill: var(--color-primary-reverse);
    opacity: 0;
    background: linear-gradient(
      to top right,
      color-mix(
        in srgb,
        transparent var(--opacity-percentage-7),
        var(--theme-color-darker)
      ),
      33%,
      color-mix(
        in srgb,
        transparent var(--opacity-percentage-9),
        var(--theme-color-base)
      ) 75%);
    border: .0625rem solid var(--theme-color-base);
    transform: scale(0.25);
    transition: opacity .25s var(--responsiveDelay) ease-in-out,
      transform .4s var(--responsiveDelay) cubic-bezier(.5,.75,.75,1.25);

    @media screen and (min-width: $breakpoint-m) {
      --responsiveDelay: var(--delay);
    }

    #{$self}--in-view & {
      opacity: 1;
      transform: scale(1);
    }

    &__icon-wrapper {
      display: flex;
      flex-grow: 1;
      align-items: flex-end;
    }

    &__name {
      padding-top: var(--spacer-4);
    }

    &__level {
      position: absolute;
      top: var(--spacer-2);
      right: var(--spacer-3);
    }

    @each $name, $theme-color in $types {
      &--#{$name} {
        --theme-color-base: #{map.get($theme-color, base)};
        --theme-color-darker: #{map.get($theme-color, darker)};
      }
    }
  }

  &__filler {
    display: none;

    @media screen and (min-width: $breakpoint-xs) {
      display: block;
    }

    &--lang {
      grid-column: 3 / span 1;
      grid-row: 1 / span 1;

      @media screen and (min-width: $breakpoint-m) {
        grid-column: 1 / span 1;
        grid-row: 3 / span 2;
      }

      @media screen and (min-width: $breakpoint-l) {
        grid-row: 3 / span 1;
      }
    }

    &--dev {
      grid-column: 3 / span 1;
      grid-row: 3 / span 2;

      @media screen and (min-width: $breakpoint-m) {
        grid-column: 3 / span 4;
        grid-row: 1 / span 1;
      }

      @media screen and (min-width: $breakpoint-l) {
        grid-column: 3 / span 2;
      }
    }

    &--art {
      display: block;
      grid-column: 2 / span 1;
      grid-row: 8 / span 1;

      @media screen and (min-width: $breakpoint-xs) {
        grid-column: 3 / span 1;
        grid-row: 7 / span 1;
      }

      @media screen and (min-width: $breakpoint-m) {
        grid-column: 6 / span 2;
        grid-row: 4 / span 1;
      }

      @media screen and (min-width: $breakpoint-l) {
        display: none;
      }
    }
  }

  @media screen and (min-width: $breakpoint-m) {
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-auto-flow: column;
    margin: 0 auto;
  }

  @media screen and (min-width: $breakpoint-l) {
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}
</style>
