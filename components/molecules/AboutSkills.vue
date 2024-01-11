<script setup lang="ts">
import { type Skill } from "@/types/skills";

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
</script>

<template>
  <ul class="about-skills">
    <li v-for="skill in sortedSkills" :key="skill.id" class="about-skills__item"
      :class="'about-skills__item--' + skill.attributes.category">
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
    <li class="about-skills__filler about-skills__filler--lang"></li>
    <li class="about-skills__filler about-skills__filler--dev"></li>
    <li class="about-skills__filler about-skills__filler--art"></li>
  </ul>
</template>

<style lang="scss">
@use "sass:math";
@use "../../assets/styles/abstracts" as *;

//
// Variables
//

$types: "language"$theme-color-fourth,
  "development"$theme-color-tertiary,
  "art"$theme-color-secondary,
  "web"$theme-color-accent;

$skill-item-size: 7.5rem;
$skill-grid-gap: .0625rem;

//
// Styling
//

.about-skills {
  display: grid;
  width: min-content;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: $skill-grid-gap;
  list-style-type: none;

  &__item {
    display: flex;
    box-sizing: border-box;
    width: $skill-item-size;
    height: $skill-item-size;
    padding: map-get($spacers, 3);
    position: relative;
    flex-direction: column;
    fill: map-get($theme-color-primary, reverse);

    &__icon-wrapper {
      display: flex;
      flex-grow: 1;
      align-items: flex-end;
    }

    &__name {
      padding-top: map-get($spacers, 4);
    }

    &__level {
      position: absolute;
      top: map-get($spacers, 3);
      right: map-get($spacers, 3);
    }

    @each $name,
    $theme-color in $types {
      &--#{$name} {
        background: linear-gradient(to top right,
            fade-out(map-get($theme-color, darker),
              map-get($fading-out, 5)),
            33%,
            fade-out(map-get($theme-color, base),
              map-get($fading-out, 2)));
        border: .0625rem solid map-get($theme-color, base);
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
