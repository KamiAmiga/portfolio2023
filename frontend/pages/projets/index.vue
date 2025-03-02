<script setup lang="ts">
const { data: pageData } = await useAsyncData('projects-list-page', () => queryContent('/projects-list-page').findOne())
const { data: projectsData } = await useAsyncData('projects-data', () => queryContent('/projets').find())

const projectsList = computed(() => {
  return projectsData.value?.map(item => item.data[0].attributes).sort((a, b) => b.year - a.year)
})

const seoMeta = pageData?.value?.data?.attributes?.seo

if (seoMeta) {  
  useSeoMeta({
    title: seoMeta.metaTitle,
    description: seoMeta.metaDescription,
    ogTitle: seoMeta.metaTitle ?? '',
    ogDescription: seoMeta.metaDescription ?? '',
    ogImage: seoMeta.metaImage.data?.attributes?.url ? `https://www.cgicquel.fr${seoMeta.metaImage.data.attributes.url}`:'',
  })
}
</script>

<template>
  <main class="projects">
    <MainMenu />

    <h1 class="sr-only">{{ pageData?.data?.attributes?.title }}</h1>

    <ul v-if="projectsList" class="container projects__content">
      <ProjectsItem v-for="project in projectsList" :key="project.id" :project="project" />
    </ul>
  </main>
</template>

<style lang="scss">
.projects {
  &__content {
    margin: 0;
    
    &__item {
      width: 100%;
      height: 100vh;
      box-sizing: border-box;

      display: grid;
      grid-template-rows: 1fr 2fr;
      grid-template-columns: 64px 1fr;
      row-gap: 40px;
      column-gap: 16px;
      grid-template-areas: 
        "dot title"
        "dot image";

      &__link {
        &__dot {
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

        &__name {
          @include font-sans(xl);
          display: flex;
          align-items: center;
          grid-area: title;
          padding-top: calc(72px + 16px);

          @media screen and (min-width: $breakpoint-m) {
            @include font-sans(xxxl);
          }
        }

        &__image {
          grid-area: image;
          overflow: hidden;
          padding-left: 16px;
          padding-bottom: 40px;

          picture {
            display: initial;
          }

          img {
            display: initial;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
