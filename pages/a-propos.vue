<script setup lang="ts">
import { type About } from "@/types/about";

const { findOne } = useStrapi();
const { data: aboutData } = await useAsyncData(
  'about',
  () => findOne<About>("about", {
    populate: ["experience", "skills", "interests", "social_links"],
  })
)
</script>

<template>
  <main class="about">
    <MainMenu />

    <header class="container about__header">
      <div class="section section--full">
        <h1 class="heading--main">A propos</h1>
      </div>
    </header>

    <div class="container about__content">
      <div v-if="aboutData?.data.attributes.intro" class="section section--full">
        <div class="about__content__intro-wrapper">
          <div class="about__content__intro">
            <richtext-wrapper :text="aboutData.data.attributes.intro" />
          </div>
        </div>
      </div>

      <div class="section section--full">
        <h2 class="heading--second">Parcours</h2>

        <about-history v-if="aboutData?.data.attributes.experience" :history="aboutData.data.attributes.experience" />
      </div>

      <div class="section section--full">
        <h2 class="heading--second">Compétences</h2>

        <about-skills v-if="aboutData?.data.attributes.skills?.data" :skills="aboutData.data.attributes.skills.data" />
      </div>

      <div class="section section--half">
        <h2 class="heading--second">Intérêts</h2>

        <about-interests v-if="aboutData?.data.attributes.interests" :interests="aboutData.data.attributes.interests" />
      </div>

      <div class="section section--half">
        <h2 class="heading--second">Contacts</h2>

        <about-social-links v-if="aboutData?.data.attributes.social_links"
          :social-links="aboutData.data.attributes.social_links" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use "../assets/styles/abstracts" as *;

.about {
  &__header {
    padding-top: map-get($spacers, 11);
  }

  &__content {
    padding-top: map-get($spacers, 8);
    padding-bottom: map-get($spacers, 8);
    row-gap: map-get($spacers, 9);

    &__intro {
      @media screen and (min-width: $breakpoint-m) {
        padding-top: map-get($spacers, 6);
        padding-left: map-get($spacers, 6);
        position: relative;

        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 10rem;
          height: 10rem;
          top: 0;
          left: 0;
          z-index: -1;
          ;
          background: linear-gradient(to bottom right,
              fade-out(map-get($theme-color-accent, darker), .68),
              16.5%,
              fade-out(map-get($theme-color-accent, base), 1) 50%);
        }
      }

      &-wrapper {
        @media screen and (min-width: $breakpoint-m) {
          display: inline-block;
          padding: map-get($spacers, 3);
          position: relative;

          &::before,
          &::after {
            content: "";
            display: block;
            width: map-get($spacers, 7);
            height: map-get($spacers, 7);
            border-top: 1px solid map-get($theme-color-accent, base);
            border-left: 1px solid map-get($theme-color-accent, base);
            position: absolute;
          }

          &::before {
            top: 0;
            left: 0;
          }

          &::after {
            right: 0;
            bottom: 0;
            transform: rotate(180deg);
          }
        }
      }
    }

    @media screen and (min-width: $breakpoint-m) {
      padding-top: map-get($spacers, 10);
      padding-bottom: map-get($spacers, 10);
      row-gap: map-get($spacers, 10);
    }
  }
}
</style>
