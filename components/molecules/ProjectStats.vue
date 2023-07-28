<script setup lang="ts">
import { Skill } from "@/types/skills";

defineProps<{
  year: number;
  skills: Skill[];
}>();
</script>

<template>
  <dl class="project-stats">
    <dt class="project-stats__property font-sans--md-capitalized">Année</dt>
    <dd class="project-stats__value font-mono font-mono--small">
      {{ year }}
    </dd>
    <dt class="project-stats__property font-sans--md-capitalized">Outils</dt>
    <dd class="project-stats__value font-mono font-mono--small">
      <ul v-if="skills.length > 1" class="project-stats__skills-list">
        <li v-for="skill in skills" :key="skill.id" class="project-stats__skill project-stats__skill--list-item">
          <div class="project-stats__skill__icon-wrapper icon icon-wrapper icon-wrapper--square icon-wrapper--m" :class="'project-stats__skill__icon-wrapper--' +
            skill.attributes?.category
            ">
            <nuxt-icon :name="skill.attributes?.icon_name" class="project-stats__skill__icon icon icon--m" />
          </div>
          {{ skill.attributes?.name }}
        </li>
      </ul>
      <div v-else class="project-stats__skill">
        <div class="project-stats__skill__icon-wrapper icon icon-wrapper icon-wrapper--square icon-wrapper--m" :class="'project-stats__skill__icon-wrapper--' +
          skills[0].attributes?.category
          ">
          <nuxt-icon :name="skills[0].attributes?.icon_name" class="project-stats__skill__icon icon icon--m" />
        </div>
        {{ skills[0].attributes?.name }}
      </div>
    </dd>
  </dl>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

//
// Variables
//

$skills-types: "development"$theme-color-tertiary, "art"$theme-color-secondary;

//
// Styling
//

.project-stats {
  box-sizing: border-box;
  padding: 0;
  border-bottom: 1px solid map-get($theme-color-primary, lighter-2);
  margin: 0;
  z-index: map-get($z-index, base-increase);

  &__property {
    margin-bottom: map-get($spacers, 3);
    color: map-get($theme-color-accent, lighter);
  }

  &__value {
    margin-left: 0;
    margin-bottom: map-get($spacers, 8);

    &:last-child {
      margin-bottom: map-get($spacers, 6);
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
      color: map-get($theme-color-primary, reverse);

      &-wrapper {
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: map-get($spacers, 3);

        &::before {
          width: 2rem;
          height: 2rem;
        }

        @each $type,
        $theme-color in $skills-types {
          &--#{$type} {
            &::before {
              border: 1px solid map-get($theme-color, base);
              background: linear-gradient(to bottom right,
                  fade-out(map-get($theme-color, darker),
                    map-get($fading-out, 5)),
                  33%,
                  fade-out(map-get($theme-color, base), map-get($fading-out, 0)));
            }
          }
        }
      }

      @media screen and (min-width: $breakpoint-m) {
        color: map-get($theme-color-primary, base);
      }
    }

    &--list-item {
      display: flex;
      box-sizing: border-box;
      flex-basis: 50%;
      flex-grow: 0;
      flex-shrink: 0;
      max-width: 10rem;
      padding: map-get($spacers, 3) map-get($spacers, 2);
      flex-direction: column;

      .project-stats__skill__icon-wrapper {
        margin-top: map-get($spacers, 2);
        margin-right: 0;
      }
    }
  }

  @media screen and (min-width: $breakpoint-m) {
    width: 20rem;
    flex-grow: 0;
    flex-shrink: 0;
    padding: map-get($spacers, 8) map-get($spacers, 7) map-get($spacers, 6) map-get($spacers, 7);
    border: none;
    margin: -12rem 0 0 0;
    background-color: map-get($theme-color-primary, reverse);

    &__property {
      color: map-get($theme-color-accent, darker);
    }

    &__value {
      color: map-get($theme-color-primary, lighter-2);
    }
  }
}
</style>
