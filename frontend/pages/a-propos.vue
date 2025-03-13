<script setup lang="ts">
const { data: aboutData } = await useAsyncData('about', () => queryCollection('about').first())

const seoMeta = aboutData?.value?.seo

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
  <main v-if="aboutData" class="about">
    <MainMenu />

    <header class="container about__header">
      <div class="section section--full">
        <h1 class="heading--main">A propos</h1>
      </div>
    </header>

    <div class="container about__content">
      <div v-if="aboutData.intro" class="section section--full">
        <div class="about__content__intro-wrapper">
          <div class="about__content__intro">
            <richtext-wrapper :text="aboutData.intro" />
          </div>
        </div>
      </div>

      <about-history v-if="aboutData.experience" :history="aboutData.experience" />

      <about-skills v-if="aboutData.skills?.data" :skills="aboutData.skills.data" />

      <about-interests v-if="aboutData.interests" :interests="aboutData.interests" />

      <about-social-links v-if="aboutData.social_links" :social-links="aboutData.social_links" />
    </div>
  </main>

  <main v-else>
    <NotFoundContent />
  </main>
</template>

<style lang="scss">
.about {
  &__header {
    padding-top: var(--spacer-11);
    opacity: 0;
    animation: .6s cubic-bezier(0.65, 0, 0.35, 1) .2s forwards fade-in;
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
        opacity: 0;
        animation: .6s cubic-bezier(0.65, 0, 0.35, 1) .25s forwards fade-in;

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

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
