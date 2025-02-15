<script setup lang="ts">
import { inView } from 'motion';
import type { StrapiImageResponsiveData } from '~/types/strapiResponsiveImage';

const props = defineProps<{
  project: {
    name: string,
    slug: string,
    cover_image_landscape: {
      data: {
        attributes: StrapiImageResponsiveData
      }
    },
    cover_image_portrait: {
      data: {
        attributes: StrapiImageResponsiveData
      }
    }
  }
}>();

const splittedName = computed(() => {
  const segmenter = new Intl.Segmenter('fr', { granularity: 'grapheme' })
  const segments = segmenter.segment(props.project.name)
  return Array.from(segments)
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
    amount: .25
  })
})
  
onUnmounted(() => stopViewTracking())
</script>

<template>
  <li ref="container" :class="`section section--full projects-item ${isInView ? 'in-view': ''}`">
    <div class="projects-item__dot-wrapper">
      <span class="projects-item__dot"/>
    </div>

    <div class="projects-item__header">
      <h2 class="projects-item__name">
        <span class="sr-only">{{ project.name }}</span>
        <div 
          v-for="(segment, index) in splittedName"
          :key="segment.index"
          :style="`--delay: ${index * .02}s`"
          aria-hidden="true"
          class="projects-item__name__word-wrapper">
          <span class="projects-item__name__word">
            {{ segment.segment === ' ' ? '&nbsp;' : segment.segment }}
          </span>
        </div>
      </h2>

      <NuxtLink :to="`/projets/${project.slug}`" class="projects-item__link link">
        Voir le projet
      </NuxtLink>
    </div>
    
    <div v-if="project.cover_image_landscape.data && project.cover_image_portrait.data" class="projects-item__image">
      <CustomPicture
        :picture-data-landscape="project.cover_image_landscape.data?.attributes"
        :picture-data-portrait="project.cover_image_portrait.data?.attributes"
        format='projects_image' />
    </div>
  </li>
</template>

<style lang="scss">
.projects-item {
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: var(--spacer-9) 1fr;
  row-gap: var(--spacer-8);
  column-gap: var(--spacer-base);
  grid-template-areas: 
    "dot title"
    "dot image";
  width: 100%;
  height: 100vh;
  list-style: none;

  &__dot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border: var(--spacer-1) solid var(--color-accent-lighter);
    position: absolute;
    top: 20%;
    left: 50%;
    opacity: 0;
    background: linear-gradient(
      to bottom,
      color-mix(
        in srgb,
        var(--color-primary-base) var(--opacity-percentage-7),
        var(--color-accent-darker)
      ),
      33%,
      var(--color-primary-base));
    box-shadow:
      0
      0
      var(--spacer-3)
      color-mix(
        in srgb,
        transparent var(--opacity-percentage-5),
        var(--color-accent-lighter)
      );
    transform: translate(-50%, 200%) rotate(-45deg);
    transition: 
      opacity .5s .2s cubic-bezier(0.65, 0, 0.35, 1),
      transform .4s .3s cubic-bezier(0, -0.8, .4, 1.25);

    &::after {
      content: "";
      width: .25rem;
      height: .25rem;
      background-color: var(--color-primary-reverse);
      box-shadow:
        0
        0
        var(--spacer-3)
        color-mix(
          in srgb,
          transparent var(--opacity-percentage-5),
          var(--color-primary-reverse)
        );
    }

    &-wrapper {
      display: flex;
      justify-content: center;
      position: relative;
      grid-area: dot;
  
      &::before {
        content: "";
        width: 1px;
        height: 100%;
        background-color: var(--color-accent-base);
      }
    }

    .in-view & {
      opacity: 1;
      transform: translate(-50%, 0) rotate(45deg);
    }

    @media screen and (orientation: landscape) {
      top: 15%;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-area: title;
    gap: .5rem;
    padding-top: calc(72px + var(--spacer-base));
  }

  &__name {
    line-height: 0;

    &__word {
      @include font-sans(xl);
      display: inline-block;
      opacity: 0;
      transform: translateY(1.5em);
      transition: transform .6s var(--delay) cubic-bezier(0.76, 0, 0.24, 1),
        opacity .5s calc(var(--delay) + .2s) cubic-bezier(0.65, 0, 0.35, 1);

      .in-view & {
        opacity: 1;
        transform: translateY(0);
      }

      &-wrapper {
        display: inline-block;
        overflow: hidden;
      }

      @media screen and (min-width: $breakpoint-m) {
        @include font-sans(xxxl);
      }
    }

    &__space {
      @include font-sans(xl);
      display: inline;
      vertical-align: top;

      @media screen and (min-width: $breakpoint-m) {
        @include font-sans(xxxl);
      }
    }
  }

  &__link {
    width: fit-content;
    opacity: 0;
    transition: opacity .5s .5s ease-out;

    .in-view & {
      opacity: 1;
    }
  }

  &__image {
    grid-area: image;
    overflow: hidden;
    margin-left: var(--spacer-base);
    margin-bottom: var(--spacer-8);
    opacity: 0;
    transition: opacity .5s .5s ease-out;

    .in-view & {
      opacity: 1;
    }

    picture {
      display: initial;
    }

    img {
      display: initial;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media screen and (orientation: landscape) {
      margin-bottom: var(--spacer-6);
      margin-right: var(--spacer-base);
    }

    @media screen and (min-width: $breakpoint-m) {
      margin-left: var(--spacer-10);
    }

    @media screen and (min-width: $breakpoint-m) and (orientation: landscape) {
      margin-right: var(--spacer-10);
    }
  }

  @media screen and (orientation: landscape) {
    grid-template-rows: 20% 1fr 10vh;
    grid-template-areas: 
      "dot title"
      "dot image"
      "dot ...";
    height: 110vh;
    row-gap: var(--spacer-7);
  }

  @media screen and (min-width: $breakpoint-m) {
    grid-template-columns: var(--spacer-10) 1fr;
    column-gap: var(--spacer-8);
  }

  @media screen and (min-width: $breakpoint-l) {
    grid-template-columns: 12.5% 1fr;
  }
}
</style>
