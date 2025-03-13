<script setup lang="ts">
import { inView } from "motion"
import { ProjectMainImageTypes } from "@/types/project";
import type {
   StrapiImage
} from "@/types/strapiResponsiveImage";
  
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
    amount: .25
  })
})
  
onUnmounted(() => stopViewTracking())

const props = defineProps<{
  type: `${ProjectMainImageTypes}`;
  images: StrapiImage[];
}>();

const mainImageCategory = computed(() => {
  return props.type.split("-")[0];
});

const reorderedUIMobileDesktopImages = computed(() => {
  const firstImg = props.images.find(image => image.attributes.width > image.attributes.height)
  const secondImg = props.images.find(image => image.attributes.height > image.attributes.width)

  return [firstImg, secondImg]
})
</script>

<template>
  <figure
    ref="container"
    :class="`project-main-image project-main-image--${mainImageCategory} project-main-image--${type} ${isInView ? 'in-view': ''}`">
    <template v-if="type === ProjectMainImageTypes.Drawing">
      <div class="project-main-image__picture-wrapper">
        <NuxtImg 
          v-if="images[0].attributes.url"
          format="webp"
          :src="images[0].attributes.url"
          :alt="images[0].attributes.alternativeText ?? ''"
          sizes="md:80vw lg:80vw xl:80vw"/>
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.UIMobileDesktop && reorderedUIMobileDesktopImages[0] && reorderedUIMobileDesktopImages[1]">
      <div class="project-main-image__picture-wrapper">
        <NuxtImg 
          v-if="reorderedUIMobileDesktopImages[0].attributes.url"
          format="webp"
          :src="reorderedUIMobileDesktopImages[0].attributes.url"
          :alt="reorderedUIMobileDesktopImages[0].attributes.alternativeText ?? ''"
          sizes="md:75vw lg:75vw xl:75vw"/>
      </div>

      <div class="project-main-image__picture-wrapper">
        <NuxtImg 
          v-if="reorderedUIMobileDesktopImages[1].attributes.url"
          format="webp"
          :src="reorderedUIMobileDesktopImages[1].attributes.url"
          :alt="reorderedUIMobileDesktopImages[1].attributes.alternativeText ?? ''"
          sizes="md:25vw lg:20vw xl:20vw"/>
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.UIDesktop">
      <div class="project-main-image__picture-wrapper">
        <NuxtImg 
          v-if="images[0].attributes.url"
          format="webp"
          :src="images[0].attributes.url"
          :alt="images[0].attributes.alternativeText ?? ''"
          sizes="md:80vw lg:60vw xl:60vw"/>
      </div>
    </template>

    <template
      v-else-if="type === ProjectMainImageTypes.DesignVisualID">
      <div class="project-main-image__picture-wrapper">
        <NuxtImg 
          v-if="images[0].attributes.url"
          format="webp"
          :src="images[0].attributes.url"
          :alt="images[0].attributes.alternativeText ?? ''"
          sizes="md:80vw lg:80vw xl:80vw"/>
      </div>
    </template>

    <template v-else-if="type === ProjectMainImageTypes.DesignPrint">
      <div v-for="image in images" :key="image.id" class="project-main-image__picture-wrapper">
        <NuxtImg 
          v-if="image.attributes.url"
          format="webp"
          :src="image.attributes.url"
          :alt="image.attributes.alternativeText ?? ''"
          sizes="md:66vw lg:50vw xl:40vw"/>
      </div>
    </template>

    <template v-else>
      <div v-for="image in images" :key="image.id" class="project-main-image__picture-wrapper">
        <NuxtImg 
          v-if="image.attributes.url"
          format="webp"
          :src="image.attributes.url"
          :alt="image.attributes.alternativeText ?? ''"
          sizes="md:33vw lg:25vw xl:25vw"/>
      </div>
    </template>
  </figure>
</template>

<style lang="scss">
.project-main-image {
  --shadow-color: var(--color-accent-base);

  $self: &;
  opacity: 0;
  box-shadow:
    0
    var(--spacer-1)
    var(--spacer-7)
    calc(var(--spacer-2) * -1)
    color-mix(
      in srgb,
      transparent var(--opacity-percentage-7),
      var(--shadow-color)
    );
  transition: opacity .5s ease-in;

  &.in-view {
    opacity: 1
  }

  &--ui {    
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: var(--spacer-6) var(--spacer-base);
    background: linear-gradient(
      to bottom,
      var(--color-primary-base) 50%,
      color-mix(
        in srgb,
        var(--color-accent-darker) var(--opacity-percentage-5),
        var(--color-primary-base)
      ));

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
      --shadow-color: var(--color-secondary-lighter);

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

      @media screen and (min-width: $breakpoint-m) {
        padding: var(--spacer-8) var(--spacer-9);
      }
    }

    &-print {
      --shadow-color: var(--color-tertiary-lighter);

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

      @media screen and (min-width: $breakpoint-m) {
        padding-left: var(--spacer-8);
        padding-right: var(--spacer-8);
      }
    }
  }

  &--drawing {
    --shadow-color: var(--color-secondary-lighter);

    width: fit-content;

    img {
      max-height: 140vh;
      object-fit: contain;
    }
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
