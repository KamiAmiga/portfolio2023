<script setup lang="ts">
import { ProjectMainImageTypes } from "@/types/project";
import {
  type StrapiImage,
  StrapiResponsiveFormats,
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
        <CustomPicture :picture-data="images[0].attributes" :format="StrapiResponsiveFormats.FullWidth" />
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.UIMobileDesktop">
      <div class="project-main-image__picture-wrapper">
        <CustomPicture :key="images[0].id" :picture-data="images[0].attributes"
          :format="StrapiResponsiveFormats.FullWidth" />
      </div>

      <div class="project-main-image__picture-wrapper">
        <CustomPicture :key="images[1].id" :picture-data="images[1].attributes"
          :format="StrapiResponsiveFormats.FourthWidth" />
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.UIDesktop ||
      type === ProjectMainImageTypes.DesignVisualID
      ">
      <div class="project-main-image__picture-wrapper">
        <CustomPicture :key="images[0].id" :picture-data="images[0].attributes"
          :format="StrapiResponsiveFormats.FullWidth" />
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.DesignPrint">
      <div v-for="image in images" :key="image.id" class="project-main-image__picture-wrapper">
        <CustomPicture :picture-data="image.attributes" :format="StrapiResponsiveFormats.HalfWidth" />
      </div>
    </template>

    <template v-else>
      <div v-for="image in images" :key="image.id" class="project-main-image__picture-wrapper">
        <CustomPicture :picture-data="image.attributes" :format="StrapiResponsiveFormats.FourthWidth" />
      </div>
    </template>
  </figure>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

.project-main-image {
  $self: &;

  &--ui {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: map-get($spacers, 9) $spacer;
    background: linear-gradient(to bottom,
        map-get($theme-color-primary, base) 50%,
        mix(map-get($theme-color-accent, darker),
          map-get($theme-color-primary, base),
          32%));

    box-shadow: map-get($spacers, 2) * -1 map-get($spacers, 1) map-get($spacers, 2) fade-out(map-get($theme-color-accent, base), map-get($fading-out, 4));

    &-mobile_desktop {
      flex-direction: column;

      @media screen and (min-width: $breakpoint-m) {
        padding-left: map-get($spacers, 8);
        padding-right: map-get($spacers, 8);
      }
    }

    &-mobile {
      flex-grow: 1;
      flex-direction: row;
      justify-content: space-between;
      column-gap: $spacer;

      @media screen and (min-width: $breakpoint-m) {
        justify-content: center;
        column-gap: map-get($spacers, 8);
      }
    }

    &-desktop {
      @media screen and (min-width: $breakpoint-m) {
        padding-left: map-get($spacers, 8);
        padding-right: map-get($spacers, 8);
      }
    }
  }

  &--design {
    padding: map-get($spacers, 9) $spacer;

    &-visual_id {
      background: linear-gradient(to bottom right,
          mix(map-get($theme-color-secondary, darker),
            map-get($theme-color-primary, base),
            32%),
          25%,
          map-get($theme-color-primary, base),
          75%,
          mix(map-get($theme-color-secondary, darker),
            map-get($theme-color-primary, base),
            32%));
      box-shadow: map-get($spacers, 2) * -1 map-get($spacers, 1) map-get($spacers, 2) fade-out(map-get($theme-color-secondary, lighter),
          map-get($fading-out, 5));

      @media screen and (min-width: $breakpoint-m) {
        padding: map-get($spacers, 8) map-get($spacers, 9);
      }
    }

    &-print {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background: linear-gradient(to bottom,
          map-get($theme-color-primary, base) 50%,
          mix(map-get($theme-color-tertiary, darker),
            map-get($theme-color-primary, base),
            32%));
      box-shadow: map-get($spacers, 2) * -1 map-get($spacers, 1) map-get($spacers, 2) fade-out(map-get($theme-color-tertiary, lighter),
          map-get($fading-out, 5));

      @media screen and (min-width: $breakpoint-m) {
        padding-left: map-get($spacers, 8);
        padding-right: map-get($spacers, 8);
      }
    }
  }

  &--drawing {
    width: fit-content;
    box-shadow: map-get($spacers, 2) * -1 map-get($spacers, 1) map-get($spacers, 2) fade-out(map-get($theme-color-secondary, lighter),
        map-get($fading-out, 5));
  }

  &__picture-wrapper {
    #{$self}--ui & {
      position: relative;
      overflow: hidden;
      border-radius: map-get($spacers, 2);
      box-shadow: 0 0 map-get($spacers, 3) map-get($spacers, 1) * -1 map-get($theme-color-primary, lighter-3);

      @media screen and (min-width: $breakpoint-m) {
        border-radius: map-get($spacers, 3);
      }
    }

    #{$self}--ui-mobile_desktop & {
      flex-grow: 0;
    }

    #{$self}--design-print & {
      max-width: 75%;
      box-shadow: 0 0 map-get($spacers, 3) map-get($spacers, 1) * -1 map-get($theme-color-primary, lighter-3);
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
        margin-top: map-get($spacers, 6) * -1;
        margin-right: $spacer;

        @media screen and (min-width: $breakpoint-m) {
          max-width: 30%;
          margin-top: -25%;
        }
      }

      #{$self}--design-print & {
        margin-top: map-get($spacers, 3) * -1;
        margin-left: 25%;
      }
    }
  }
}
</style>
