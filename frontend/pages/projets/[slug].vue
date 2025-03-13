<script setup lang="ts">
const route = useRoute()
const { data: projectData } = await useAsyncData(route.path, () => queryCollection('projects').path(route.path).first())

const seoMeta = projectData?.value?.seo

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
  <main v-if="projectData" class="project">
    <MainMenu />

    <ProjectHeader
      v-if="projectData.name"
      :title="projectData.name"
      :cover-image-landscape="projectData.cover_image_landscape?.data"
      :cover-image-portrait="projectData.cover_image_portrait?.data" />
    <div class="container project__content">
      <section class="section section--third">
        <ProjectStats
          v-if="projectData.year"
          :year="projectData.year"
          :skills="projectData.skills?.data"/>
      </section>

      <section class="section section--half">
        <RichtextWrapper 
          v-if="projectData.description"
          :text="projectData.description" />
      </section>

      <section class="section section--full">
        <div v-if="projectData.main_images" class="project__main-images">
          <template v-for="mainImage in projectData.main_images" :key="mainImage.id">
            <div class="project__main-images__item">
              <ProjectMainImage :type="mainImage.type" :images="mainImage.images?.data" />
            </div>
          </template>
        </div>
      </section>

      <section
        v-if="projectData.typography && projectData.typography?.length > 0"
        class="section section--half">
        <h2 class="heading--second">Typographie</h2>

        <ProjectTypography :fonts="projectData.typography" />
      </section>

      <section 
        v-if="projectData.colors
          && projectData.colors?.length > 0"
        class="section section--half">
        <h2 class="heading--second">Couleurs</h2>

        <ProjectColors :colors="projectData.colors" />
      </section>

      <section v-if="projectData.secondary_images?.data" class="section section--full">
        <ProjectSecondaryImages :images="projectData.secondary_images?.data" />
      </section>
    </div>
  </main>

  <main v-else>
    <NotFoundContent />
  </main>
</template>

<style lang="scss">
.project {
  &__content {
    padding-top: var(--spacer-8);
    padding-bottom: var(--spacer-8);
    row-gap: var(--spacer-10);

    @media screen and (min-width: $breakpoint-m) {
      padding-top: var(--spacer-10);
      padding-bottom: var(--spacer-10);
      row-gap: var(--spacer-11);
    }
  }

  &__main-images {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    row-gap: var(--spacer-9);

    &__item {
      display: flex;

      &:nth-of-type(odd) {
        grid-column: 1 / 3;
      }

      &:nth-of-type(even) {
        grid-column: 2 / 4;
        align-items: end;
        justify-content: end;
      }
    }

    @media screen and (min-width: $breakpoint-m) {
      grid-template-columns: 1fr 4fr 1fr;
      row-gap: var(--spacer-10);
    }
  }
}
</style>
