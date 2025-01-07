<script setup lang="ts">
import type { Skill } from "@/types/skills";

defineProps<{
  year: number;
  skills?: Skill[];
}>();
</script>

<template>
  <dl class="project-stats">
    <dt class="project-stats__property font-sans--md-capitalized">Année</dt>
    <dd class="project-stats__value font-mono font-mono--small">
      {{ year }}
    </dd>
    <dt class="project-stats__property font-sans--md-capitalized">Outils</dt>
    <dd v-if="skills" class="project-stats__value font-mono font-mono--small">
      <ul v-if="skills.length > 1" class="project-stats__skills-list">
        <li v-for="skill in skills" :key="skill.id" class="project-stats__skill project-stats__skill--list-item">
          <div
            class="project-stats__skill__icon-wrapper icon icon-wrapper icon-wrapper--square icon-wrapper--m"
            :class="'project-stats__skill__icon-wrapper--' + skill.attributes?.category">
            <nuxt-icon :name="skill.attributes?.icon_name" class="project-stats__skill__icon icon icon--m" />
          </div>
          {{ skill.attributes?.name }}
        </li>
      </ul>
      <div v-else class="project-stats__skill">
        <div
          class="project-stats__skill__icon-wrapper icon icon-wrapper icon-wrapper--square icon-wrapper--m"
          :class="'project-stats__skill__icon-wrapper--' + skills[0].attributes?.category">
          <nuxt-icon :name="skills[0].attributes?.icon_name" class="project-stats__skill__icon icon icon--m" />
        </div>
        {{ skills[0].attributes?.name }}
      </div>
    </dd>
  </dl>
</template>

<style lang="scss">
@use "sass:map";

//
// Variables
//

$skills-types: 
  "development" $theme-color-tertiary,
  "art" $theme-color-secondary;

//
// Styling
//

.project-stats {
  box-sizing: border-box;
  padding: 0;
  border-bottom: 1px solid var(--color-primary-lighter-2);
  margin: 0;
  z-index: var(--z-index-base-increase);

  &__property {
    margin-bottom: var(--spacer-3);
    color: var(--color-accent-lighter);
  }

  &__value {
    margin-left: 0;
    margin-bottom: var(--spacer-8);

    &:last-child {
      margin-bottom: var(--spacer-6);
    }
  }

  &__skills-list {
    display: flex;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    list-style: none;
  }

  &__skill {
    display: flex;
    align-items: center;

    &__icon {
      color: var(--color-primary-reverse);

      &-wrapper {
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: var(--spacer-3);

        &::before {
          width: 2rem;
          height: 2rem;
        }

        @each $type, $theme-color in $skills-types {
          &--#{$type} {
            &::before {
              border: 1px solid map.get($theme-color, base);
              background: linear-gradient(
                to bottom right,
                color-mix(
                  in srgb,
                  transparent var(--opacity-percentage-7),
                  map.get($theme-color, darker)
                ),
                33%,
                transparent);
            }
          }
        }
      }

      @media screen and (min-width: $breakpoint-m) {
        color: var(--color-primary-base);
      }
    }

    &--list-item {
      display: flex;
      box-sizing: border-box;
      flex-basis: 50%;
      flex-grow: 0;
      flex-shrink: 0;
      max-width: 10rem;
      padding: var(--spacer-3) var(--spacer-2);
      flex-direction: column;

      .project-stats__skill__icon-wrapper {
        margin-top: var(--spacer-2);
        margin-right: 0;
      }
    }
  }

  @media screen and (min-width: $breakpoint-m) {
    width: 20rem;
    flex-grow: 0;
    flex-shrink: 0;
    padding: var(--spacer-8) var(--spacer-7) var(--spacer-6) var(--spacer-7);
    border: none;
    margin: -12rem 0 0 0;
    background-color: var(--color-primary-reverse);

    &__property {
      color: var(--color-accent-darker);
    }

    &__value {
      color: var(--color-primary-lighter-2);
    }
  }
}
</style>
