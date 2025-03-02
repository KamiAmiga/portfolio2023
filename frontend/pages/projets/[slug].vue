<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData('project', () => queryContent(route.path).findOne())

const seoMeta = data.value?.data[0]?.attributes?.seo

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
  <main class="project">
    <MainMenu />

    <ProjectHeader
      v-if="data?.data[0].attributes?.name"
      :title="data.data[0].attributes?.name"
      :cover-image-landscape="data.data[0].attributes?.cover_image_landscape?.data"
      :cover-image-portrait="data.data[0].attributes?.cover_image_portrait?.data" />
    <div class="container project__content">
      <section class="section section--third">
        <ProjectStats
          v-if="data?.data[0].attributes?.year"
          :year="data.data[0].attributes?.year"
          :skills="data.data[0].attributes?.skills?.data"/>
      </section>

      <section class="section section--half">
        <RichtextWrapper 
          v-if="data?.data[0].attributes?.description"
          :text="data.data[0].attributes?.description" />
      </section>

      <section class="section section--full">
        <div v-if="data?.data[0].attributes?.main_images" class="project__main-images">
          <template v-for="mainImage in data.data[0].attributes?.main_images" :key="mainImage.id">
            <div class="project__main-images__item">
              <ProjectMainImage :type="mainImage.type" :images="mainImage.images?.data" />
            </div>
          </template>
        </div>
      </section>

      <section
        v-if="data?.data[0].attributes?.typography && data?.data[0].attributes?.typography?.length > 0"
        class="section section--half">
        <h2 class="heading--second">Typographie</h2>

        <ProjectTypography :fonts="data.data[0].attributes.typography" />
      </section>

      <section 
        v-if="data?.data[0].attributes?.colors
          && data?.data[0].attributes?.colors?.length > 0"
        class="section section--half">
        <h2 class="heading--second">Couleurs</h2>

        <ProjectColors :colors="data.data[0].attributes?.colors" />
      </section>

      <section v-if="data?.data[0].attributes?.secondary_images?.data" class="section section--full">
        <ProjectSecondaryImages :images="data.data[0].attributes?.secondary_images?.data" />
      </section>
    </div>
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
