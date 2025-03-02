<script setup lang="ts">
const { data } = await useAsyncData('about', () => queryContent('/about').findOne())

const seoMeta = data.value?.data?.attributes?.seo

if (seoMeta) {  
  useSeoMeta({
    title: seoMeta.metaTitle,
    description: seoMeta.metaDescription,
    ogTitle: seoMeta.metaTitle ?? '',
    ogDescription: seoMeta.metaDescription ?? '',
    ogImage: seoMeta.metaImage.data.attributes.url ? `https://www.cgicquel.fr${seoMeta.metaImage.data.attributes.url}`:'',
  })
}
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
      <div v-if="data?.data.attributes.intro" class="section section--full">
        <div class="about__content__intro-wrapper">
          <div class="about__content__intro">
            <richtext-wrapper :text="data.data.attributes.intro" />
          </div>
        </div>
      </div>

      <div class="section section--full">
        <h2 class="heading--second">Parcours</h2>

        <about-history v-if="data?.data.attributes.experience" :history="data.data.attributes.experience" />
      </div>

      <div class="section section--full">
        <h2 class="heading--second">Compétences</h2>

        <about-skills v-if="data?.data.attributes.skills?.data" :skills="data.data.attributes.skills.data" />
      </div>

      <div class="section section--half">
        <h2 class="heading--second">Intérêts</h2>

        <about-interests v-if="data?.data.attributes.interests" :interests="data.data.attributes.interests" />
      </div>

      <div class="section section--half">
        <h2 class="heading--second">Contacts</h2>

        <about-social-links v-if="data?.data.attributes.social_links" :social-links="data.data.attributes.social_links" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.about {
  &__header {
    padding-top: var(--spacer-11);
  }

  &__content {
    padding-top: var(--spacer-8);
    padding-bottom: var(--spacer-8);
    row-gap: var(--spacer-9);

    &__intro {
      @media screen and (min-width: $breakpoint-m) {
        padding-top: var(--spacer-6);
        padding-left: var(--spacer-6);
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
          background: linear-gradient(
            to bottom right,
            color-mix(in srgb, transparent var(--opacity-percentage-6), var(--color-accent-darker)),
            16.5%,
            transparent 50%
          );
        }
      }

      &-wrapper {
        @media screen and (min-width: $breakpoint-m) {
          display: inline-block;
          padding: var(--spacer-3);
          position: relative;

          &::before,
          &::after {
            content: "";
            display: block;
            width: var(--spacer-7);
            height: var(--spacer-7);
            border-top: 1px solid var(--color-accent-base);
            border-left: 1px solid var(--color-accent-base);
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
      padding-top: var(--spacer-10);
      padding-bottom: var(--spacer-10);
      row-gap: var(--spacer-10);
    }
  }
}
</style>
