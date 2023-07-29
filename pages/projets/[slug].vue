<script setup lang="ts">
import { Project } from "@/types/project";

const route = useRoute();
const { find } = useStrapi();

const projectResponse = await find<Project>("projects", {
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
});
const projectData = ref(projectResponse.data[0]);
</script>

<template>
  <main class="project">
    <ProjectHeader :title="projectData.attributes?.name" :cover-image="projectData.attributes?.cover_image?.data" />
    <div class="container project__content">
      <section class="section section--third">
        <ProjectStats :year="projectData.attributes?.year" :skills="projectData.attributes?.skills.data"></ProjectStats>
      </section>

      <section class="section section--half">
        <RichtextWrapper :text="projectData.attributes?.description" />
      </section>

      <section class="section section--full">
        <div class="project__main-images">
          <template v-for="mainImage in projectData.attributes?.main_images" :key="mainImage.id">
            <div class="project__main-images__item">
              <ProjectMainImage :type="mainImage.type" :images="mainImage.images?.data" />
            </div>
          </template>
        </div>
      </section>

      <section v-if="projectData.attributes?.typography?.length > 0" class="section section--half">
        <h2 class="heading--second">Typographie</h2>

        <ProjectTypography :fonts="projectData.attributes.typography" />
      </section>

      <section v-if="projectData.attributes?.colors?.length > 0" class="section section--half">
        <h2 class="heading--second">Couleurs</h2>

        <ProjectColors :colors="projectData.attributes?.colors" />
      </section>

      <section class="section section--full">
        <ProjectSecondaryImages :images="projectData.attributes?.secondary_images?.data" />
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
