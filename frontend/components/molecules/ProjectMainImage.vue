<script setup lang="ts">
import { ProjectMainImageTypes } from "@/types/project";
import type {
   StrapiImage
} from "@/types/strapiResponsiveImage";

const props = defineProps<{
  type: `${ProjectMainImageTypes}`;
  images: StrapiImage[];
}>();

const mainImageCategory = computed(() => {
  return props.type.split("-")[0];
});
</script>

<template>
  <figure :class="`project-main-image project-main-image--${mainImageCategory} project-main-image--${type}`">
    <template v-if="type === ProjectMainImageTypes.Drawing">
      <div class="project-main-image__picture-wrapper">
        <CustomPicture :picture-data="images[0].attributes" format="full_width" />
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.UIMobileDesktop">
      <div class="project-main-image__picture-wrapper">
        <CustomPicture
          :key="images[0].id" :picture-data="images[0].attributes"
          format="full_width" />
      </div>

      <div class="project-main-image__picture-wrapper">
        <CustomPicture
          :key="images[1].id" :picture-data="images[1].attributes"
          format="fourth_width" />
      </div>
    </template>

    <template
      v-else-if="type === ProjectMainImageTypes.UIDesktop
        || type === ProjectMainImageTypes.DesignVisualID">
      <div class="project-main-image__picture-wrapper">
        <CustomPicture
          :key="images[0].id" :picture-data="images[0].attributes"
          format="full_width" />
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.DesignPrint">
      <div v-for="image in images" :key="image.id" class="project-main-image__picture-wrapper">
        <CustomPicture :picture-data="image.attributes" format="half_width" />
      </div>
    </template>

    <template v-else>
      <div v-for="image in images" :key="image.id" class="project-main-image__picture-wrapper">
        <CustomPicture :picture-data="image.attributes" format="fourth_width" />
      </div>
    </template>
  </figure>
</template>

<style lang="scss">
.project-main-image {
  $self: &;

  &--ui {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: var(--spacer-9) var(--spacer-base);
    background: linear-gradient(
      to bottom,
      var(--color-primary-base) 50%,
      color-mix(
        in srgb,
        var(--color-accent-darker) var(--opacity-percentage-5),
        var(--color-primary-base)
      ));
    
    box-shadow:
      calc(var(--spacer-2) * -1)
      var(--spacer-1)
      var(--spacer-2)
      color-mix(
        in srgb,
        transparent var(--opacity-percentage-8),
        var(--color-accent-base)
      );

    &-mobile_desktop {
      flex-direction: column;

      @media screen and (min-width: $breakpoint-m) {
        padding-left: var(--spacer-8);
        padding-right: var(--spacer-8);
      }
    }

    &-mobile {
      flex-grow: 1;
      flex-direction: row;
      justify-content: space-between;
      column-gap: var(--spacer-base);

      @media screen and (min-width: $breakpoint-m) {
        justify-content: center;
        column-gap: var(--spacer-8);
      }
    }

    &-desktop {
      @media screen and (min-width: $breakpoint-m) {
        padding-left: var(--spacer-8);
        padding-right: var(--spacer-8);
      }
    }
  }

  &--design {
    padding: var(--spacer-9) var(--spacer-base);

    &-visual_id {
      background: linear-gradient(
        to bottom right,
        color-mix(
          in srgb,
          var(--color-secondary-darker) var(--opacity-percentage-5),
          var(--color-primary-base)
        ),
        25%,
        var(--color-primary-base),
        75%,
        color-mix(
          in srgb,
          var(--color-secondary-darker) var(--opacity-percentage-5),
          var(--color-primary-base)
        ));
      box-shadow:
        calc(var(--spacer-2) * -1)
        var(--spacer-1)
        var(--spacer-2)
        color-mix(
          in srgb,
          transparent var(--opacity-percentage-7),
          var(--color-secondary-lighter)
        );

      @media screen and (min-width: $breakpoint-m) {
        padding: var(--spacer-8) var(--spacer-9);
      }
    }

    &-print {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background: linear-gradient(
        to bottom,
        var(--color-primary-base) 50%,
        color-mix(
          in srgb,
          var(--color-tertiary-darker) var(--opacity-percentage-5),
          var(--color-primary-base)
        ));
      box-shadow:
        calc(var(--spacer-2) * -1)
        var(--spacer-1)
        var(--spacer-2)
        color-mix(
          in srgb,
          transparent var(--opacity-percentage-7),
          var(--color-tertiary-lighter)
        );

      @media screen and (min-width: $breakpoint-m) {
        padding-left: var(--spacer-8);
        padding-right: var(--spacer-8);
      }
    }
  }

  &--drawing {
    width: fit-content;
    box-shadow:
      calc(var(--spacer-2) * -1)
      var(--spacer-1)
      var(--spacer-2)
      color-mix(
        in srgb,
        transparent var(--opacity-percentage-7),
        var(--color-secondary-lighter)
      );
  }

  &__picture-wrapper {
    #{$self}--ui & {
      position: relative;
      overflow: hidden;
      border-radius: var(--spacer-2);
      box-shadow:
        0
        0
        var(--spacer-3)
        calc(var(--spacer-1) * -1)
        var(--color-primary-lighter-3);

      @media screen and (min-width: $breakpoint-m) {
        border-radius: var(--spacer-3);
      }
    }

    #{$self}--ui-mobile_desktop & {
      flex-grow: 0;
    }

    #{$self}--design-print & {
      max-width: 75%;
      box-shadow:
        0
        0
        var(--spacer-3)
        calc(var(--spacer-1) * -1)
        var(--color-primary-lighter-3);
    }

    &:first-child {
      #{$self}--ui-mobile_desktop & {
        @media screen and (min-width: $breakpoint-m) {
          max-width: 75%;
        }
      }

      #{$self}--ui-mobile & {
        margin-top: 33%;

        @media screen and (min-width: $breakpoint-m) {
          margin-top: 0;
        }
      }

      #{$self}--design-print & {
        position: relative;
        margin-right: 25%;
      }
    }

    &:nth-of-type(2) {
      #{$self}--ui-mobile_desktop & {
        max-width: 40%;
        align-self: flex-end;
        margin-top: calc(var(--spacer-6) * -1);
        margin-right: var(--spacer-base);

        @media screen and (min-width: $breakpoint-m) {
          max-width: 30%;
          margin-top: -25%;
        }
      }

      #{$self}--design-print & {
        margin-top: calc(var(--spacer-3) * -1);
        margin-left: 25%;
      }
    }
  }
}
</style>
