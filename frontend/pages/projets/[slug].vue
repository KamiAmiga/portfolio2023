<script setup lang="ts">
import { type Project } from "@/types/project";

const route = useRoute();
const { find } = useStrapi();

const { data: projectData } = await useAsyncData(
  'projects',
  () => find<Project>("projects", {
    filters: { slug: route.params.slug },
    populate: [
      "cover_image",
      "skills",
      "main_images",
      "main_images.images",
      "main_images.zoom_images",
      "typography",
      "typography.typo_visual",
      "colors",
      "secondary_images",
    ],
  })
)
</script>

<template>
  <main class="project">
    <MainMenu />

    <ProjectHeader v-if="projectData?.data[0].attributes?.name" :title="projectData.data[0].attributes?.name"
      :cover-image="projectData.data[0].attributes?.cover_image?.data" />
    <div class="container project__content">
      <section class="section section--third">
        <ProjectStats v-if="projectData?.data[0].attributes?.year" :year="projectData.data[0].attributes?.year"
          :skills="projectData.data[0].attributes?.skills?.data">
        </ProjectStats>
      </section>

      <section class="section section--half">
        <RichtextWrapper v-if="projectData?.data[0].attributes?.description"
          :text="projectData.data[0].attributes?.description" />
      </section>

      <section class="section section--full">
        <div v-if="projectData?.data[0].attributes?.main_images" class="project__main-images">
          <template v-for="mainImage in projectData.data[0].attributes?.main_images" :key="mainImage.id">
            <div class="project__main-images__item">
              <ProjectMainImage :type="mainImage.type" :images="mainImage.images?.data" />
            </div>
          </template>
        </div>
      </section>

      <section
        v-if="projectData?.data[0].attributes?.typography && projectData?.data[0].attributes?.typography?.length > 0"
        class="section section--half">
        <h2 class="heading--second">Typographie</h2>

        <ProjectTypography :fonts="projectData.data[0].attributes.typography" />
      </section>

      <section v-if="projectData?.data[0].attributes?.colors && projectData?.data[0].attributes?.colors?.length > 0"
        class="section section--half">
        <h2 class="heading--second">Couleurs</h2>

        <ProjectColors :colors="projectData.data[0].attributes?.colors" />
      </section>

      <section v-if="projectData?.data[0].attributes?.secondary_images?.data" class="section section--full">
        <ProjectSecondaryImages :images="projectData.data[0].attributes?.secondary_images?.data" />
      </section>
    </div>
  </main>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

.project {
  &__content {
    padding-top: map-get($spacers, 8);
    padding-bottom: map-get($spacers, 8);
    row-gap: map-get($spacers, 9);

    @media screen and (min-width: $breakpoint-m) {
      padding-top: map-get($spacers, 10);
      padding-bottom: map-get($spacers, 10);
      row-gap: map-get($spacers, 10);
    }
  }

  &__main-images {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    row-gap: map-get($spacers, 6);

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
      row-gap: map-get($spacers, 8);
    }
  }
}
</style>
